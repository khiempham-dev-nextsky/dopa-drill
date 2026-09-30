# Dopa Drill

Dopa Drill là trò luyện tính nhẩm, trong đó mỗi câu trả lời làm phần trình diễn và âm nhạc sôi động hơn. Trò chơi chạy hoàn toàn trong trình duyệt.

Linh vật Dopakichi mang các chữ số bạn nhập; trả lời đúng sẽ được chúc mừng. Càng giải nhiều câu, màn hình và âm thanh càng phong phú, rồi kết thúc như một lễ hội. Trả lời sai không làm mất đà và không có trạng thái game over.

## Tính năng

- 58 kỹ năng tính toán cho lớp 1–6: cộng, trừ, nhân, chia, nhập từng bước của phép tính dọc, số thập phân, phân số, phần trăm và các nội dung liên quan.
- Chế độ **Trình độ của mình**: bắt đầu bằng kiểm tra năng lực, sau đó mở khóa kỹ năng tiếp theo theo tiến độ.
- Chế độ theo khối, luyện tập, ôn tập và cây kỹ năng.
- Hoàn thành toàn bộ câu cơ bản được 100 điểm. Nếu tỷ lệ đúng ngay lần đầu từ 80%, bạn có thể vào màn thử thách có giới hạn thời gian để vượt 100 điểm.
- Nhạc và hiệu ứng âm thanh đều được tổng hợp bằng Web Audio API, không dùng tệp âm thanh.
- Hỗ trợ màn hình dọc trên điện thoại và máy tính. Trên máy tính có thể nhập bằng phím số và Backspace.
- Có thể điều chỉnh mức độ chuyển động và tắt âm thanh trong phần cài đặt.
- Thành tích được lưu trong thiết bị bằng `localStorage`, không gửi ra bên ngoài.

## Chạy cục bộ

Không cần build. Chỉ cần phân phối tĩnh thư mục `app/`:

```bash
python3 -m http.server 8000 -d app
```

Mở `http://localhost:8000/` trong trình duyệt. Vì ứng dụng dùng ES Modules, mở trực tiếp bằng `file://` sẽ không hoạt động.

## Kiểm thử

Cần Node.js 20 trở lên:

```bash
node --test tests/*.test.mjs
```

## Cấu trúc

| Đường dẫn | Nội dung |
| --- | --- |
| `app/` | Trò chơi chính, dùng ES Modules và không có thư viện phụ thuộc |
| `docs/SPEC.md` | Đặc tả hành vi |
| `docs/curriculum.md` | Chương trình theo khối và thiết kế cây kỹ năng |
| `docs/dopakichi.svg` | Tài liệu hình mẫu của Dopakichi |
| `tests/` | Kiểm thử đơn vị |
| `tools/build_fonts.sh` | Tạo lại font subset khi thêm chữ hiển thị |

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