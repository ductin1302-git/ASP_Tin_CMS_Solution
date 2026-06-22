Add-Type -AssemblyName System.Data

$ErrorActionPreference = 'Stop'

$connectionString = 'Server=.\SQLEXPRESS;Database=TinCMS_db;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True'

function Has-MojibakeMarker {
    param([string]$Value)

    if ([string]::IsNullOrEmpty($Value)) {
        return $false
    }

    $markers = @(
        [char]0x00C3, # Ã
        [char]0x00C4, # Ä
        [char]0x00C5, # Å
        [char]0x00C6, # Æ
        [char]0x00C2  # Â
    )

    foreach ($marker in $markers) {
        if ($Value.Contains($marker)) {
            return $true
        }
    }

    $badA = [string]([char]0x00E1) + [string]([char]0x00BA) # áº
    $badO = [string]([char]0x00E1) + [string]([char]0x00BB) # á»

    return $Value.Contains($badA) -or $Value.Contains($badO)
}

function Count-MojibakeMarkers {
    param([string]$Value)

    if ([string]::IsNullOrEmpty($Value)) {
        return 0
    }

    $count = 0
    $markerCodes = @(0x00C3, 0x00C4, 0x00C5, 0x00C6, 0x00C2)
    foreach ($code in $markerCodes) {
        $count += ($Value.ToCharArray() | Where-Object { [int]$_ -eq $code }).Count
    }

    $badA = [string]([char]0x00E1) + [string]([char]0x00BA)
    $badO = [string]([char]0x00E1) + [string]([char]0x00BB)
    $count += ([regex]::Matches($Value, [regex]::Escape($badA))).Count
    $count += ([regex]::Matches($Value, [regex]::Escape($badO))).Count

    return $count
}

function Repair-Mojibake {
    param([string]$Value)

    if (-not (Has-MojibakeMarker $Value)) {
        return $Value
    }

    $sourceEncoding = [System.Text.Encoding]::GetEncoding(1252)
    $utf8 = [System.Text.Encoding]::UTF8
    $current = $Value

    for ($i = 0; $i -lt 2; $i++) {
        if (-not (Has-MojibakeMarker $current)) {
            break
        }

        $beforeScore = Count-MojibakeMarkers $current
        $bytes = $sourceEncoding.GetBytes($current)
        $candidate = $utf8.GetString($bytes)
        $afterScore = Count-MojibakeMarkers $candidate

        if ($candidate.Contains([char]0xFFFD)) {
            break
        }

        if ($afterScore -ge $beforeScore -and $candidate -eq $current) {
            break
        }

        $current = $candidate
    }

    return $current
}

function New-Command {
    param(
        [System.Data.SqlClient.SqlConnection]$Connection,
        [string]$Sql
    )

    $command = $Connection.CreateCommand()
    $command.CommandText = $Sql
    $command.CommandTimeout = 120
    return $command
}

$connection = New-Object System.Data.SqlClient.SqlConnection $connectionString
$connection.Open()

try {
    $transaction = $connection.BeginTransaction()

    try {
        $backupTables = @(
            'Categories',
            'CategoriesProducts',
            'Contacts',
            'Customers',
            'Orders',
            'Posts',
            'Products',
            'Users'
        )

        foreach ($table in $backupTables) {
            $backupName = "_EncodingBackup_$table"
            $backupSql = @"
IF OBJECT_ID(N'dbo.$backupName', N'U') IS NULL
BEGIN
    SELECT * INTO dbo.$backupName FROM dbo.[$table];
END
"@
            $backupCommand = New-Command $connection $backupSql
            $backupCommand.Transaction = $transaction
            [void]$backupCommand.ExecuteNonQuery()
        }

        $columnsSql = @"
SELECT
    c.TABLE_SCHEMA,
    c.TABLE_NAME,
    c.COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS c
WHERE
    c.TABLE_SCHEMA = 'dbo'
    AND c.DATA_TYPE IN ('nvarchar', 'nchar')
    AND c.TABLE_NAME NOT LIKE '_EncodingBackup_%'
    AND c.TABLE_NAME <> '__EFMigrationsHistory'
    AND EXISTS (
        SELECT 1
        FROM INFORMATION_SCHEMA.COLUMNS idc
        WHERE idc.TABLE_SCHEMA = c.TABLE_SCHEMA
          AND idc.TABLE_NAME = c.TABLE_NAME
          AND idc.COLUMN_NAME = 'Id'
    )
ORDER BY c.TABLE_NAME, c.COLUMN_NAME;
"@

        $columnsCommand = New-Command $connection $columnsSql
        $columnsCommand.Transaction = $transaction
        $reader = $columnsCommand.ExecuteReader()
        $columns = @()

        while ($reader.Read()) {
            $columns += [pscustomobject]@{
                Schema = [string]$reader['TABLE_SCHEMA']
                Table = [string]$reader['TABLE_NAME']
                Column = [string]$reader['COLUMN_NAME']
            }
        }

        $reader.Close()

        $totalChanged = 0

        foreach ($column in $columns) {
            $schemaName = $column.Schema.Replace(']', ']]')
            $tableName = $column.Table.Replace(']', ']]')
            $columnName = $column.Column.Replace(']', ']]')
            $displayName = "[$schemaName].[$tableName].[$columnName]"

            $selectSql = "SELECT [Id], CONVERT(nvarchar(max), [$columnName]) AS [Value] FROM [$schemaName].[$tableName] WHERE [$columnName] IS NOT NULL;"
            $selectCommand = New-Command $connection $selectSql
            $selectCommand.Transaction = $transaction
            $selectReader = $selectCommand.ExecuteReader()
            $updates = @()

            while ($selectReader.Read()) {
                $id = $selectReader['Id']
                $oldValue = [string]$selectReader['Value']
                $newValue = Repair-Mojibake $oldValue

                if ($newValue -ne $oldValue) {
                    $updates += [pscustomobject]@{
                        Id = $id
                        Value = $newValue
                    }
                }
            }

            $selectReader.Close()

            if ($updates.Count -eq 0) {
                Write-Host "$displayName : 0 rows"
                continue
            }

            $updateSql = "UPDATE [$schemaName].[$tableName] SET [$columnName] = @Value WHERE [Id] = @Id;"
            $changedInColumn = 0

            foreach ($item in $updates) {
                $updateCommand = New-Command $connection $updateSql
                $updateCommand.Transaction = $transaction

                $valueParam = $updateCommand.Parameters.Add('@Value', [System.Data.SqlDbType]::NVarChar, -1)
                $valueParam.Value = $item.Value

                $idParam = $updateCommand.Parameters.Add('@Id', [System.Data.SqlDbType]::Int)
                $idParam.Value = [int]$item.Id

                $changedInColumn += $updateCommand.ExecuteNonQuery()
            }

            $totalChanged += $changedInColumn
            Write-Host "$displayName : $changedInColumn rows"
        }

        $transaction.Commit()
        Write-Host "DONE. Total cells changed: $totalChanged"
    }
    catch {
        $transaction.Rollback()
        throw
    }
}
finally {
    $connection.Close()
}
