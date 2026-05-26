// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities;
using CMS.Data;

namespace CMS.Backend.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // Lấy dữ liệu THẬT từ bảng Categories trong SQL
            var data = _context.Categories.ToList(); 
            return View(data);
        }
    }
}
