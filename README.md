# OmniWear - Hệ thống Quản lý Bán Quần Áo Đa Nền Tảng

OmniWear là một dự án Fullstack 3 lớp mô phỏng hệ thống bán hàng và quản lý tồn kho theo thời gian thực. Hệ thống bao gồm 3 thành phần chính:

1. **Backend (Node.js + GraphQL + Prisma):** Quản lý kết nối tới cơ sở dữ liệu PostgreSQL. Cung cấp GraphQL API để thao tác với dữ liệu.
2. **Storefront (Next.js):** Website bán hàng với giao diện người dùng trực quan, sang trọng, sử dụng React Server Components và Apollo Client.
3. **Warehouse App (C# WPF):** Ứng dụng Desktop dành cho nhân viên quản lý kho, theo dõi và cập nhật số lượng hàng tồn kho.

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### Yêu cầu hệ thống:
- **Node.js** (Phiên bản >= 18.x)
- **Docker Desktop** (Để chạy cục bộ CSDL PostgreSQL)
- **.NET 8.0 SDK** (Hoặc Visual Studio 2022 để chạy ứng dụng WPF)

### Bước 1: Khởi động Database (PostgreSQL)

Mở Terminal tại thư mục `backend` và chạy Docker để dựng Database:

```bash
cd backend
docker-compose up -d
```

> **Lưu ý:** Database chạy trên cổng `5433` (để tránh trùng lặp với cổng 5432 nếu bạn có sẵn PostgreSQL trên máy).

### Bước 2: Chạy Backend (Node.js GraphQL API)

Cài đặt các gói phụ thuộc và khởi chạy máy chủ Node.js:

```bash
cd backend
npm install
npx prisma db push
npm run seed     # Chạy lệnh này để tải 10 sản phẩm mẫu vào CSDL
npm run dev      # Khởi động server (Mặc định: http://localhost:4000/graphql)
```

### Bước 3: Chạy Website Storefront (Next.js)

Mở một Terminal khác, truy cập vào thư mục `storefront` và khởi chạy Web:

```bash
cd storefront
npm install
npm run dev      # Khởi động Web tại: http://localhost:3000
```

### Bước 4: Chạy Ứng dụng Quản lý Kho (C# Desktop App)

Mở thư mục `desktop-app/OmniWear.Warehouse`. Bạn có thể sử dụng 2 cách:
1. **Qua dòng lệnh (Terminal):**
   ```bash
   cd desktop-app/OmniWear.Warehouse
   dotnet run
   ```
2. **Qua Visual Studio:** Mở file `OmniWear.Warehouse.csproj` bằng Visual Studio 2022 và bấm **Run (F5)**.

---

## 🧪 Kịch bản Kiểm thử Đồng bộ (End-to-End)

1. **Khách hàng mua hàng (Storefront -> Warehouse):**
   - Truy cập `http://localhost:3000` và nhấn **Add to Cart** một sản phẩm bất kỳ.
   - Bấm vào mục giỏ hàng (Cart) và tiến hành đặt hàng (Checkout).
   - Mở ứng dụng Desktop C#, bấm nút **Refresh Data**, bạn sẽ thấy số lượng tồn kho của sản phẩm đó tự động giảm xuống!

2. **Cập nhật tồn kho (Warehouse -> Storefront):**
   - Trên ứng dụng Desktop C#, chọn một sản phẩm (ví dụ: chiếc áo tồn kho = 10).
   - Nhập số `0` vào ô cập nhật và bấm **Update Inventory**.
   - F5 lại trang Web Storefront, ngay lập tức nút "Add to Cart" của sản phẩm đó biến thành **"Sold Out"** (Hết Hàng).

---

## 🛠 Công nghệ sử dụng
- **Backend:** Node.js, Express, Apollo Server, Prisma ORM, PostgreSQL (Docker).
- **Frontend:** Next.js (App Router), React, Apollo Client, Vanilla CSS hiện đại.
- **Desktop App:** C# WPF (.NET 8), GraphQL.Client.
