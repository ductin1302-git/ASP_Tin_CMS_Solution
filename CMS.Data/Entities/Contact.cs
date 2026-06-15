// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
using System;

namespace CMS.Data.Entities
{
    public class Contact
    {
        public int Id { get; set; } // Khóa chính tự sinh
        public string Name { get; set; } // Họ và tên khách hàng gửi liên hệ
        public string Email { get; set; } // Địa chỉ email liên hệ
        public string Phone { get; set; } // Số điện thoại liên hệ
        public string Subject { get; set; } // Tiêu đề tin nhắn phản hồi
        public string Message { get; set; } // Nội dung tin nhắn chi tiết
        public DateTime CreatedDate { get; set; } = DateTime.Now; // Ngày gửi phản hồi
        public bool IsRead { get; set; } = false; // Trạng thái đã đọc hay chưa
    }
}
