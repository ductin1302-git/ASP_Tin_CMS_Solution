using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data; 
using CMS.Data.Entities;
using System.Threading.Tasks;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. API Đăng ký tài khoản Khách hàng
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO model)
        {
            if (model == null || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest(new { message = "Dữ liệu không hợp lệ." });
            }

            // Kiểm tra xem Email đã tồn tại trong bảng Customers chưa
            var emailExists = await _context.Customers.AnyAsync(c => c.Email.ToLower() == model.Email.ToLower());
            if (emailExists)
            {
                return BadRequest(new { message = "Email này đã được sử dụng. Vui lòng chọn Email khác." });
            }

            // Tạo đối tượng Customer mới (Lưu mật khẩu thô theo yêu cầu)
            var newCustomer = new Customer
            {
                FullName = model.FullName,
                Email = model.Email,
                Phone = model.Phone,
                Address = model.Address,
                Gender = model.Gender,
                DateOfBirth = model.DateOfBirth,
                Password = model.Password
            };

            _context.Customers.Add(newCustomer);
            await _context.SaveChangesAsync();

            // Trả về thông tự cơ bản sau khi đăng ký thành công
            return StatusCode(201, new { 
                message = "Đăng ký thành công!",
                user = new {
                    id = newCustomer.Id,
                    fullName = newCustomer.FullName,
                    email = newCustomer.Email,
                    phone = newCustomer.Phone,
                    address = newCustomer.Address,
                    gender = newCustomer.Gender,
                    dateOfBirth = newCustomer.DateOfBirth,
                    avatarUrl = newCustomer.AvatarUrl
                }
            });
        }

        // 2. API Đăng nhập Khách hàng
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            if (model == null || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest(new { message = "Vui lòng nhập Email và Mật khẩu." });
            }

            // Tìm Khách hàng có khớp Email và Password
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Email.ToLower() == model.Email.ToLower() && c.Password == model.Password);

            if (customer == null)
            {
                return Unauthorized(new { message = "Email hoặc Mật khẩu không chính xác." });
            }

            // Trả về thông tin người dùng (Không trả về password)
            return Ok(new {
                message = "Đăng nhập thành công!",
                user = new {
                    id = customer.Id,
                    fullName = customer.FullName,
                    email = customer.Email,
                    phone = customer.Phone,
                    address = customer.Address,
                    gender = customer.Gender,
                    dateOfBirth = customer.DateOfBirth,
                    avatarUrl = customer.AvatarUrl
                }
            });
        }
    }

    // Các lớp DTO để hứng dữ liệu từ React gửi lên
    public class RegisterDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string? Gender { get; set; }
        public System.DateTime? DateOfBirth { get; set; }
        public string Password { get; set; }
    }

    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
