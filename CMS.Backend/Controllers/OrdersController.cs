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
        private readonly CMS.Backend.Services.IEmailService _emailService;

        public OrdersController(ApplicationDbContext context, CMS.Backend.Services.IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int? status = null,
            [FromQuery] string? keyword = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 1000)
        {
            var query = _context.Orders
                .Include(o => o.Customer)
                .AsQueryable();

            if (status.HasValue)
            {
                query = query.Where(o => o.Status == status.Value);
            }
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(o => (o.Notes != null && o.Notes.Contains(keyword)) || (o.DeliveryAddress != null && o.DeliveryAddress.Contains(keyword)) || (o.Customer != null && o.Customer.FullName.Contains(keyword)));
            }

            var orders = await query
                .OrderByDescending(o => o.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(o => new {
                    o.Id,
                    o.OrderDate,
                    o.CustomerId,
                    CustomerName = o.Customer != null ? o.Customer.FullName : null,
                    o.Status,
                    o.Notes,
                    o.PaymentMethod,
                    o.IsPaid,
                    o.DeliveryAddress
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
                    o.PaymentMethod,
                    o.IsPaid,
                    o.DeliveryAddress,
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

        // GET: api/Orders/Customer/5
        [HttpGet("Customer/{customerId}")]
        public async Task<IActionResult> GetByCustomer(int customerId)
        {
            var orders = await _context.Orders
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
                .Where(o => o.CustomerId == customerId)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    o.PaymentMethod,
                    o.IsPaid,
                    o.DeliveryAddress,
                    TotalAmount = o.OrderDetails.Sum(od => od.Quantity * od.UnitPrice),
                    OrderDetails = o.OrderDetails.Select(od => new {
                        od.Id,
                        od.ProductId,
                        ProductName = od.Product != null ? od.Product.Name : null,
                        ProductImage = od.Product != null ? od.Product.ImageUrl : null,
                        od.Quantity,
                        od.UnitPrice,
                        TotalPrice = od.Quantity * od.UnitPrice
                    })
                })
                .ToListAsync();

            return Ok(orders);
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
                    Notes = input.Notes,
                    PaymentMethod = string.IsNullOrEmpty(input.PaymentMethod) ? "COD" : input.PaymentMethod,
                    IsPaid = input.IsPaid,
                    DeliveryAddress = input.DeliveryAddress
                };

                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                decimal totalAmount = 0;
                string orderDetailsHtml = "";

                foreach (var detail in input.OrderDetails)
                {
                    var product = await _context.Products.FindAsync(detail.ProductId);
                    if (product == null || product.IsDeleted)
                    {
                        await transaction.RollbackAsync();
                        return BadRequest(new { message = $"Sản phẩm '{detail.ProductId}' không tồn tại hoặc đã bị xóa. Vui lòng xóa khỏi giỏ hàng." });
                    }

                    if (product.StockQuantity < detail.Quantity)
                    {
                        await transaction.RollbackAsync();
                        return BadRequest(new { message = $"Sản phẩm '{product.Name}' không đủ số lượng tồn kho (Chỉ còn {product.StockQuantity})." });
                    }

                    product.StockQuantity -= detail.Quantity;
                    // Không cần _context.Products.Update(product); vì product đã được theo dõi (tracked) bởi _context

                    var newDetail = new OrderDetail
                    {
                        OrderId = newOrder.Id,
                        ProductId = detail.ProductId,
                        Quantity = detail.Quantity,
                        UnitPrice = detail.UnitPrice
                    };
                    _context.OrderDetails.Add(newDetail);

                    decimal lineTotal = detail.Quantity * detail.UnitPrice;
                    totalAmount += lineTotal;
                    
                    orderDetailsHtml += $@"
                    <tr style='border-bottom: 1px solid #eee;'>
                        <td style='padding: 10px 0; color: #333;'>{product.Name}</td>
                        <td style='text-align: center; padding: 10px 0; color: #333;'>{detail.Quantity}</td>
                        <td style='text-align: right; padding: 10px 0; color: #333;'>{detail.UnitPrice:N0} VND</td>
                        <td style='text-align: right; padding: 10px 0; color: #333;'>{lineTotal:N0} VND</td>
                    </tr>";
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                // Gửi Email thông báo đơn hàng
                try
                {
                    var customer = await _context.Customers.FindAsync(input.CustomerId);
                    if (customer != null && !string.IsNullOrEmpty(customer.Email))
                    {
                        var htmlMessage = $@"
                        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);'>
                            <div style='text-align: center; margin-bottom: 10px;'>
                                <img src='https://cdn-icons-png.flaticon.com/512/3233/3233483.png' width='45' height='45' style='vertical-align: middle; margin-right: 8px;' alt='Logo' />
                                <span style='color: #a81d22; font-size: 26px; font-weight: 900; font-style: italic; vertical-align: middle;'>V-SPORT</span>
                            </div>
                            <p style='text-align: center; color: #555; font-size: 14px; margin-top: 0;'>Cam on ban da dat hang tai V-SPORT!</p>
                            <hr style='border-top: 2px solid #a81d22; margin-bottom: 20px;' />
                            
                            <p>Kinh chao <strong>{customer.FullName}</strong>,</p>
                            <p>Yeu cau dat hang cua ban da duoc tiep nhan va dang duoc xu ly.</p>
                            
                            <h3 style='font-size: 16px; margin-top: 20px; color: #333;'>Thong tin don hang #{newOrder.Id}</h3>
                            <hr style='border-top: 1px solid #eee;' />
                            
                            <p style='color: #333;'><strong>Ngay dat:</strong> {newOrder.OrderDate:dd/MM/yyyy HH:mm}</p>
                            <p style='color: #333;'><strong>Dia chi giao hang:</strong> Nguoi nhan: {customer.FullName} - {customer.Phone} Dia chi: {newOrder.DeliveryAddress}</p>
                            <p style='color: #333;'><strong>Thoi gian giao hang:</strong> Giao ngay</p>
                            <p style='color: #333;'><strong>Ghi chu:</strong> {(string.IsNullOrEmpty(newOrder.Notes) ? "Khong co" : newOrder.Notes)}</p>
                            
                            <h3 style='font-size: 16px; margin-top: 20px; color: #333;'>Chi tiet san pham</h3>
                            <table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>
                                <thead>
                                    <tr style='border-top: 1px solid #eee; border-bottom: 1px solid #eee;'>
                                        <th style='text-align: left; padding: 10px 0; color: #333;'>San pham</th>
                                        <th style='text-align: center; padding: 10px 0; color: #333;'>SL</th>
                                        <th style='text-align: right; padding: 10px 0; color: #333;'>Don gia</th>
                                        <th style='text-align: right; padding: 10px 0; color: #333;'>Thanh tien</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetailsHtml}
                                </tbody>
                                <tfoot>
                                    <tr style='border-top: 1px solid #eee; font-weight: bold;'>
                                        <td colspan='3' style='text-align: right; padding: 10px 0; color: #333;'>Tong cong:</td>
                                        <td style='text-align: right; padding: 10px 0; color: #a81d22;'>{totalAmount:N0} VND</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>";

                        await _emailService.SendEmailAsync(customer.Email, $"Hoa don don hang #{newOrder.Id} tu V-SPORT", htmlMessage);
                    }
                }
                catch (Exception emailEx)
                {
                    Console.WriteLine("Lỗi gửi Email: " + emailEx.Message);
                    // Không rollback transaction vì đơn hàng đã thành công, chỉ rớt gửi mail
                }

                return StatusCode(201, new { 
                    message = "Đặt hàng thành công!", 
                    orderId = newOrder.Id 
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                Console.WriteLine("================ ERROR CREATE ORDER ================");
                Console.WriteLine(ex.ToString());
                if (ex.InnerException != null)
                {
                    Console.WriteLine("INNER: " + ex.InnerException.ToString());
                }
                Console.WriteLine("====================================================");
                return StatusCode(500, new { message = "Lỗi xử lý tạo đơn hàng ngầm", detail = ex.InnerException?.Message ?? ex.Message });
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
        public string? PaymentMethod { get; set; }
        public bool IsPaid { get; set; }
        public string? DeliveryAddress { get; set; }
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
