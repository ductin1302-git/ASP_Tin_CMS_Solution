// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - namespace CMS.Data.Entities: Không gian tên thực thể của dự án
// - public class CategoryProduct: Thực thể danh mục sản phẩm của hệ thống bán hàng
// - [Key]: Khai báo khóa chính Id của thực thể
// - public int Id { get; set; }: Khóa chính Id định danh tự động tăng
// - [Required]: Ràng buộc bắt buộc nhập tên danh mục, không được bỏ trống
// - [StringLength(100)]: Ràng buộc độ dài chuỗi tên danh mục tối đa 100 ký tự
// - public string Name { get; set; }: Trường lưu tên danh mục sản phẩm
// - public string? Description { get; set; }: Trường lưu mô tả danh mục (cho phép rỗng null)
// - public virtual ICollection<Product>? Products: Mối quan hệ 1-N (Một danh mục sản phẩm chứa danh sách nhiều sản phẩm liên quan)

using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    public class CategoryProduct
    {
        [Key]
        public int Id { get; set; } // Khóa chính

        [Required(ErrorMessage = "Tên danh mục không được để trống")]
        [StringLength(100)]
        public string Name { get; set; } // Tên danh mục sản phẩm bắt buộc nhập

        public string? Description { get; set; } // Mô tả tùy chọn

        // Thiết lập mối quan hệ 1-N: Liên kết danh mục với nhiều sản phẩm con
        public virtual ICollection<Product>? Products { get; set; }
    }
}
