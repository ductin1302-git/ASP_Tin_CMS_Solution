using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Data.Entities
{
    public class Menu
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string LinkUrl { get; set; } = string.Empty;

        public int DisplayOrder { get; set; }

        public bool IsActive { get; set; }

        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public virtual Menu? Parent { get; set; }

        public virtual ICollection<Menu>? Children { get; set; }
    }
}
