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
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.Categories
                .OrderBy(c => c.Id)
                .Select(c => new {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .ToListAsync();
            return Ok(categories);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var category = await _context.Categories
                .Select(c => new {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound(new { message = "Không tìm thấy danh mục bài viết này" });
            }

            return Ok(category);
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDetail), new { id = category.Id }, category);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Category category)
        {
            if (id != category.Id)
            {
                return BadRequest(new { message = "ID không khớp" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Categories.AnyAsync(c => c.Id == id))
                {
                    return NotFound(new { message = "Không tìm thấy danh mục bài viết này để cập nhật" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound(new { message = "Không tìm thấy danh mục bài viết này để xóa" });
            }

            // Kiểm tra ràng buộc FK: Danh mục còn chứa bài viết con thì không cho xóa
            var hasPosts = await _context.Posts.AnyAsync(p => p.CategoryId == id);
            if (hasPosts)
            {
                return BadRequest(new { message = "Không thể xóa danh mục này vì vẫn còn bài viết thuộc danh mục. Vui lòng xóa hết bài viết trước." });
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa danh mục bài viết thành công" });
        }
    }
}
