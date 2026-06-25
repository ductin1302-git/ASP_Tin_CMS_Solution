using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public CustomersController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _context.Customers
                .OrderBy(c => c.Id)
                .Select(c => new {
                    c.Id,
                    c.FullName,
                    c.Email,
                    c.Phone,
                    c.Address,
                    c.Gender,
                    c.DateOfBirth,
                    c.AvatarUrl
                    // Mật khẩu không hiển thị ở danh sách để bảo mật thông tin
                })
                .ToListAsync();
            return Ok(customers);
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var customer = await _context.Customers
                .Select(c => new {
                    c.Id,
                    c.FullName,
                    c.Email,
                    c.Phone,
                    c.Address,
                    c.Gender,
                    c.DateOfBirth,
                    c.AvatarUrl
                })
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
                return NotFound(new { message = "Không tìm thấy khách hàng này" });
            }

            return Ok(customer);
        }

        // POST: api/Customers
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            // Trả về thông tin ko kèm mật khẩu
            var response = new {
                customer.Id,
                customer.FullName,
                customer.Email,
                customer.Phone,
                customer.Address,
                customer.Gender,
                customer.DateOfBirth,
                customer.AvatarUrl
            };

            return CreatedAtAction(nameof(GetDetail), new { id = customer.Id }, response);
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CustomerUpdateDTO customer)
        {
            if (id != customer.Id)
            {
                return BadRequest(new { message = "ID không khớp" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Lấy thực thể hiện tại trong DB để nếu ko gửi mật khẩu mới thì giữ lại mật khẩu cũ
            var existingCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == id);
            if (existingCustomer == null)
            {
                return NotFound(new { message = "Không tìm thấy khách hàng này để cập nhật" });
            }

            existingCustomer.FullName = customer.FullName;
            existingCustomer.Email = customer.Email;
            existingCustomer.Phone = customer.Phone;
            existingCustomer.Address = customer.Address;
            existingCustomer.Gender = customer.Gender;
            existingCustomer.DateOfBirth = customer.DateOfBirth;

            if (!string.IsNullOrWhiteSpace(customer.Password))
            {
                existingCustomer.Password = customer.Password;
            }
            
            // Giữ nguyên AvatarUrl nếu không gửi lên
            if (!string.IsNullOrWhiteSpace(customer.AvatarUrl))
            {
                existingCustomer.AvatarUrl = customer.AvatarUrl;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Customers.AnyAsync(c => c.Id == id))
                {
                    return NotFound(new { message = "Không tìm thấy khách hàng này để cập nhật" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound(new { message = "Không tìm thấy khách hàng này để xóa" });
            }

            // Kiểm tra ràng buộc FK: Khách hàng còn có đơn hàng thì không cho xóa
            var hasOrders = await _context.Orders.AnyAsync(o => o.CustomerId == id);
            if (hasOrders)
            {
                return BadRequest(new { message = "Không thể xóa khách hàng này vì vẫn còn lịch sử đơn hàng. Vui lòng xóa các đơn hàng của khách hàng trước." });
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa khách hàng thành công" });
        }

        // POST: api/Customers/5/avatar
        [HttpPost("{id}/avatar")]
        public async Task<IActionResult> UploadAvatar(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "Không tìm thấy file ảnh" });
            }

            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound(new { message = "Không tìm thấy khách hàng này" });
            }

            var uploadsFolder = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "uploads", "avatars");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            customer.AvatarUrl = "/uploads/avatars/" + uniqueFileName;
            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật ảnh đại diện thành công", avatarUrl = customer.AvatarUrl });
        }
    }

    public class CustomerUpdateDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? AvatarUrl { get; set; }
        public string? Password { get; set; }
    }
}
