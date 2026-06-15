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
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context; 
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _context.Posts
                .OrderByDescending(p => p.Id)
                .Select(p => new {            
                    p.Id, 
                    p.Title, 
                    p.ImageUrl, 
                    p.CreatedDate,
                    CategoryName = p.Category.Name
                })
                .ToListAsync();

            return Ok(posts); 
        }

        // GET: api/Posts/category/5
        [HttpGet("category/{categoryId}")] 
        public async Task<IActionResult> GetByCategory(int categoryId)
        {
            var posts = await _context.Posts
                .Where(p => p.CategoryId == categoryId) 
                .Select(p => new { 
                    p.Id, 
                    p.Title, 
                    p.ImageUrl, 
                    p.CreatedDate
                })
                .ToListAsync();

            return Ok(posts); 
        }

        // GET: api/Posts/5
        [HttpGet("{id}")] 
        public async Task<IActionResult> GetDetail(int id)
        {
            var post = await _context.Posts
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null) 
            {
                return NotFound(new { message = "Không tìm thấy bài viết này trong hệ thống" });
            }

            return Ok(post); 
        }

        // POST: api/Posts
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDetail), new { id = post.Id }, post);
        }

        // PUT: api/Posts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Post post)
        {
            if (id != post.Id)
            {
                return BadRequest(new { message = "ID không khớp" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Posts.AnyAsync(p => p.Id == id))
                {
                    return NotFound(new { message = "Không tìm thấy bài viết này để cập nhật" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound(new { message = "Không tìm thấy bài viết này để xóa" });
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa bài viết thành công" });
        }
    }
}
