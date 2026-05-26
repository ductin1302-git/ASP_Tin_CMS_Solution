// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - using Microsoft.AspNetCore.Mvc: Nạp thư viện cốt lõi của bộ điều phối ASP.NET Core MVC
// - using CMS.Data.Entities: Nạp các thực thể dữ liệu thành viên
// - public class UserController : Controller: Khai báo bộ điều khiển quản lý nhân viên, kế thừa lớp Controller
// - public IActionResult Index(): Khai báo hành động Index xử lý hiển thị danh sách nhân sự
// - var users = new List<User>: Tạo danh sách thành viên ảo đại diện cho mock data
// - new User { ... }: Gán các thuộc tính cụ thể (Id, Username, FullName, Role) cho từng thành viên ảo
// - return View(users): Trả về giao diện Index.cshtml kèm theo danh sách thành viên để hiển thị

using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
        // GET: /User
        public IActionResult Index()
        {
            // 1. Tạo danh sách Người dùng giả (Mock Data) lưu thông tin quản trị viên
            var users = new List<User>
            {
                new User 
                { 
                    Id = 1, 
                    Username = "admin_thai", 
                    FullName = "Nguyễn Cao Thái", 
                    Role = "Administrator" 
                },
                new User 
                { 
                    Id = 2, 
                    Username = "editor_01", 
                    FullName = "Trần Văn Biên Tập", 
                    Role = "Editor" 
                },
                new User 
                { 
                    Id = 3, 
                    Username = "author_minh", 
                    FullName = "Lê Quang Minh", 
                    Role = "Author" 
                }
            };

            // 2. Trả về View kèm theo danh sách người dùng để kết nối hiển thị
            return View(users);
        }
    }
}
