import os

html_content = '''<html>
<head>
<meta charset="utf-8">
<style>
    body { font-family: 'Times New Roman', Times, serif; font-size: 14pt; line-height: 1.5; margin: 1in; }
    h1 { text-align: center; font-size: 20pt; font-weight: bold; }
    h2 { font-size: 18pt; font-weight: bold; margin-top: 20px; }
    h3 { font-size: 16pt; font-weight: bold; margin-top: 15px; }
    h4 { font-size: 14pt; font-weight: bold; font-style: italic; }
    p { text-align: justify; }
    .toc { margin-bottom: 30px; }
</style>
</head>
<body>

<h1>BÁO CÁO ĐỒ ÁN MÔN HỌC</h1>
<h1 style="color:blue;">ĐỀ TÀI: XÂY DỰNG HỆ THỐNG V-SPORT E-COMMERCE & CMS</h1>

<div style="page-break-after: always;"></div>

<h2>MỤC LỤC</h2>
<div class="toc">
<p>CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ CƠ SỞ LÝ THUYẾT</p>
<p>CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG</p>
<p>CHƯƠNG 3: TRIỂN KHAI PHẦN BACKEND (C# ASP.NET CORE WEB API)</p>
<p>CHƯƠNG 4: TRIỂN KHAI PHẦN FRONTEND (REACTJS CLIENT SITE)</p>
<p>CHƯƠNG 5: KIỂM THỬ VÀ ĐÁNH GIÁ KẾ THÚC ĐỒ ÁN</p>
<p>CHƯƠNG 6: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN NÂNG CẤP</p>
</div>

<div style="page-break-after: always;"></div>

<h2>CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ CƠ SỞ LÝ THUYẾT</h2>
<h3>1.1. Lý do chọn đề tài (Bối cảnh chuyển đổi số và thương mại điện tử)</h3>
<p>Trong thời đại kỷ nguyên số, việc ứng dụng công nghệ thông tin vào hoạt động kinh doanh đã trở thành yêu cầu thiết yếu đối với mọi doanh nghiệp. Thương mại điện tử đang phát triển mạnh mẽ và dần thay thế các hình thức mua bán truyền thống. V-SPORT là một hệ thống phần mềm toàn diện bao gồm nền tảng Thương mại điện tử (E-Commerce) và Hệ thống quản trị nội dung (CMS) chuyên biệt dành riêng cho các cửa hàng kinh doanh thời trang và dụng cụ thể thao, mang lại trải nghiệm mua sắm mượt mà cho khách hàng và cung cấp bộ công cụ quản lý bán hàng mạnh mẽ.</p>

<h3>1.2. Mục tiêu của đồ án</h3>
<p>Đồ án nhằm mục đích số hóa toàn bộ quy trình bán hàng, từ việc trưng bày sản phẩm trực tuyến đến khi giao hàng thành công. Ngoài ra, hệ thống tự động hóa quá trình vận hành như tự động trừ kho khi có đơn hàng, gửi email hóa đơn tự động. Đồ án xây dựng trên nền tảng .NET 8 và ReactJS mang lại bảo mật cao, hiệu suất lớn.</p>

<h3>1.3. Đối tượng và phạm vi nghiên cứu</h3>
<p>Đối tượng nghiên cứu: Các công nghệ lập trình web hiện đại (ASP.NET Core, ReactJS, SQL Server).<br>Phạm vi nghiên cứu: Xây dựng hệ thống website thương mại điện tử chuyên cung cấp các sản phẩm thể thao và trang quản trị nội dung CMS đi kèm để quản lý cửa hàng trực tuyến.</p>

<h3>1.4. Công nghệ áp dụng trong hệ thống</h3>
<h4>1.4.1. Tổng quan về nền tảng .NET Core và C#</h4>
<p>Sử dụng .NET 8.0 với mô hình ASP.NET Core Web API cung cấp khả năng phát triển nhanh, an toàn, hỗ trợ dependency injection, hiệu suất vượt trội và có thể chạy đa nền tảng.</p>
<h4>1.4.2. Thư viện ReactJS và kiến trúc ứng dụng một trang (SPA)</h4>
<p>ReactJS v18 được dùng cho lớp Frontend để xây dựng Single Page Application (SPA), giúp trang web tải nhanh không cần load lại trang. Kết hợp React Router DOM v6 để điều hướng linh hoạt.</p>
<h4>1.4.3. Hệ quản trị cơ sở dữ liệu SQL Server và Entity Framework Core</h4>
<p>Sử dụng Microsoft SQL Server để lưu trữ dữ liệu bền vững, áp dụng Entity Framework Core với phương pháp Code-First giúp sinh tự động CSDL từ các Model Class (Products, Orders, Users, Categories...).</p>
<h4>1.4.4. Kiến trúc Web API (RESTful API) và giao thức truyền tải JSON</h4>
<p>Backend cung cấp các điểm cuối RESTful API để trao đổi dữ liệu qua định dạng JSON. API được bảo mật bằng JWT và xác thực người dùng chặt chẽ.</p>

<h2>CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG</h2>
<h3>2.1. Phân tích yêu cầu chức năng (Luồng nghiệp vụ mua hàng và quản trị)</h3>
<p>Hệ thống chia làm hai phần: Dành cho khách hàng (xem sản phẩm, tìm kiếm, lọc, giỏ hàng, thanh toán, theo dõi đơn) và dành cho quản trị viên (quản lý sản phẩm, đơn hàng, cập nhật trạng thái đơn, quản lý bài viết, danh mục, liên hệ).</p>
<h3>2.2. Sơ đồ thực thể mối quan hệ (ERD) cho hệ thống 8 thực thể</h3>
<h4>2.2.1. Danh mục các thực thể chính</h4>
<p>Hệ thống bao gồm các thực thể chính: Products, Categories, Users, Orders, OrderDetails, Posts, Contacts.</p>
<h4>2.2.2. Sơ đồ quan hệ thực thể (ERD Diagram)</h4>
<p>Các thực thể có quan hệ mật thiết: Product thuộc về Category, Order chứa nhiều OrderDetail, mỗi OrderDetail trỏ đến Product. User tạo Order.</p>
<h4>2.2.3. Quy tắc ràng buộc quan hệ</h4>
<p>Ràng buộc khóa ngoại được thiết lập chặt chẽ đảm bảo tính toàn vẹn dữ liệu. Khi xóa một Category, các Product liên quan có thể được quản lý bằng cơ chế cascade hoặc giữ lại.</p>

<h3>2.3. Chi tiết thiết kế cơ sở dữ liệu (Database Schema)</h3>
<h4>2.3.1. Phân hệ nội dung tin tức (Category, Post)</h4>
<p>Các bảng quản lý tin tức thể thao, bài viết, giúp cửa hàng làm SEO và marketing tự nhiên.</p>
<h4>2.3.2. Phân hệ bán hàng E-Commerce (CategoryProduct, Product)</h4>
<p>Lưu trữ thông tin chi tiết sản phẩm, giá bán, tồn kho, hình ảnh đại diện, danh mục phân loại.</p>
<h4>2.3.3. Phân hệ khách hàng và đơn hàng (Customer, Order, OrderDetail)</h4>
<p>Ghi nhận thông tin người đặt, trạng thái đơn (Pending, Processing, Shipped), tổng tiền, chi tiết từng món hàng.</p>
<h4>2.3.4. Phân hệ tài khoản quản trị và phân quyền (User)</h4>
<p>Phân quyền Role-based: Admin, Editor, Customer để hạn chế quyền truy cập các API nhạy cảm.</p>

<h3>2.4. Thiết kế danh mục Web API giữa Backend và Frontend</h3>
<p>Một số API chính: GET /api/Products (Lọc, phân trang), POST /api/Orders (Tạo đơn), POST /api/Auth/Login (Đăng nhập).</p>

<h2>CHƯƠNG 3: TRIỂN KHAI PHẦN BACKEND (C# ASP.NET CORE WEB API)</h2>
<h3>3.1. Cấu trúc Solution và phân tách các tầng kiến trúc</h3>
<p>Dự án chia làm CMS.Data (Data Access Layer - Entity Framework) và CMS.Backend (Business Logic Layer - Controllers). Đảm bảo tính mở rộng và dễ bảo trì.</p>
<h3>3.2. Khởi tạo Cơ sở dữ liệu và Migration dữ liệu mẫu (Seed Data)</h3>
<p>Sử dụng Code-First Migration và script Insert Data mẫu để ngay lập tức có dữ liệu chạy thử.</p>
<h3>3.3. Xây dựng các Controllers xử lý API dữ liệu (GET/POST/PUT)</h3>
<p>Thiết kế controller chuẩn REST, xử lý các Request từ frontend và trả về kết quả chuẩn hóa dạng JSON.</p>
<h3>3.4. Triển khai phân hệ bảo mật, mã hóa mật khẩu và phân quyền (Authentication & Authorization)</h3>
<p>Mật khẩu được băm (hash) bằng BCrypt. Sử dụng JWT token để xác thực, kiểm tra role (Admin/User) trước khi cho phép gọi API.</p>
<h3>3.5. Tích hợp công cụ soạn thảo Rich Text (CKEditor) và cơ chế Upload ảnh vật lý</h3>
<p>API cho phép nhận ảnh qua multipart/form-data, lưu vật lý vào thư mục wwwroot và trả về đường dẫn tĩnh cho frontend.</p>
<h3>3.6. Cấu hình chính sách chia sẻ tài nguyên nguồn gốc chéo (CORS) cho ReactJS</h3>
<p>Cấu hình AllowAnyOrigin, AllowAnyMethod để ReactJS ở port 3000 có thể truy cập API ở port 7003 một cách hợp lệ.</p>
<h3>3.7. Hoàn chỉnh phần quản trị Backend đầy đủ chức năng dành cho nhân viên của cửa hàng</h3>
<p>Phần mềm bao gồm giao diện Admin giúp nhân viên quản lý đơn hàng, thêm bớt sản phẩm, xử lý liên hệ người dùng.</p>
<h3>3.8. Tài liệu hóa hệ thống API bằng Swagger UI</h3>
<p>Tích hợp Swashbuckle, tự động sinh giao diện Swagger tại /swagger để kiểm thử API trực quan.</p>

<h2>CHƯƠNG 4: TRIỂN KHAI PHẦN FRONTEND (REACTJS CLIENT SITE)</h2>
<h3>4.1. Khởi tạo cấu trúc dự án ReactJS và tích hợp React Router DOM</h3>
<p>Cấu trúc thư mục theo Component-based. Sử dụng React Router v6 để chia trang và điều hướng nội dung.</p>
<h3>4.2. Cấu hình trục HTTP Client chung (axiosClient.js / fetch) và xử lý dữ liệu JSON</h3>
<p>Tạo Interceptor tự động gắn JWT Token vào header Authorization (Bearer token) khi gọi API.</p>
<h3>4.3. Xây dựng giao diện các tầng bóc tách cho Trang chủ (Home.jsx)</h3>
<p>Giao diện hiện đại, CSS custom variables. Banner carousel tự chạy, giới thiệu sản phẩm mới và nổi bật.</p>
<h3>4.4. Triển khai Trang cửa hàng (Shop.jsx) tích hợp bộ lọc nâng cao</h3>
<p>Bộ lọc danh mục, lọc khoảng giá, tìm kiếm từ khóa thời gian thực, cập nhật danh sách hiển thị theo điều kiện API truyền xuống.</p>
<h3>4.5. Triển khai Trang chi tiết sản phẩm (ProductDetail.jsx) và cơ chế hiển thị nội dung dạng HTML</h3>
<p>Hiển thị ảnh sản phẩm lớn, thông tin giá, nút thêm vào giỏ. Render an toàn nội dung HTML mô tả được trả về từ CSDL.</p>
<h3>4.6. Xây dựng luồng về khách hàng (đăng ký, đăng nhập, đơn hàng)</h3>
<p>Giao diện form đăng ký, đăng nhập, sử dụng Toast notification để báo lỗi hoặc thành công. Quản lý thông tin tài khoản.</p>
<h3>4.7. Xây dựng luồng xử lý Giỏ hàng (Cart.jsx) và Biểu mẫu thanh toán đặt đơn hàng (Checkout.jsx)</h3>
<p>Lưu trữ trạng thái giỏ hàng. Màn hình thanh toán điền địa chỉ, số điện thoại, sau đó Submit đơn lên API tạo Order mới.</p>

<h2>CHƯƠNG 5: KIỂM THỬ VÀ ĐÁNH GIÁ KẾ THÚC ĐỒ ÁN</h2>
<h3>5.1. Kiểm thử chức năng phân quyền bảo mật vùng Admin</h3>
<p>Tài khoản không phải Admin không thể truy cập giao diện hoặc gọi API quản trị. Token hết hạn sẽ bị điều hướng về login.</p>
<h3>5.2. Kiểm thử luồng nghiệp vụ mua sắm và bắt lỗi logic tồn kho</h3>
<p>Sản phẩm hết số lượng sẽ bị đánh dấu hết hàng (Out of Stock), không cho phép đặt thêm. Khi mua thành công kho tự giảm.</p>
<h3>5.3. Kiểm thử hiệu năng đồng bộ thời gian thực ngầm</h3>
<p>Chức năng tải dữ liệu cực nhanh qua Network Tab, kiểm tra các Response Time dưới 200ms bằng công cụ của trình duyệt và Swagger.</p>
<h3>5.4. Đánh giá ưu điểm và nhược điểm của giải pháp thiết kế</h3>
<p>Ưu điểm: Kiến trúc phân tán, giao diện tải nhanh, bảo mật cao. Nhược điểm: Chưa tích hợp cổng thanh toán online thật sự.</p>

<h2>CHƯƠNG 6: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN NÂNG CẤP</h2>
<h3>6.1. Kết quả đạt được của đồ án đối với sinh viên</h3>
<p>Hiểu sâu về mô hình 3-layer, thiết kế Database, nắm vững ASP.NET Web API và ReactJS. Áp dụng thành công vào một dự án có tính thực tiễn cao.</p>
<h3>6.2. Hướng phát triển nâng cấp hệ thống trong tương lai</h3>
<p>Dự kiến tích hợp cổng thanh toán VNPay/Momo. Áp dụng AI phân tích lịch sử mua hàng để gợi ý sản phẩm phù hợp cho người dùng (Recommendation System).</p>

</body>
</html>'''

with open(r'D:\BaoCao_DoAn_TinCMS.doc', 'w', encoding='utf-8') as f:
    f.write(html_content)

print('Successfully generated the Word document at D:\BaoCao_DoAn_TinCMS.doc')
