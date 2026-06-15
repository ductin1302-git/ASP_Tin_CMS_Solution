// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;
using System.Threading.Tasks;
using System;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/contacts
        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] ContactDTO model)
        {
            if (model == null || string.IsNullOrEmpty(model.Name) || string.IsNullOrEmpty(model.Email) || 
                string.IsNullOrEmpty(model.Phone) || string.IsNullOrEmpty(model.Subject) || string.IsNullOrEmpty(model.Message))
            {
                return BadRequest(new { message = "Dữ liệu liên hệ không đầy đủ hoặc không hợp lệ." });
            }

            var contact = new Contact
            {
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                Subject = model.Subject,
                Message = model.Message,
                CreatedDate = DateTime.Now,
                IsRead = false
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return StatusCode(201, new { message = "Gửi ý kiến liên hệ thành công!" });
        }
    }

    public class ContactDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
