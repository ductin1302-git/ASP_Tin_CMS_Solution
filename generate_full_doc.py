import os

html_content = '''<html>
<head>
<meta charset="utf-8">
<style>
    body { font-family: 'Times New Roman', Times, serif; font-size: 14pt; line-height: 1.5; margin: 1in; }
    h1 { text-align: center; font-size: 20pt; font-weight: bold; text-transform: uppercase; margin-bottom: 20px;}
    h2 { font-size: 18pt; font-weight: bold; margin-top: 30px; text-transform: uppercase;}
    h3 { font-size: 16pt; font-weight: bold; margin-top: 20px; }
    h4 { font-size: 14pt; font-weight: bold; font-style: italic; margin-top: 15px;}
    p { text-align: justify; margin-bottom: 10px; }
    .toc { margin-bottom: 30px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 10px; }
    th, td { border: 1px solid black; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    .image-caption { text-align: center; font-style: italic; margin-top: 5px; margin-bottom: 20px; font-size: 12pt;}
</style>
</head>
<body>

<h1>BÁO CÁO ĐỒ ÁN MÔN HỌC</h1>
<h1 style="color:blue;">ĐỀ TÀI: XÂY DỰNG HỆ THỐNG V-SPORT E-COMMERCE & CMS</h1>

<div style="page-break-after: always;"></div>

<h2>CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ CƠ SỞ LÝ THUYẾT</h2>
<h3>1.1. Lý do chọn đề tài (Bối cảnh chuyển đổi số và thương mại điện tử)</h3>
<p>Cuộc cách mạng công nghiệp lần thứ tư (Cách mạng 4.0) đang diễn ra mạnh mẽ trên quy mô toàn cầu, thúc đẩy sự hội tụ của các công nghệ đột phá như Trí tuệ nhân tạo (AI), Điện toán đám mây (Cloud Computing), Dữ liệu lớn (Big Data) và Internet vạn vật (IoT). Trong xu thế đó, "Chuyển đổi số" (Digital Transformation) không còn là một lựa chọn mang tính xu hướng, mà đã trở thành yếu tố sống còn quyết định sự tồn tại và phát triển của mọi doanh nghiệp. Chuyển đổi số giúp tái cấu trúc quy trình vận hành, tối ưu hóa nguồn lực nhân sự, giảm thiểu chi phí quản lý và nâng cao năng lực cạnh tranh trên thị trường. Đặc biệt, đối với ngành dịch vụ bán lẻ trang phục và dụng cụ thể thao, việc ứng dụng công nghệ số hóa vào quy trình quản lý thông tin, tương tác và chăm sóc khách hàng đang trở thành thước đo cho sự phát triển bền vững của doanh nghiệp.</p>

<h3>1.2. Mục tiêu của đồ án</h3>
<p>Mục tiêu tổng quát của đồ án là nghiên cứu, thiết kế và xây dựng hoàn chỉnh hệ thống V-SPORT – một hệ sinh thái ứng dụng Web khép kín bao gồm: Hệ quản trị nội dung BackEnd (Headless CMS) phát triển bằng ASP.NET Core Web API / MVC và Kênh tương tác mua sắm FrontEnd (Single Page Application - SPA) phát triển bằng ReactJS. Hệ thống hướng tới việc hỗ trợ chuỗi cửa hàng kinh doanh đồ thể thao tối ưu hóa quy trình truyền thông thương hiệu, quản trị nội dung số và tự động hóa quy trình tiếp nhận, xử lý đơn đặt hàng trực tuyến từ khách hàng.</p>

<h3>1.3. Đối tượng và phạm vi nghiên cứu</h3>
<p>Đề tài tập trung nghiên cứu các công nghệ phát triển Web Full-stack hiện đại bao gồm framework ASP.NET Core (Web API / MVC) ở phía máy chủ (BackEnd) kết hợp hệ quản trị cơ sở dữ liệu SQL Server, và thư viện ReactJS ở phía máy khách (FrontEnd).</p>
<p>Phạm vi thực tiễn của đồ án giới hạn trong việc xây dựng hệ thống quản lý nội dung và đặt hàng trực tuyến V-SPORT vận hành trên môi trường cục bộ (Localhost). Hệ thống tập trung giải quyết các tính năng cốt lõi bao gồm:</p>
<p>• Về phía khách hàng: Tìm kiếm sản phẩm, quản lý giỏ hàng, đặt hàng trực tuyến, đăng ký/đăng nhập thành viên, quản lý hồ sơ cá nhân, xem lịch sử đơn hàng có kèm ảnh và nhận email tự động.</p>
<p>• Về phía quản trị viên: Quản lý vòng đời dữ liệu (CRUD) của sản phẩm, danh mục, bài viết, banner quảng cáo, thực đơn giới thiệu; kiểm soát số lượng thành viên; theo dõi chi tiết đơn hàng kèm ảnh sản phẩm và duyệt nhanh trạng thái đơn hàng trực tiếp bằng thanh tùy chọn Dropdown.</p>

<h3>1.4. Công nghệ áp dụng trong hệ thống</h3>
<h4>1.4.1. Tổng quan về nền tảng .NET Core và C#</h4>
<p>• Nền tảng .NET Core: .NET Core (phiên bản .NET 8) là một nền tảng phát triển phần mềm mã nguồn mở, đa nền tảng (Cross-platform) được duy trì bởi Microsoft. Nền tảng này được thiết kế theo hướng module hóa cực kỳ nhẹ, tối ưu hóa bộ nhớ và sở hữu hiệu năng xử lý request thuộc nhóm hàng đầu thế giới (thông qua máy chủ web Kestrel tích hợp). Điểm mạnh của .NET Core là hỗ trợ mạnh mẽ cơ chế Tiêm phụ thuộc (Dependency Injection - DI) mặc định, giúp xây dựng mã nguồn dễ bảo trì và kiểm thử.</p>
<p>• Ngôn ngữ C#: C# là ngôn ngữ lập trình hướng đối tượng (OOP) mạnh mẽ, an toàn kiểu dữ liệu (Type-safe) được phát triển bởi Microsoft. Trong môi trường .NET Core, C# cung cấp cú pháp hiện đại, hỗ trợ lập trình bất đồng bộ (Asynchronous Programming) cực kỳ mạnh mẽ thông qua bộ từ khóa async / await giúp tối ưu hóa luồng xử lý và nâng cao hiệu năng chịu tải của hệ thống.</p>

<h4>1.4.2. Thư viện ReactJS và kiến trúc ứng dụng một trang (SPA)</h4>
<p>• Thư viện ReactJS: ReactJS là một thư viện mã nguồn mở chuyên dùng để xây dựng giao diện người dùng (UI) tương tác cao, thiết kế theo triết lý thành phần (Component-based architecture). Công nghệ cốt lõi giúp ReactJS vượt trội về tốc độ là Virtual DOM (DOM ảo), giúp tránh hiện tượng tải lại toàn bộ trang (Hard-reload) và đem lại trải nghiệm mượt mà.</p>
<p>• Kiến trúc ứng dụng một trang (Single Page Application - SPA): Khác với mô hình Multi Page truyền thống, SPA chỉ tải đúng một trang HTML duy nhất từ đầu. Mọi tương tác chuyển trang tiếp theo đều được xử lý cục bộ thông qua cơ chế Client-side Routing (react-router-dom). Dữ liệu được nạp động ngầm bằng cách gọi các API bất đồng bộ giúp giao diện phản hồi tức thì.</p>

<h4>1.4.3. Hệ quản trị cơ sở dữ liệu SQL Server và Entity Framework Core</h4>
<p>• SQL Server cung cấp khả năng bảo mật dữ liệu tối ưu, quản lý giao dịch an toàn nhờ tuân thủ nghiêm ngặt các thuộc tính ACID, hỗ trợ tối ưu hóa truy vấn thông qua Indexing và đảm bảo tính toàn vẹn dữ liệu.</p>
<p>• Entity Framework Core (EF Core): EF Core là một trình ánh xạ đối tượng - quan hệ (ORM) đóng vai trò cầu nối giúp các lập trình viên C# thao tác với cơ sở dữ liệu SQL Server hoàn toàn dưới dạng các đối tượng hướng đối tượng (Object Oriented). EF Core hỗ trợ mạnh mẽ cơ chế LINQ để viết truy vấn an toàn và nhanh chóng.</p>

<h4>1.4.4. Kiến trúc Web API (RESTful API) và giao thức truyền tải JSON</h4>
<p>• Kiến trúc Web API (RESTful API): Sử dụng trực tiếp các phương thức HTTP (GET, POST, PUT, DELETE) để biểu thị các hành động xử lý tài nguyên. RESTful API giúp hệ thống BackEnd hoàn toàn tách biệt với FrontEnd, tăng khả năng phục vụ cho nhiều nền tảng Client khác nhau.</p>
<p>• Giao thức truyền tải JSON: JSON là một định dạng dữ liệu văn bản siêu nhẹ, được chọn làm giao thức truyền tải dữ liệu chuẩn hóa duy nhất giữa máy khách ReactJS và máy chủ ASP.NET Core API.</p>

<h2>CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG</h2>
<h3>2.1. Phân tích yêu cầu chức năng (Luồng nghiệp vụ mua hàng và quản trị)</h3>
<p>Phân tích yêu cầu chức năng là bước then chốt nhằm xác định rõ các hành vi, quy trình xử lý dữ liệu và luồng nghiệp vụ. Hệ thống được chia làm hai phân hệ tương tác độc lập phục vụ cho Khách hàng (Customer) và Quản trị viên (Admin).</p>

<h3>2.2. Sơ đồ thực thể mối quan hệ (ERD) cho hệ thống 8 thực thể</h3>
<h4>2.2.1. Danh mục các thực thể chính</h4>
<p>• Customer (Khách hàng): Lưu trữ thông tin định danh của người mua hàng bao gồm Mã khách hàng, Họ tên, Email, Số điện thoại, Địa chỉ giao hàng mặc định và Mật khẩu đăng nhập.</p>
<p>• Order (Đơn hàng): Lưu trữ thông tin tổng quát của giao dịch đặt hàng gồm Mã đơn hàng, Mã khách hàng, Ngày đặt hàng, Trạng thái đơn hàng, Địa chỉ giao hàng.</p>
<p>• OrderDetail (Chi tiết đơn hàng): Thực thể liên kết đặc tả các sản phẩm nằm trong một đơn hàng gồm Mã chi tiết, Mã đơn hàng, Mã sản phẩm, Số lượng mua và Đơn giá tại thời điểm chốt đơn.</p>
<p>• Product (Sản phẩm): Lưu trữ danh mục hàng hóa bao gồm Mã sản phẩm, Tên sản phẩm, Giá bán, Mô tả sản phẩm, Đường dẫn hình ảnh đại diện và Số lượng tồn kho.</p>
<p>• CategoryProduct (Loại sản phẩm): Quản lý việc phân loại nhóm sản phẩm đồ thể thao.</p>
<p>• Post (Bài viết/Tin tức): Lưu trữ các bài viết truyền thông hoặc tin tức nội bộ.</p>
<p>• Category (Danh mục tin tức): Phân loại các nhóm bài viết truyền thông.</p>
<p>• About (Bài giới thiệu / Phân khu giới thiệu): Cấu hình động cho nội dung trang câu chuyện thương hiệu.</p>

<h4>2.2.2. Sơ đồ quan hệ thực thể (ERD Diagram)</h4>
<p>Mối quan hệ giữa các thực thể được đặc tả chặt chẽ, tạo thành một hệ sinh thái dữ liệu hoàn chỉnh, giúp truy xuất thông tin khách hàng, đơn hàng và sản phẩm một cách nhanh chóng và chính xác.</p>

<h4>2.2.3. Quy tắc ràng buộc quan hệ</h4>
<p>• Quan hệ Customer - Order (1 - Nhiều): Một khách hàng có thể đặt nhiều đơn hàng khác nhau, nhưng một đơn hàng chỉ thuộc về một khách hàng duy nhất.</p>
<p>• Quan hệ Order - OrderDetail (1 - Nhiều): Một đơn hàng chứa nhiều chi tiết sản phẩm mua khác nhau. Khi xóa một đơn hàng, hệ thống kích hoạt cơ chế xóa bắc cầu (Cascade Delete) để tự động xóa sạch các chi tiết đơn hàng tương ứng.</p>
<p>• Quan hệ Product - OrderDetail (1 - Nhiều): Một sản phẩm có thể xuất hiện ở nhiều đơn hàng của nhiều khách hàng khác nhau.</p>
<p>• Quan hệ CategoryProduct - Product (1 - Nhiều): Một loại sản phẩm chứa nhiều sản phẩm khác nhau.</p>
<p>• Quan hệ Category - Post (1 - Nhiều): Một danh mục tin tức chứa nhiều bài viết khác nhau.</p>

<h3>2.3. Chi tiết thiết kế cơ sở dữ liệu (Database Schema)</h3>
<p>Hệ thống Cơ sở dữ liệu vật lý được khởi tạo trực tiếp trên hệ quản trị Microsoft SQL Server. Nhóm phát triển đã áp dụng quy trình Code-First thông qua công nghệ Entity Framework Core (EF Core). Phương pháp này cho phép thiết kế toàn bộ cấu trúc bảng thông qua các file Class bằng ngôn ngữ C#, sau đó tự động sử dụng công cụ Migrations để dịch ngược và sinh ra các bảng trong SQL Server.</p>

<h4>2.3.1. Phân hệ nội dung tin tức (Category, Post)</h4>
<p>Phân hệ nội dung tin tức được thiết kế với hai bảng dữ liệu chính là Categories (Danh mục) và Posts (Bài viết), gắn kết với nhau theo mối quan hệ Một - Nhiều (1:N). Khóa ngoại này được thiết lập cơ chế Cascade Delete, đảm bảo nếu một danh mục bị xóa, toàn bộ các bài báo thuộc danh mục đó cũng sẽ được dọn sạch để đảm bảo tính toàn vẹn dữ liệu.</p>

<h4>2.3.2. Phân hệ bán hàng E-Commerce (CategoryProduct, Product)</h4>
<p>Cấu trúc lưu trữ sản phẩm được bóc tách thành hai bảng chính là CategoryProducts (Loại sản phẩm) và Products (Sản phẩm). Các cột lưu trữ giá trị tiền tệ như Price (Giá gốc) và SalePrice (Giá khuyến mãi) được áp dụng kiểu dữ liệu decimal(18,2) nhằm loại bỏ sai số thập phân trong quá trình tính toán tổng tiền thanh toán. Cột StockQuantity (Số lượng tồn kho) sử dụng kiểu int, cho phép hệ thống tự động trừ kho ngay lập tức khi phát sinh giao dịch đặt hàng thành công.</p>

<h4>2.3.3. Phân hệ khách hàng và đơn hàng (Customer, Order, OrderDetail)</h4>
<p>Bảng OrderDetails là bảng trung gian liên kết (N:M) hóa giải sự phụ thuộc giữa Đơn hàng và Sản phẩm. Bảng được thiết kế với tư duy lưu giữ "ảnh chụp chớp nhoáng" (Snapshot) của giao dịch. Cụ thể, trường UnitPrice (Đơn giá) được tách riêng và thiết lập kiểu decimal ngay tại thời điểm chốt đơn. Nhờ vậy, dù trong tương lai giá gốc của sản phẩm có bị thay đổi, lịch sử tính toán tổng tiền của hóa đơn cũ vẫn luôn chính xác tuyệt đối.</p>

<h4>2.3.4. Phân hệ tài khoản quản trị và phân quyền (User)</h4>
<p>Bảng Users (Tài khoản Quản trị) phân lập hoàn toàn với bảng Customers nhằm ngăn chặn nguy cơ leo thang đặc quyền (Privilege Escalation). Bảng Users được thiết kế thêm trường Role (Vai trò) kiểu nvarchar để hệ thống ASP.NET Core kích hoạt Middleware Role-Based Access Control (RBAC).</p>

<h3>2.4. Thiết kế danh mục Web API giữa Backend và Frontend</h3>
<p>Để đáp ứng mô hình kiến trúc phân tán giữa Client (ReactJS) và Server (ASP.NET Core), đồ án đã thiết kế và xây dựng một hệ thống RESTful Web API hoàn chỉnh. Toàn bộ các luồng giao tiếp dữ liệu đều tuân thủ chặt chẽ các tiêu chuẩn HTTP Methods (GET, POST) và định dạng dữ liệu truyền tải là JSON.</p>
<ul>
    <li>GET /api/Products: Lấy danh sách toàn bộ sản phẩm (hỗ trợ phân trang và lọc giá).</li>
    <li>POST /api/Orders: Tiếp nhận gói dữ liệu JSON từ Giỏ hàng (Cart) xuống để lập hóa đơn.</li>
    <li>POST /api/Auth/CustomerRegister: Khởi tạo tài khoản khách hàng mới và băm mật khẩu.</li>
    <li>POST /api/Auth/CustomerLogin: Kiểm tra thông tin đăng nhập và trả về đối tượng Customer nếu hợp lệ.</li>
</ul>

<h2>CHƯƠNG 3: TRIỂN KHAI PHẦN BACKEND (C# ASP.NET CORE WEB API)</h2>
<h3>3.1. Cấu trúc Solution và phân tách các tầng kiến trúc</h3>
<p>Hệ thống Backend của CMS được xây dựng dựa trên nền tảng .NET Core áp dụng nguyên lý Kiến trúc đa tầng (N-Tier Architecture). Toàn bộ Solution được phân tách rạch ròi thành 2 dự án (Projects) đóng vai trò là 2 tầng kiến trúc khác nhau: Tầng Truy cập Dữ liệu (CMS.Data) và Tầng Nghiệp vụ/Giao diện API (CMS.Backend). Việc cô lập tầng Data giúp tách biệt hoàn toàn logic CSDL khỏi các logic xử lý nghiệp vụ hay giao diện.</p>

<h3>3.2. Khởi tạo Cơ sở dữ liệu và Migration dữ liệu mẫu (Seed Data)</h3>
<p>Quá trình khởi tạo cơ sở dữ liệu được thực hiện tự động thông qua cơ chế Code-First của EF Core. Chuỗi kết nối (Connection String) được khai báo bảo mật bên trong file cấu hình appsettings.json. Sau đó, thông qua Package Manager Console, các lệnh Add-Migration InitialCreate và Update-Database được thực thi để quét mã nguồn C# và sinh ra cấu trúc bảng vật lý tương ứng trên SQL Server. Một kịch bản Insert Data (SeedData) tự động bơm dữ liệu mẫu ban đầu vào DB để kiểm thử.</p>

<h3>3.3. Xây dựng các Controllers xử lý API dữ liệu (GET/POST/PUT)</h3>
<p>Các Controller API được gắn Attribute [ApiController] và thiết kế chuẩn REST. Dữ liệu Request nộp lên từ Frontend sẽ được Map với các đối tượng DTO và truyền qua các hàm xử lý LINQ truy vấn trực tiếp xuống DB thông qua Dependency Injection của ApplicationDbContext. Đối với các tác vụ POST như tạo Đơn hàng, Transaction (BeginTransactionAsync) được áp dụng nhằm rollback ngay lập tức nếu kho hàng hết số lượng hoặc xảy ra lỗi mạng bất ngờ.</p>

<h3>3.4. Triển khai phân hệ bảo mật, mã hóa mật khẩu và phân quyền (Authentication & Authorization)</h3>
<p>Bảo mật hệ thống được thực thi ở mức cao nhất bằng cách tích hợp thư viện băm mật khẩu BCrypt.Net. Mật khẩu khách hàng và Admin được Hash kèm Salt trước khi lưu. Để phân quyền, ASP.NET Core kích hoạt Role-Based Authorization bằng Attribute [Authorize(Roles = "Admin")] trên các Controller nhạy cảm, cấp phát JWT Token hoặc Cookie Claims để Frontend giữ phiên đăng nhập an toàn.</p>

<h3>3.5. Tích hợp công cụ soạn thảo Rich Text (CKEditor) và cơ chế Upload ảnh vật lý</h3>
<p>Để hỗ trợ biên tập viên, giao diện quản trị Admin được tích hợp CKEditor 5 cho phép soạn thảo nội dung bài viết dạng Rich Text (HTML) trực quan. Đồng thời, cơ chế xử lý file IFormFile được cấu hình trên Backend để cho phép người dùng Upload ảnh vật lý từ máy tính. Server sẽ sinh tên file ngẫu nhiên, lưu vật lý vào thư mục wwwroot/images và trả về đường dẫn tĩnh cho ứng dụng khai thác.</p>

<h3>3.6. Cấu hình chính sách chia sẻ tài nguyên nguồn gốc chéo (CORS) cho ReactJS</h3>
<p>Do Frontend ReactJS chạy ở Port 3000 và Backend chạy ở Port 7003, chính sách CORS (Cross-Origin Resource Sharing) mang tên AllowReactApp được kích hoạt tại Program.cs. Nó cho phép AllowAnyMethod, AllowAnyHeader và AllowCredentials để Frontend có thể gửi các Request HTTP hợp lệ đi xuyên qua lớp tường lửa Same-Origin Policy của trình duyệt một cách mượt mà.</p>

<h3>3.7. Hoàn chỉnh phần quản trị Backend đầy đủ chức năng dành cho nhân viên của cửa hàng/doanh nghiệp sử dụng</h3>
<p>Để phục vụ vận hành doanh nghiệp, hệ thống CMS.Backend được tích hợp sẵn một Admin Panel sử dụng ASP.NET Core MVC kết hợp giao diện Bootstrap 5. Admin Panel có thiết kế Dashboard trực quan báo cáo số lượng đơn hàng, doanh thu, thành viên mới. Các module Quản lý Sản phẩm cho phép Thêm/Sửa/Xóa (CRUD) sản phẩm, tự động cập nhật StockQuantity (Tồn kho). Module Quản lý Đơn hàng cho phép nhân viên xét duyệt trạng thái đơn hàng thời gian thực, in hóa đơn hoặc hủy đơn hàng (Restock tự động). Phân hệ Quản lý Bài viết và Liên hệ giúp theo dõi toàn diện luồng thông tin giao tiếp nội bộ.</p>

<h3>3.8. Tài liệu hóa hệ thống API bằng Swagger UI</h3>
<p>Nhằm chuẩn hóa quy trình làm việc giữa Backend và Frontend Developer, thư viện Swashbuckle.AspNetCore được tích hợp vào dự án để tự động sinh ra tài liệu API trực quan tại endpoint /swagger. Swagger UI mô phỏng chính xác cấu trúc dữ liệu JSON, Schema của các Request/Response và cho phép thực thi gửi lệnh Test API ngay trên trình duyệt mà không cần phần mềm bên thứ ba (như Postman).</p>

<h2>CHƯƠNG 4: TRIỂN KHAI PHẦN FRONTEND (REACTJS CLIENT SITE)</h2>
<h3>4.1. Khởi tạo cấu trúc dự án ReactJS và tích hợp React Router DOM</h3>
<p>Lớp giao diện khách hàng được xây dựng bằng Create React App với phiên bản React 18 mới nhất, kiến trúc theo chuẩn Component-Based. Để giải quyết bài toán điều hướng trang không cần load lại trình duyệt (Single Page Application), thư viện React Router DOM v6 được nhúng vào file gốc App.js, phân rã các Routes linh hoạt cho Trang chủ, Cửa hàng, Chi tiết sản phẩm, Giỏ hàng và Thanh toán.</p>

<h3>4.2. Cấu hình trục HTTP Client chung (axiosClient.js) và xử lý dữ liệu JSON</h3>
<p>Thay vì sử dụng fetch API thuần túy, dự án khởi tạo một cấu hình HTTP Client tập trung (axiosClient) để tái sử dụng toàn cục. Trục HTTP này tích hợp cơ chế Request/Response Interceptor, tự động gắn JWT Token Bearer vào Header của mọi request được gửi đi. Nếu Token hết hạn hoặc không hợp lệ, Interceptor sẽ chủ động đánh chặn và điều hướng người dùng quay trở lại trang Đăng nhập để đảm bảo an ninh.</p>

<h3>4.3. Xây dựng giao diện các tầng bóc tách cho Trang chủ (Home.jsx)</h3>
<p>Giao diện Trang chủ (Home.jsx) được lắp ghép từ hàng loạt Component độc lập: Header Navigation tĩnh, Slider Banner động bằng thư viện Carousel, ProductGrid hiển thị danh sách sản phẩm nổi bật và Footer chứa thông tin liên hệ. Các Component chia sẻ State thông qua Props và áp dụng CSS Module, CSS Variables tạo nên giao diện hiện đại, responsive trên mọi kích thước màn hình thiết bị.</p>

<h3>4.4. Triển khai Trang cửa hàng (Shop.jsx) tích hợp bộ lọc nâng cao và Tìm kiếm thời gian thực</h3>
<p>Trang Cửa hàng (Shop) là trái tim của trải nghiệm mua sắm trực tuyến. Dữ liệu mảng (Array) từ Backend được nạp qua Hook useEffect. Giao diện tích hợp hệ thống bộ lọc đa chiều (Advanced Filtering) bao gồm: Bộ lọc theo Danh mục sản phẩm, Bộ lọc theo khoảng giá, và thanh Tìm kiếm (Search bar) thời gian thực. Mỗi khi người dùng gõ phím, State sẽ cập nhật và Filter lại danh sách Render ra lưới lưới sản phẩm ngay tức khắc.</p>

<h3>4.5. Triển khai Trang chi tiết sản phẩm (ProductDetail.jsx) và cơ chế hiển thị nội dung dạng HTML</h3>
<p>Tại trang Chi tiết sản phẩm, một lời gọi API định tuyến động (Route Parameter ID) được kích hoạt để lấy dữ liệu. Giao diện hiển thị bao gồm khu vực hình ảnh lớn, khối thông tin giá (Original Price, Sale Price), số lượng tồn kho (In Stock) và nút Thêm vào giỏ hàng (Add to Cart). Đặc biệt, khu vực bài viết mô tả sản phẩm sử dụng thuộc tính dangerouslySetInnerHTML của React để biên dịch an toàn các chuỗi HTML phức tạp lưu trong CSDL ra dạng hiển thị trực quan.</p>

<h3>4.6. Xây dựng luồng về khách hàng (Đăng ký, Đăng nhập, Đơn hàng)</h3>
<p>Luồng xác thực người dùng bao gồm hai Form Đăng ký (Register) và Đăng nhập (Login) kết nối trực tiếp với API Auth. Thông báo lỗi hoặc thành công được phản hồi người dùng bằng thư viện React Toastify dạng Pop-up sinh động. Khi đăng nhập thành công, Context API hoặc Redux sẽ lưu trữ State của User (bao gồm Token và Profile). Trang Lịch sử Đơn hàng (Order History) hiển thị dạng bảng các giao dịch quá khứ, trạng thái vận chuyển và tính năng xem chi tiết hóa đơn.</p>

<h3>4.7. Xây dựng luồng xử lý Giỏ hàng (Cart.jsx) và Biểu mẫu thanh toán đặt đơn hàng (Checkout.jsx)</h3>
<p>Giỏ hàng (Cart) được xây dựng tinh gọn, lưu trữ State tạm thời trên LocalStorage hoặc Context. Tính năng Cart cho phép người dùng thay đổi số lượng, tự động tính tổng tiền (Subtotal/Total) realtime. Tại màn hình Thanh toán (Checkout), người dùng điền biểu mẫu giao hàng (Shipping Info). Khi nhấn "Xác nhận đặt hàng", toàn bộ dữ liệu giỏ hàng và thông tin khách hàng được Package thành cục JSON gửi POST request lên API /api/Orders để Backend trừ kho và ghi nhận giao dịch.</p>

<h2>CHƯƠNG 5: KIỂM THỬ VÀ ĐÁNH GIÁ KẾ THÚC ĐỒ ÁN</h2>
<h3>5.1. Kiểm thử chức năng phân quyền bảo mật vùng Admin (Quyền Admin và Editor)</h3>
<p>Thực hiện các Test-case xâm nhập thủ công để chứng minh tính năng bảo mật: Khi một tài khoản khách hàng thông thường cố tình truy cập vào URL của Admin Panel, Middleware Authentication lập tức chặn lại và đá văng về trang Login. Khi tài khoản Role = "Editor" cố gắng truy cập Module Quản lý Thành viên (Role = "Admin"), hệ thống phản hồi Access Denied, bảo vệ tuyệt đối tính ranh giới phân quyền hệ thống.</p>

<h3>5.2. Kiểm thử luồng nghiệp vụ mua sắm và bắt lỗi logic tồn kho (StockQuantity)</h3>
<p>Luồng nghiệp vụ cốt lõi được Test với kịch bản: Một sản phẩm tồn kho bằng 2. Khách hàng thêm vào giỏ hàng số lượng 3. Khi Checkout, Backend sẽ kiểm tra Logic, phát hiện vượt tồn kho và ném ra Exception (Lỗi 400 BadRequest) kèm thông báo "Số lượng sản phẩm trong kho không đủ". Ngược lại, nếu mua hợp lệ, số tồn kho sẽ bị trừ đi đúng số lượng vừa đặt và hóa đơn được ghi nhận vào bảng Orders.</p>

<h3>5.3. Kiểm thử hiệu năng đồng bộ thời gian thực ngầm (Tab Console F12 và Swagger)</h3>
<p>Thông qua thẻ Network Tab trên DevTools (F12) của trình duyệt, các API truy xuất dữ liệu sản phẩm và hiển thị giao diện có thời gian đáp ứng (Response Time) rất thấp (trung bình dưới 150ms). Dữ liệu JSON trả về nhỏ gọn, chứng minh mô hình SPA kết hợp API cho hiệu suất load trang vượt trội hơn hẳn so với MVC truyền thống.</p>

<h3>5.4. Đánh giá ưu điểm và nhược điểm của giải pháp thiết kế</h3>
<p>• Ưu điểm: Áp dụng triệt để kiến trúc 3 lớp (3-Tier) và chia tách Backend - Frontend giúp dự án dễ bảo trì, tính bảo mật dữ liệu cao, tốc độ trải nghiệm người dùng cực kỳ mượt mà. Hệ thống hỗ trợ CMS đầy đủ giúp doanh nghiệp tự chủ vận hành.</p>
<p>• Nhược điểm: Chưa tích hợp API vận chuyển thực tế (Giao hàng Tiết kiệm, Viettel Post) để Tracking đơn. Chưa tích hợp hệ thống lưu trữ ảnh tĩnh tập trung như Cloudinary hoặc AWS S3 mà vẫn phụ thuộc vào thư mục vật lý wwwroot.</p>

<h2>CHƯƠNG 6: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN NÂNG CẤP</h2>
<h3>6.1. Kết quả đạt được của đồ án đối với sinh viên</h3>
<p>Trải qua quá trình nghiên cứu và thực hiện đồ án, sinh viên đã hoàn thành xuất sắc hệ thống V-SPORT E-Commerce & CMS. Qua đó, sinh viên đã củng cố vững chắc kiến thức về CSDL SQL Server, mô hình phát triển phần mềm N-Tier, làm chủ công nghệ Backend lõi ASP.NET Core Web API và Framework giao diện ReactJS. Đồng thời, kỹ năng phân tích thiết kế hệ thống và debug lỗi ứng dụng thực tế được nâng cao đáng kể.</p>

<h3>6.2. Hướng phát triển nâng cấp hệ thống trong tương lai (Tích hợp cổng thanh toán, AI gợi ý sản phẩm)</h3>
<p>Để sản phẩm có thể thương mại hóa hoàn toàn, lộ trình phát triển tiếp theo sẽ bao gồm: Tích hợp ví điện tử MoMo, VNPay, ZaloPay vào module Checkout để tự động hóa khâu thanh toán trực tuyến; Xây dựng hệ thống Trí tuệ Nhân tạo (AI Recommendation System) thu thập lịch sử hành vi mua sắm để gợi ý sản phẩm tương tự; Nâng cấp cơ sở hạ tầng triển khai lên nền tảng đám mây Azure hoặc AWS để tối ưu độ chịu tải của Server.</p>

</body>
</html>'''

with open(r'D:\BaoCao_DoAn_TinCMS_ChiTiet.doc', 'w', encoding='utf-8') as f:
    f.write(html_content)

print('Successfully generated the Word document at D:\BaoCao_DoAn_TinCMS_ChiTiet.doc')
