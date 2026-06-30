using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data; 
using CMS.Data.Entities;
using System.Threading.Tasks;
using System.Linq;
using System;
using Microsoft.Extensions.Caching.Memory;
using CMS.Backend.Services;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _cache;
        private readonly IEmailService _emailService;

        public AuthController(ApplicationDbContext context, IMemoryCache cache, IEmailService emailService)
        {
            _context = context;
            _cache = cache;
            _emailService = emailService;
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { message = "Vui lòng cung cấp Email." });
            }

            var emailExists = await _context.Customers.AnyAsync(c => c.Email.ToLower() == request.Email.ToLower());
            if (emailExists)
            {
                return BadRequest(new { message = "Email này đã được sử dụng. Vui lòng chọn Email khác." });
            }

            Random rnd = new Random();
            string otp = rnd.Next(100000, 999999).ToString();

            _cache.Set(request.Email.ToLower(), otp, TimeSpan.FromMinutes(3));

            string subject = "Mã xác nhận Đăng ký tài khoản V-SPORT";
            string body = $@"
                <h3>Chào bạn,</h3>
                <p>Mã xác nhận (OTP) để đăng ký tài khoản của bạn là: <strong style='font-size: 24px; color: #e63946;'>{otp}</strong></p>
                <p>Mã này sẽ hết hạn trong vòng <strong>3 phút</strong>.</p>
                <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.</p>
                <br/>
                <p>Trân trọng,<br/>V-SPORT Team</p>
            ";
            await _emailService.SendEmailAsync(request.Email, subject, body);

            return Ok(new { message = "Mã OTP đã được gửi đến Email của bạn." });
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

            // Tạo đối tượng Customer mới (Mã hóa mật khẩu BCrypt)
            var newCustomer = new Customer
            {
                FullName = model.FullName,
                Email = model.Email,
                Phone = model.Phone,
                Address = model.Address,
                Gender = model.Gender,
                DateOfBirth = model.DateOfBirth,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password)
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

            // Tìm Khách hàng có khớp Email
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Email.ToLower() == model.Email.ToLower());

            bool isPasswordValid = false;
            if (customer != null)
            {
                try {
                    isPasswordValid = BCrypt.Net.BCrypt.Verify(model.Password, customer.Password);
                } catch {
                    // Mật khẩu cũ chưa được mã hóa BCrypt
                    if (customer.Password == model.Password) {
                        isPasswordValid = true;
                        // Tự động nâng cấp lên BCrypt
                        customer.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
                        await _context.SaveChangesAsync();
                    }
                }
            }

            if (!isPasswordValid)
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

        [HttpPost("request-password-reset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] ForgotPasswordRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new { message = "Vui lòng nhập Email." });
            }

            var normalizedEmail = request.Email.Trim().ToLower();
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email.ToLower() == normalizedEmail);
            if (customer == null)
            {
                return Ok(new { message = "Nếu Email tồn tại, mã đặt lại mật khẩu đã được gửi." });
            }

            var otp = new Random().Next(100000, 999999).ToString();
            _cache.Set($"reset-password:{normalizedEmail}", otp, TimeSpan.FromMinutes(10));

            var subject = "Mã đặt lại mật khẩu V-SPORT";
            var body = $@"
                <h3>Xin chào {customer.FullName},</h3>
                <p>Mã đặt lại mật khẩu V-SPORT của bạn là:</p>
                <p><strong style='font-size: 26px; color: #e5092f;'>{otp}</strong></p>
                <p>Mã này có hiệu lực trong 10 phút. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
                <p>Trân trọng,<br/>V-SPORT Team</p>";

            await _emailService.SendEmailAsync(customer.Email, subject, body);
            return Ok(new { message = "Nếu Email tồn tại, mã đặt lại mật khẩu đã được gửi." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Otp) ||
                string.IsNullOrWhiteSpace(request.NewPassword))
            {
                return BadRequest(new { message = "Vui lòng nhập đầy đủ Email, mã OTP và mật khẩu mới." });
            }

            if (request.NewPassword.Length < 8)
            {
                return BadRequest(new { message = "Mật khẩu mới phải có tối thiểu 8 ký tự." });
            }

            var normalizedEmail = request.Email.Trim().ToLower();
            var cacheKey = $"reset-password:{normalizedEmail}";
            if (!_cache.TryGetValue(cacheKey, out string? cachedOtp) || cachedOtp != request.Otp.Trim())
            {
                return BadRequest(new { message = "Mã OTP không hợp lệ hoặc đã hết hạn." });
            }

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email.ToLower() == normalizedEmail);
            if (customer == null)
            {
                return BadRequest(new { message = "Không tìm thấy tài khoản cần đặt lại mật khẩu." });
            }

            customer.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            _cache.Remove(cacheKey);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đặt lại mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới." });
        }
    }

    // Các lớp DTO để hứng dữ liệu từ React gửi lên
    public class SendOtpRequest
    {
        public string Email { get; set; }
    }

    public class RegisterDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public System.DateTime? DateOfBirth { get; set; }
        public string Password { get; set; }
    }

    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ForgotPasswordRequest
    {
        public string Email { get; set; }
    }

    public class ResetPasswordRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
        public string NewPassword { get; set; }
    }
}
