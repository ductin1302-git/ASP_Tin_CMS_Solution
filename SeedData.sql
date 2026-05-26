-- Xóa dữ liệu cũ nếu muốn làm mới (Bỏ comment các dòng DELETE nếu cần thiết)
-- DELETE FROM [dbo].[Posts];
-- DELETE FROM [dbo].[Products];
-- DELETE FROM [dbo].[Categories];
-- DELETE FROM [dbo].[CategoriesProducts];
-- DELETE FROM [dbo].[Customers];
-- DELETE FROM [dbo].[Users];

-- Ảnh 1: Dữ liệu bảng Categories
SET IDENTITY_INSERT [dbo].[Categories] ON;
INSERT INTO [dbo].[Categories] ([Id], [Name], [Description]) VALUES 
(1, N'Tin Công Nghệ', N'Cập nhật xu hướng AI, IoT và lập trình.'),
(2, N'Đời sống du lịch', N'Kinh nghiệm phượt và các điểm đến hấp dẫn.'),
(3, N'Sức khỏe Thể thao', N'Các bài tập và chế độ ăn uống lành mạnh.'),
(4, N'Giáo dục Kỹ năng', N'Phương pháp học tập và kỹ năng mềm .');
SET IDENTITY_INSERT [dbo].[Categories] OFF;

-- Ảnh 2: Dữ liệu bảng CategoriesProducts
SET IDENTITY_INSERT [dbo].[CategoriesProducts] ON;
INSERT INTO [dbo].[CategoriesProducts] ([Id], [Name], [Description]) VALUES 
(1, N'Điện tử', N'Sản phẩm công nghệ, thiết bị điện tử'),
(2, N'Thời trang', N'Quần áo, phụ kiện thời trang'),
(3, N'Gia dụng', N'Sản phẩm dùng trong gia đình');
SET IDENTITY_INSERT [dbo].[CategoriesProducts] OFF;

-- Ảnh 3: Dữ liệu bảng Customers
SET IDENTITY_INSERT [dbo].[Customers] ON;
INSERT INTO [dbo].[Customers] ([Id], [FullName], [Email], [Phone], [Address], [Password]) VALUES 
(1, N'Nguyễn Văn An', N'an.nguyen@gmail.com', N'0912345678', N'123 Nguyễn Trãi, Quận 5, TP.HCM', N'password123'),
(2, N'Trần Thị Bình', N'binh.tran@yahoo.com', N'0987654321', N'456 Lê Lợi, Quận 1, TP.HCM', N'password123'),
(3, N'Lê Hoàng Cường', N'cuong.le@hotmail.com', N'0909090909', N'789 Cách Mạng Tháng 8, Quận 10, TP.HCM', N'password123');
SET IDENTITY_INSERT [dbo].[Customers] OFF;

-- Ảnh 4: Dữ liệu bảng Posts
SET IDENTITY_INSERT [dbo].[Posts] ON;
INSERT INTO [dbo].[Posts] ([Id], [Title], [Content], [ImageUrl], [CreatedDate], [CategoryId]) VALUES 
(1, N'Lộ trình học ASP.NET', N'Hướng dẫn chi tiết cho người mới bắt đầu...', N'https://bizweb.dktcdn.net/thumb/large/100/472/304/pro...', '2026-04-01 00:00:00', 1),
(2, N'Top 5 bãi biển đẹp', N'Những địa điểm không thể bỏ qua mùa hè này...', N'https://bizweb.dktcdn.net/thumb/large/100/472/304/pro...', '2026-04-02 00:00:00', 3),
(3, N'Chạy bộ đúng cách', N'Lợi ích tuyệt vời của việc chạy bộ mỗi sáng...', N'https://bizweb.dktcdn.net/thumb/large/100/472/304/pro...', '2026-04-03 00:00:00', 3),
(4, N'AI và tương lai', N'Trí tuệ nhân tạo đang thay đổi cuộc sống...', N'https://bizweb.dktcdn.net/thumb/large/100/472/304/pro...', '2026-04-04 00:00:00', 1),
(5, N'Kỹ năng Teamwork', N'Cách phối hợp hiệu quả trong nhóm đồ án...', N'https://bizweb.dktcdn.net/thumb/large/100/472/304/pro...', '2026-04-05 00:00:00', 4),
(6, N'Xu Hướng Phát Triển Web App Với ASP.NET Core & N...', N'<p>Trong năm 2026, sự kết hợp giữa hiệu năng mạ...', N'https://images.unsplash.com/photo-1555066931-436...', '2026-05-22 00:00:00', 1);
SET IDENTITY_INSERT [dbo].[Posts] OFF;

-- Ảnh 6 (Mới thêm): Dữ liệu bảng Products
SET IDENTITY_INSERT [dbo].[Products] ON;
INSERT INTO [dbo].[Products] ([Id], [Name], [Description], [Price], [StockQuantity], [ImageUrl], [CategoryProductId]) VALUES 
(8, N'Laptop Dell', N'Laptop văn phòng', 15000000.00, 10, N'/img/laptop.jpg', 1),
(9, N'Bàn phím cơ', N'Bàn phím gaming', 800000.00, 20, N'/img/keyboard.jpg', 2);
SET IDENTITY_INSERT [dbo].[Products] OFF;

-- Ảnh 5: Dữ liệu bảng Users
SET IDENTITY_INSERT [dbo].[Users] ON;
INSERT INTO [dbo].[Users] ([Id], [Username], [PasswordHash], [FullName], [Role]) VALUES 
(1, N'admin', N'123456', N'Quản trị viên hệ thống', N'Admin'),
(2, N'thai_gv', N'thai1969', N'Nguyễn Cao Thắng', N'Editor'),
(3, N'sv_01', N'student1', N'Nguyễn Văn A', N'User'),
(4, N'sv_02', N'student2', N'Trần Thị B', N'User'),
(5, N'moderator', N'mod789', N'Lê Văn C', N'Moderator');
SET IDENTITY_INSERT [dbo].[Users] OFF;
