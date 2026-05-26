// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - namespace CMS.Data.Entities: Không gian tên chứa thực thể dữ liệu CMS
// - public class OrderDetail: Thực thể chi tiết dòng sản phẩm được mua trong đơn hàng
// - [Key]: Khai báo khóa chính Id của thực thể
// - public int Id { get; set; }: Khóa chính của bảng Chi tiết đơn hàng tự động tăng
// - public int OrderId { get; set; }: Khóa ngoại tham chiếu trực tiếp đến thực thể Order
// - public int ProductId { get; set; }: Khóa ngoại tham chiếu trực tiếp đến thực thể Product
// - public int Quantity { get; set; }: Số lượng sản phẩm khách hàng đặt mua kiểu số nguyên
// - [Column(TypeName = "decimal(18,2)")]: Định dạng giá bán thập phân tại thời điểm mua hàng
// - [ForeignKey("OrderId")]: Ràng buộc khóa ngoại trỏ tới thực thể Order
// - [ForeignKey("ProductId")]: Ràng buộc khóa ngoại trỏ tới thực thể Product

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Data.Entities
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; } // Khóa chính chi tiết đơn hàng

        public int OrderId { get; set; } // Khóa ngoại trỏ đến Đơn hàng

        public int ProductId { get; set; } // Khóa ngoại trỏ đến Sản phẩm

        public int Quantity { get; set; } // Số lượng mua

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; } // Giá tại thời điểm mua thực tế

        [ForeignKey("OrderId")]
        public virtual Order? Order { get; set; } // Liên kết đối tượng Order N-1

        [ForeignKey("ProductId")]
        public virtual Product? Product { get; set; } // Liên kết đối tượng Product N-1
    }
}
