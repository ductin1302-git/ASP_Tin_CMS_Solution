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
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users
                .OrderBy(u => u.Id)
                .Select(u => new {
                    u.Id,
                    u.Username,
                    u.FullName,
                    u.Role
                    // Ẩn mật khẩu vì lý do bảo mật
                })
                .ToListAsync();
            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var user = await _context.Users
                .Select(u => new {
                    u.Id,
                    u.Username,
                    u.FullName,
                    u.Role
                })
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound(new { message = "Không tìm thấy tài khoản quản trị này" });
            }

            return Ok(user);
        }

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kiểm tra trùng username
            var usernameExists = await _context.Users.AnyAsync(u => u.Username.ToLower() == user.Username.ToLower());
            if (usernameExists)
            {
                return BadRequest(new { message = "Tên đăng nhập đã được sử dụng" });
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var response = new {
                user.Id,
                user.Username,
                user.FullName,
                user.Role
            };

            return CreatedAtAction(nameof(GetDetail), new { id = user.Id }, response);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserUpdateDTO userDto)
        {
            if (id != userDto.Id)
            {
                return BadRequest(new { message = "ID không khớp" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound(new { message = "Không tìm thấy tài khoản quản trị này để cập nhật" });
            }

            // Kiểm tra trùng tên đăng nhập với người khác
            var usernameExists = await _context.Users.AnyAsync(u => u.Username.ToLower() == userDto.Username.ToLower() && u.Id != id);
            if (usernameExists)
            {
                return BadRequest(new { message = "Tên đăng nhập đã được sử dụng bởi người dùng khác" });
            }

            user.Username = userDto.Username;
            user.FullName = userDto.FullName;
            user.Role = userDto.Role;

            // Nếu người dùng nhập mật khẩu mới thì cập nhật
            if (!string.IsNullOrEmpty(userDto.NewPassword))
            {
                user.PasswordHash = userDto.NewPassword;
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Không tìm thấy tài khoản quản trị để xóa" });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa tài khoản quản trị thành công" });
        }
    }

    public class UserUpdateDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
        public string? NewPassword { get; set; }
    }
}
