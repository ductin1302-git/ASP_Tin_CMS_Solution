-- Dữ liệu mẫu tiếng Việt chuẩn cho website thể thao.
-- Nếu muốn làm mới database, bỏ comment các dòng DELETE và chạy theo đúng thứ tự khóa ngoại.

-- DELETE FROM [dbo].[OrderDetails];
-- DELETE FROM [dbo].[Orders];
-- DELETE FROM [dbo].[Posts];
-- DELETE FROM [dbo].[Products];
-- DELETE FROM [dbo].[Categories];
-- DELETE FROM [dbo].[CategoriesProducts];
-- DELETE FROM [dbo].[Customers];
-- DELETE FROM [dbo].[Users];

SET IDENTITY_INSERT [dbo].[Categories] ON;
INSERT INTO [dbo].[Categories] ([Id], [Name], [Description]) VALUES
(1, N'Tin bóng đá', N'Cập nhật lịch thi đấu, kết quả, chuyển nhượng và câu chuyện bên lề sân cỏ.'),
(2, N'Tin chạy bộ', N'Kinh nghiệm chạy bộ, chọn giày, giáo án và các giải chạy phong trào.'),
(3, N'Sức khỏe thể thao', N'Kiến thức phòng tránh chấn thương, phục hồi và duy trì thể lực.'),
(4, N'Dinh dưỡng thể thao', N'Gợi ý ăn uống, bổ sung năng lượng và phục hồi sau tập luyện.'),
(5, N'Hướng dẫn tập luyện', N'Bài tập gym, yoga, bóng rổ, cầu lông và kỹ thuật tập đúng cách.');
SET IDENTITY_INSERT [dbo].[Categories] OFF;

SET IDENTITY_INSERT [dbo].[CategoriesProducts] ON;
INSERT INTO [dbo].[CategoriesProducts] ([Id], [Name], [Description]) VALUES
(1, N'Giày thể thao', N'Giày chạy bộ, giày đá bóng, giày bóng rổ và sneaker tập luyện.'),
(2, N'Trang phục thể thao', N'Áo, quần, bộ thi đấu và đồ tập thoáng khí cho nam nữ.'),
(3, N'Phụ kiện thể thao', N'Balo, bình nước, găng tay, bóng và phụ kiện hỗ trợ tập luyện.');
SET IDENTITY_INSERT [dbo].[CategoriesProducts] OFF;

SET IDENTITY_INSERT [dbo].[Customers] ON;
INSERT INTO [dbo].[Customers] ([Id], [FullName], [Email], [Phone], [Address], [Gender], [Password]) VALUES
(1, N'Khách hàng thể thao 1', N'kh1@gmail.com', N'0909123456', N'TP. Hồ Chí Minh', N'Nam', N'123456'),
(2, N'Khách hàng thể thao 2', N'kh2@gmail.com', N'0909654321', N'Hà Nội', N'Nữ', N'123456');
SET IDENTITY_INSERT [dbo].[Customers] OFF;

SET IDENTITY_INSERT [dbo].[Posts] ON;
INSERT INTO [dbo].[Posts] ([Id], [Title], [Content], [ImageUrl], [CreatedDate], [CategoryId]) VALUES
(1, N'5 nguyên tắc giúp chạy bộ bền hơn mỗi tuần', N'Chạy bộ hiệu quả không bắt đầu bằng tốc độ cao mà bằng sự đều đặn. Người mới nên tăng quãng đường từ từ, khởi động kỹ, giữ nhịp thở ổn định và dành ít nhất một ngày nghỉ để cơ thể phục hồi.', N'/img/run.jpg', '2026-06-01', 2),
(2, N'Cách chọn giày đá bóng sân cỏ nhân tạo', N'Với sân cỏ nhân tạo, đế TF là lựa chọn an toàn vì có nhiều đinh nhỏ giúp bám sân tốt và giảm trượt. Người chơi nên ưu tiên form ôm chân vừa phải, phần upper mềm và trọng lượng nhẹ.', N'/img/football-shoes.jpg', '2026-06-02', 1),
(3, N'Chạy bộ đúng cách để hạn chế chấn thương', N'Tư thế chạy nên giữ thân người thẳng tự nhiên, mắt nhìn về trước, vai thả lỏng và tiếp đất nhẹ dưới trọng tâm cơ thể. Sau buổi chạy cần giãn cơ bắp chân, đùi trước, đùi sau.', N'/img/run.jpg', '2026-06-03', 3),
(4, N'Dinh dưỡng trước và sau buổi tập gym', N'Trước buổi tập khoảng 60 đến 90 phút, bạn có thể ăn nhẹ với tinh bột dễ tiêu và một ít protein. Sau buổi tập, cơ thể cần được bù nước, bổ sung protein và carbohydrate.', N'/img/sports-nutrition.jpg', '2026-06-04', 4),
(5, N'Bài tập tại nhà giúp tăng sức bền cho người bận rộn', N'Chỉ với 20 phút mỗi ngày, bạn có thể kết hợp squat, plank, chống đẩy và jumping jack để cải thiện sức bền. Hãy tập theo vòng và tăng dần số lần lặp.', N'/img/home-workout.jpg', '2026-06-05', 5);
SET IDENTITY_INSERT [dbo].[Posts] OFF;

SET IDENTITY_INSERT [dbo].[Products] ON;
INSERT INTO [dbo].[Products] ([Id], [Name], [Description], [Price], [StockQuantity], [ImageUrl], [CategoryProductId], [SalePrice], [IsNew], [IsBestSeller], [IsPromo], [IsDeleted]) VALUES
(1, N'Giày chạy bộ Nike Air Zoom Pegasus 40', N'Giày chạy bộ đệm êm, thoáng khí, phù hợp tập luyện hằng ngày và chạy cự ly trung bình.', 3290000, 50, N'/uploads/fc314242-0f19-4e86-94ba-391a1282f9bb.jfif', 1, 2990000, 1, 1, 1, 0),
(2, N'Áo bóng đá đội tuyển Việt Nam 2026', N'Áo thi đấu chất vải thoáng mát, thấm hút mồ hôi, phù hợp đá bóng và cổ vũ thể thao.', 350000, 150, N'/uploads/950411f2-23e5-44cf-8813-39dc27248693.jpg', 2, 299000, 1, 1, 1, 0),
(3, N'Balo thể thao Adidas Classic', N'Balo rộng rãi, có ngăn đựng giày riêng và ngăn phụ kiện tập luyện.', 850000, 60, N'/uploads/7798a7a1-215a-46b1-9d02-8b1349c9dac9.webp', 3, NULL, 0, 0, 1, 0);
SET IDENTITY_INSERT [dbo].[Products] OFF;

SET IDENTITY_INSERT [dbo].[Orders] ON;
INSERT INTO [dbo].[Orders] ([Id], [OrderDate], [CustomerId], [Status], [Notes], [DeliveryAddress], [PaymentMethod], [IsPaid]) VALUES
(1, GETDATE(), 1, 1, N'Giao hàng giờ hành chính', N'TP. Hồ Chí Minh', N'COD', 0),
(2, GETDATE(), 2, 0, N'Gọi trước khi giao', N'Hà Nội', N'COD', 0);
SET IDENTITY_INSERT [dbo].[Orders] OFF;

SET IDENTITY_INSERT [dbo].[OrderDetails] ON;
INSERT INTO [dbo].[OrderDetails] ([Id], [OrderId], [ProductId], [Quantity], [UnitPrice]) VALUES
(1, 1, 1, 1, 3290000),
(2, 2, 2, 2, 350000);
SET IDENTITY_INSERT [dbo].[OrderDetails] OFF;

SET IDENTITY_INSERT [dbo].[Users] ON;
INSERT INTO [dbo].[Users] ([Id], [Username], [PasswordHash], [FullName], [Role]) VALUES
(1, N'admin', N'123456', N'Quản trị viên hệ thống', N'Admin'),
(2, N'thai_gv', N'thai1969', N'Nguyễn Cao Thái', N'Editor'),
(3, N'sv_01', N'student1', N'Nguyễn Văn An', N'User'),
(4, N'sv_02', N'student2', N'Trần Thị Bình', N'User'),
(5, N'moderator', N'mod789', N'Lê Văn Cường', N'Moderator');
SET IDENTITY_INSERT [dbo].[Users] OFF;
