using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BannersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Banners/{pageName}
        [HttpGet("{pageName?}")]
        public async Task<ActionResult<IEnumerable<Banner>>> GetBanners(string pageName = "Home")
        {
            var banners = await _context.Banners
                .Where(b => b.IsActive && b.PageName.ToLower() == pageName.ToLower())
                .OrderBy(b => b.DisplayOrder)
                .ToListAsync();

            return Ok(banners);
        }
    }
}
