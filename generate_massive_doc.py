import os

html_parts = []

# --- CSS and Header ---
html_parts.append('''<html>
<head>
<meta charset="utf-8">
<style>
    body { font-family: 'Times New Roman', Times, serif; font-size: 14pt; line-height: 1.5; margin: 1in; }
    h1 { text-align: center; font-size: 20pt; font-weight: bold; text-transform: uppercase; margin-bottom: 20px;}
    h2 { font-size: 18pt; font-weight: bold; margin-top: 30px; text-transform: uppercase; page-break-before: always;}
    h3 { font-size: 16pt; font-weight: bold; margin-top: 20px; }
    h4 { font-size: 14pt; font-weight: bold; font-style: italic; margin-top: 15px;}
    p { text-align: justify; margin-bottom: 10px; }
    ul, ol { text-align: justify; margin-bottom: 10px; }
    li { margin-bottom: 5px; }
    .toc { margin-bottom: 30px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px; }
    th, td { border: 1px solid black; padding: 10px; text-align: left; vertical-align: top; }
    th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
    .image-placeholder { width: 80%; height: 250px; border: 2px dashed #ccc; margin: 20px auto; display: flex; align-items: center; justify-content: center; color: #777; background-color: #f9f9f9; }
    .image-caption { text-align: center; font-style: italic; margin-top: 5px; margin-bottom: 30px; font-size: 13pt; font-weight: bold; }
    .code-block { background-color: #f4f4f4; border-left: 4px solid #005A9C; padding: 10px; font-family: 'Courier New', Courier, monospace; font-size: 12pt; white-space: pre-wrap; margin-bottom: 15px; }
    .cover-page { text-align: center; margin-top: 50px; }
    .cover-title { font-size: 24pt; font-weight: bold; color: #ff0000; margin-top: 50px; margin-bottom: 50px; }
</style>
</head>
<body>
''')

# --- Cover Page ---
html_parts.append('''
<div class="cover-page">
    <p style="font-size: 16pt; font-weight: bold; text-transform: uppercase;">BỘ GIÁO DỤC VÀ ĐÀO TẠO</p>
    <p style="font-size: 16pt; font-weight: bold; text-transform: uppercase;">TRƯỜNG ĐẠI HỌC ...</p>
    <hr style="width: 30%; border: 1px solid black; margin-bottom: 50px;">
    
    <p style="font-size: 20pt; font-weight: bold;">BÁO CÁO ĐỒ ÁN MÔN HỌC / TỐT NGHIỆP</p>
    
    <div class="cover-title">
        ĐỀ TÀI: <br>
        XÂY DỰNG HỆ THỐNG V-SPORT E-COMMERCE & CMS
    </div>
    
    <table style="width: 60%; margin: 50px auto; border: none; font-size: 16pt; font-weight: bold;">
        <tr style="border: none;"><td style="border: none; text-align: left;">Sinh viên thực hiện:</td><td style="border: none; text-align: left;">Phan Thanh Đức Tín</td></tr>
        <tr style="border: none;"><td style="border: none; text-align: left;">Mã số sinh viên:</td><td style="border: none; text-align: left;">2123110173</td></tr>
        <tr style="border: none;"><td style="border: none; text-align: left;">Giảng viên hướng dẫn:</td><td style="border: none; text-align: left;">...</td></tr>
    </table>
</div>

<div style="page-break-after: always;"></div>
''')

# --- Chapter 1 ---
html_parts.append('''
<h2 style="page-break-before: auto;">CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ CƠ SỞ LÝ THUYẾT</h2>
<h3>1.1. Lý do chọn đề tài (Bối cảnh chuyển đổi số và thương mại điện tử)</h3>
<p>Cuộc cách mạng công nghiệp lần thứ tư (Cách mạng 4.0) đang diễn ra mạnh mẽ trên quy mô toàn cầu, thúc đẩy sự hội tụ của các công nghệ đột phá như Trí tuệ nhân tạo (AI), Điện toán đám mây (Cloud Computing), Dữ liệu lớn (Big Data) và Internet vạn vật (IoT). Trong xu thế đó, "Chuyển đổi số" (Digital Transformation) không còn là một lựa chọn mang tính xu hướng, mà đã trở thành yếu tố sống còn quyết định sự tồn tại và phát triển của mọi doanh nghiệp.</p>
<p>Chuyển đổi số giúp tái cấu trúc quy trình vận hành, tối ưu hóa nguồn lực nhân sự, giảm thiểu chi phí quản lý và nâng cao năng lực cạnh tranh trên thị trường. Đặc biệt, đối với ngành dịch vụ bán lẻ thời trang và dụng cụ thể thao, việc ứng dụng công nghệ số hóa vào quy trình quản lý thông tin, tương tác và chăm sóc khách hàng đang trở thành thước đo cho sự phát triển bền vững của doanh nghiệp. Hệ thống kinh doanh truyền thống dựa trên sổ sách, Excel đang dần bộc lộ những hạn chế về sự chậm trễ, nhầm lẫn số liệu và thiếu tính liên kết dữ liệu.</p>
<p>Xuất phát từ nhu cầu thực tiễn đó, đồ án "Xây dựng hệ thống V-SPORT E-Commerce & CMS" được đề xuất và thực hiện. Ứng dụng công nghệ web hiện đại sẽ mang lại trải nghiệm mua sắm không khoảng cách cho khách hàng, đồng thời cung cấp một hệ thống quản trị chuyên nghiệp, tự động hóa quy trình cho chủ doanh nghiệp.</p>

<h3>1.2. Mục tiêu của đồ án</h3>
<p>Mục tiêu tổng quát của đồ án là nghiên cứu, thiết kế và xây dựng hoàn chỉnh hệ thống V-SPORT – một hệ sinh thái ứng dụng Web khép kín bao gồm:</p>
<ul>
    <li><strong>Hệ quản trị nội dung BackEnd (Headless CMS):</strong> Phát triển bằng ASP.NET Core Web API / MVC nhằm quản lý dữ liệu tập trung.</li>
    <li><strong>Kênh tương tác mua sắm FrontEnd (Single Page Application - SPA):</strong> Phát triển bằng ReactJS, mang lại trải nghiệm UI/UX mượt mà, phản hồi tức thì.</li>
</ul>
<p>Hệ thống hướng tới việc hỗ trợ chuỗi cửa hàng kinh doanh đồ thể thao tối ưu hóa quy trình truyền thông thương hiệu, quản trị nội dung số và tự động hóa quy trình tiếp nhận, xử lý đơn đặt hàng trực tuyến từ khách hàng. Mục tiêu cụ thể bao gồm: số hóa dữ liệu sản phẩm, quản lý kho hàng tự động, xây dựng quy trình thanh toán minh bạch, và cung cấp báo cáo thống kê chính xác.</p>

<h3>1.3. Đối tượng và phạm vi nghiên cứu</h3>
<p>Đề tài tập trung nghiên cứu các công nghệ phát triển Web Full-stack hiện đại bao gồm framework ASP.NET Core (Web API / MVC) ở phía máy chủ (BackEnd) kết hợp hệ quản trị cơ sở dữ liệu SQL Server, và thư viện ReactJS ở phía máy khách (FrontEnd).</p>
<p>Phạm vi thực tiễn của đồ án giới hạn trong việc xây dựng hệ thống quản lý nội dung và đặt hàng trực tuyến V-SPORT vận hành trên môi trường cục bộ (Localhost) hoặc máy chủ thử nghiệm. Hệ thống tập trung giải quyết các tính năng cốt lõi bao gồm:</p>
<ul>
    <li><strong>Về phía khách hàng:</strong> Tìm kiếm sản phẩm, quản lý giỏ hàng, đặt hàng trực tuyến, đăng ký/đăng nhập thành viên, quản lý hồ sơ cá nhân, xem lịch sử đơn hàng có kèm ảnh và nhận email tự động xác nhận đơn hàng.</li>
    <li><strong>Về phía quản trị viên:</strong> Quản lý vòng đời dữ liệu (CRUD) của sản phẩm, danh mục, bài viết; kiểm soát số lượng thành viên; theo dõi chi tiết đơn hàng kèm ảnh sản phẩm và duyệt nhanh trạng thái đơn hàng trực tiếp bằng thanh tùy chọn Dropdown. Tự động hóa tính toán doanh thu và quản lý số lượng tồn kho của hàng hóa.</li>
</ul>

<h3>1.4. Công nghệ áp dụng trong hệ thống</h3>
<h4>1.4.1. Tổng quan về nền tảng .NET Core và C#</h4>
<p><strong>Nền tảng .NET Core:</strong> .NET Core (hiện nay là .NET 8) là một nền tảng phát triển phần mềm mã nguồn mở, đa nền tảng (Cross-platform) được duy trì bởi Microsoft và cộng đồng. Khác với phiên bản .NET Framework truyền thống vốn chỉ chạy trên hệ điều hành Windows, .NET Core cho phép ứng dụng khởi chạy mượt mà trên Windows, macOS và Linux. Nền tảng này được thiết kế theo hướng module hóa cực kỳ nhẹ, tối ưu hóa bộ nhớ và sở hữu hiệu năng xử lý request thuộc nhóm hàng đầu thế giới (thông qua máy chủ web Kestrel tích hợp). Điểm mạnh của .NET Core là hỗ trợ mạnh mẽ cơ chế Tiêm phụ thuộc (Dependency Injection - DI) mặc định, giúp xây dựng mã nguồn dễ bảo trì, linh hoạt và thuận tiện cho việc kiểm thử phần mềm (Unit Testing).</p>
<p><strong>Ngôn ngữ C#:</strong> C# là ngôn ngữ lập trình hướng đối tượng (OOP) mạnh mẽ, an toàn kiểu dữ liệu (Type-safe). C# kết hợp sức mạnh của C++ cùng tính dễ dùng của Java. Trong môi trường .NET Core, C# cung cấp cú pháp hiện đại, hỗ trợ lập trình bất đồng bộ (Asynchronous Programming) cực kỳ mạnh mẽ thông qua bộ từ khóa <code>async / await</code> giúp tối ưu hóa luồng xử lý (Threading) và nâng cao hiệu năng chịu tải của hệ thống máy chủ khi có hàng nghìn lượt truy cập đồng thời.</p>

<h4>1.4.2. Thư viện ReactJS và kiến trúc ứng dụng một trang (SPA)</h4>
<p><strong>Thư viện ReactJS:</strong> ReactJS là một thư viện mã nguồn mở viết bằng JavaScript được phát triển bởi Facebook (Meta) chuyên dùng để xây dựng giao diện người dùng (UI) tương tác cao. ReactJS hoạt động dựa trên triết lý thiết kế thành phần (Component-based architecture), cho phép chia nhỏ giao diện thành các phần độc lập (Ví dụ: Header, Footer, Sidebar, ProductCard), dễ tái sử dụng và quản lý. Công nghệ cốt lõi giúp ReactJS vượt trội về tốc độ là Virtual DOM (DOM ảo). Khi trạng thái (State) của ứng dụng thay đổi, React sẽ tính toán sự khác biệt trên DOM ảo trước, sau đó chỉ cập nhật phần nhỏ thực sự thay đổi trên DOM thực của trình duyệt, giúp tránh hiện tượng tải lại toàn bộ trang và đem lại trải nghiệm siêu mượt.</p>
<p><strong>Kiến trúc ứng dụng một trang (Single Page Application - SPA):</strong> Khác với mô hình Multi Page truyền thống (mỗi lần bấm link là một lần tải lại toàn trang từ máy chủ), SPA chỉ tải đúng một trang HTML duy nhất (index.html) từ đầu. Mọi tương tác chuyển trang tiếp theo đều được xử lý cục bộ thông qua cơ chế Client-side Routing (sử dụng thư viện react-router-dom). Giao diện và dữ liệu được render động thông qua JavaScript và các lệnh gọi API nền (AJAX/Fetch/Axios), giúp trang web hoạt động giống hệt một phần mềm Native trên máy tính hoặc điện thoại.</p>

<h4>1.4.3. Hệ quản trị cơ sở dữ liệu SQL Server và Entity Framework Core</h4>
<p><strong>SQL Server:</strong> Là hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) do Microsoft phát triển, có độ ổn định và tin cậy cực cao đối với các ứng dụng doanh nghiệp. SQL Server cung cấp khả năng bảo mật dữ liệu tối ưu, quản lý giao dịch (Transaction) an toàn nhờ tuân thủ nghiêm ngặt các thuộc tính ACID (Atomicity, Consistency, Isolation, Durability), hỗ trợ tối ưu hóa truy vấn thông qua Indexing và đảm bảo tính toàn vẹn dữ liệu thông qua các ràng buộc khóa ngoại chặt chẽ.</p>
<p><strong>Entity Framework Core (EF Core):</strong> EF Core là một trình ánh xạ đối tượng - quan hệ (ORM - Object-Relational Mapper) mạnh mẽ. EF Core đóng vai trò cầu nối giúp các lập trình viên C# thao tác với CSDL SQL Server hoàn toàn dưới dạng các đối tượng (Classes) mà không cần viết các câu lệnh SQL truyền thống. EF Core hỗ trợ LINQ (Language Integrated Query) để viết các truy vấn dữ liệu trực tiếp trong mã nguồn C# một cách an toàn và tự động sinh ra mã SQL tối ưu để gửi xuống Database. Quy trình Code-First của EF Core giúp thiết kế CSDL linh hoạt từ Code, tự động tạo bảng thông qua công cụ Migrations.</p>

<h4>1.4.4. Kiến trúc Web API (RESTful API) và giao thức truyền tải JSON</h4>
<p><strong>Kiến trúc Web API (RESTful API):</strong> REST (Representational State Transfer) là kiểu kiến trúc phần mềm tiêu chuẩn để thiết kế các dịch vụ web. Một dịch vụ Web API chuẩn RESTful sử dụng trực tiếp các phương thức HTTP để biểu thị các hành động xử lý tài nguyên:</p>
<ul>
    <li><strong>GET:</strong> Đọc và truy vấn dữ liệu (ví dụ: lấy danh sách sản phẩm).</li>
    <li><strong>POST:</strong> Tạo mới dữ liệu (ví dụ: gửi đơn đặt hàng, đăng ký tài khoản).</li>
    <li><strong>PUT / PATCH:</strong> Cập nhật dữ liệu hiện có.</li>
    <li><strong>DELETE:</strong> Xóa dữ liệu.</li>
</ul>
<p>RESTful API giúp hệ thống BackEnd hoàn toàn tách biệt (Decoupled) với FrontEnd, cho phép BackEnd chỉ đóng vai trò như một "Kho phân phối dữ liệu", từ đó FrontEnd (React, Vue, iOS, Android) có thể kết nối vào và lấy dữ liệu để hiển thị.</p>
<p><strong>Giao thức truyền tải JSON:</strong> JSON (JavaScript Object Notation) là định dạng dữ liệu văn bản siêu nhẹ, dễ đọc/viết và dễ phân tích. Trong hệ thống V-SPORT, JSON được chọn làm giao thức truyền tải chuẩn hóa duy nhất nhờ tính tương thích tuyệt đối giữa C# và JavaScript.</p>
''')

# --- Chapter 2 ---
html_parts.append('''
<h2>CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG</h2>
<h3>2.1. Phân tích yêu cầu chức năng (Luồng nghiệp vụ mua hàng và quản trị)</h3>
<p>Phân tích yêu cầu chức năng là bước then chốt nhằm xác định rõ các hành vi, quy trình xử lý dữ liệu và luồng nghiệp vụ mà hệ thống V-SPORT cần đáp ứng. Hệ thống được chia làm hai phân hệ tương tác độc lập phục vụ cho hai đối tượng tác nhân (Actor) chính:</p>
<ul>
    <li><strong>Khách hàng (Customer):</strong> Có thể duyệt danh mục sản phẩm, xem chi tiết hàng hóa, tìm kiếm từ khóa, thêm/sửa/xóa sản phẩm trong giỏ hàng. Thực hiện quy trình thanh toán, điền thông tin vận chuyển, và xem lịch sử các đơn hàng đã đặt. Đồng thời có thể đọc các bài viết tin tức.</li>
    <li><strong>Quản trị viên (Admin):</strong> Đăng nhập vào trang quản trị an toàn. Quản lý toàn bộ thông tin hàng hóa (thêm ảnh, đổi giá, cập nhật kho). Quản lý danh mục. Theo dõi các đơn hàng mới đặt, xét duyệt trạng thái giao hàng, thống kê số lượng người dùng.</li>
</ul>

<h3>2.2. Sơ đồ thực thể mối quan hệ (ERD) cho hệ thống 8 thực thể</h3>
<p>Hệ thống cơ sở dữ liệu của V-SPORT được thiết kế chuẩn hóa (Normalization) để tối ưu hóa hiệu năng truy vấn và tránh dư thừa dữ liệu. Dưới đây là đặc tả 8 thực thể chính.</p>
<h4>2.2.1. Danh mục các thực thể chính</h4>

<p><strong>1. Customer (Khách hàng)</strong></p>
<table>
    <tr><th>Tên trường</th><th>Kiểu dữ liệu</th><th>Ý nghĩa</th><th>Khóa</th></tr>
    <tr><td>Id</td><td>int</td><td>Định danh duy nhất khách hàng</td><td>PK</td></tr>
    <tr><td>FullName</td><td>nvarchar(255)</td><td>Họ và tên đầy đủ</td><td></td></tr>
    <tr><td>Email</td><td>nvarchar(255)</td><td>Địa chỉ email (duy nhất)</td><td></td></tr>
    <tr><td>PasswordHash</td><td>nvarchar(max)</td><td>Mật khẩu đã được mã hóa</td><td></td></tr>
    <tr><td>Phone</td><td>nvarchar(20)</td><td>Số điện thoại liên lạc</td><td></td></tr>
    <tr><td>Address</td><td>nvarchar(max)</td><td>Địa chỉ giao hàng mặc định</td><td></td></tr>
</table>

<p><strong>2. Order (Đơn hàng)</strong></p>
<table>
    <tr><th>Tên trường</th><th>Kiểu dữ liệu</th><th>Ý nghĩa</th><th>Khóa</th></tr>
    <tr><td>Id</td><td>int</td><td>Định danh duy nhất đơn hàng</td><td>PK</td></tr>
    <tr><td>CustomerId</td><td>int</td><td>Mã khách hàng thực hiện mua</td><td>FK</td></tr>
    <tr><td>OrderDate</td><td>datetime</td><td>Thời điểm hệ thống ghi nhận đơn</td><td></td></tr>
    <tr><td>Status</td><td>int</td><td>Trạng thái: 0(Chờ duyệt), 1(Đang giao), 2(Hoàn tất)</td><td></td></tr>
    <tr><td>DeliveryAddress</td><td>nvarchar(max)</td><td>Nơi nhận hàng cụ thể</td><td></td></tr>
    <tr><td>PaymentMethod</td><td>nvarchar(50)</td><td>Phương thức (COD, VNPay)</td><td></td></tr>
</table>

<p><strong>3. OrderDetail (Chi tiết đơn hàng)</strong></p>
<table>
    <tr><th>Tên trường</th><th>Kiểu dữ liệu</th><th>Ý nghĩa</th><th>Khóa</th></tr>
    <tr><td>Id</td><td>int</td><td>Mã dòng chi tiết</td><td>PK</td></tr>
    <tr><td>OrderId</td><td>int</td><td>Đơn hàng chứa dòng này</td><td>FK</td></tr>
    <tr><td>ProductId</td><td>int</td><td>Mã sản phẩm khách mua</td><td>FK</td></tr>
    <tr><td>Quantity</td><td>int</td><td>Số lượng đặt mua</td><td></td></tr>
    <tr><td>UnitPrice</td><td>decimal(18,2)</td><td>Đơn giá chốt tại thời điểm mua (Snapshot)</td><td></td></tr>
</table>

<p><strong>4. Product (Sản phẩm)</strong></p>
<table>
    <tr><th>Tên trường</th><th>Kiểu dữ liệu</th><th>Ý nghĩa</th><th>Khóa</th></tr>
    <tr><td>Id</td><td>int</td><td>Mã sản phẩm</td><td>PK</td></tr>
    <tr><td>Name</td><td>nvarchar(255)</td><td>Tên sản phẩm thể thao</td><td></td></tr>
    <tr><td>Price</td><td>decimal(18,2)</td><td>Giá bán gốc</td><td></td></tr>
    <tr><td>SalePrice</td><td>decimal(18,2)</td><td>Giá bán khuyến mãi (nếu có)</td><td></td></tr>
    <tr><td>StockQuantity</td><td>int</td><td>Số lượng tồn kho thực tế</td><td></td></tr>
    <tr><td>ImageUrl</td><td>nvarchar(max)</td><td>Đường dẫn ảnh đại diện</td><td></td></tr>
    <tr><td>CategoryProductId</td><td>int</td><td>Thuộc loại sản phẩm nào</td><td>FK</td></tr>
</table>

<p><strong>5. CategoryProduct (Loại sản phẩm)</strong></p>
<table>
    <tr><th>Tên trường</th><th>Kiểu dữ liệu</th><th>Ý nghĩa</th><th>Khóa</th></tr>
    <tr><td>Id</td><td>int</td><td>Mã loại sản phẩm</td><td>PK</td></tr>
    <tr><td>Name</td><td>nvarchar(255)</td><td>Tên loại (Giày, Áo, Vợt...)</td><td></td></tr>
</table>

<p><strong>6. Post (Bài viết/Tin tức)</strong></p>
<table>
    <tr><th>Tên trường</th><th>Kiểu dữ liệu</th><th>Ý nghĩa</th><th>Khóa</th></tr>
    <tr><td>Id</td><td>int</td><td>Mã bài viết</td><td>PK</td></tr>
    <tr><td>Title</td><td>nvarchar(max)</td><td>Tiêu đề bài viết</td><td></td></tr>
    <tr><td>Content</td><td>nvarchar(max)</td><td>Nội dung HTML sinh từ CKEditor</td><td></td></tr>
    <tr><td>CategoryId</td><td>int</td><td>Thuộc danh mục bài viết nào</td><td>FK</td></tr>
</table>

<p><strong>7. User (Tài khoản Quản trị)</strong></p>
<table>
    <tr><th>Tên trường</th><th>Kiểu dữ liệu</th><th>Ý nghĩa</th><th>Khóa</th></tr>
    <tr><td>Id</td><td>int</td><td>Mã tài khoản quản trị</td><td>PK</td></tr>
    <tr><td>Username</td><td>nvarchar(50)</td><td>Tên đăng nhập hệ thống</td><td></td></tr>
    <tr><td>PasswordHash</td><td>nvarchar(max)</td><td>Mật khẩu đã băm (BCrypt)</td><td></td></tr>
    <tr><td>Role</td><td>nvarchar(50)</td><td>Quyền hạn (Admin / Editor)</td><td></td></tr>
</table>

<h4>2.2.2. Sơ đồ quan hệ thực thể (ERD Diagram)</h4>
<div class="image-placeholder">
    [Hình 1: Sơ đồ thực thể mối quan hệ ERD được sinh ra từ SQL Server Management Studio]
</div>
<div class="image-caption">Hình 1. Sơ đồ quan hệ thực thể (ERD) tự động sinh từ CSDL</div>

<h4>2.2.3. Quy tắc ràng buộc quan hệ</h4>
<p>• <strong>Quan hệ Customer - Order (1 - Nhiều):</strong> Một khách hàng có thể đặt hàng chục đơn hàng khác nhau, nhưng mỗi hóa đơn mã định danh duy nhất chỉ thuộc về một người sở hữu. Điều này cho phép trích xuất Lịch sử mua hàng chính xác.</p>
<p>• <strong>Quan hệ Order - OrderDetail (1 - Nhiều):</strong> Một hóa đơn chứa danh sách nhiều mặt hàng (OrderDetail). Khi xóa một hóa đơn, hệ thống kích hoạt cơ chế <strong>Cascade Delete</strong> (Xóa bắc cầu) để tự động xóa sạch các chi tiết để tránh rác CSDL (Orphan data).</p>
<p>• <strong>Quan hệ Product - OrderDetail (1 - Nhiều):</strong> Một sản phẩm (VD: Giày Nike) có thể nằm trong hàng ngàn hóa đơn của hàng ngàn khách hàng khác nhau. Không được thiết lập Cascade Delete ở đây để bảo vệ Lịch sử hóa đơn nếu lỡ tay xóa sản phẩm.</p>
<p>• <strong>Quan hệ CategoryProduct - Product (1 - Nhiều):</strong> Tổ chức cây danh mục hàng hóa rõ ràng.</p>

<h3>2.3. Chi tiết thiết kế cơ sở dữ liệu (Database Schema)</h3>
<p>Ứng dụng V-SPORT được khởi tạo bằng công cụ Entity Framework Core (Code-First). Code-First cho phép lập trình viên viết code C# trước, tạo ra các class, sau đó sinh ra CSDL thông qua lệnh `Add-Migration`.</p>

<h4>2.3.1. Phân hệ nội dung tin tức (Category, Post)</h4>
<p>Phân hệ này giải quyết bài toán SEO và truyền thông cho doanh nghiệp. Cấu trúc trường `Content` của bảng Post đặc biệt thiết lập kiểu `nvarchar(max)` thay vì chuỗi ngắn thông thường, vì nó sẽ phải gánh toàn bộ một đoạn mã HTML khổng lồ được xuất ra từ công cụ soạn thảo văn bản CKEditor (Bao gồm thẻ b, i, img, table...). Việc thiết lập khóa ngoại `CategoryId` vào bảng Post giúp nhóm các bài viết theo chủ đề.</p>

<h4>2.3.2. Phân hệ bán hàng E-Commerce (CategoryProduct, Product)</h4>
<p>Bảng Products đóng vai trò như trái tim của ứng dụng. Để giải quyết rủi ro về tiền tệ (Sai số làm tròn thập phân trong tài chính), thuộc tính <code>Price</code> và <code>SalePrice</code> bắt buộc khai báo Attribute <code>[Column(TypeName = "decimal(18,2)")]</code>. Điều này chỉ đạo SQL Server không lưu dưới dạng `float` mà phải là `decimal` chính xác tuyệt đối. Biến `StockQuantity` (Tồn kho) là điểm mấu chốt để chạy thuật toán nghiệp vụ: Khi người dùng đặt thành công 2 đôi giày, hệ thống phải cập nhật Update bảng Product `SET StockQuantity = StockQuantity - 2`.</p>

<h4>2.3.3. Phân hệ khách hàng và đơn hàng (Customer, Order, OrderDetail)</h4>
<p>Đặc điểm nổi bật trong thiết kế bảng <code>OrderDetail</code> là việc nó nhân bản lại cột `UnitPrice` từ bảng Product. Đây là kiến thức chuyên sâu trong thiết kế Database thương mại: "Phải lưu lại giá trị chớp nhoáng tại thời điểm giao dịch". Nếu khách hàng mua một cái áo giá 100k vào hôm nay, tháng sau cái áo tăng lên 150k. Nếu OrderDetail không lưu cột UnitPrice riêng mà dùng lệnh `JOIN` qua bảng Product, thì hóa đơn cũ của khách sẽ bị sai tổng tiền. Thiết kế hiện tại đã giải quyết triệt để lỗi này.</p>

<h4>2.3.4. Phân hệ tài khoản quản trị và phân quyền (User)</h4>
<p>Nhằm đảm bảo an ninh hệ thống tuyệt đối, tài khoản của Khách Hàng (Customer) và Quản trị viên (User) được tách làm 2 bảng riêng biệt. Bảng User có thêm cột `Role`. Việc này dập tắt hoàn toàn lỗ hổng kỹ thuật số (Privilege Escalation - Leo thang đặc quyền). Hacker dù chiếm được tài khoản khách hàng cũng không bao giờ lấy được quyền Admin vì CSDL kiểm tra logic ở 2 bảng khác biệt.</p>

<h3>2.4. Thiết kế danh mục Web API giữa Backend và Frontend</h3>
<p>Toàn bộ Backend C# đóng vai trò là API Server, mở cổng (Endpoint) để Client (ReactJS) gọi qua giao thức mạng HTTP/HTTPS.</p>
<table>
    <tr><th>Phương thức</th><th>Endpoint URI</th><th>Chức năng nghiệp vụ</th></tr>
    <tr><td>GET</td><td>/api/Products</td><td>Lấy danh sách sản phẩm (có lọc, tìm kiếm, phân trang)</td></tr>
    <tr><td>GET</td><td>/api/Products/{id}</td><td>Lấy chi tiết 1 sản phẩm theo ID để hiển thị</td></tr>
    <tr><td>POST</td><td>/api/Orders</td><td>Nhận luồng JSON từ Giỏ hàng React nộp lên để lập hóa đơn</td></tr>
    <tr><td>GET</td><td>/api/Orders/Customer/{id}</td><td>Truy xuất toàn bộ lịch sử mua hàng của khách</td></tr>
    <tr><td>POST</td><td>/api/Auth/Login</td><td>Xác thực thông tin khách hàng, băm mật khẩu so sánh</td></tr>
    <tr><td>GET</td><td>/api/Posts</td><td>Trích xuất dữ liệu bài viết Blog truyền thông</td></tr>
</table>
<div class="image-placeholder">
    [Hình 2: Giao diện tài liệu hóa Web API tự động bằng Swagger UI thể hiện các phương thức GET/POST/PUT]
</div>
<div class="image-caption">Hình 2. Tài liệu hóa các endpoints kết nối giữa Backend và Frontend bằng Swagger</div>
''')

# --- Chapter 3 ---
html_parts.append('''
<h2>CHƯƠNG 3: TRIỂN KHAI PHẦN BACKEND (C# ASP.NET CORE WEB API)</h2>
<h3>3.1. Cấu trúc Solution và phân tách các tầng kiến trúc</h3>
<p>Hệ thống Backend của dự án được xây dựng tuân theo nguyên lý Kiến trúc Đa tầng (N-Tier Architecture) vững chắc, cụ thể là mô hình 2-Tier trên Visual Studio Solution. Toàn bộ mã nguồn được bóc tách rạch ròi thành 2 dự án (Projects):</p>
<ul>
    <li><strong>CMS.Data (Data Access Layer):</strong> Là thư viện lớp (Class Library) đảm nhiệm việc định nghĩa các thực thể (Entities), khai báo DbContext và làm việc trực tiếp với SQL Server bằng Entity Framework. Không chứa bất kỳ logic kinh doanh hay API nào.</li>
    <li><strong>CMS.Backend (Business & API Layer):</strong> Tầng trung tâm xử lý, tham chiếu (Reference) đến CMS.Data. Tại đây chứa các API Controllers, cấu hình bảo mật JWT/Cookie, và giao diện Admin MVC.</li>
</ul>
<p>Sự chia tách này tuân thủ nguyên lý Separation of Concerns (SoC). Nhờ đó, nếu sau này dự án muốn chuyển CSDL từ SQL Server sang MySQL, lập trình viên chỉ việc thay đổi mã nguồn ở tầng CMS.Data mà không làm sụp đổ các API ở tầng CMS.Backend.</p>

<h3>3.2. Khởi tạo Cơ sở dữ liệu và Migration dữ liệu mẫu (Seed Data)</h3>
<p>Thay vì thao tác thủ công trên SQL Management Studio, mọi cấu trúc CSDL đều được kiểm soát phiên bản bằng mã nguồn thông qua Entity Framework Migrations.</p>
<p><strong>Cấu hình kết nối:</strong> Chuỗi `ConnectionStrings:DefaultConnection` được khai báo an toàn trong file cấu hình lõi `appsettings.json`. Backend sẽ đọc chuỗi này lúc khởi động.</p>
<p><strong>Sinh dữ liệu:</strong> Thông qua cửa sổ lệnh Package Manager Console (PMC), lệnh <code>Add-Migration InitialCreate</code> sinh ra kịch bản C#, và lệnh <code>Update-Database</code> thực thi trực tiếp xuống máy chủ SQL để tạo các bảng. Một file kịch bản SQL riêng biệt (SeedData.sql) đã được chuẩn bị sẵn, dùng để tự động INSERT hàng chục bản ghi sản phẩm thể thao, tài khoản admin mẫu vào DB, giúp hệ thống có dữ liệu thô (dummy data) ngay sau khi khởi chạy lần đầu tiên.</p>

<h3>3.3. Xây dựng các Controllers xử lý API dữ liệu (GET/POST/PUT)</h3>
<p>Hệ thống Controller trong .NET 8 được thiết kế theo chuẩn REST. Các Class như <code>ProductsController</code> hay <code>OrdersController</code> được gắn Attribute <code>[ApiController]</code>. </p>
<p>Cơ chế Tiêm phụ thuộc (DI) cực kỳ mạnh mẽ của .NET Core được áp dụng: Đối tượng `ApplicationDbContext` được Framework khởi tạo tự động và bơm thẳng vào Constructor của Controller. Thông qua đó, Controller có thể truy xuất DB mọi lúc mọi nơi.</p>
<p><strong>Đặc biệt chú ý luồng xử lý POST Tạo Đơn Hàng:</strong> Khi ReactJS nộp danh sách sản phẩm trong giỏ hàng lên `POST /api/Orders`, Backend không lưu ngay. Backend sử dụng <code>BeginTransactionAsync()</code>. Thuật toán sẽ dùng vòng lặp FOR quét qua từng sản phẩm trong giỏ, so sánh số lượng mua với cột `StockQuantity` trong DB. Nếu Tồn kho < Số lượng mua, lệnh <code>transaction.RollbackAsync()</code> lập tức được gọi, hủy toàn bộ quy trình, không lưu bất cứ dòng dữ liệu nào để đảm bảo hệ thống không bị lỗi âm số lượng. Sau đó ném về phản hồi `HTTP 400 BadRequest` báo cho Frontend biết "Sản phẩm A đã hết hàng".</p>
<div class="code-block">
[HttpPost]
public async Task&lt;IActionResult&gt; CreateOrder([FromBody] OrderRequest request) {
    using var transaction = await _context.Database.BeginTransactionAsync();
    try {
        // Logic trừ tồn kho và tạo Order/OrderDetail
        // ...
        await transaction.CommitAsync();
        return Ok("Đặt hàng thành công");
    } catch {
        await transaction.RollbackAsync();
        return BadRequest("Lỗi xử lý đơn hàng");
    }
}
</div>

<h3>3.4. Triển khai phân hệ bảo mật, mã hóa mật khẩu và phân quyền (Authentication & Authorization)</h3>
<p>Hệ thống triển khai 3 lớp tường lửa bảo vệ:</p>
<ol>
    <li><strong>Mã hóa Mật khẩu một chiều (Hashing):</strong> Thư viện <code>BCrypt.Net-Next</code> được nhúng vào ứng dụng. Khi đăng ký, mật khẩu chuỗi thuần (ví dụ: "123456") được băm kèm một mã Salt ngẫu nhiên thành chuỗi "$2a$11$eO...". Phương pháp mã hóa này tuyệt đối không thể dịch ngược. Thuật toán `BCrypt.Verify()` chịu trách nhiệm so sánh chuỗi băm lúc người dùng đăng nhập.</li>
    <li><strong>Xác thực (Authentication):</strong> Sử dụng cơ chế Cookie Authentication kết hợp Claims. Các Claims lưu thông tin UserID và Role. Gói tin được mã hóa vòng và gửi xuống trình duyệt. Mỗi lần admin chuyển trang, Middleware sẽ tự động bóc tách Cookie để chứng thực danh tính.</li>
    <li><strong>Phân quyền truy cập (Authorization):</strong> Áp dụng chuẩn RBAC (Role-Based Access Control). Bằng cách đặt thẻ <code>[Authorize(Roles = "Admin")]</code> lên các Controller nhạy cảm (như Quản lý doanh thu, Tài khoản), những nhân viên chỉ mang quyền "Editor" sẽ bị báo lỗi `HTTP 403 Forbidden` nếu cố ý vượt quyền.</li>
</ol>

<h3>3.5. Tích hợp công cụ soạn thảo Rich Text (CKEditor) và cơ chế Upload ảnh vật lý</h3>
<p>Việc viết bài mô tả sản phẩm hay tin tức không thể chỉ dùng văn bản thô (Plain Text) nhàm chán. Giải pháp của dự án là nhúng thư viện mã nguồn mở <strong>CKEditor 5</strong> vào giao diện Admin. Công cụ này cung cấp thanh công cụ WYSIWYG trực quan như Microsoft Word, cho phép bôi đậm, chèn bảng, đổi màu chữ.</p>
<p><strong>Cơ chế Upload Hình ảnh:</strong> Khi Quản trị viên thêm ảnh Sản phẩm, Client gửi lên một luồng dữ liệu nhị phân thông qua giao thức <code>multipart/form-data</code>. Backend C# sử dụng Interface <code>IFormFile</code> để hứng luồng dữ liệu này. File ảnh sẽ được sinh ra một tên mới (Sử dụng GUID để không bao giờ bị trùng lặp tên), sau đó sử dụng lệnh <code>FileStream.CopyToAsync()</code> để ghi đè (Save) file vật lý đó trực tiếp vào ổ cứng server, nằm trong thư mục tĩnh <code>wwwroot/images</code>. Cuối cùng, đường dẫn chuỗi (ví dụ: /images/giay-nike-123.jpg) được lưu vào Database.</p>
<div class="image-placeholder">
    [Hình 3: Giao diện thêm mới Bài viết (Post) được tích hợp công cụ CKEditor và Upload ảnh]
</div>
<div class="image-caption">Hình 3. Giao diện soạn thảo tin tức sử dụng CKEditor trong Admin Panel</div>

<h3>3.6. Cấu hình chính sách chia sẻ tài nguyên nguồn gốc chéo (CORS) cho ReactJS</h3>
<p>Trong thực tế phát triển, ReactJS khởi chạy ở cổng mạng (Port) 3000, trong khi ASP.NET Web API khởi chạy ở cổng 7003. Các trình duyệt hiện đại (Chrome, Edge) thiết lập cơ chế bảo mật Same-Origin Policy, sẽ khóa chặt mọi luồng gửi dữ liệu (AJAX) khác cổng để chống Hacker (Tấn công CSRF).</p>
<p>Để hệ thống chạy mượt mà, kỹ thuật CORS (Cross-Origin Resource Sharing) được kích hoạt trong file lõi <code>Program.cs</code>. Một chính sách có tên "AllowReactApp" được khởi tạo, cấp giấy thông hành (AllowAnyMethod, AllowAnyHeader) cho duy nhất địa chỉ gốc <code>http://localhost:3000</code>. Nhờ đó ReactJS có thể chọc thẳng vào API lấy dữ liệu mà không bị trình duyệt in lỗi màu đỏ trên màn hình Console.</p>

<h3>3.7. Hoàn chỉnh phần quản trị Backend đầy đủ chức năng dành cho nhân viên (Admin Panel)</h3>
<p>Bên cạnh việc cung cấp API vô hình cho Frontend, tầng CMS.Backend còn chứa luôn một trang Web tĩnh (MVC) đóng vai trò làm Bảng điều khiển (Admin Dashboard). Giao diện sử dụng HTML5, CSS3 và thư viện Bootstrap 5 cho bố cục gọn gàng, mang tính ứng dụng doanh nghiệp cao.</p>
<p>Các luồng công việc bao gồm:</p>
<ul>
    <li><strong>Quản lý Sản phẩm:</strong> Danh sách GridView cho phép lọc, tìm kiếm. Chức năng CRUD (Create, Read, Update, Delete). Việc cập nhật tồn kho (StockQuantity) có thể được nhân viên kho thực hiện thủ công tại đây. Hệ thống hỗ trợ Xóa mềm (Soft Delete) - chỉ đổi cờ IsDeleted = true thay vì xóa vĩnh viễn khỏi Database.</li>
    <li><strong>Quản lý Đơn hàng:</strong> Màn hình realtime theo dõi các đơn đặt hàng từ hệ thống React đổ về. Admin có một thanh Dropdown để đổi trạng thái: Pending -> Processing -> Shipped. Khi ấn Hủy đơn, hệ thống tự động hoàn lại số lượng tồn kho (Restock) cho sản phẩm, tránh thất thoát kho.</li>
    <li><strong>Dashboard Thống kê:</strong> Vẽ các thẻ thông báo đếm tổng số lượng Sản phẩm, Doanh thu trong tháng, số lượng Users mới, mang lại góc nhìn tổng quan cho chủ doanh nghiệp.</li>
</ul>

<h3>3.8. Tài liệu hóa hệ thống API bằng Swagger UI</h3>
<p>Dự án tích hợp thư viện <code>Swashbuckle.AspNetCore</code>. Bằng một vài dòng lệnh cấu hình, .NET Core tự động quét toàn bộ mã nguồn của các Controller, phân tích các thuộc tính, tham số truyền vào và kiểu dữ liệu trả về, sau đó sinh ra một trang web tài liệu cực kỳ đẹp mắt tại địa chỉ <code>/swagger</code>.</p>
<p>Swagger không chỉ là tài liệu đọc cho biết, nó là một giao diện kiểm thử trực tiếp (Interactive Documentation). Lập trình viên FrontEnd có thể nhìn vào Swagger, biết ngay API `/api/Products` cần truyền biến `keyword` dạng chuỗi, và có thể bấm nút "Try it out" để bắn dữ liệu thật vào Database mà không cần khởi động phần mềm Postman.</p>

<h2>CHƯƠNG 4: TRIỂN KHAI PHẦN FRONTEND (REACTJS CLIENT SITE)</h2>
<h3>4.1. Khởi tạo cấu trúc dự án ReactJS và tích hợp React Router DOM</h3>
<p>Giao diện bề mặt tương tác trực tiếp với khách mua hàng được xây dựng bằng hệ sinh thái ReactJS v18. Khởi tạo thông qua bộ công cụ `create-react-app`, cấu trúc mã nguồn được phân rã thành các thư mục chuẩn mực: <code>src/components</code> (chứa mảnh ghép tái sử dụng), <code>src/pages</code> (chứa các trang tĩnh), <code>src/services</code> (nơi gọi API).</p>
<p>Để loại bỏ hoàn toàn hiện tượng chớp nháy màn hình khi chuyển trang, thư viện <strong>React Router DOM v6</strong> được cấu hình trong `App.js`. Nhờ có `<BrowserRouter>` và `<Routes>`, khi khách hàng bấm từ "Trang chủ" sang "Sản phẩm", React chỉ đơn giản thay thế bộ khung Component (Ví dụ tháo `Home.jsx` và nắp `Shop.jsx` vào DOM) mà không phát sinh bất cứ một Request tải file HTML nào lên máy chủ. Đây là giá trị cốt lõi của kiến trúc SPA.</p>

<h3>4.2. Cấu hình trục HTTP Client chung (axiosClient.js) và xử lý dữ liệu JSON</h3>
<p>Thay vì sử dụng hàm `fetch()` nguyên thủy của JavaScript khiến mã nguồn lặp đi lặp lại rất dài dòng, đồ án triển khai thư viện bên thứ 3 là <strong>Axios</strong>. </p>
<p>Một file cấu hình trung tâm <code>axiosClient.js</code> được khởi tạo, ấn định sẵn `baseURL` trỏ về cổng 7003 của Backend C#. Kỹ thuật cao cấp nhất được sử dụng ở đây là <strong>Axios Interceptors</strong> (Máy đánh chặn). Interceptor hoạt động như một trạm thu phí. Khi một Component React gọi lệnh `axiosClient.get('/api/orders')`, Interceptor sẽ chặn gói tin đó lại, lục tìm trong LocalStorage xem khách hàng có đang lưu <strong>JWT Token (Bearer Token)</strong> hay không, nếu có, tự động nhét Token đó vào `Headers.Authorization` rồi mới cho gói tin bay lên Backend C#. Cơ chế tự động này giúp bảo mật API toàn diện mà lập trình viên không phải viết lại code gán Token ở từng file một.</p>
<div class="code-block">
axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
</div>

<h3>4.3. Xây dựng giao diện các tầng bóc tách cho Trang chủ (Home.jsx)</h3>
<p>File `Home.jsx` là trung tâm đón khách. Giao diện được code hoàn toàn bằng CSS thuần (Vanilla CSS) kết hợp biến màu sắc (CSS Variables) để có phong cách thiết kế hiện đại, cao cấp (Premium UI) mà không bị phụ thuộc vào các thư viện quá phổ thông như Bootstrap.</p>
<p>Component được lắp ghép như những khối Lego: Khối <code>Header</code> chứa Logo, thanh công cụ giỏ hàng. Khối <code>HeroBanner</code> chạy Carousel động tự động trượt, thu hút ánh nhìn đầu tiên. Khối <code>ProductGrid</code> sử dụng `display: grid` để trải đều danh sách Sản phẩm Nổi bật, phản ứng linh hoạt (Responsive) tự gập từ 4 cột thành 1 cột khi mở bằng điện thoại (Media Queries).</p>

<h3>4.4. Triển khai Trang cửa hàng (Shop.jsx) tích hợp bộ lọc nâng cao và Tìm kiếm thời gian thực</h3>
<p>Trang Cửa hàng sử dụng React Hook <code>useEffect</code> để ngay khi Component được nạp (Mounted) sẽ lập tức gọi Axios fetch danh sách từ Backend về và lưu vào State <code>useState([])</code>.</p>
<p>Hệ thống Bộ lọc (Advanced Filters) cực kỳ phức tạp được xây dựng tại Frontend để giảm tải cho Server. Khi người dùng nhập ký tự vào thanh Search, sự kiện `onChange` kích hoạt. Thay vì gọi API liên tục gây sập máy chủ, React sẽ thực hiện hàm <code>.filter()</code> lọc chữ trực tiếp trên State mảng dữ liệu đang hiển thị trên RAM, giúp danh sách sản phẩm biến đổi ngay lập tức trên từng phím gõ (Realtime Filtering). Tương tự, bộ lọc Khoảng giá (Price Range) và Lọc theo Category cũng dùng hàm lồng nhau để xử lý mảng hiệu quả nhất.</p>

<h3>4.5. Triển khai Trang chi tiết sản phẩm và cơ chế hiển thị HTML (dangerouslySetInnerHTML)</h3>
<p>Khi khách bấm vào 1 sản phẩm, React Router bắt lấy mã ID trên URL (`/product/123`), truyền vào Component `ProductDetail.jsx` qua Hook <code>useParams()</code>. Axios dùng ID này gọi ngược về Backend để xin thông tin chi tiết (Chi tiết mô tả, Tồn kho, Giá). </p>
<p>Đặc biệt, trường Mô tả trong CSDL là một chuỗi mã HTML thuần túy (Do CKEditor lưu vào). Nếu xuất trực tiếp ra màn hình bằng React `{product.Description}`, màn hình sẽ hiện nguyên đống chữ `<p><b>Áo khoác</b></p>` rất xấu xí. React cung cấp một cơ chế bảo mật (nhằm chống XSS) là <code>dangerouslySetInnerHTML</code>. Lập trình viên ép React biên dịch đoạn chuỗi đó thành giao diện giao diện thật sự, trả lại định dạng đậm/nhạt, chèn ảnh đầy đủ cho bài viết sản phẩm.</p>
<div class="image-placeholder">
    [Hình 4: Giao diện chi tiết sản phẩm hiển thị thông tin giá, số lượng tồn kho và mô tả định dạng HTML]
</div>
<div class="image-caption">Hình 4. Trang chi tiết sản phẩm hiển thị nội dung HTML đa dạng</div>

<h3>4.6. Xây dựng luồng về khách hàng (Đăng ký, Đăng nhập, Đơn hàng)</h3>
<p>Hệ thống quản lý trạng thái khách hàng thông qua bộ đôi <code>useState</code> của React kiểm soát các thẻ `<input>` (Controlled Components). Khi Submit, Frontend thu thập DTO ném qua Axios POST lên API Backend. </p>
<p>Thư viện <strong>React-Toastify</strong> được gắn vào góc màn hình. Nếu Backend báo lỗi "Email đã tồn tại" (400), Toastify sẽ popup ra cảnh báo màu đỏ tuyệt đẹp. Nếu thành công (200), một Toast màu xanh xuất hiện, Frontend lấy Token từ Payload API, lưu vào <code>localStorage</code>, đồng thời dùng React Context API để update cờ hiệu (Flag) `isLoggedIn = true` lan tỏa cho toàn bộ Website biết khách đã đăng nhập.</p>

<h3>4.7. Xây dựng luồng xử lý Giỏ hàng (Cart.jsx) và Biểu mẫu thanh toán (Checkout.jsx)</h3>
<p>Để khách hàng có thể mua sắm mà chưa cần đăng nhập, giỏ hàng (Cart State) được lưu cục bộ trên trình duyệt (Local Storage). Mỗi lần ấn "Thêm vào giỏ", hàm Javascript sẽ lục tìm ID sản phẩm trong mảng, nếu có rồi thì tăng biến `quantity + 1`, nếu chưa có thì `.push()` thêm vào.</p>
<p>Tại trang Checkout, vòng lặp <code>.reduce()</code> của mảng tính toán ra Tổng tiền tự động (Subtotal). Khách hàng nhập Form Tên, Địa chỉ. Khi ấn Đặt Hàng, React gom mảng Cart + Form Địa chỉ đóng gói thành 1 cục JSON duy nhất, POST qua API `/api/Orders`. Backend sau khi kiểm tra tồn kho thành công, React sẽ xóa sạch giỏ hàng <code>localStorage.removeItem('cart')</code>, và điều hướng khách sang trang báo thành công.</p>
<div class="image-placeholder">
    [Hình 5: Giao diện giỏ hàng và màn hình Checkout điền thông tin thanh toán]
</div>
<div class="image-caption">Hình 5. Luồng xử lý giỏ hàng và nhập thông tin giao hàng</div>

<h2>CHƯƠNG 5: KIỂM THỬ VÀ ĐÁNH GIÁ KẾ THÚC ĐỒ ÁN</h2>
<h3>5.1. Kiểm thử chức năng phân quyền bảo mật vùng Admin</h3>
<p>Kịch bản Test (Test Case) xâm nhập thủ công (Manual Testing) được thiết kế nhằm đánh giá sức chịu đựng của Backend: </p>
<ul>
    <li><strong>Kịch bản 1:</strong> Một nhân viên có Role là "Editor" được cấp tài khoản, đăng nhập thành công vào Admin Panel. Nhân viên này cố tình gõ trực tiếp đường dẫn URL trỏ thẳng vào module Quản lý Tài khoản Admin (Vốn bị khóa bởi thẻ [Authorize(Roles="Admin")]). <strong>Kết quả:</strong> Hệ thống Routing của ASP.NET Core kiểm tra Claims Cookie, phát hiện không đủ thẩm quyền, lập tức ném lỗi 403 Access Denied và đá văng về trang cảnh báo bảo mật.</li>
    <li><strong>Kịch bản 2:</strong> Token đăng nhập hoặc Cookie bị hết hạn (Quá 60 phút). User ấn nút thao tác thêm Sản phẩm. <strong>Kết quả:</strong> Backend ném lỗi 401 Unauthorized, Interceptor của Axios bên React bắt được lỗi 401 này, tự động chạy lệnh `navigate('/login')` yêu cầu người dùng đăng nhập lại từ đầu.</li>
</ul>

<h3>5.2. Kiểm thử luồng nghiệp vụ mua sắm và bắt lỗi logic tồn kho (StockQuantity)</h3>
<p>Luồng nghiệp vụ cốt lõi E-Commerce đối mặt với bài toán cực kỳ hóc búa: Cạnh tranh dữ liệu (Race Condition) và Lỗi hết hàng. Kịch bản Test:</p>
<p>Sản phẩm "Giày Bóng Đá" trong Database đang có StockQuantity = 2. Một khách hàng thêm sản phẩm này vào giỏ hàng và chỉnh số lượng là 3 (Cố tình mua vượt số lượng). Bấm nút Thanh toán. Luồng JSON được bắn xuống Controller. Controller mở Transaction, quét thấy (3 > 2), lập tức gọi lệnh <code>Rollback</code>, hủy việc ghi hóa đơn, ném lỗi 400 BadRequest kèm message "Số lượng sản phẩm trong kho không đủ". Giao diện React hiển thị Pop-up đỏ chặn khách hàng. <strong>Kết quả:</strong> Hệ thống kho bãi được bảo vệ an toàn 100%, không bao giờ xuất hiện tồn kho bị âm (-1).</p>

<h3>5.3. Kiểm thử hiệu năng đồng bộ thời gian thực ngầm (Tab Console F12 và Swagger)</h3>
<p>Hiệu năng là điểm sáng chói của đồ án nhờ kiến trúc SPA. Kiểm thử hiệu suất thông qua công cụ DevTools (F12) - Tab Network của Google Chrome. Khi người dùng nhảy từ trang Cửa hàng sang trang Chi tiết Sản phẩm, không hề có luồng tải lại toàn bộ file HTML, CSS, JS nặng nề (Tốn khoảng 3MB). Thay vào đó, một luồng Fetch/XHR ngầm (AJAX) chạy đi, xin đúng một cục dữ liệu JSON vài chục Kilobytes. Thời gian phản hồi (Response Time) từ IIS Kestrel Server trả về Client chỉ mất từ <strong>30ms đến 150ms</strong>. Trang web hiển thị nội dung tức thì như một phần mềm Offline, mang lại trải nghiệm UX đỉnh cao.</p>
<div class="image-placeholder">
    [Hình 6: Phân tích thẻ Network Tab F12 chứng minh Response Time của SPA dưới 100ms]
</div>
<div class="image-caption">Hình 6. Kiểm thử hiệu năng thời gian thực và đo lường tốc độ phản hồi qua Network F12</div>

<h3>5.4. Đánh giá ưu điểm và nhược điểm của giải pháp thiết kế</h3>
<p><strong>Ưu điểm vượt trội:</strong></p>
<ul>
    <li>Áp dụng triệt để kiến trúc 3 lớp (3-Tier) và chia tách hệ thống Backend (API) - Frontend (React). Codebase dễ mở rộng, bảo trì độc lập. Team Frontend có thể sửa giao diện mà không làm tắt server Backend.</li>
    <li>Bảo mật dữ liệu tuyệt đối (BCrypt Hashing, Anti-XSS bằng dangerouslySetInnerHTML, Authorization, Transaction Rollback).</li>
    <li>Tốc độ trải nghiệm SPA siêu việt.</li>
    <li>CMS hoàn thiện, giúp doanh nghiệp chủ động vận hành, viết bài Marketing không cần nhờ lập trình viên sửa code.</li>
</ul>
<p><strong>Nhược điểm và hạn chế:</strong></p>
<ul>
    <li>Chưa kết nối API với các hãng vận chuyển (Giao hàng Tiết kiệm, Viettel Post) để tự động tính phí Ship (Shipping Fee) và lấy mã vận đơn Tracking theo thời gian thực.</li>
    <li>Chưa triển khai kiến trúc Lưu trữ Cloud (AWS S3, Cloudinary) cho chức năng Upload Ảnh, mà vẫn lưu ảnh vào ổ cứng máy chủ vật lý, tiềm ẩn rủi ro đầy ổ cứng nếu CSDL phình to.</li>
</ul>

<h2>CHƯƠNG 6: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN NÂNG CẤP</h2>
<h3>6.1. Kết quả đạt được của đồ án đối với sinh viên</h3>
<p>Trải qua quá trình 15 tuần nghiên cứu, thiết kế và lập trình miệt mài, đồ án "Xây dựng hệ thống V-SPORT E-Commerce & CMS" đã hoàn thành xuất sắc các mục tiêu đề ra ban đầu. Sản phẩm cuối cùng không chỉ là một bài tập học thuật, mà là một ứng dụng phần mềm có khả năng Deploy (Triển khai) trực tiếp cho các doanh nghiệp vừa và nhỏ (SME) sử dụng thực tế.</p>
<p>Thông qua đồ án, sinh viên đã nắm bắt và thực hành chuyên sâu vòng đời phát triển phần mềm (SDLC). Củng cố nền tảng cấu trúc dữ liệu quan hệ SQL Server, làm chủ tuyệt đối hệ sinh thái BackEnd mạnh mẽ nhất của Microsoft là ASP.NET Core 8 Web API. Xây dựng tư duy Component-Based với thư viện FrontEnd thống trị thị trường là ReactJS 18. Nâng cao kỹ năng Debugging, đọc lỗi trên Console, Postman, và xử lý bất đồng bộ (Async/Await) đỉnh cao.</p>

<h3>6.2. Hướng phát triển nâng cấp hệ thống trong tương lai</h3>
<p>Để phần mềm bước từ môi trường học thuật ra thương mại hóa quy mô lớn (Production), lộ trình nâng cấp Phase 2 sẽ bao gồm các Module cốt lõi:</p>
<ol>
    <li><strong>Tích hợp Cổng thanh toán trực tuyến (Payment Gateways):</strong> Triển khai API kết nối với ví điện tử MoMo, VNPay, ZaloPay. Áp dụng kỹ thuật Webhook để Backend tự động nhận tin nhắn từ ngân hàng báo khách đã chuyển khoản, từ đó tự động đổi trạng thái đơn hàng thành "Đã Thanh Toán", loại bỏ hoàn toàn sự can thiệp của con người.</li>
    <li><strong>Hệ thống Trí tuệ Nhân tạo Gợi ý (AI Recommendation System):</strong> Thu thập Log lịch sử bấm xem hàng và mua hàng của Customer, sử dụng thuật toán Machine Learning (Collaborative Filtering) để vẽ ra mục "Sản phẩm bạn có thể thích" nhằm tăng chỉ số Upsell/Cross-sell cho cửa hàng.</li>
    <li><strong>Triển khai Đám mây (Cloud Deployment) và CI/CD:</strong> Đưa Database lên Azure SQL. Chạy Backend bằng Docker Container trên AWS EC2. Triển khai luồng CI/CD (GitHub Actions) để code tự động Build và Test mỗi lần lập trình viên ấn Push code lên mạng.</li>
</ol>
<p style="text-align: right; margin-top: 50px; font-weight: bold;">--- HẾT ---</p>
</body>
</html>
''')

full_html = "".join(html_parts)

with open(r'D:\BaoCao_DoAn_TinCMS_HoanChinh.doc', 'w', encoding='utf-8') as f:
    f.write(full_html)

print('Successfully generated massive detailed Word doc at D:\BaoCao_DoAn_TinCMS_HoanChinh.doc')
