// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - using Microsoft.AspNetCore.Mvc: Nạp các thành phần lớp nền MVC của Microsoft
// - using CMS.Data.Entities: Nạp các thực thể dữ liệu bài viết
// - public class PostController : Controller: Khai báo lớp Controller xử lý luồng bài viết
// - public IActionResult Index(): Trả về view danh sách các bài viết ảo (dữ liệu mock)
// - var posts = new List<Post> { ... }: Tạo lập dữ liệu ảo các bài viết, khởi tạo Title, Content, ImageUrl, CreatedDate
// - public IActionResult Details(int id): Trả về chi tiết bài viết dựa trên tham số định danh id
// - if (id == 1) { ... }: So khớp id bài viết được click để gán dữ liệu chi tiết tương ứng
// - return View(post): Gửi đối tượng bài viết cụ thể sang giao diện Details.cshtml hiển thị

using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        // GET: /Post (Hiển thị danh sách toàn bộ bài viết)
        public IActionResult Index()
        {
            // 1. Khởi tạo danh sách bài viết ảo làm dữ liệu mẫu
            var posts = new List<Post>
            {
                new Post 
                { 
                    Id = 1, 
                    Title = "Lộ trình học ASP.NET Core cho người mới", 
                    Content = "Nội dung bài viết chi tiết về lộ trình học .NET từ cơ bản đến nâng cao bao gồm C#, SQL Server, ASP.NET Core WebAPI và deploy sản phẩm thực tế lên Cloud...",
                    ImageUrl = "https://picsum.photos/id/1/400/250",
                    CreatedDate = DateTime.Now 
                },
                new Post 
                { 
                    Id = 2, 
                    Title = "ReactJS và WebAPI: Xu hướng Fullstack 2026", 
                    Content = "Tìm hiểu tại sao sự kết hợp giữa ASP.NET Core WebAPI ở phía Backend và thư viện ReactJS ở Frontend đang trở thành lựa chọn hàng đầu cho các doanh nghiệp công nghệ lớn...",
                    ImageUrl = "https://picsum.photos/id/60/400/250",
                    CreatedDate = DateTime.Now.AddDays(-1) 
                },
                new Post 
                { 
                    Id = 3, 
                    Title = "Hướng dẫn cài đặt môi trường Visual Studio 2022", 
                    Content = "Các bước cài đặt chi tiết bộ công cụ Visual Studio 2022 mới nhất, cấu hình Workloads cần thiết để chạy ASP.NET Core MVC và Node.js hiệu quả nhất cho sinh viên...",
                    ImageUrl = "https://picsum.photos/id/160/400/250",
                    CreatedDate = DateTime.Now.AddDays(-2) 
                }
            };

            // 2. Chuyển danh sách bài viết này sang View Index
            return View(posts);
        }

        // GET: /Post/Details/{id} (Hiển thị chi tiết một bài viết)
        public IActionResult Details(int id)
        {
            // Giả lập cơ sở dữ liệu tìm kiếm bài viết cụ thể dựa trên ID truyền vào
            string title = "";
            string content = "";
            string img = "";

            if (id == 1)
            {
                title = "Lộ trình học ASP.NET Core cho người mới";
                content = "Chào mừng bạn đến với lộ trình tự học ASP.NET Core! ASP.NET Core là một framework cực kỳ mạnh mẽ, mã nguồn mở và đa nền tảng được phát triển bởi Microsoft để xây dựng các ứng dụng web hiện đại kết nối đám mây. Trong lộ trình này, bạn sẽ đi qua 4 giai đoạn chính: 1) Cú pháp ngôn ngữ C# cơ bản và nâng cao, 2) Hệ quản trị cơ sở dữ liệu SQL Server & Entity Framework Core, 3) ASP.NET Core MVC & RESTful WebAPI, và cuối đóng gói triển khai ứng dụng thực tế. Chúc các bạn học tập tốt và gặt hái nhiều thành công!";
                img = "https://picsum.photos/id/1/800/400";
            }
            else if (id == 2)
            {
                title = "ReactJS và WebAPI: Xu hướng Fullstack 2026";
                content = "Sự kết hợp giữa Backend WebAPI mạnh mẽ của .NET 8/9 và giao diện Client single-page phản ứng cực nhanh của ReactJS đang thống trị thị trường tuyển dụng. Backend chịu trách nhiệm xử lý logic nghiệp vụ, bảo mật, xác thực JWT và tương tác database. Frontend sử dụng các UI components linh động của React, Axios để call APIs và quản lý State mượt mà. Mô hình tách rời hoàn toàn này giúp tăng hiệu năng hệ thống gấp nhiều lần.";
                img = "https://picsum.photos/id/60/800/400";
            }
            else
            {
                title = "Hướng dẫn cài đặt môi trường Visual Studio 2022";
                content = "Visual Studio 2022 là IDE tốt nhất cho việc phát triển ứng dụng .NET. Để bắt đầu học lập trình Fullstack .NET MVC và React, hãy tải Visual Studio 2022 Community (bản miễn phí). Khi cài đặt qua Visual Studio Installer, hãy tích chọn các Workload quan trọng: 'ASP.NET and web development' và '.NET desktop development'. Đồng thời, bạn cũng nên cài đặt môi trường Node.js LTS độc lập bên ngoài để hỗ trợ chạy các câu lệnh npm cho ReactJS.";
                img = "https://picsum.photos/id/160/800/400";
            }

            var post = new Post 
            { 
                Id = id, 
                Title = title, 
                Content = content,
                ImageUrl = img,
                CreatedDate = DateTime.Now.AddDays(-id + 1)
            };

            return View(post); // Trả về giao diện chi tiết kèm theo đối tượng bài viết vừa tạo
        }
    }
}


