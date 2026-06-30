using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;
using CMS.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using X.PagedList;

namespace CMS.Backend.Controllers
{
    [Authorize]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int? page)
        {
            int pageSize = 10;
            int pageNumber = page ?? 1;
            
            var allOrders = _context.Orders.Include(o => o.Customer).OrderByDescending(o => o.OrderDate);
            ViewBag.Pending = allOrders.Count(o => o.Status == 0);
            ViewBag.Delivering = allOrders.Count(o => o.Status == 1);
            ViewBag.Done = allOrders.Count(o => o.Status == 2);
            ViewBag.TotalOrders = allOrders.Count();

            var data = allOrders.ToPagedList(pageNumber, pageSize); 
            return View(data);
        }

        public IActionResult Details(int id)
        {
            var order = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .FirstOrDefault(o => o.Id == id);
                
            if (order == null) return NotFound();
            
            return View(order);
        }

        [HttpPost]
        public IActionResult UpdateStatus(int id, int status)
        {
            var order = _context.Orders.Find(id);
            if (order != null)
            {
                order.Status = status;
                _context.SaveChanges();
            }
            // Trở về trang chi tiết
            return RedirectToAction("Details", new { id = id });
        }

        [HttpPost]
        public IActionResult RemoveItem(int orderDetailId, int orderId)
        {
            var detail = _context.OrderDetails.FirstOrDefault(d => d.Id == orderDetailId && d.OrderId == orderId);
            if (detail != null)
            {
                _context.OrderDetails.Remove(detail);
                _context.SaveChanges();
            }
            return RedirectToAction("Details", new { id = orderId });
        }

        [HttpPost]
        public IActionResult UpdateItemQuantity(int orderDetailId, int orderId, int quantity)
        {
            var detail = _context.OrderDetails.FirstOrDefault(d => d.Id == orderDetailId && d.OrderId == orderId);
            if (detail != null && quantity > 0)
            {
                detail.Quantity = quantity;
                _context.SaveChanges();
            }
            return RedirectToAction("Details", new { id = orderId });
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.CustomerList = new SelectList(_context.Customers, "Id", "FullName");
            return View();
        }

        [HttpPost]
        public IActionResult Create(Order model)
        {
            if (ModelState.IsValid)
            {
                _context.Orders.Add(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CustomerList = new SelectList(_context.Customers, "Id", "FullName", model.CustomerId);
            return View(model);
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var order = _context.Orders.Find(id);
            if (order == null) return NotFound();
            
            ViewBag.CustomerList = new SelectList(_context.Customers, "Id", "FullName", order.CustomerId);
            return View(order);
        }

        [HttpPost]
        public IActionResult Edit(Order model)
        {
            if (ModelState.IsValid)
            {
                var order = _context.Orders.FirstOrDefault(o => o.Id == model.Id);
                if (order == null) return NotFound();

                order.CustomerId = model.CustomerId;
                order.OrderDate = model.OrderDate;
                order.Status = model.Status;
                order.Notes = model.Notes;

                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CustomerList = new SelectList(_context.Customers, "Id", "FullName", model.CustomerId);
            return View(model);
        }

        public IActionResult Delete(int id)
        {
            var order = _context.Orders.Find(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
