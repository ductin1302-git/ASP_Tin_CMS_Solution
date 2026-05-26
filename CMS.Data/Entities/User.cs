// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - namespace CMS.Data.Entities: Không gian tên chứa thực thể dữ liệu CMS
// - public class User: Khớp dữ liệu thực thể Người dùng quản trị hệ thống
// - public int Id { get; set; }: Khóa chính Id định danh duy nhất của người dùng
// - public string Username { get; set; }: Tên tài khoản dùng để đăng nhập kiểu chuỗi
// - public string PasswordHash { get; set; }: Mã hóa bảo mật của mật khẩu người dùng kiểu chuỗi
// - public string FullName { get; set; }: Họ và tên đầy đủ hiển thị kiểu chuỗi
// - public string Role { get; set; }: Vai trò/Quyền hạn truy cập của người dùng (Administrator/Editor)

namespace CMS.Data.Entities
{
    public class User
    {
        public int Id { get; set; } // Khóa chính định danh
        public string Username { get; set; } // Tên tài khoản
        public string PasswordHash { get; set; } // Mật khẩu mã hóa băm bảo mật
        public string FullName { get; set; } // Tên đầy đủ thành viên
        public string Role { get; set; } // Chức vụ quản trị viên/biên tập viên
    }
}
