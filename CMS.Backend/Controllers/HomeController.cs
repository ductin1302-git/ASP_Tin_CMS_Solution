using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // Truyền thống kê tổng quan lên Dashboard
            ViewBag.TotalProducts    = _context.Products.Count();
            ViewBag.TotalOrders      = _context.Orders.Count();
            ViewBag.TotalCustomers   = _context.Customers.Count();
            ViewBag.TotalCategories  = _context.Categories.Count();
            ViewBag.PendingOrders    = _context.Orders.Count(o => o.Status == 0);
            ViewBag.DeliveringOrders = _context.Orders.Count(o => o.Status == 1);
            ViewBag.DoneOrders       = _context.Orders.Count(o => o.Status == 2);
            ViewBag.TotalPosts       = _context.Posts.Count();

            // Lấy 5 đơn hàng mới nhất
            var latestOrders = _context.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.Id)
                .Take(5)
                .ToList();
            ViewBag.LatestOrders = latestOrders;

            // Lấy 5 sản phẩm tồn kho thấp nhất
            var lowStockProducts = _context.Products
                .OrderBy(p => p.StockQuantity)
                .Take(5)
                .ToList();
            ViewBag.LowStockProducts = lowStockProducts;

            return View();
        }
    }
}
