USE TinCMS_db;
GO

-- Xóa dữ liệu cũ
DELETE FROM Posts;
DELETE FROM Categories;
DELETE FROM Users;
DELETE FROM OrderDetails;
DELETE FROM Orders;
DELETE FROM Customers;
DELETE FROM Products;
DELETE FROM CategoriesProducts;

-- Reset IDENTITY
DBCC CHECKIDENT ('Categories', RESEED, 0);
DBCC CHECKIDENT ('Posts', RESEED, 0);
DBCC CHECKIDENT ('Users', RESEED, 0);
DBCC CHECKIDENT ('CategoriesProducts', RESEED, 0);
DBCC CHECKIDENT ('Products', RESEED, 0);
DBCC CHECKIDENT ('Customers', RESEED, 0);
DBCC CHECKIDENT ('Orders', RESEED, 0);
DBCC CHECKIDENT ('OrderDetails', RESEED, 0);

-- Insert Categories
SET IDENTITY_INSERT Categories ON;
INSERT INTO Categories (Id, Name, Description) VALUES
(1, N'Tin tức Công nghệ', N'Cập nhật xu hướng AI, IoT và lập trình.'),
(2, N'Đời sống du lịch', N'Kinh nghiệm phượt và các điểm đến hấp dẫn.'),
(3, N'Sức khỏe Thể thao', N'Các bài tập và chế độ ăn uống lành mạnh.'),
(4, N'Giáo dục Kỹ năng', N'Phương pháp học tập và kỹ năng mềm.'),
(5, N'Góc lập trình viên', N'Tài liệu ASP.NET Core và SQL Server.');
SET IDENTITY_INSERT Categories OFF;

-- Insert Posts
SET IDENTITY_INSERT Posts ON;
INSERT INTO Posts (Id, Title, Content, ImageUrl, CreatedDate, CategoryId) VALUES
(1, N'Lộ trình học ASP.NET', N'Hướng dẫn chi tiết cho người mới bắt đầu...', N'/img/dotnet.jpg', '2026-04-01', 5),
(2, N'Top 5 bãi biển đẹp', N'Những địa điểm không thể bỏ qua mùa hè này...', N'/img/beach.jpg', '2026-04-02', 2),
(3, N'Chạy bộ đúng cách', N'Lợi ích tuyệt vời của việc chạy bộ mỗi sáng...', N'/img/run.jpg', '2026-04-03', 3),
(4, N'AI và tương lai', N'Trí tuệ nhân tạo đang thay đổi cuộc sống...', N'/img/ai.jpg', '2026-04-04', 1),
(5, N'Kỹ năng Teamwork', N'Cách phối hợp hiệu quả trong nhóm đồ án...', N'/img/team.jpg', '2026-04-05', 4);
SET IDENTITY_INSERT Posts OFF;

-- Insert Users
SET IDENTITY_INSERT Users ON;
INSERT INTO Users (Id, Username, PasswordHash, FullName, Role) VALUES
(1, N'admin', N'123456', N'Quản trị viên hệ thống', N'Admin'),
(2, N'thai_gv', N'thai1969', N'Nguyễn Cao Thái', N'Editor'),
(3, N'sv_01', N'student1', N'Nguyễn Văn A', N'User'),
(4, N'sv_02', N'student2', N'Trần Thị B', N'User'),
(5, N'moderator', N'mod789', N'Lê Văn C', N'Moderator');
SET IDENTITY_INSERT Users OFF;

-- Thêm một số dữ liệu mẫu cho các bảng còn lại
SET IDENTITY_INSERT CategoriesProducts ON;
INSERT INTO CategoriesProducts (Id, Name, Description) VALUES
(1, N'Điện thoại', N'Các dòng smartphone'),
(2, N'Laptop', N'Máy tính xách tay');
SET IDENTITY_INSERT CategoriesProducts OFF;

SET IDENTITY_INSERT Products ON;
INSERT INTO Products (Id, Name, Description, Price, StockQuantity, ImageUrl, CategoryProductId) VALUES
(1, N'iPhone 15 Pro Max', N'Điện thoại Apple', 29990000, 50, N'/img/ip15.jpg', 1),
(2, N'MacBook Pro M3', N'Laptop Apple', 39990000, 30, N'/img/mac.jpg', 2);
SET IDENTITY_INSERT Products OFF;

SET IDENTITY_INSERT Customers ON;
INSERT INTO Customers (Id, FullName, Email, Phone, Address, Password) VALUES
(1, N'Khách hàng 1', N'kh1@gmail.com', N'0909123456', N'TP.HCM', N'123456'),
(2, N'Khách hàng 2', N'kh2@gmail.com', N'0909654321', N'Hà Nội', N'123456');
SET IDENTITY_INSERT Customers OFF;

SET IDENTITY_INSERT Orders ON;
INSERT INTO Orders (Id, OrderDate, CustomerId, Status, Notes) VALUES
(1, GETDATE(), 1, 1, N'Giao hàng giờ hành chính'),
(2, GETDATE(), 2, 0, N'Gọi trước khi giao');
SET IDENTITY_INSERT Orders OFF;

SET IDENTITY_INSERT OrderDetails ON;
INSERT INTO OrderDetails (Id, OrderId, ProductId, Quantity, UnitPrice) VALUES
(1, 1, 1, 1, 29990000),
(2, 2, 2, 2, 39990000);
SET IDENTITY_INSERT OrderDetails OFF;

GO
