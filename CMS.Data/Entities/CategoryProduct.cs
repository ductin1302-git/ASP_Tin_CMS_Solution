using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Data.Entities
{
    public class CategoryProduct
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên danh mục không được để trống")]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public virtual CategoryProduct? Parent { get; set; }

        public virtual ICollection<CategoryProduct>? Children { get; set; }

        public virtual ICollection<Product>? Products { get; set; }
    }
}
