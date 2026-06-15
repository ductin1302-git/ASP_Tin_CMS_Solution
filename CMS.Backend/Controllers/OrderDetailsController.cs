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
    public class OrderDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderDetails
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var details = await _context.OrderDetails
                .Include(od => od.Product)
                .OrderByDescending(od => od.Id)
                .Select(od => new {
                    od.Id,
                    od.OrderId,
                    od.ProductId,
                    ProductName = od.Product != null ? od.Product.Name : null,
                    od.Quantity,
                    od.UnitPrice,
                    TotalPrice = od.Quantity * od.UnitPrice
                })
                .ToListAsync();

            return Ok(details);
        }

        // GET: api/OrderDetails/order/5
        [HttpGet("order/{orderId}")]
        public async Task<IActionResult> GetByOrder(int orderId)
        {
            var details = await _context.OrderDetails
                .Include(od => od.Product)
                .Where(od => od.OrderId == orderId)
                .Select(od => new {
                    od.Id,
                    od.OrderId,
                    od.ProductId,
                    ProductName = od.Product != null ? od.Product.Name : null,
                    od.Quantity,
                    od.UnitPrice,
                    TotalPrice = od.Quantity * od.UnitPrice
                })
                .ToListAsync();

            return Ok(details);
        }

        // POST: api/OrderDetails
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrderDetail detail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kiểm tra tồn tại Order và Product
            var orderExists = await _context.Orders.AnyAsync(o => o.Id == detail.OrderId);
            if (!orderExists)
            {
                return BadRequest(new { message = "Đơn hàng không tồn tại" });
            }

            var product = await _context.Products.FindAsync(detail.ProductId);
            if (product == null)
            {
                return BadRequest(new { message = "Sản phẩm không tồn tại" });
            }

            // Trừ tồn kho
            if (product.StockQuantity < detail.Quantity)
            {
                return BadRequest(new { message = $"Sản phẩm '{product.Name}' không đủ tồn kho (Còn {product.StockQuantity})" });
            }
            product.StockQuantity -= detail.Quantity;

            _context.OrderDetails.Add(detail);
            _context.Products.Update(product);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = detail.Id }, detail);
        }

        // PUT: api/OrderDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OrderDetail detail)
        {
            if (id != detail.Id)
            {
                return BadRequest(new { message = "ID không khớp" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingDetail = await _context.OrderDetails.AsNoTracking().FirstOrDefaultAsync(od => od.Id == id);
            if (existingDetail == null)
            {
                return NotFound(new { message = "Không tìm thấy chi tiết đơn hàng này" });
            }

            var product = await _context.Products.FindAsync(detail.ProductId);
            if (product != null)
            {
                // Tính toán lại tồn kho: hoàn trả số lượng cũ, trừ số lượng mới
                int stockDifference = detail.Quantity - existingDetail.Quantity;
                if (product.StockQuantity < stockDifference)
                {
                    return BadRequest(new { message = $"Sản phẩm '{product.Name}' không đủ tồn kho để thay đổi số lượng (Còn {product.StockQuantity})" });
                }
                product.StockQuantity -= stockDifference;
                _context.Products.Update(product);
            }

            _context.Entry(detail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.OrderDetails.AnyAsync(od => od.Id == id))
                {
                    return NotFound(new { message = "Không tìm thấy chi tiết đơn hàng này để cập nhật" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/OrderDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var detail = await _context.OrderDetails.FindAsync(id);
            if (detail == null)
            {
                return NotFound(new { message = "Không tìm thấy chi tiết đơn hàng này để xóa" });
            }

            // Hoàn lại số lượng tồn kho
            var product = await _context.Products.FindAsync(detail.ProductId);
            if (product != null)
            {
                product.StockQuantity += detail.Quantity;
                _context.Products.Update(product);
            }

            _context.OrderDetails.Remove(detail);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa chi tiết đơn hàng thành công, tồn kho sản phẩm đã được hoàn lại" });
        }
    }
}
