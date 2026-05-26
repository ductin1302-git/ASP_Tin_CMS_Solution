// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - namespace CMS.Data.Entities: Định nghĩa không gian tên nhóm các thực thể của lớp dữ liệu CMS
// - public class Post: Khai báo lớp thực thể đại diện cho bảng Bài viết trong CSDL
// - public int Id { get; set; }: Khóa chính Id kiểu số nguyên tự động tăng
// - public string Title { get; set; }: Tiêu đề bài viết kiểu chuỗi
// - public string Content { get; set; }: Nội dung chi tiết của bài viết kiểu chuỗi
// - public string ImageUrl { get; set; }: Đường dẫn URL hình ảnh đại diện của bài viết kiểu chuỗi
// - public DateTime CreatedDate { get; set; } = DateTime.Now: Khai báo ngày tạo bài viết, mặc định lấy thời gian hiện tại
// - public int CategoryId { get; set; }: Trường khóa ngoại nối tới bảng Category
// - public virtual Category Category { get; set; }: Đối tượng ảo liên kết quan hệ N-1 (Nhiều bài viết thuộc một danh mục)

using System;

namespace CMS.Data.Entities
{
    public class Post
    {
        public int Id { get; set; } // Khóa chính tự sinh
        public string Title { get; set; } // Tiêu đề của bài viết tin tức
        public string Content { get; set; } // Nội dung chi tiết văn bản bài viết
        public string ImageUrl { get; set; } // Đường dẫn URL lưu hình ảnh bài viết
        public DateTime CreatedDate { get; set; } = DateTime.Now; // Ngày đăng bài viết mặc định hiện tại

        // Khóa ngoại liên kết trực tiếp tới danh mục chuyên mục bài viết
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; } // Thuộc tính điều hướng liên kết quan hệ 1-N
    }
}
