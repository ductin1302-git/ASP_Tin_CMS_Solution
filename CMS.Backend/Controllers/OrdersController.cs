using Microsoft.AspNetCore.Mvc;
using CMS.Data; 
using CMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _context.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.Id)
                .Select(o => new {
                    o.Id,
                    o.OrderDate,
                    o.CustomerId,
                    CustomerName = o.Customer != null ? o.Customer.FullName : null,
                    o.Status,
                    o.Notes
                })
                .ToListAsync();

            return Ok(orders);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
                .Select(o => new {
                    o.Id,
                    o.OrderDate,
                    o.CustomerId,
                    CustomerName = o.Customer != null ? o.Customer.FullName : null,
                    CustomerEmail = o.Customer != null ? o.Customer.Email : null,
                    CustomerPhone = o.Customer != null ? o.Customer.Phone : null,
                    CustomerAddress = o.Customer != null ? o.Customer.Address : null,
                    o.Status,
                    o.Notes,
                    OrderDetails = o.OrderDetails.Select(od => new {
                        od.Id,
                        od.ProductId,
                        ProductName = od.Product != null ? od.Product.Name : null,
                        od.Quantity,
                        od.UnitPrice,
                        TotalPrice = od.Quantity * od.UnitPrice
                    })
                })
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng này" });
            }

            return Ok(order);
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInputDTO input)
        {
            if (input == null || input.OrderDetails == null || !input.OrderDetails.Any())
            {
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ hoặc giỏ hàng trống" });
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var newOrder = new Order
                {
                    OrderDate = DateTime.Now,
                    CustomerId = input.CustomerId,
                    Status = 0, // 0: Mặc định đơn hàng mới ở trạng thái "Chờ xử lý"
                    Notes = input.Notes
                };

                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                foreach (var detail in input.OrderDetails)
                {
                    var product = await _context.Products.FindAsync(detail.ProductId);
                    if (product == null)
                    {
                        throw new Exception($"Không tìm thấy sản phẩm có ID: {detail.ProductId}");
                    }

                    if (product.StockQuantity < detail.Quantity)
                    {
                        throw new Exception($"Sản phẩm '{product.Name}' không đủ số lượng tồn kho (Chỉ còn {product.StockQuantity}).");
                    }

                    product.StockQuantity -= detail.Quantity;
                    _context.Products.Update(product);

                    var newDetail = new OrderDetail
                    {
                        OrderId = newOrder.Id,
                        ProductId = detail.ProductId,
                        Quantity = detail.Quantity,
                        UnitPrice = detail.UnitPrice
                    };
                    _context.OrderDetails.Add(newDetail);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return StatusCode(201, new { 
                    message = "Đặt hàng thành công!", 
                    orderId = newOrder.Id 
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Lỗi xử lý tạo đơn hàng ngầm", detail = ex.Message });
            }
        }

        // PUT: api/Orders/5 (Cập nhật trạng thái đơn hàng)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] OrderStatusUpdateDTO statusDto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng" });
            }

            // Trạng thái đơn hàng (0: Chờ duyệt, 1: Đang giao, 2: Đã xong)
            if (statusDto.Status < 0 || statusDto.Status > 2)
            {
                return BadRequest(new { message = "Trạng thái không hợp lệ. Trạng thái phải từ 0 đến 2." });
            }

            order.Status = statusDto.Status;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật trạng thái đơn hàng thành công" });
        }

        // DELETE: api/Orders/5 (Hủy/xóa đơn hàng)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderDetails).FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng để hủy" });
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Hoàn lại số lượng tồn kho của các sản phẩm trong đơn hàng
                foreach (var detail in order.OrderDetails)
                {
                    var product = await _context.Products.FindAsync(detail.ProductId);
                    if (product != null)
                    {
                        product.StockQuantity += detail.Quantity;
                        _context.Products.Update(product);
                    }
                }

                // Xóa chi tiết đơn hàng
                _context.OrderDetails.RemoveRange(order.OrderDetails);

                // Xóa đơn hàng
                _context.Orders.Remove(order);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { message = "Hủy và xóa đơn hàng thành công, tồn kho sản phẩm đã được hoàn lại" });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Lỗi xử lý hủy đơn hàng", detail = ex.Message });
            }
        }
    }

    public class OrderInputDTO
    {
        public int CustomerId { get; set; }
        public string? Notes { get; set; }
        public List<OrderDetailInputDTO> OrderDetails { get; set; }
    }

    public class OrderDetailInputDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class OrderStatusUpdateDTO
    {
        public int Status { get; set; }
    }
}
