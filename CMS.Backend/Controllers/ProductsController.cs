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
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products
                .Where(p => !p.IsDeleted)
                .Include(p => p.CategoryProduct)
                .OrderByDescending(p => p.Id)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId,
                    categoryProduct = p.CategoryProduct == null ? null : new {
                        p.CategoryProduct.Id,
                        p.CategoryProduct.Name
                    }
                })
                .ToListAsync();

            return Ok(products);
        }

        // GET: api/Products/categoryproduct/5
        [HttpGet("categoryproduct/{categoryProductId}")]
        public async Task<IActionResult> GetByCategoryProduct(int categoryProductId)
        {
            var products = await _context.Products
                .Where(p => p.CategoryProductId == categoryProductId && !p.IsDeleted)
                .ToListAsync();

            return Ok(products);
        }
        
        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm này trong hệ thống" });
            }

            return Ok(product);
        }

        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDetail), new { id = product.Id }, product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest(new { message = "ID không khớp" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Products.AnyAsync(p => p.Id == id))
                {
                    return NotFound(new { message = "Không tìm thấy sản phẩm này để cập nhật" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm này để xóa" });
            }

            // Kiểm tra ràng buộc FK: Sản phẩm đang nằm trong đơn hàng nào đó thì không cho xóa
            var isInOrder = await _context.OrderDetails.AnyAsync(od => od.ProductId == id);
            if (isInOrder)
            {
                return BadRequest(new { message = "Không thể xóa sản phẩm này vì đang tồn tại trong lịch sử đơn hàng. Vui lòng xóa các chi tiết đơn hàng liên quan trước." });
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa sản phẩm thành công" });
        }
    }
}
