using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    public class About
    {
        [Key]
        public int Id { get; set; }

        public string SectionName { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string? Subtitle { get; set; }

        public string Content { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }
    }
}
