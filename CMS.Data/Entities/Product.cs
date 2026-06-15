// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - namespace CMS.Data.Entities: Không gian tên thực thể của dự án
// - public class Product: Thực thể sản phẩm trong cơ sở dữ liệu
// - [Key]: Khai báo khóa chính Id của thực thể
// - [Required]: Yêu cầu bắt buộc nhập tên sản phẩm, không được rỗng
// - [Range(0, double.MaxValue)]: Giá của sản phẩm phải là số dương lớn hơn hoặc bằng 0
// - [Column(TypeName = "decimal(18,2)")]: Lưu trữ giá tiền dưới dạng số thập phân có độ chính xác cao (18 chữ số, 2 số thập phân sau dấu phẩy)
// - public decimal Price { get; set; }: Trường lưu trữ giá tiền sản phẩm
// - public int StockQuantity { get; set; }: Trường lưu trữ số lượng hàng tồn kho kiểu số nguyên
// - public int CategoryProductId { get; set; }: Khóa ngoại liên kết tới bảng CategoryProduct
// - [ForeignKey("CategoryProductId")]: Định nghĩa tường minh khóa ngoại trong Entity Framework Core
// - public virtual CategoryProduct? CategoryProduct: Thiết lập quan hệ N-1 (Nhiều sản phẩm thuộc một danh mục sản phẩm)

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Data.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; } // Khóa chính tự tăng

        [Required(ErrorMessage = "Tên sản phẩm không được để trống")]
        public string Name { get; set; } // Tên sản phẩm bắt buộc nhập

        public string? Description { get; set; } // Mô tả sản phẩm

        [Range(0, double.MaxValue)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; } // Giá tiền sản phẩm thập phân chính xác

        public int StockQuantity { get; set; } // Số lượng trong kho hàng

        public string? ImageUrl { get; set; } // URL ảnh sản phẩm

        // Khóa ngoại liên kết trực tiếp tới danh mục sản phẩm
        public int CategoryProductId { get; set; }

        [ForeignKey("CategoryProductId")]
        public virtual CategoryProduct? CategoryProduct { get; set; } // Quan hệ liên kết N-1

        // Flag cho tính năng xóa tạm (Soft Delete)
        public bool IsDeleted { get; set; } = false;
    }
}
