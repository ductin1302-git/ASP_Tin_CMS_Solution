# 🏆 V-SPORT E-Commerce & Content Management System (CMS)

**V-SPORT** là một hệ thống phần mềm toàn diện bao gồm nền tảng Thương mại điện tử (E-Commerce) và Hệ thống quản trị nội dung (CMS) chuyên biệt dành riêng cho các cửa hàng kinh doanh thời trang và dụng cụ thể thao. Dự án được xây dựng với mục tiêu mang lại trải nghiệm mua sắm mượt mà cho khách hàng và cung cấp bộ công cụ quản lý bán hàng mạnh mẽ, tự động hóa cao cho người quản trị.

---

## 🎯 Mục tiêu và Tầm nhìn
Dự án V-SPORT được định hướng trở thành giải pháp cốt lõi cho các chuỗi cửa hàng thể thao, giúp:
- **Số hóa toàn bộ quy trình bán hàng**: Từ việc trưng bày sản phẩm trực tuyến đến khi giao hàng thành công.
- **Tự động hóa vận hành**: Hệ thống tự động trừ kho khi có đơn, tự động gửi Email hóa đơn, giúp tiết kiệm tối đa thời gian.
- **Bảo mật và Hiệu suất**: Sử dụng công nghệ hiện đại nhất của Microsoft (.NET 8) và ReactJS để đảm bảo tính an toàn dữ liệu và khả năng chịu tải cao.

---

## 🏗️ Kiến trúc Hệ thống (3-Tier Architecture)

Dự án áp dụng chặt chẽ kiến trúc 3 lớp (3-Tier), giúp chia nhỏ và module hóa từng thành phần, đảm bảo tính bảo trì (maintainability) và dễ dàng mở rộng (scalability) trong tương lai.

### 1. `CMS.Data` (Lớp Truy cập Dữ liệu - Data Access Layer)
Đóng vai trò là cầu nối tương tác với cơ sở dữ liệu SQL Server.
- **Entity Framework Core**: Sử dụng phương pháp Code-First. Cơ sở dữ liệu được sinh ra tự động dựa trên các Model Classes.
- **Models/Entities**: Bao gồm `Products`, `Orders`, `OrderDetails`, `Users`, `Categories`, `Contacts`, `Posts`, v.v.
- **Migrations**: Theo dõi lịch sử thay đổi cấu trúc bảng, dễ dàng rollback hoặc deploy sang máy chủ mới.

### 2. `CMS.Backend` (Lớp Nghiệp vụ & Web API - Business Logic Layer)
Là "bộ não" xử lý toàn bộ logic nghiệp vụ của hệ thống.
- **RESTful API**: Cung cấp hàng loạt các điểm cuối (Endpoints) cho Frontend ReactJS gọi tới để lấy hoặc thao tác dữ liệu.
- **Controllers**: Quản lý API routing cho Sản phẩm, Đơn hàng, Xác thực người dùng, v.v.
- **Admin MVC Panel**: Giao diện quản trị viên sử dụng Razor Pages kết hợp Bootstrap 5 để thao tác quản lý dữ liệu trực tiếp, nhanh chóng.
- **Bảo mật**: Áp dụng JWT (JSON Web Token) trong việc phân quyền truy cập (Admin vs User), mã hóa mật khẩu bằng BCrypt, chống tấn công XSS/CSRF.
- **Dịch vụ Email (SMTP)**: Tích hợp thư viện gửi thư điện tử tự động khi khách hàng hoàn tất mua hàng.

### 3. `cms.frontend` (Lớp Giao diện Khách hàng - Presentation Layer)
Là bộ mặt của dự án, nơi khách hàng tương tác trực tiếp.
- **ReactJS**: Xây dựng dưới dạng Single Page Application (SPA), giúp trang web tải cực nhanh không cần load lại trang.
- **React Router DOM v6**: Điều hướng trang mượt mà (Trang chủ, Sản phẩm, Giỏ hàng, Thanh toán, Liên hệ...).
- **Giao diện hiện đại**: Sử dụng CSS thuần với các biến CSS (CSS Variables) để dễ dàng tùy biến giao diện. Các hiệu ứng hover, transition, glow effect được trau chuốt tỉ mỉ.

---

## 🚀 Công nghệ và Thư viện sử dụng (Tech Stack Details)

### ⚙️ Backend (ASP.NET Core 8)
- **Framework Core**: `.NET 8.0`, `ASP.NET Core Web API`, `ASP.NET Core MVC`.
- **Database**: `Microsoft SQL Server`.
- **ORM & Data Access**: `Microsoft.EntityFrameworkCore`, `Microsoft.EntityFrameworkCore.SqlServer`, `Microsoft.EntityFrameworkCore.Tools`.
- **Authentication**: `Microsoft.AspNetCore.Authentication.JwtBearer`, `BCrypt.Net-Next`.
- **Tài liệu API**: `Swashbuckle.AspNetCore` (Swagger UI).
- **Tiện ích**: Khôi phục ảnh (File I/O), Gửi Email (`System.Net.Mail`).

### 💻 Frontend (ReactJS)
- **Core**: `React 18`, `ReactDOM`.
- **Routing**: `react-router-dom`.
- **UI Components & Icons**: `lucide-react` (Bộ icon SVG siêu nhẹ, hiện đại).
- **Thông báo (Toast)**: `react-toastify` (Hiển thị popup thông báo thành công/lỗi).
- **Trình soạn thảo văn bản**: `CKEditor` (Dùng cho phần nhập nội dung liên hệ hoặc bài viết).
- **HTTP Client**: Sử dụng `fetch` API gốc được cấu hình tích hợp JWT Token tự động qua Interceptor.

---

## 🌟 Chức năng chi tiết (Comprehensive Features)

### 🛒 1. Tính năng dành cho Khách hàng (User Features)
- **Hệ thống Tài khoản**: Đăng ký, Đăng nhập, Thay đổi mật khẩu, Cập nhật thông tin cá nhân và thay Avatar động.
- **Catalog Sản phẩm**: Hiển thị danh sách sản phẩm với thẻ Tag (Mới, Nổi bật, Hết hàng).
- **Bộ lọc đa chiều (Advanced Filtering)**: Lọc theo danh mục (Giày, Quần áo...), tìm kiếm theo từ khóa (Tên sản phẩm), lọc theo khoảng giá, phân trang.
- **Giỏ hàng (Shopping Cart)**: Thêm/sửa/xóa sản phẩm khỏi giỏ hàng. Tính toán tổng tiền realtime. Trạng thái giỏ hàng được đồng bộ.
- **Quy trình Thanh toán (Checkout)**: Nhập thông tin giao hàng, hiển thị hóa đơn tạm tính, xác nhận thanh toán (hỗ trợ chuyển khoản/COD).
- **Theo dõi Đơn hàng**: Xem danh sách các đơn hàng đã mua, chi tiết từng món hàng, trạng thái hiện tại (Đang xử lý, Đang giao, Đã hoàn thành).
- **Giao diện tương tác**: Hiệu ứng mượt mà, Banner Carousel tự động trượt, tương thích hoàn toàn trên điện thoại (Responsive Design).

### 🛡️ 2. Tính năng dành cho Quản trị viên (Admin Panel Features)
- **Trang Tổng quan (Dashboard)**: Báo cáo nhanh số lượng sản phẩm, doanh thu, tổng số đơn hàng, khách hàng mới.
- **Quản lý Sản phẩm (Products Management)**:
  - Thêm, sửa, xóa sản phẩm kèm hình ảnh minh họa.
  - Quản lý danh mục (Category).
  - Quản lý kho: Nhập số lượng tồn kho, tự động cập nhật khi khách hàng đặt mua thành công.
  - Xóa mềm (Soft Delete): Đưa sản phẩm vào thùng rác thay vì xóa vĩnh viễn, có thể khôi phục.
- **Quản lý Đơn hàng (Orders Management)**:
  - Danh sách đơn hàng thời gian thực.
  - Cập nhật trạng thái linh hoạt (Pending -> Processing -> Shipped -> Delivered).
  - Tính năng **Hủy đơn hàng**: Khi khách hoặc admin hủy đơn, hệ thống sẽ tự động hoàn trả số lượng vào Tồn kho (Restock).
- **Tự động hóa Email**: Ngay sau khi đơn hàng được ghi nhận, hệ thống gửi một Email HTML tuyệt đẹp chứa chi tiết hóa đơn (mã sản phẩm, giá tiền, địa chỉ giao hàng) đến hộp thư của khách hàng.
- **Quản lý Liên hệ (Contacts)**: Nhận và xem các phản hồi/thắc mắc từ trang "Liên hệ" của khách hàng.
- **Quản lý Bài viết (Blog/Posts)**: Soạn thảo tin tức, cẩm nang thể thao bằng trình soạn thảo văn bản giàu định dạng (Rich Text Editor).
- **Bảo mật hệ thống**: Chỉ tài khoản có Role "Admin" hoặc "Editor" mới được phép đăng nhập và thao tác trong Admin Panel.

---

## 🛠️ Hướng dẫn cài đặt & Triển khai cục bộ (Local Setup Guide)

Dưới đây là các bước chi tiết để chạy dự án trên máy tính cá nhân của bạn.

### Yêu cầu tiên quyết (Prerequisites)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (Có cài đặt work load ASP.NET & web development).
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).
- [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản 18 LTS trở lên) và npm.
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express hoặc Developer) và SQL Server Management Studio (SSMS).

### Bước 1: Thiết lập Cơ sở dữ liệu (Database Setup)
1. Mở file `CMS.Backend/appsettings.json`.
2. Tìm đến mục `"ConnectionStrings" -> "DefaultConnection"`.
3. Sửa lại chuỗi kết nối (ví dụ: `Server=.\\SQLEXPRESS;Database=Tin_CMS;Trusted_Connection=True;...`) sao cho khớp với tên Server SQL của bạn.
4. (Tùy chọn) Mở **Package Manager Console** trong Visual Studio (chọn Default project là `CMS.Data`) và chạy lệnh:
   ```powershell
   Update-Database
   ```
   *Lệnh này sẽ tự động tạo cấu trúc bảng.*

### Bước 2: Cấu hình Dịch vụ Email (Tùy chọn)
Để tính năng gửi Email tự động hoạt động, cấu hình phần `EmailSettings` trong `CMS.Backend/appsettings.json`:
```json
"EmailSettings": {
  "SmtpServer": "smtp.gmail.com",
  "SmtpPort": 587,
  "SenderName": "V-SPORT",
  "SenderEmail": "your-email@gmail.com",
  "SenderPassword": "your-app-password" // Lưu ý: Dùng Mật khẩu ứng dụng (App Password), không dùng mật khẩu email thật.
}
```

### Bước 3: Khởi chạy Backend (ASP.NET Core)
1. Mở Solution `TinCMS_Solution.sln` bằng Visual Studio.
2. Bấm chuột phải vào Project `CMS.Backend` -> Chọn **Set as Startup Project**.
3. Bấm **F5** hoặc nút **Start (https)** để chạy nền tảng.
4. Trình duyệt sẽ mở lên trang Swagger. Tại đây bạn có thể kiểm thử toàn bộ API ở địa chỉ: `https://localhost:7003/swagger`.

### Bước 4: Khởi chạy Frontend (ReactJS)
1. Mở một cửa sổ Terminal (hoặc Command Prompt) mới.
2. Di chuyển vào thư mục giao diện React:
   ```bash
   cd cms.frontend
   ```
3. Cài đặt các thư viện cần thiết (Chỉ làm ở lần đầu tiên):
   ```bash
   npm install
   ```
4. Bắt đầu máy chủ phát triển React:
   ```bash
   npm start
   ```
5. Truy cập ứng dụng phía khách hàng tại: `http://localhost:3000`.

---

## 📚 Cấu trúc Thư mục API (API Endpoints Overview)
Mọi API đều có tiền tố `/api/` (Ví dụ: `https://localhost:7003/api/Products`).
- `GET /api/Products`: Lấy danh sách sản phẩm (Hỗ trợ phân trang `page`, `pageSize`, lọc theo `keyword`, `minPrice`, `maxPrice`, `categoryId`).
- `POST /api/Orders`: Tạo đơn hàng mới (Kèm theo danh sách chi tiết đơn hàng).
- `GET /api/Orders/Customer/{id}`: Lấy toàn bộ lịch sử đơn hàng của một khách hàng cụ thể.
- `POST /api/Auth/Login`: Nhận token đăng nhập.
- `POST /api/Auth/Register`: Đăng ký tài khoản người dùng mới.

---
*Dự án được xây dựng và phát triển với sự tâm huyết của Đội ngũ V-SPORT. Hãy góp phần lan tỏa tinh thần thể thao mạnh mẽ!*
