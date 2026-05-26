// ==========================================
// Họ tên: Phan Thanh Đức Tín
// MSSV: 2123110173
// ==========================================
// GIẢI THÍCH CHI TIẾT TỪNG DÒNG CODE:
// - namespace CMS.Data.Entities: Định nghĩa không gian tên nhóm các thực thể của lớp dữ liệu CMS
// - public class Category: Khai báo lớp thực thể đại diện cho bảng Danh mục tin tức trong CSDL
// - public int Id { get; set; }: Khai báo khóa chính Id tự động tăng kiểu số nguyên
// - public string Name { get; set; }: Khai báo trường tên danh mục kiểu chuỗi
// - public string Description { get; set; }: Khai báo trường mô tả chi tiết danh mục kiểu chuỗi
// - public virtual ICollection<Post> Posts { get; set; }: Thiết lập quan hệ 1-Nhiều (Một danh mục chứa nhiều bài viết)

using System;
using System.Collections.Generic;

namespace CMS.Data.Entities
{
    public class Category
    {
        public int Id { get; set; } // Khóa chính của bảng Danh mục
        public string Name { get; set; } // Tên danh mục (vd: Tin Giáo Dục)
        public string Description { get; set; } // Mô tả chi tiết danh mục

        // Khai báo quan hệ: Một danh mục có thể liên kết với nhiều thực thể bài viết khác nhau
        public virtual ICollection<Post> Posts { get; set; }
    }
}

