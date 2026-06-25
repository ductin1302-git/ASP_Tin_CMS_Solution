// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - namespace CMS.Data.Entities: Không gian tên thực thể của dự án
// - public class Customer: Thực thể thông tin Khách hàng đăng ký mua sắm
// - [Key]: Khai báo khóa chính Id của thực thể
// - [Required]: Các trường FullName, Email, Password bắt buộc phải nhập dữ liệu
// - [EmailAddress]: Định dạng kiểm tra tính chính xác của địa chỉ Email (phải chứa @ và tên miền)
// - public string? Phone { get; set; }: Số điện thoại cho phép giá trị null
// - public string? Address { get; set; }: Địa chỉ giao nhận hàng tùy chọn
// - public string Password { get; set; }: Lưu mật khẩu thô theo yêu cầu tối giản bài tập
// - public virtual ICollection<Order>? Orders: Mối quan hệ 1-N (Một khách hàng có lịch sử chứa nhiều đơn hàng Orders khác nhau)

using System;
using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    // Lớp thực thể Khách hàng
    public class Customer
    {
        [Key]
        public int Id { get; set; } // Khóa chính khách hàng

        [Required]
        public string FullName { get; set; } // Họ và tên bắt buộc

        [Required]
        [EmailAddress]
        public string Email { get; set; } // Địa chỉ Email bắt buộc chuẩn format

        public string? Phone { get; set; } // Số điện thoại tùy chọn

        public string? Address { get; set; } // Địa chỉ giao hàng tùy chọn

        public string? Gender { get; set; } // Giới tính (Nam, Nữ, Khác)

        public DateTime? DateOfBirth { get; set; } // Ngày sinh

        public string? AvatarUrl { get; set; } // Link ảnh đại diện

        [Required]
        public string Password { get; set; } // Lưu mật khẩu thô tối giản

        // Khai báo mối quan hệ 1-N: Khách hàng liên kết với nhiều Đơn hàng
        public virtual ICollection<Order>? Orders { get; set; }
    }
}
