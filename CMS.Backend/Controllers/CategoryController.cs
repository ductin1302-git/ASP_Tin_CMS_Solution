// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - using Microsoft.AspNetCore.Mvc: Nạp thư viện điều hướng và xử lý của ASP.NET Core MVC
// - using CMS.Data.Entities: Nạp thư viện chứa các lớp thực thể (models) để trao đổi dữ liệu
// - namespace CMS.Backend.Controllers: Khai báo không gian tên quản lý các Controller của Backend
// - public class CategoryController : Controller: Khai báo bộ điều phối quản lý danh mục kế thừa lớp Controller
// - public IActionResult Index(): Khai báo hành động Index xử lý yêu cầu GET hiển thị danh sách
// - var list = new List<Category>: Tạo mới danh sách đối tượng Category làm dữ liệu giả lập (Mock Data)
// - new Category { ... }: Khởi tạo các phần tử danh mục ảo cho danh sách
// - return View(list): Trả về View tương ứng và chuyển dữ liệu danh sách sang giao diện hiển thị HTML

using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    public class CategoryController : Controller
    {
        // GET: /Category
        public IActionResult Index()
        {
            // Tạo lập danh sách danh mục mẫu trực tiếp để truyền lên giao diện
            var list = new List<Category> {
                new Category { Id = 1, Name = "Tin Công Nghệ", Description = "Review Laptop, AI" },
                new Category { Id = 2, Name = "Giáo Dục", Description = "Thông tin tuyển sinh" }
            };
            
            return View(list); // Trả về giao diện kèm theo danh sách dữ liệu mẫu
        }
    }
}
