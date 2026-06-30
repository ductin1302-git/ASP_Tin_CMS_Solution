$viewsDir = "d:\ASP_TIN\TinCMS_Solution\CMS.Backend\Views"
$files = Get-ChildItem -Path $viewsDir -Filter "*.cshtml" -Recurse

foreach ($file in $files) {
    if ($file.FullName -match "Shared") { continue }
    
    $content = Get-Content $file.FullName -Encoding UTF8 -Raw
    
    # Tables
    $content = $content -replace 'class="table[^"]*"', 'class="admin-table"'
    
    # Forms
    $content = $content -replace 'class="form-control"', 'class="form-control-admin"'
    $content = $content -replace 'class="control-label"', 'class="form-label-admin"'
    
    # Buttons
    $content = $content -replace 'class="btn btn-primary"', 'class="btn-sport btn-primary-sport"'
    $content = $content -replace 'class="btn btn-secondary"', 'class="btn-sport btn-secondary-sport"'
    $content = $content -replace 'class="btn btn-warning btn-sm"', 'class="btn-sport btn-warning-sport btn-sm-sport"'
    $content = $content -replace 'class="btn btn-danger btn-sm"', 'class="btn-sport btn-danger-sport btn-sm-sport"'
    $content = $content -replace 'class="btn btn-info btn-sm"', 'class="btn-sport btn-secondary-sport btn-sm-sport"'
    $content = $content -replace 'class="btn btn-warning"', 'class="btn-sport btn-warning-sport"'
    $content = $content -replace 'class="btn btn-danger"', 'class="btn-sport btn-danger-sport"'
    $content = $content -replace 'class="btn btn-info"', 'class="btn-sport btn-secondary-sport"'
    $content = $content -replace 'class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"', 'class="btn-sport btn-primary-sport"'
    
    # Cards
    $content = $content -replace 'class="card shadow mb-4[^"]*"', 'class="data-card mb-4"'
    $content = $content -replace 'class="card-header py-3"', 'class="data-card-header"'
    $content = $content -replace 'class="m-0 font-weight-bold text-primary"', 'class="data-card-title"'
    
    # Headers
    $content = $content -replace 'class="h3 mb-4 text-gray-800"', 'class="page-title mb-4"'
    $content = $content -replace 'class="h3 mb-0 text-gray-800"', 'class="page-title"'
    $content = $content -replace 'class="h3 mb-4 text-gray-800 text-danger"', 'class="page-title text-danger mb-4"'
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
Write-Output "UI Upgrade Completed!"
