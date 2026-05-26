$controllers = @(
    @{Name="Post"; Entity="Post"; DbSet="Posts"},
    @{Name="User"; Entity="User"; DbSet="Users"},
    @{Name="CategoryProduct"; Entity="CategoryProduct"; DbSet="CategoriesProducts"},
    @{Name="Product"; Entity="Product"; DbSet="Products"},
    @{Name="Customer"; Entity="Customer"; DbSet="Customers"},
    @{Name="Order"; Entity="Order"; DbSet="Orders"},
    @{Name="OrderDetail"; Entity="OrderDetail"; DbSet="OrderDetails"}
)

$controllerDir = "d:\ASP_TIN\TinCMS_Solution\CMS.Backend\Controllers"
$viewDir = "d:\ASP_TIN\TinCMS_Solution\CMS.Backend\Views"

foreach ($c in $controllers) {
    $cName = $c.Name
    $cDbSet = $c.DbSet
    $cEntity = $c.Entity
    
    # Create Controller
    $controllerContent = @"
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;
using CMS.Data;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class $($cName)Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public $($cName)Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var data = _context.$($cDbSet).ToList(); 
            return View(data);
        }
    }
}
"@
    Set-Content -Path "$controllerDir\$($cName)Controller.cs" -Value $controllerContent -Encoding UTF8

    # Create View folder
    $vDir = "$viewDir\$cName"
    if (-not (Test-Path $vDir)) {
        New-Item -ItemType Directory -Path $vDir | Out-Null
    }

    # Create Index View
    $viewContent = @"
@model IEnumerable<CMS.Data.Entities.$cEntity>

<h2>Danh sách $cName</h2>
<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model) {
            <tr>
                <td>@item.Id</td>
                <td>@item.ToString()</td>
            </tr>
        }
    </tbody>
</table>
"@
    Set-Content -Path "$vDir\Index.cshtml" -Value $viewContent -Encoding UTF8
}
