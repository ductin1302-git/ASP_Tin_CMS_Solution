# 🏆 V-SPORT E-Commerce & CMS Platform

**V-SPORT** là hệ thống quản trị nội dung (CMS) và nền tảng thương mại điện tử chuyên cung cấp các sản phẩm thể thao (giày, quần áo, phụ kiện). Hệ thống được thiết kế theo kiến trúc 3 lớp (3-Tier Architecture) đảm bảo hiệu suất cao, mở rộng dễ dàng và chuẩn RESTful API.

---

## 🏗️ Kiến trúc dự án (Architecture)

Dự án được phân tách thành các Layer rõ ràng để tối ưu hóa việc quản lý mã nguồn:

1. **`CMS.Data`**: Lớp truy cập cơ sở dữ liệu (Data Access Layer). Chứa các Entity Models, DB Set và cấu hình kết nối sử dụng Entity Framework Core.
2. **`CMS.Backend`**: Lớp xử lý nghiệp vụ & API (Business & API Layer). Xây dựng trên nền tảng ASP.NET Core 8 Web API. Chịu trách nhiệm cung cấp dữ liệu qua API cho Frontend và hệ thống Admin (MVC/Razor Pages).
3. **`cms.frontend`**: Lớp giao diện người dùng (Presentation Layer). Sử dụng thư viện ReactJS, tương tác trực tiếp với Backend API để hiển thị giao diện mua sắm cho khách hàng.

---

## 🚀 Công nghệ sử dụng (Tech Stack)

### ⚙️ Backend
- **Framework**: .NET 8, ASP.NET Core Web API & MVC
- **Database**: SQL Server
- **ORM**: Entity Framework Core
- **Authentication**: JWT (JSON Web Tokens) & BCrypt Password Hashing
- **API Documentation**: Swagger (Swashbuckle) với chuẩn Open API
- **Gửi Email**: Tích hợp SMTP (Gửi thư hóa đơn tự động)

### 💻 Frontend
- **Library**: ReactJS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (tùy biến giao diện hiện đại, responsive, hiệu ứng mượt mà)
- **Tích hợp API**: fetch() / REST API

---

## 🌟 Chức năng nổi bật (Features)

### 🛒 Dành cho Khách hàng (Storefront)
- **Duyệt sản phẩm**: Khám phá các danh mục thời trang, thiết bị thể thao hiện đại.
- **Tìm kiếm & Lọc**: Hệ thống lọc nâng cao theo danh mục, khoảng giá, và từ khóa tìm kiếm.
- **Giỏ hàng & Thanh toán**: Trải nghiệm đặt hàng dễ dàng, hệ thống lưu vết thông tin thanh toán.
- **Quản lý Tài khoản**: Đăng ký, đăng nhập an toàn, cập nhật thông tin cá nhân và tải lên hình đại diện (Avatar).
- **Theo dõi Đơn hàng**: Xem lịch sử mua hàng, chi tiết đơn hàng và trạng thái đơn hàng.
- **Tin tức & Blog**: Cập nhật những bài viết mới nhất về thể thao.
- **Hỗ trợ & Liên hệ**: Gửi thông tin trực tiếp qua Form liên hệ cho đội ngũ CSKH.

### 🛡️ Dành cho Quản trị viên (Admin Panel)
- **Dashboard**: Thống kê thông số tổng quan hệ thống.
- **Quản lý Sản phẩm & Danh mục**: Thêm mới, chỉnh sửa, xóa mềm (Soft Delete) và quản lý tồn kho sản phẩm.
- **Quản lý Đơn hàng**:
  - Xét duyệt đơn hàng, thay đổi trạng thái (Chờ duyệt -> Đang giao -> Đã hoàn thành).
  - Khả năng **Hủy đơn hàng** trực tiếp trên hệ thống.
  - Tự động hoàn trả tồn kho sản phẩm khi xóa/hủy đơn.
- **Quản lý Người dùng (Khách hàng)**: Xem, chỉnh sửa, kiểm soát danh sách khách hàng.
- **Quản lý Bài viết & Liên hệ**: Đăng tin tức mới và phản hồi khách hàng.
- **Gửi Email Tự động**: Tự động gửi Email hóa đơn bán hàng cho khách hàng khi tạo đơn hàng thành công.

---

## 🛠️ Hướng dẫn cài đặt & Khởi chạy

### 1️⃣ Cấu hình Database (SQL Server)
1. Mở file `CMS.Backend/appsettings.json`.
2. Chỉnh sửa chuỗi kết nối `DefaultConnection` phù hợp với máy chủ SQL Server của bạn.
3. Chạy lệnh cập nhật cơ sở dữ liệu `Update-Database` (Package Manager Console) hoặc chạy script SQL để import dữ liệu.

### 2️⃣ Khởi chạy Backend (ASP.NET Core API)
- **Cách 1 (Sử dụng Visual Studio)**: 
  - Mở file Solution `TinCMS_Solution.sln`.
  - Đặt `CMS.Backend` làm Startup Project và nhấn **F5**.
- **Cách 2 (Sử dụng .NET CLI)**:
  - Mở Terminal, di chuyển vào thư mục `CMS.Backend`:
    ```bash
    cd CMS.Backend
    dotnet run --launch-profile "https"
    ```
- *Truy cập Swagger API Documentation tại: `https://localhost:7003/swagger`*

### 3️⃣ Khởi chạy Frontend (ReactJS)
- Mở Terminal mới, di chuyển vào thư mục Frontend:
  ```bash
  cd cms.frontend
  ```
- Cài đặt các gói phụ thuộc (chỉ cần chạy lần đầu):
  ```bash
  npm install
  ```
- Khởi chạy môi trường phát triển:
  ```bash
  npm start
  ```
- *Trang web sẽ tự động mở tại: `http://localhost:3000`*

---

## 📧 Thông tin cấu hình Email SMTP
Hệ thống sử dụng SMTP để tự động gửi thông báo hóa đơn tới khách hàng:
- **Tên người gửi**: V-SPORT
- **Cấu hình**: Chỉnh sửa cấu hình tài khoản Email của bạn tại mục `EmailSettings` trong file `appsettings.json`.

---
*Phát triển bởi TinCMS.*
