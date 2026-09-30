# Dopa Drill

Dopa Drill là trò luyện tính nhẩm cho lớp 1–6. Mỗi câu trả lời làm phần trình diễn, hiệu ứng và âm thanh sôi động hơn. Giao diện đã được Việt hóa và chạy trong Next.js.

## Tính năng

- 58 kỹ năng tính toán cho lớp 1–6: cộng, trừ, nhân, chia, số thập phân, phân số, phần trăm và các nội dung liên quan.
- Chế độ **Trình độ của mình**, theo khối, luyện tập, ôn tập và cây kỹ năng.
- Thành tích, nhiệm vụ, cúp, bộ sưu tập và phần thưởng được lưu cục bộ để chơi offline.
- Đồng bộ write-behind lên Neon PostgreSQL khi có `DATABASE_URL` và mạng. Không có Neon hoặc mất mạng thì game vẫn chạy đầy đủ bằng `localStorage`.
- PWA có manifest và service worker; sau lần mở online đầu tiên, game có thể khởi chạy và chơi ngoại tuyến.
- Font Baloo 2 cho chữ số/phép tính và Nunito cho văn bản giao diện.
- Web Audio API tổng hợp âm thanh, không cần tệp âm thanh.

## Chạy cục bộ bằng Next.js

Cần Node.js 20.9 trở lên.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

### Neon PostgreSQL

Tạo project trên Neon, sao chép biến môi trường mẫu và điền connection string:

```bash
cp .env.example .env.local
# sửa DATABASE_URL trong .env.local
npm run db:migrate
```

API đồng bộ nằm tại `app/api/sync/route.js`. Dữ liệu được định danh bằng một ID thiết bị ẩn danh trong localStorage; tính năng này không phải hệ thống tài khoản hay xác thực người dùng. Chỉ nên đồng bộ dữ liệu không nhạy cảm.

Nếu bỏ qua `DATABASE_URL` hoặc migration, phần Neon trả về trạng thái offline và ứng dụng tiếp tục dùng lưu trữ cục bộ.

### Build production

```bash
npm run build
npm start
```

`npm run dev` và `npm run build` tự đồng bộ game legacy từ `app/` sang `public/game/`. Thư mục `public/game/` là output sinh tự động và không cần commit.

## PWA và offline

- `public/manifest.webmanifest`: metadata cài đặt PWA.
- `public/sw.js`: cache shell Next, game, JavaScript và font; không cache API Neon.
- `public/offline.html`: fallback khi không có shell đã cache.
- `app/js/store.js`: local-first, ghi local trước rồi đồng bộ Neon sau; mất mạng không chặn lượt chơi.

Cần mở ứng dụng online ít nhất một lần để service worker cache toàn bộ game trước khi thử khởi chạy hoàn toàn offline.

## Kiểm thử

```bash
npm test
```

Bộ test hiện tại bao phủ tạo bài, chấm điểm, lưu trữ, tiến bộ, nhiệm vụ, cúp và các quy tắc game.

## Cấu trúc

| Đường dẫn | Nội dung |
| --- | --- |
| `app/` | App Router Next.js và mã nguồn game legacy |
| `app/js/` | Gameplay, tạo bài, tiến bộ, lưu trữ và hiệu ứng |
| `app/fonts/` | Font subset Baloo 2 và Nunito |
| `app/api/sync/route.js` | API ghi/đọc state với Neon |
| `db/schema.sql` | Schema bảng đồng bộ Neon |
| `public/sw.js` | Service worker PWA |
| `scripts/sync-game.mjs` | Đồng bộ game vào static output của Next |
| `docs/SPEC.md` | Đặc tả hành vi |
| `docs/curriculum.md` | Chương trình theo khối và cây kỹ năng |
| `tests/` | Kiểm thử đơn vị |

## Giấy phép

- Mã nguồn: MIT License.
- Linh vật Dopakichi, tên và logo Dopa Drill không thuộc phạm vi MIT. Bạn được tự do dùng cho tác phẩm phái sinh phi thương mại theo các điều kiện bên dưới.
- Font Baloo 2 và Nunito trong `app/fonts/`: SIL Open Font License 1.1.

Xem chi tiết trong [LICENSE](LICENSE).

### Tác phẩm phái sinh của Dopakichi và Dopa Drill

Bạn được tự do sử dụng mà không cần liên hệ trước nếu không nhằm mục đích thương mại.

- Được phép: fan art, truyện tranh, tiểu thuyết, hoạt hình, video, đăng lên mạng xã hội, fork hoặc bản sửa đổi phi thương mại của trò chơi.
- Video chơi game và livestream: được phép, kể cả trên nền tảng có quảng cáo hoặc tiền ủng hộ.
- Cần xin phép trước: bán hàng hóa hoặc tác phẩm, dùng trong sản phẩm/dịch vụ/quảng cáo trả phí hay mục đích thương mại khác; dùng tên, linh vật hoặc thương hiệu này cho sản phẩm/dịch vụ khác; tự nhận là bản chính thức.
- Không được phép: sử dụng trái với trật tự và chuẩn mực công cộng, hoặc làm tổn hại danh tiếng của nhân vật hay dự án.

Khi phát hành, hãy ghi rõ đó là sản phẩm không chính thức. Nếu bản dịch này khác nội dung tiếng Anh trong LICENSE, bản tiếng Anh được ưu tiên.
