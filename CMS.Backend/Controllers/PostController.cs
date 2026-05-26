using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;
using CMS.Data;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Tham số 'id' được truyền vào từ URL (ví dụ: /Post/Index/5)
        public IActionResult Index(int? id) 
        {
            // 1. Kiểm tra nếu không có id truyền vào thì trả về toàn bộ bài viết (hoặc báo lỗi, theo yc có thể báo lỗi hoặc lấy hết)
            // Trong hướng dẫn ghi "trả về lỗi hoặc toàn bộ bài viết". Để tiện xem, mình sẽ trả về toàn bộ nếu id null, 
            // hoặc làm đúng y đúc:
            /*
            if (id == null) 
            {
                return BadRequest("Vui lòng cung cấp mã danh mục.");
            }
            */
            // Thực tế để test dễ, mình sẽ trả về danh sách đầy đủ nếu id null
            IQueryable<Post> query = _context.Posts.Include(p => p.Category).OrderByDescending(p => p.CreatedDate);
            
            if (id.HasValue)
            {
                query = query.Where(p => p.CategoryId == id.Value);
            }

            var posts = query.ToList();
            return View(posts);
        }

        // GET: Post/Details/5
        public IActionResult Details(int id)
        {
            // 1. Truy vấn bài viết theo ID
            // Sử dụng .Include(p => p.Category) để lấy kèm thông tin Danh mục (Join bảng)
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            // 2. Kiểm tra nếu không tìm thấy bài viết (tránh lỗi màn hình trắng)
            if (post == null)
            {
                return NotFound(); // Trả về trang lỗi 404
            }

            // 3. Truyền dữ liệu sang View
            return View(post);
        }
    }
}
