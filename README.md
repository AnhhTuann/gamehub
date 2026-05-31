# 🎮 GameHub - Modern Retro Dracula Gaming E-commerce Ecosystem

GameHub (trước đây là OmniWear) là một hệ sinh thái thương mại điện tử chuyên biệt dành cho game thủ, được thiết kế theo ngôn ngữ giao diện **"Modern Retro Dracula"** cực kỳ bắt mắt (nền tối deep slate `#282a36`, viền tím neon `#bd93f9`, hồng neon `#ff79c6`, xanh lá neon `#50fa7b` và phông chữ pixel 8-bit hoài cổ).

Dự án này là một hệ thống Fullstack tích hợp 3 lớp, đồng bộ dữ liệu thời gian thực:
1. **Backend (Node.js + GraphQL + Prisma):** Quản lý cơ sở dữ liệu PostgreSQL qua Docker, cung cấp GraphQL API để thực hiện giao dịch và cấp khóa kích hoạt (CD-Key) game tự động.
2. **Frontend (Vite + React + Apollo Client + Tailwind CSS):** Giao diện Web bao gồm cả **Storefront** (Cửa hàng bán game, Giỏ hàng trượt Cart Drawer, Thanh toán bảo mật Checkout, Success Modal) và **Admin Dashboard** (Quản lý kho game Catalog, Quản lý đơn hàng Orders, Thống kê doanh thu live Telemetry,...).
3. **Desktop Applications (C# WPF & C# WinForms):** Ứng dụng Desktop dành cho nhân viên vận hành kho và ban quản lý kiểm soát kho game, đơn hàng ngoại tuyến.

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy Nhanh

### Yêu cầu hệ thống:
- **Node.js** (Phiên bản >= 18.x)
- **Docker Desktop** (Để chạy PostgreSQL cục bộ)
- **.NET 8.0 SDK** (Để chạy các ứng dụng C# Desktop)

### 📂 Khởi động Database (PostgreSQL)
Mở Terminal tại thư mục `backend` và chạy Docker Compose để dựng cơ sở dữ liệu:
```bash
cd backend
docker-compose up -d
```
*Lưu ý: PostgreSQL chạy trên cổng `5433` tránh xung đột hệ thống.*

### 🖥️ Khởi chạy Backend (Node.js GraphQL API)
Cài đặt dependencies, đẩy schema và seed dữ liệu mẫu:
```bash
cd backend
npm install
npx prisma db push
npm run seed     # Tải 10 game hot mẫu vào database
npm run dev      # Khởi động server tại http://localhost:4000/graphql
```

### 🌐 Khởi chạy Storefront & Admin Portal (React Frontend)
Mở một Terminal mới, truy cập vào thư mục `frontend` và chạy server dev:
```bash
cd frontend
npm install
npm run dev      # Khởi chạy Website tại http://localhost:3000
```
- **Storefront / User Portal:** `http://localhost:3000/`
- **Admin Dashboard:** `http://localhost:3000/admin` *(Mặc định tự kích hoạt tab Orders)*

### 💾 Khởi chạy Ứng dụng Desktop (C# Warehouse)
Truy cập vào thư mục ứng dụng C# WPF:
```bash
cd desktop-app/OmniWear.Warehouse
dotnet run
```

---

## 🧪 Kịch bản Kiểm thử Đồng bộ (End-to-End Key Delivery)

1. **Mua Game & Cấp Khóa Tự Động:**
   - Truy cập `http://localhost:3000`, thêm **Chrono Trigger** vào giỏ hàng và tiến hành **Checkout**.
   - Sau khi thanh toán thành công, **Success Modal** màu xanh lá neon hiện lên kèm hiệu ứng pixel art chúc mừng nhiệm vụ hoàn thành.
   - Truy cập vào **Player Portal (`/portal`)**, bạn sẽ thấy mã khóa kích hoạt CD-Key định dạng `CHRO-TRIG-XXXX` đã được hiển thị sẵn sàng để kích hoạt.

2. **Quản lý Admin thời gian thực:**
   - Vào trang Admin Dashboard tại `http://localhost:3000/admin`.
   - Trong tab **Catalog**, bạn có thể tạo game mới, tùy chỉnh màu sắc gradient hộp đĩa game, chỉnh sửa giá hoặc xóa game với hộp thoại bảo mật màu đỏ neon.
   - Trong tab **Orders**, Admin có thể theo dõi đơn hàng ở trạng thái `PENDING` (đèn led cam nhấp nháy), nhấn **Generate Keys** để sinh key tự động hoặc nhấn **Refund Order** để thu hồi/vô hiệu hóa key đã cấp ngay lập tức.

---

## 🛠 Công nghệ sử dụng
- **Backend:** Node.js, Express, Apollo Server, Prisma ORM, PostgreSQL (Docker).
- **Frontend:** Vite, React, Apollo Client, Tailwind CSS, Framer Motion (`motion/react`), Lucide React.
- **Desktop Apps:** C# WPF (.NET 8), C# WinForms, GraphQL.Client.
