using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using CMS.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews(); //Lệnh này vừa nhận diện các API mới, vừa giữ quyền biên dịch các View (.cshtml) của Web MVC cũ.

// Đăng ký dịch vụ lõi giúp hệ thống tự động bóc tách thông tin Endpoint phục vụ Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "V-SPORT Web API", Version = "v1" });

    // JWT Authentication for Swagger
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Nhập token JWT của bạn theo định dạng: Bearer {token}"
    });
    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });

    // Add XML comments
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = System.IO.Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (System.IO.File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
    
    var dataXmlFile = "CMS.Data.xml";
    var dataXmlPath = System.IO.Path.Combine(AppContext.BaseDirectory, dataXmlFile);
    if (System.IO.File.Exists(dataXmlPath))
    {
        c.IncludeXmlComments(dataXmlPath);
    }
});

// Đăng ký DbContext vào hệ thống
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Đăng ký dịch vụ Gửi Email
builder.Services.AddScoped<CMS.Backend.Services.IEmailService, CMS.Backend.Services.EmailService>();

// Cấp phát bộ nhớ đệm tạm thời (dùng cho OTP)
builder.Services.AddMemoryCache();

// Khai báo dịch vụ xác thực Cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login"; // Đường dẫn nếu chưa đăng nhập
        options.AccessDeniedPath = "/Account/AccessDenied"; // Đường dẫn nếu vào trang không được phép
        options.ExpireTimeSpan = TimeSpan.FromMinutes(3); // Hết hạn sau 3 phút
        options.SlidingExpiration = true; // Tự động gia hạn nếu có thao tác
    });

builder.Services.AddCors(options => {
    // AllowReactApp: Chính sách CORS dành riêng cho ứng dụng ReactJS chạy tại cổng 3000
    options.AddPolicy("AllowReactApp", policy => {
        policy.WithOrigins(
                "http://localhost:3000",   // React dev server (cổng mặc định)
                "http://localhost:3001",   // React alt port
                "http://127.0.0.1:3000"   // localhost alias
              )
              .AllowAnyMethod()           // GET, POST, PUT, DELETE, OPTIONS...
              .AllowAnyHeader();          // Authorization, Content-Type...
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// ==============================================================
//  2. KHU VỰC CẤU HÌNH MIDDLEWARE (REQUEST PIPELINE)
// ==============================================================
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "V-SPORT Web API v1");
    c.RoutePrefix = "swagger"; // -- Đường dẫn truy cập mặc định sẽ là /swagger
});

app.UseRouting();

// [VỊ TRÍ ĐẶT CORS]: Phải nằm ngay giữa UseRouting và app.UseAuthentication(); UseAuthorization();
app.UseCors("AllowReactApp");
// ===================================

app.UseAuthentication();
app.UseAuthorization();

// ===============================================================
// 3. KHU VỰC ĐỊNH TUYẾN PHÂN LUỒNG (ROUTING MAP)
//  đặt sau dòng UseAuthorization();
// ===============================================================

// Phân luồng A: 
// Ánh xạ các Endpoint API tuân thủ theo cấu trúc [Route("api/[controller]")]
app.MapControllers();

// Phân luồng B: Giữ lại bản đồ đường đi mặc định cho trang giao diện Web MVC cũ
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// ================================================================
// 4. TỰ ĐỘNG NÂNG CẤP MẬT KHẨU USER (ADMIN) LÊN BCRYPT KHI KHỞI ĐỘNG
// ================================================================
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var allUsers = db.Users.ToList();
    bool changed = false;

    foreach (var u in allUsers)
    {
        // Kiểm tra nếu mật khẩu CHƯA phải BCrypt (BCrypt hash luôn bắt đầu bằng $2a$ hoặc $2b$)
        if (!string.IsNullOrEmpty(u.PasswordHash) && 
            !u.PasswordHash.StartsWith("$2a$") && 
            !u.PasswordHash.StartsWith("$2b$"))
        {
            u.PasswordHash = BCrypt.Net.BCrypt.HashPassword(u.PasswordHash);
            changed = true;
        }
    }

    if (changed)
    {
        db.SaveChanges();
        Console.WriteLine("✅ Đã nâng cấp mật khẩu User sang BCrypt thành công.");
    }
}

app.Run();
