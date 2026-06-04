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

        /// <summary>
        /// API: Tiếp nhận đơn đặt hàng từ giỏ hàng FrontEnd gửi lên
        /// Đường dẫn: POST https://localhost:xxxx/api/Orders
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInputDTO input)
        {
            // 1. Kiểm tra kịch bản lỗi bảo vệ: Nếu dữ liệu truyền lên trống rỗng
            if (input == null || input.OrderDetails == null || !input.OrderDetails.Any())
            {
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ hoặc giỏ hàng trống" });
            }

            // Mở Transaction để đảm bảo nếu lỗi ở giữa chừng, sẽ hoàn tác toàn bộ thao tác (Rollback)
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Bước A: Tự động khởi tạo cấu trúc thực thể Đơn hàng mới
                var newOrder = new Order
                {
                    OrderDate = DateTime.Now,
                    CustomerId = input.CustomerId,
                    Status = 0, // 0: Mặc định đơn hàng mới ở trạng thái "Chờ xử lý"
                    Notes = input.Notes
                };

                // Lưu Order để lấy Id tự tăng
                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                // Bước B: Xử lý từng sản phẩm trong giỏ hàng
                foreach (var detail in input.OrderDetails)
                {
                    // Quét tìm sản phẩm thật trong DB
                    var product = await _context.Products.FindAsync(detail.ProductId);
                    if (product == null)
                    {
                        throw new Exception($"Không tìm thấy sản phẩm có ID: {detail.ProductId}");
                    }

                    // Kiểm tra tồn kho
                    if (product.StockQuantity < detail.Quantity)
                    {
                        throw new Exception($"Sản phẩm '{product.Name}' không đủ số lượng tồn kho (Chỉ còn {product.StockQuantity}).");
                    }

                    // Trừ tồn kho
                    product.StockQuantity -= detail.Quantity;
                    _context.Products.Update(product);

                    // Thêm dữ liệu vào bảng OrderDetail (Chi tiết Đơn Hàng)
                    var newDetail = new OrderDetail
                    {
                        OrderId = newOrder.Id,
                        ProductId = detail.ProductId,
                        Quantity = detail.Quantity,
                        UnitPrice = detail.UnitPrice
                    };
                    _context.OrderDetails.Add(newDetail);
                }

                // Cập nhật tất cả sự thay đổi vào DB một lần cuối
                await _context.SaveChangesAsync();
                
                // Xác nhận giao dịch thành công (Commit)
                await transaction.CommitAsync();

                // Trả về mã thành công 201 Created và ID đơn hàng
                return StatusCode(201, new { 
                    message = "Đặt hàng thành công!", 
                    orderId = newOrder.Id 
                });
            }
            catch (Exception ex)
            {
                // Nếu có bất cứ lỗi gì xảy ra, hoàn tác lại DB nguyên vẹn
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Lỗi xử lý tạo đơn hàng ngầm", detail = ex.Message });
            }
        }
    }

    // LỚP DTO ĐỂ HỨNG DỮ LIỆU TỔNG QUÁT TỪ FRONTEND TRUYỀN LÊN
    public class OrderInputDTO
    {
        public int CustomerId { get; set; }
        public string Notes { get; set; }
        public List<OrderDetailInputDTO> OrderDetails { get; set; }
    }

    // LỚP DTO ĐỂ HỨNG CHI TIẾT TỪNG SẢN PHẨM TRONG GIỎ
    public class OrderDetailInputDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
