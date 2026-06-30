using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;
using CMS.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
namespace CMS.Backend.Controllers
{
    [Authorize]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var data = _context.OrderDetails
                .Include(od => od.Order)
                .Include(od => od.Product)
                .ToList(); 
            return View(data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.OrderList = new SelectList(_context.Orders, "Id", "Id");
            ViewBag.ProductList = new SelectList(_context.Products, "Id", "Name");
            return View();
        }

        [HttpPost]
        public IActionResult Create(OrderDetail model)
        {
            if (ModelState.IsValid)
            {
                // Tự động lấy giá hiện tại của sản phẩm nếu cần thiết, hoặc lấy từ form
                _context.OrderDetails.Add(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.OrderList = new SelectList(_context.Orders, "Id", "Id", model.OrderId);
            ViewBag.ProductList = new SelectList(_context.Products, "Id", "Name", model.ProductId);
            return View(model);
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var orderDetail = _context.OrderDetails.Find(id);
            if (orderDetail == null) return NotFound();
            
            ViewBag.OrderList = new SelectList(_context.Orders, "Id", "Id", orderDetail.OrderId);
            ViewBag.ProductList = new SelectList(_context.Products, "Id", "Name", orderDetail.ProductId);
            return View(orderDetail);
        }

        [HttpPost]
        public IActionResult Edit(OrderDetail model)
        {
            if (ModelState.IsValid)
            {
                var orderDetail = _context.OrderDetails.FirstOrDefault(od => od.Id == model.Id);
                if (orderDetail == null) return NotFound();

                orderDetail.OrderId = model.OrderId;
                orderDetail.ProductId = model.ProductId;
                orderDetail.Quantity = model.Quantity;
                orderDetail.UnitPrice = model.UnitPrice;

                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.OrderList = new SelectList(_context.Orders, "Id", "Id", model.OrderId);
            ViewBag.ProductList = new SelectList(_context.Products, "Id", "Name", model.ProductId);
            return View(model);
        }

        public IActionResult Delete(int id)
        {
            var orderDetail = _context.OrderDetails.Find(id);
            if (orderDetail != null)
            {
                _context.OrderDetails.Remove(orderDetail);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
