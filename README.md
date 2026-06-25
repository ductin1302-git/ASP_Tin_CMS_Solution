# TinCMS_Solution

Dự án Hệ thống quản trị nội dung (CMS) và Website bán hàng thể thao V-SPORT.

## Cấu trúc dự án (3 Layer)
- `CMS.Data`: Lớp truy cập cơ sở dữ liệu (Entity Framework Core).
- `CMS.Backend`: Lớp Web API (ASP.NET Core).
- `cms.frontend`: Lớp giao diện người dùng (ReactJS).

## Hướng dẫn chạy dự án

### 1. Chạy Backend (ASP.NET Core API)
- Mở file Solution `TinCMS_Solution.sln` bằng Visual Studio.
- Đặt dự án `CMS.Backend` làm Startup Project.
- Nhấn phím **F5** (hoặc nút Start) để chạy dự án ở chế độ Debug. Backend sẽ tự động mở trang Swagger UI để bạn có thể kiểm tra API.

### 2. Chạy Frontend (ReactJS)
- Mở terminal/command prompt và di chuyển vào thư mục `cms.frontend`:
  ```bash
  cd cms.frontend
  ```
- Cài đặt thư viện (nếu chạy lần đầu):
  ```bash
  npm install
  ```
- Khởi động ứng dụng React:
  ```bash
  npm start
  ```
- Frontend sẽ chạy tại địa chỉ `http://localhost:3000`.
