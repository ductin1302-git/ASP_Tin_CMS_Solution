using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;
using CMS.Data;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var data = _context.Orders.ToList(); 
            return View(data);
        }
    }
}
