using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;
using CMS.Data;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var data = _context.Customers.ToList(); 
            return View(data);
        }
    }
}
