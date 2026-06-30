using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;
using CMS.Data;
using System.Linq;
using System.IO;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using OfficeOpenXml;
using System.Collections.Generic;
using X.PagedList;

namespace CMS.Backend.Controllers
{
    [Authorize]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int? page)
        {
            int pageSize = 10;
            int pageNumber = page ?? 1;
            // Chỉ hiển thị các sản phẩm chưa bị xóa tạm
            var data = _context.Products.Include(p => p.CategoryProduct).Where(p => !p.IsDeleted).OrderByDescending(p => p.Id).ToPagedList(pageNumber, pageSize); 
            return View(data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.CategoryList = new SelectList(_context.CategoriesProducts, "Id", "Name");
            return View();
        }

        [HttpPost]
        public IActionResult Create(Product model, IFormFile uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }
                model.ImageUrl = "/uploads/" + fileName;
            }

            _context.Products.Add(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();

            ViewBag.CategoryList = new SelectList(_context.CategoriesProducts, "Id", "Name", product.CategoryProductId);
            return View(product);
        }

        [HttpPost]
        public IActionResult Edit(Product model, IFormFile uploadImage)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == model.Id);
            if (product == null) return NotFound();

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }
                product.ImageUrl = "/uploads/" + fileName;
            }

            product.Name = model.Name;
            product.Description = model.Description;
            product.Price = model.Price;
            product.StockQuantity = model.StockQuantity;
            product.CategoryProductId = model.CategoryProductId;

            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                // Soft Delete: Gán IsDeleted = true thay vì xóa vĩnh viễn
                product.IsDeleted = true;
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        // ============================
        // TÍNH NĂNG THÙNG RÁC
        // ============================
        public IActionResult Trash()
        {
            var data = _context.Products.Include(p => p.CategoryProduct).Where(p => p.IsDeleted).ToList();
            return View(data);
        }

        [HttpPost]
        public IActionResult Restore(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                product.IsDeleted = false;
                _context.SaveChanges();
            }
            return RedirectToAction("Trash");
        }

        [HttpPost]
        public IActionResult HardDelete(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
            return RedirectToAction("Trash");
        }

        // ============================
        // TÍNH NĂNG IMPORT EXCEL
        // ============================
        [HttpPost]
        public IActionResult ImportExcel(IFormFile file)
        {
            if (file == null || file.Length <= 0)
            {
                TempData["Error"] = "Vui lòng chọn file Excel.";
                return RedirectToAction("Index");
            }

            if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
            {
                TempData["Error"] = "Định dạng file không hỗ trợ. Vui lòng dùng file .xlsx";
                return RedirectToAction("Index");
            }

            try
            {
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets.FirstOrDefault();
                        if (worksheet == null) throw new Exception("File Excel không có sheet nào.");

                        var rowCount = worksheet.Dimension.Rows;
                        int importedCount = 0;

                        // Bỏ qua dòng tiêu đề (bắt đầu từ dòng 2)
                        for (int row = 2; row <= rowCount; row++)
                        {
                            var name = worksheet.Cells[row, 1].Value?.ToString();
                            if (string.IsNullOrWhiteSpace(name)) continue;

                            var desc = worksheet.Cells[row, 2].Value?.ToString();
                            
                            decimal price = 0;
                            decimal.TryParse(worksheet.Cells[row, 3].Value?.ToString(), out price);

                            int stock = 0;
                            int.TryParse(worksheet.Cells[row, 4].Value?.ToString(), out stock);

                            int categoryId = 1;
                            int.TryParse(worksheet.Cells[row, 5].Value?.ToString(), out categoryId);

                            var newProduct = new Product
                            {
                                Name = name,
                                Description = desc,
                                Price = price,
                                StockQuantity = stock,
                                CategoryProductId = categoryId,
                                IsDeleted = false
                            };

                            _context.Products.Add(newProduct);
                            importedCount++;
                        }

                        _context.SaveChanges();
                        TempData["Success"] = $"Đã nhập thành công {importedCount} sản phẩm!";
                    }
                }
            }
            catch (Exception ex)
            {
                var errorMsg = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                TempData["Error"] = $"Lỗi khi import file: {errorMsg}";
            }

            return RedirectToAction("Index");
        }
    }
}
