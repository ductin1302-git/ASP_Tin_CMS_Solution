using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class BannerController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public BannerController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: Banner
        public async Task<IActionResult> Index()
        {
            return View(await _context.Banners.OrderBy(b => b.DisplayOrder).ToListAsync());
        }

        // GET: Banner/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Banner/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,LinkUrl,Description,DisplayOrder,IsActive,PageName")] Banner banner, IFormFile? imageFile)
        {
            if (ModelState.IsValid)
            {
                if (imageFile != null && imageFile.Length > 0)
                {
                    string uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "banners");
                    Directory.CreateDirectory(uploadsFolder);
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(fileStream);
                    }
                    banner.ImageUrl = "/uploads/banners/" + uniqueFileName;
                }
                else
                {
                    banner.ImageUrl = ""; // Optional or required based on entity definition.
                }

                _context.Add(banner);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(banner);
        }

        // GET: Banner/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return NotFound();
            var banner = await _context.Banners.FindAsync(id);
            if (banner == null) return NotFound();
            return View(banner);
        }

        // POST: Banner/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,ImageUrl,LinkUrl,Description,DisplayOrder,IsActive,PageName")] Banner banner, IFormFile? imageFile)
        {
            if (id != banner.Id) return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    if (imageFile != null && imageFile.Length > 0)
                    {
                        string uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "banners");
                        Directory.CreateDirectory(uploadsFolder);
                        string uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
                        string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await imageFile.CopyToAsync(fileStream);
                        }
                        banner.ImageUrl = "/uploads/banners/" + uniqueFileName;
                    }

                    _context.Update(banner);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BannerExists(banner.Id)) return NotFound();
                    else throw;
                }
                return RedirectToAction(nameof(Index));
            }
            return View(banner);
        }

        // GET: Banner/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();
            var banner = await _context.Banners.FirstOrDefaultAsync(m => m.Id == id);
            if (banner == null) return NotFound();
            return View(banner);
        }

        // POST: Banner/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var banner = await _context.Banners.FindAsync(id);
            if (banner != null)
            {
                _context.Banners.Remove(banner);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool BannerExists(int id)
        {
            return _context.Banners.Any(e => e.Id == id);
        }
    }
}
