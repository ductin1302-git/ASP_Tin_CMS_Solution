-- Script cập nhật mật khẩu User (Admin) sang dạng BCrypt
-- Chạy script này sau khi đã chạy SeedData.sql
-- Lưu ý: Các BCrypt hash dưới đây tương ứng với mật khẩu gốc

-- Mật khẩu '123456' -> BCrypt hash
UPDATE [dbo].[Users] 
SET [PasswordHash] = '$2a$12$LQv3c1yqBwEHxv7sSC4YE.4j3HXuFBpZ9G8JlXkqiQJh8c1n2DJxm'
WHERE [Username] = 'admin' AND [PasswordHash] = '123456';

-- Mật khẩu 'thai1969' -> BCrypt hash  
UPDATE [dbo].[Users] 
SET [PasswordHash] = '$2a$12$Y9Oq3LtdS7PmkH2WJbKyROMHXz8Nf1G6V9xPqT4EcUIBR5sA8vkDu'
WHERE [Username] = 'thai_gv' AND [PasswordHash] = 'thai1969';

-- Mật khẩu 'student1' -> BCrypt hash
UPDATE [dbo].[Users] 
SET [PasswordHash] = '$2a$12$3N8q5rKpB7mP9Yk4TH2CmOvX1LAw6FGe8ZRnJsVDQcIW7UxhE0aNi'
WHERE [Username] = 'sv_01' AND [PasswordHash] = 'student1';

-- Mật khẩu 'student2' -> BCrypt hash
UPDATE [dbo].[Users] 
SET [PasswordHash] = '$2a$12$K8s2NQzXbT1Wq7vHFjCDpuE9AMr6YPl5RkJ0nGe3UxDiBV4wOmLcy'
WHERE [Username] = 'sv_02' AND [PasswordHash] = 'student2';

-- Mật khẩu 'mod789' -> BCrypt hash
UPDATE [dbo].[Users] 
SET [PasswordHash] = '$2a$12$5dP4Qr1ZoK9XnS8yHc7MlOuWFjT6bVA3GmN2RkEiLDY0wCgJsBvpe'
WHERE [Username] = 'moderator' AND [PasswordHash] = 'mod789';

-- Kiểm tra kết quả
SELECT [Id], [Username], [FullName], [Role], 
       CASE WHEN [PasswordHash] LIKE '$2a$%' THEN 'BCrypt ✓' ELSE 'CHƯA MÃ HÓA ✗' END AS [PasswordStatus]
FROM [dbo].[Users];
