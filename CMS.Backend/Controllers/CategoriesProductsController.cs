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
    public class CategoriesProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CategoriesProducts
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var categories = await _context.CategoriesProducts
                    .OrderBy(c => c.Id)
                    .Select(c => new {
                        c.Id,
                        c.Name,
                        c.Description
                    })
                    .ToListAsync();

                return Ok(categories);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { 
                    message = "Lỗi kết nối cơ sở dữ liệu hệ thống", 
                    detail = ex.Message 
                });
            }
        }

        // GET: api/CategoriesProducts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var category = await _context.CategoriesProducts
                .Select(c => new {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound(new { message = "Không tìm thấy danh mục sản phẩm này" });
            }

            return Ok(category);
        }

        // POST: api/CategoriesProducts
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryProduct categoryProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CategoriesProducts.Add(categoryProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDetail), new { id = categoryProduct.Id }, categoryProduct);
        }

        // PUT: api/CategoriesProducts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CategoryProduct categoryProduct)
        {
            if (id != categoryProduct.Id)
            {
                return BadRequest(new { message = "ID không khớp" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(categoryProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.CategoriesProducts.AnyAsync(c => c.Id == id))
                {
                    return NotFound(new { message = "Không tìm thấy danh mục sản phẩm này để cập nhật" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/CategoriesProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var categoryProduct = await _context.CategoriesProducts.FindAsync(id);
            if (categoryProduct == null)
            {
                return NotFound(new { message = "Không tìm thấy danh mục sản phẩm này để xóa" });
            }

            // Kiểm tra ràng buộc FK: Còn sản phẩm thuộc danh mục này thì không cho xóa
            var hasProducts = await _context.Products.AnyAsync(p => p.CategoryProductId == id);
            if (hasProducts)
            {
                return BadRequest(new { message = "Không thể xóa danh mục sản phẩm này vì vẫn còn sản phẩm thuộc danh mục. Vui lòng xóa hoặc chuyển sản phẩm sang danh mục khác trước." });
            }

            _context.CategoriesProducts.Remove(categoryProduct);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa danh mục sản phẩm thành công" });
        }
    }
}
