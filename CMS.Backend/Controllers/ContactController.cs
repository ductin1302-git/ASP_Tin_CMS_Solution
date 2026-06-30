using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;
using CMS.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Threading.Tasks;
using X.PagedList;

namespace CMS.Backend.Controllers
{
    [Authorize]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class ContactController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int? page)
        {
            int pageSize = 10;
            int pageNumber = page ?? 1;
            var contacts = _context.Contacts.OrderByDescending(c => c.CreatedDate).ToPagedList(pageNumber, pageSize);
            return View(contacts);
        }

        public async Task<IActionResult> Details(int id)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            if (contact == null)
            {
                return NotFound();
            }

            if (!contact.IsRead)
            {
                contact.IsRead = true;
                _context.Contacts.Update(contact);
                await _context.SaveChangesAsync();
            }

            return View(contact);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction("Index");
        }
    }
}
