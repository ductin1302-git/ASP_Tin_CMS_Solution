// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - namespace CMS.Data.Entities: Không gian tên chứa thực thể dữ liệu CMS
// - public class Order: Thực thể đơn đặt hàng của khách hàng
// - [Key]: Khai báo khóa chính Id của thực thể
// - public int Id { get; set; }: Khóa chính của bảng Đơn hàng tự động tăng
// - public DateTime OrderDate { get; set; } = DateTime.Now: Thời gian tạo đơn hàng mặc định lấy ngày giờ hiện tại
// - public int CustomerId { get; set; }: Khóa ngoại tham chiếu trực tiếp đến thực thể Customer
// - public int Status { get; set; }: Trạng thái đơn hàng kiểu số nguyên (0: Chờ duyệt, 1: Đang giao, 2: Đã xong)
// - [ForeignKey("CustomerId")]: Khai báo ràng buộc khóa ngoại nối tới thực thể Customer
// - public virtual ICollection<OrderDetail>? OrderDetails: Thiết lập quan hệ 1-N (Một đơn hàng chứa danh sách nhiều chi tiết sản phẩm OrderDetail)

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Data.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; } // Khóa chính đơn hàng

        public DateTime OrderDate { get; set; } = DateTime.Now; // Ngày mua mặc định hiện tại

        public int CustomerId { get; set; } // Khóa ngoại khách hàng

        public int Status { get; set; } // Trạng thái đơn hàng (0: Chờ duyệt, 1: Đang giao, 2: Đã xong)

        public string? Notes { get; set; } // Ghi chú đơn hàng

        [ForeignKey("CustomerId")] 
        public virtual Customer? Customer { get; set; } // Thuộc tính liên kết khách hàng N-1

        // Quan hệ 1-N: Một đơn hàng liên kết chứa nhiều dòng sản phẩm chi tiết đơn hàng
        public virtual ICollection<OrderDetail>? OrderDetails { get; set; }
    }
}
