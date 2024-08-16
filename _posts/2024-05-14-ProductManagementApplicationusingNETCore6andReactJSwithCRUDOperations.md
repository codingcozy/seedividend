---
title: "NET Core 6와 React JS를 활용한 제품 관리 애플리케이션 개발하기 CRUD 작업 포함"
description: ""
coverImage: "/assets/img/2024-05-14-ProductManagementApplicationusingNETCore6andReactJSwithCRUDOperations_0.png"
date: 2024-05-14 15:36
ogImage: 
  url: /assets/img/2024-05-14-ProductManagementApplicationusingNETCore6andReactJSwithCRUDOperations_0.png
tag: Tech
originalTitle: "Product Management Application using .NET Core 6 and React JS with CRUD Operations"
link: "https://medium.com/@jaydeepvpatil225/product-management-application-using-net-core-6-and-react-js-with-crud-operation-1f8bb9f709ba"
isUpdated: true
---




<img src="/assets/img/2024-05-14-ProductManagementApplicationusingNETCore6andReactJSwithCRUDOperations_0.png" />

# 소개

이 글에서는 .NET Core 6을 사용하여 CRUD 작업을 수행하는 제품 관리 웹 API를 만들고 React JS의 도움으로 다양한 형식을 사용할 것입니다.

# 사전 준비조건



- Visual Studio 2022
- VS Code
- SQL Server
- .NET Core SDK
- Node JS

# 제품 관리 응용 프로그램

단계 1

새 제품 관리 .NET Core Web API를 만드세요.



Step 2

데이터베이스 마이그레이션 및 SQL Server와의 연결에 사용하는 다음 NuGet 패키지를 설치하십시오.

![NuGet Packages](/assets/img/2024-05-14-ProductManagementApplicationusingNETCore6andReactJSwithCRUDOperations_1.png)

Step 3



entities 폴더 안에 product 클래스를 추가해주세요.

```js
namespace ProductManagementAPI.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
```

4단계

data 폴더 안에 AppDbContext 클래스를 만들어 SQL Server 연결 및 DB 설정 속성을 추가해주세요.



```js
using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Entities;

namespace ProductManagementAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        protected readonly IConfiguration Configuration;
        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
    }
}
```

Step 5

리포지토리 폴더 내에 제품 리포지토리를 추가하세요.

IProductRepository




```js
using ProductManagementAPI.Entities;

namespace ProductManagementAPI.Repositories
{
    public interface IProductRepository
    {
        void AddProduct(Product product);
        void DeleteProduct(int id);
        List<Product> GetAllProducts();
        Product GetProductById(int id);
        void UpdateProduct(Product product);
    }
}
```

ProductRepository

```js
using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Data;
using ProductManagementAPI.Entities;

namespace ProductManagementAPI.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }
        public List<Product> GetAllProducts()
        {
            return _context.Products.ToList();
        }
        public Product GetProductById(int id)
        {
            return _context.Products.FirstOrDefault(p => p.Id == id);
        }
        public void AddProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            _context.Products.Add(product);
            _context.SaveChanges();
        }
        public void UpdateProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public void DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            _context.Products.Remove(product);
            _context.SaveChanges();
        }
    }
}
```

단계 6




위 코드를 사용하여 다양한 작업을 수행하는 새 제품 컨트롤러를 만들었습니다. 이제 이를 호출하면 우리의 프런트엔드 애플리케이션을 통해 다양한 작업을 수행할 수 있습니다.

```js
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Entities;
using ProductManagementAPI.Repositories;

namespace ProductManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _productRepository.GetAllProducts();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productRepository.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPost]
        public IActionResult AddProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }
            _productRepository.AddProduct(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product product)
        {
            if (product == null || id != product.Id)
            {
                return BadRequest();
            }
            var existingProduct = _productRepository.GetProductById(id);
            if (existingProduct == null)
            {
                return NotFound();
            }
            _productRepository.UpdateProduct(product);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var existingProduct = _productRepository.GetProductById(id);
            if (existingProduct == null)
            {
                return NotFound();
            }
            _productRepository.DeleteProduct(id);
            return NoContent();
        }
    }
}
```

7단계

앱 설정 파일을 열어 데이터베이스 연결 문자열을 추가하세요.



```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=DESKTOP-8RL8JOG;Initial Catalog=ReactNetCoreCrudDb;User Id=sa;Password=database@1;"
  }
}
```

**단계 8**

서비스 컨테이너 내에서 서비스를 등록하고 미들웨어를 구성하세요.

```csharp
using ProductManagementAPI.Data;
using ProductManagementAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);
// 컨테이너에 서비스 추가
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddCors(options => {
    options.AddPolicy("CORSPolicy", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers();
// Swagger/OpenAPI 구성에 대해 더 자세히 알아보려면 https://aka.ms/aspnetcore/swashbuckle을 참조하세요
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
// HTTP 요청 파이프라인 구성
app.UseCors("CORSPolicy");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
```



9단계

아래 엔터티 프레임워크 데이터베이스 마이그레이션 명령을 실행하여 데이터베이스와 테이블을 생성합니다.

```js
add-migration "v1"
update-database
```

10단계



마지막으로, 애플리케이션을 실행하고 Swagger UI를 사용하여 다양한 API 엔드포인트를 실행하세요.

![Swagger UI](/assets/img/2024-05-14-ProductManagementApplicationusingNETCore6andReactJSwithCRUDOperations_2.png)

React JS를 사용하여 클라이언트 애플리케이션을 생성하고 위의 API 엔드포인트를 이용해보세요.

1단계



다음 명령어를 사용하여 새 React JS 애플리케이션을 만들어 보세요:

npx create-react-app react-netcore-crud-app

단계 2

프로젝트 디렉토리로 이동하세요.



cd react-netcore-crud-app

**단계 3**

백엔드 API를 소비하고 호출하기 위해 Axios를 설치하고 디자인을 위해 bootstrap을 설치하세요.

npm install axios



npm install bootstrap

단계 4

다음 컴포넌트 및 서비스를 추가하세요:

제품 목록 컴포넌트.



```js
// src/components/ProductList/ProductList.js
import React, { useState, useEffect } from 'react';
import ProductListItem from './ProductListItem';
import productService from '../../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            const productsData = await productService.getAllProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('제품을 불러오는 중 오류가 발생했습니다:', error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await productService.deleteProduct(id);
            fetchProducts(); // 제품 목록 새로고침
        } catch (error) {
            console.error('제품 삭제 중 오류가 발생했습니다:', error);
        }
    };
    const handleEdit = () => {
        fetchProducts(); // 편집 후 제품 목록 새로고침
    };
    return (
        <div className="container">
            <h2 className="my-4">제품 목록</h2>
            <ul className="list-group">
                {products.map(product => (
                    <ProductListItem key={product.id} product={product} onDelete={() => handleDelete(product.id)} onEdit={handleEdit} />
                ))}
            </ul>
        </div>
    );
};
export default ProductList;
```

제품 목록 항목 컴포넌트.

```js
// src/components/ProductList/ProductListItem.js
import React, { useState } from 'react';
import productService from '../../services/productService';

const ProductListItem = ({ product, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const handleEdit = async () => {
        setIsEditing(true);
    };
    const handleSave = async () => {
        const editedProduct = { ...product, name: editedName, price: parseFloat(editedPrice) };
        try {
            await productService.updateProduct(product.id, editedProduct);
            setIsEditing(false);
            onEdit(); // 제품 목록 새로고침
        } catch (error) {
            console.error('제품 업데이트 중 오류가 발생했습니다:', error);
        }
    };
    const handleCancel = () => {
        setIsEditing(false);
        // 수정된 값 초기화
        setEditedName(product.name);
        setEditedPrice(product.price);
    };
    return (
        <li className="list-group-item">
            {isEditing ? (
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={editedName} onChange={e => setEditedName(e.target.value)} required />
                    </div>
                    <div className="col">
                        <input type="number" className="form-control" value={editedPrice} onChange={e => setEditedPrice(e.target.value)} required />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success me-2" onClick={handleSave}>저장</button>
                        <button className="btn btn-secondary" onClick={handleCancel}>취소</button>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-between align-items-center">
                    <span>{product.name} - ${product.price}</span>
                    <div>
                        <button className="btn btn-danger me-2" onClick={onDelete}>삭제</button>
                        <button className="btn btn-primary" onClick={handleEdit}>편집</button>
                    </div>
                </div>
            )}
        </li>
    );
};
export default ProductListItem;
```

제품 서비스.




```js
// src/services/productService.js
import axios from 'axios';

const baseURL = 'https://localhost:7202/api/Product';
const productService = {
    getAllProducts: async () => {
        const response = await axios.get(baseURL);
        return response.data;
    },
    addProduct: async (product) => {
        const response = await axios.post(baseURL, product);
        return response.data;
    },
    deleteProduct: async (id) => {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data;
    },
    updateProduct: async (id, product) => {
        const response = await axios.put(`${baseURL}/${id}`, product);
        return response.data;
    }
};
export default productService;
```

App component.

```js
// src/App.js
import React, { useState } from 'react';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';

function App() {
    const [refresh, setRefresh] = useState(false);
    const handleProductAdded = () => {
        setRefresh(!refresh); // 상태를 토글하여 다시 렌더링을 트리거합니다.
    };
    return (
        <div>
            <ProductList key={refresh} />
            <ProductForm onProductAdded={handleProductAdded} />
        </div>
    );
}
export default App;
```

5단계




다음 명령을 사용하여 응용 프로그램을 실행하고 동일한을 사용하여 다양한 CRUD 작업을 수행하십시오.

![image](/assets/img/2024-05-14-ProductManagementApplicationusingNETCore6andReactJSwithCRUDOperations_3.png)

# GitHub

https://github.com/Jaydeep-007/React_NETCore_CRUD



# 결론

이 기사에서는 .NET Core 및 SQL Server를 사용하여 제품 관리 백엔드 응용 프로그램을 만들었고 CRUD 작업을 수행하는 데 필요한 다양한 API 엔드포인트를 만들었습니다. 나중에 React JS를 사용하여 프론트엔드 응용 프로그램을 만들었고 Axios의 도움을 받아 백엔드 응용 프로그램을 동일한 내에서 사용했습니다.