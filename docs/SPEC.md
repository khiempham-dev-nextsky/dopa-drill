# Dopa Drill — Đặc tả bản phát hành

Dopa Drill là trò chơi trình duyệt trong đó chuyển động của linh vật, hiệu ứng màn hình và âm nhạc tăng dần sau mỗi câu tính. Tài liệu này mô tả hành vi hiện tại cho người chơi, phụ huynh và những người muốn phát triển hoặc chỉnh sửa dự án. Các con số có thể thay đổi khi cân bằng trò chơi.

## 1. Tổng quan và nguyên tắc thiết kế

Mục tiêu là tạo trải nghiệm luyện tính một ít mỗi ngày và nhìn thấy tiến bộ so với chính mình trong quá khứ. Phần bài cơ bản vẫn tiếp tục sau khi quá thời gian; hoàn thành toàn bộ được 100 điểm. Không có game over.

Câu sai được hiển thị là “Suýt đúng” và có thể trả lời lại. Sao, cúp và hiệu ứng đã nhận không bị lấy lại vì trả lời sai hoặc nghỉ chơi. Chuỗi ngày có cơ chế bù ngày nghỉ; màn hình so sánh tiến bộ chỉ hiển thị các mục đã cải thiện. Phần thưởng mở theo điều kiện, không có quay số hoặc mua hàng.

Giao diện tiếng Việt phục vụ việc luyện tính cho học sinh tiểu học và người lớn. Trọng tâm là màn hình dọc trên điện thoại, đồng thời hỗ trợ chuột và bàn phím trên máy tính. Không cần đăng ký tài khoản. Dữ liệu được lưu riêng theo từng trình duyệt, không tự đồng bộ giữa các thiết bị.

## 2. Màn hình và luồng sử dụng

### 2.1 Danh sách màn hình

| Màn hình | Nội dung và thao tác chính |
| --- | --- |
| Trang chính | Logo, Dopakichi, Trình độ của mình, Ôn tập bên dưới, lớp 1–6, Cây kỹ năng, Cúp, Bộ sưu tập, Nhiệm vụ, Lịch, Cài đặt, ? |
| Chơi | Bài toán, các ô nhập, bàn phím số riêng, số câu đúng, số lần suýt đúng, đồng hồ, Dopa, combo, tiến độ, tắt âm thanh |
| Kết quả cơ bản | 100 điểm, thời gian, tỷ lệ đúng ngay lần đầu, Dopa, kết quả tiến bộ/kỹ năng/nhiệm vụ; vào màn thử thách khi đủ điều kiện, ôn tập, chơi lại, về trang chính |
| Kết quả cuối | Điểm và Dopa gồm màn thử thách, số câu đúng, số lần suýt đúng, nhiệm vụ, ôn tập và về trang chính |
| Cây kỹ năng | Quan hệ tiên quyết, trạng thái mở/luyện/thạo, sao, kỹ năng nguội, mô tả và luyện tập, xóa một phần thành tích |
| Cúp | Thành tích theo nhóm và chuỗi, ngày nhận, điều kiện và phần thưởng, bộ lọc, thành tích sắp đạt |
| Bộ sưu tập | Xem thử/nghe thử hiệu ứng đã mở, chọn cố định hoặc ngẫu nhiên theo danh mục |
| Cài đặt | Số câu, âm thanh, âm lượng, mức chuyển động, chơi thử tự động, xóa toàn bộ dữ liệu |

Luồng thông thường là “Trang chính → Bài cơ bản → Kết quả cơ bản → tùy chọn màn thử thách → Kết quả cuối”. Ôn tập chỉ có đến kết quả cơ bản. Các nút thao tác ở màn hình kết quả được cố định ở cạnh dưới để vẫn dùng được khi danh sách tiến bộ dài thêm.

### 2.2 Hướng dẫn đầu tiên và trợ giúp “?”

Lần đầu mở ứng dụng, hướng dẫn có 5 trang: giới thiệu, Trình độ của mình, theo lớp, Cây kỹ năng và lời khuyên chọn Trình độ của mình. Nút “?” dưới Cài đặt mở lại hướng dẫn 7 trang, bổ sung Cúp và Bộ sưu tập.

Đối tượng được giới thiệu sẽ được chiếu sáng và màn hình cuộn khi cần. Nội dung nằm trong thẻ riêng; Dopakichi hướng dẫn bằng chuyển động, chỉ tay và biểu cảm, không có lời thoại. Trang cuối chỉ Trình độ của mình và nút “?”; nếu không thể vừa trong màn hình, cùng biểu tượng dấu hỏi sẽ xuất hiện trong thẻ.

Các nút là “Tiếp”, “Quay lại”, “Bỏ qua” và “Bắt đầu!” ở trang cuối. Enter và mũi tên phải sang trang tiếp, mũi tên trái quay lại, Escape bỏ qua, Tab di chuyển tiêu điểm trong hướng dẫn. Nhấn nền tối không đóng hướng dẫn; các nút phía sau không thể thao tác trong lúc hướng dẫn mở.

Dù xem hết hay bỏ qua, trạng thái đã xem được lưu. Sau hướng dẫn đầu tiên, ứng dụng xử lý lần lượt búa bỏ qua, thưởng đăng nhập và thông báo cúp. Sau khi xóa toàn bộ dữ liệu, hướng dẫn đầu tiên xuất hiện lại. Hướng dẫn không tự mở trong lúc chơi thử hoặc ở một số URL kiểm tra.

## 3. Chế độ chơi

### 3.1 Trình độ của mình

Lần đầu là “Kiểm tra năng lực”. Kỹ năng được duyệt theo khối và độ sâu tiên quyết. Khi trả lời đúng ngay lần đầu, bài đang kiểm tra cùng các kỹ năng tiên quyết được chuyển sang thạo và nhận ☆1. Bước di chuyển ban đầu là 6; sau câu đúng, bước hiện tại nhân 1,3 rồi làm tròn lên, tối đa 12; sau câu sai, chia đôi rồi làm tròn xuống, tối thiểu 1. Sau câu sai, hệ thống quay về vùng phía sau vị trí gần nhất trả lời đúng ngay lần đầu. Hoàn thành phần cơ bản thì kiểm tra được đánh dấu xong.

Sau đó, bài được chọn dựa trên độ sâu tiên quyết, khối và thứ tự định nghĩa kỹ năng. Ôn tập lấy từ 6 kỹ năng thạo cuối cùng; số ôn là `min(số ứng viên, max(1, round(số câu × 0.3)))`. Kỹ năng nguội được ưu tiên, phần còn lại chọn ngẫu nhiên. Nếu chưa có kỹ năng thạo thì số ôn là 0.

Các câu còn lại lặp lần lượt 4 kỹ năng đầu tiên đã mở nhưng chưa thạo. Nếu tất cả đã thạo, chọn từ toàn bộ kỹ năng thạo. Màn thử thách lặp 3 kỹ năng cuối trong nhóm chưa thạo; nếu không có thì lặp 3 kỹ năng thạo cuối. Ngay sau kiểm tra năng lực, màn thử thách bắt đầu từ kỹ năng đầu tiên đã mở nhưng chưa thạo.

### 3.2 Theo khối

Bài cơ bản lấy từ các kỹ năng của khối đã chọn, không phụ thuộc trạng thái mở. Thứ tự đi từ quan hệ tiên quyết nông đến sâu, có thêm biến động ngẫu nhiên. Kết quả vẫn được tính vào tiến độ thạo thông thường.

Sáu câu thử thách đầu lặp các kỹ năng từ vị trí `floor(số kỹ năng × 0.55)` trở đi trong khối đó. Từ câu thứ 7, chuyển sang tối đa 4 kỹ năng đầu của khối kế tiếp. Với lớp 6, tiếp tục phần sau của cùng khối.

### 3.3 Luyện tập

Chọn một kỹ năng đã mở trong Cây kỹ năng để luyện. Nếu kỹ năng đã thạo, có thể bắt đầu luyện từ màn thông tin kỹ năng. Bài cơ bản dùng đúng kỹ năng đó; màn thử thách chọn một kỹ năng đã mở có nó làm tiên quyết trực tiếp. Nếu không có kỹ năng phù hợp, tiếp tục dùng kỹ năng đã chọn.

Trong chế độ Theo khối và Luyện tập, hộp thời gian đủ điều kiện có thể thay thế một câu cơ bản. Câu này đôi khi nằm ngoài khối hoặc kỹ năng đã chọn.

### 3.4 Ôn tập

Khi hoàn thành một bài có lỗi, bài đó được lưu nguyên dạng, tối đa 40 bài. Chữ ký gồm tiêu đề và biểu thức để loại trùng. Bài bị bỏ dở không được thêm.

Có thể bắt đầu từ nút Ôn tập ở trang chính hoặc màn kết quả. Hệ thống lấy từ cuối danh sách đã lưu, tối đa bằng số câu đã chọn hoặc 10, tùy giá trị nhỏ hơn. Bắt đầu từ màn kết quả không giới hạn ở các lỗi của lượt hiện tại mà dùng toàn bộ danh sách còn lưu.

Bài giải đúng ngay lần đầu khi ôn tập sẽ bị xóa khỏi danh sách; nếu lại trả lời sai thì vẫn giữ. Hoàn thành toàn bộ được 100 điểm và không có màn thử thách. Lượt ôn vẫn tính vào tiến bộ, thành thạo và nhiệm vụ thông thường.

### 3.5 Chơi thử tự động

Trong Cài đặt, “Xem chơi thử tự động” bắt đầu thao tác tự động. Bài được chọn từ toàn bộ kỹ năng và sắp từ dễ đến khó; màn thử thách chọn kỹ năng lớp 4 trở lên. Hệ thống dùng cùng luồng nhập, chấm và hiệu ứng như chơi thật, kể cả lỗi. Số bài cơ bản có thể sai tối đa là `floor(số câu × 0.2)`.

Sau một vòng cơ bản, màn thử thách và kết quả cuối, ứng dụng về trang chính và tắt chơi thử. Chạm hoặc nhấn phím cũng kết thúc. Trong 600ms đầu sau khi bắt đầu, thao tác chạm bị bỏ qua. Kết quả chơi thử không được thêm vào lịch sử, tiến độ thạo, ôn tập hoặc thống kê tiến bộ; nhiệm vụ và cúp cũng không tăng. Sau khi về trang chính, quy trình đăng nhập thông thường vẫn chạy.

Các hiệu ứng cố định vẫn dùng trong chơi thử; chỉ danh mục ngẫu nhiên mới chọn từ các món đã mở. URL `?demo` là chức năng khác với chế độ tự động này.

## 4. Một lượt chơi và nhập đáp án

### 4.1 Bài cơ bản và màn thử thách

Số câu là 6, 10 hoặc 14, mặc định 10. Thời gian mục tiêu của phần cơ bản là `ceil(số câu × 18 ÷ 10) × 10` giây: 6 câu là 110 giây, 10 câu là 180 giây, 14 câu là 260 giây. Quá thời gian vẫn được tiếp tục và không bị trừ điểm. Thời gian cơ bản tính từ lúc bắt đầu đến khi hoàn thành, bao gồm cả chuyển bài.

“Đúng” là số bài hoàn thành đến đáp án cuối; “Suýt đúng” là số lần chữ số được nhận nhưng sai với ô hiện tại. “Đúng ngay lần đầu” là bài hoàn thành mà không sai lần nào, kể cả bước trung gian. Nếu số bài cơ bản đúng ngay lần đầu chia cho số câu từ 0,8 trở lên, người chơi được chọn màn thử thách.

Màn thử thách mặc định kéo dài 90 giây. Hạn được đặt bằng thời điểm bắt đầu cộng 90.000ms và 900ms chuyển cảnh. Đây không phải cơ chế bảo đảm 90 giây kể từ lần nhập đầu; đồng hồ vẫn chạy khi chuyển bài. Đồng hồ dừng trong hộp xác nhận. Khi hết thời gian, điểm được chốt và chuyển sang kết quả cuối. Bài chưa hoàn thành không được cộng điểm, nhưng Dopa từ các ô đúng đã nhận vẫn giữ lại.

### 4.2 Nhập chữ số

Bàn phím số riêng và phím số trên máy tính nhập từng chữ số, chấm ngay tại chỗ. Không có nút xác nhận. Chữ số đúng được giữ; chữ số sai sẽ bị thay thế ở lần nhập tiếp theo. Backspace xóa chữ số sai hiện tại, không xóa chữ số đã đúng.

Trên điện thoại, ứng dụng tính theo vùng hiển thị gồm cả thanh điều khiển trình duyệt và điều chỉnh khoảng trống bài toán cùng chiều cao bàn phím. Hàng cuối có 0 và xóa nằm trên vùng an toàn bên dưới. Khi kích thước màn hình đổi, cỡ chữ bài toán được tính lại.

| Dạng bài | Thứ tự nhập và hiển thị tự động |
| --- | --- |
| Biểu thức ngang | Nhập từ chữ số bên trái của đáp án |
| Phép chia ngang có dư | Thương, rồi số dư |
| Cộng/trừ dọc | Từ hàng thấp nhất; chữ số nhớ/mượn phụ trợ tự động hiện |
| Nhân dọc | Nhập tích riêng từ phải sang trái; nếu có nhiều tích riêng, nhập tổng cũng từ phải sang trái |
| Chia dọc | Chữ số đầu của thương, phần còn lại sau phép trừ, thương tiếp theo; tích, chữ số hạ xuống và số dư 0 cuối cùng tự động hiện |
| Số thập phân | Dấu thập phân tự động hiện, chỉ nhập chữ số |
| Phân số | Mẫu, tử; hỗn số theo thứ tự phần nguyên, mẫu, tử |
| Tỉ số, biểu thức có x, số gần đúng, phần trăm | Nhập từ chữ số bên trái của ô trống được chỉ định |

Phân số được chấm theo dạng đáp án đã chuẩn bị. Phân số cùng mẫu lớp 3 giữ mẫu ban đầu và không rút gọn. Các phép tính phân số khác dùng dạng phân số tối giản hoặc hỗn số do bộ sinh tạo ra. Đây không phải cách chấm chấp nhận mọi dạng biểu diễn tương đương.

### 4.3 Trả lời sai và gợi ý

Ô sai dùng khung chấm màu tím. Nếu sai hai lần ở cùng ô, các chữ số cần tham chiếu sẽ được nhấn mạnh và Dopakichi chỉ vào đó. Từ lần sai thứ ba, gợi ý như bước tính trung gian hoặc dãy bảng nhân được hiển thị. Gợi ý có thể chứa giá trị tương đương đáp án.

Trả lời sai đặt combo về 0 nhưng không giảm điểm hay Dopa; cấp độ hiệu ứng và nhạc nền vẫn giữ. Âm lượng nhạc nền tạm giảm để phát âm báo sai, sau đó Dopakichi thể hiện cảnh khôi phục.

## 5. Điểm, Dopa và combo

### 5.1 Điểm

Hoàn thành phần cơ bản được 100 điểm. Nếu bài thử thách hoàn thành có chỉ số bắt đầu từ 0 là `k`, điểm cộng là `10 + 5 × k`. Tổng điểm khi hoàn thành `n` bài thử thách là:

```text
100 + 10 × n + 5 × n × (n − 1) ÷ 2
```

5 bài được 200 điểm, 10 bài được 425 điểm, 15 bài được 775 điểm, 23 bài được 1595 điểm, 30 bài được 2575 điểm. Không có trần điểm cố định. Combo, tốc độ và số lần suýt đúng không nhân hoặc trừ điểm.

### 5.2 Cách tính Dopa

Dopa là chỉ số của hiệu ứng, tách biệt với điểm. Giá trị nội bộ `L` là logarit cơ số 10; giá trị hiển thị bắt nguồn từ `10^L`. Khi bắt đầu lượt chơi, `L = 0`.

Đường cơ bản của phần cơ bản là `B(f) = 2.3 × clamp(f, 0, 1)^1.15`; đường của màn thử thách là `X(n) = 2.3 + 3.0 × (1 − exp(−n / 10))`.

Gọi tổng số bài cơ bản là `N`, bài hiện tại bắt đầu từ 0 là `q`, số ô của bài là `m`, ô vừa trả lời đúng bắt đầu từ 1 là `s`, thì lượng tăng cơ bản là `B((q + s/m)/N) − B((q + (s−1)/m)/N)`. Với màn thử thách, nếu đã hoàn thành `k` bài thì lượng tăng cơ bản cho mỗi ô là `(X(k+1) − X(k))/m`.

Khi đúng, combo `c` tăng trước rồi lượng tăng được áp dụng:

```text
Hệ số M(c) = 1 + (2 − 1) × min(1, max(0, c) / 20)
L mới = min(9.08, L + max(0.003, lượng tăng cơ bản) × M(c))
```

10 combo tương đương hệ số 1,5; từ 20 combo là 2. Trần logarit là 9,08, tương đương chính xác `10^9.08` khi hiển thị. Vì lượng tăng tối thiểu là 0,003, giá trị đạt thực tế không chỉ phụ thuộc điểm cuối của đường cong. Câu đúng đầu tiên đã là combo 1 và hệ số 1,05; khi vào màn thử thách, combo về 0 nhưng Dopa được giữ.

Giá trị dưới 100.000.000 được làm tròn thành số nguyên và hiển thị theo định dạng số Việt Nam. Từ đó dùng các đơn vị “trăm triệu” và “nghìn tỷ”. Nếu phần giá trị trong một đơn vị nhỏ hơn 10, hiển thị một chữ số thập phân; từ 10 trở lên cắt phần thập phân. Các mốc 100, 1.000, 10.000, 100.000, 1.000.000, 10.000.000 và 100.000.000 có hiệu ứng riêng. Trong lượt chơi thông thường, Dopa không đạt đến hàng nghìn tỷ.

### 5.3 Thời gian và hiển thị combo

Mỗi ô đúng cộng 1 combo và combo kéo dài qua các bài. Combo từ 2 trở lên mới hiển thị; từ 20 trở lên hiển thị “Dopa ×2 TỐI ĐA”. Trả lời sai hoặc hết giờ đưa combo về 0. Tuy nhiên trong triển khai hiện tại, trạng thái combo 1 không bị xét hết giờ.

Thời gian của một ô thường ở khối `g` là `3000 + 600 × (g − 1)` ms; ô đầu tiên của bài được cộng thêm 2500ms. Khối được giới hạn từ 1–6, giá trị không hợp lệ dùng khối 3.

| Khối | Ô thường | Ô đầu tiên của bài |
| --- | ---: | ---: |
| 1 | 3000ms | 5500ms |
| 2 | 3600ms | 6100ms |
| 3 | 4200ms | 6700ms |
| 4 | 4800ms | 7300ms |
| 5 | 5400ms | 7900ms |
| 6 | 6000ms | 8500ms |

Hạn được đặt khi bắt đầu nhận nhập liệu; thời gian chuyển bài và hộp xác nhận không bị tính. Thanh thời gian nhấn mạnh khi còn dưới 30%. Combo 10, 20, 30, 50, 75 và từ 100 trở lên theo mỗi 50 được chúc mừng lớn. Khi combo từ 5 trở lên bị ngắt, số combo đã đạt được hiển thị ngắn gọn.

## 6. Phạm vi bài và cây kỹ năng

### 6.1 Phạm vi và tạo bài

Có 58 kỹ năng. Theo khối gồm lớp 1: 8, lớp 2: 13, lớp 3: 14, lớp 4: 10, lớp 5: 8, lớp 6: 5. Bốn nhóm là “Cộng & trừ”, “Nhân & chia”, “Số thập phân & phân số” và “Khác”. Tên, ID, tiên quyết và điều kiện tạo của toàn bộ kỹ năng nằm trong `docs/curriculum.md`.

Nội dung gồm bốn phép tính, phép tính dọc có nhập từng bước, số thập phân, phân số, số gần đúng, ước/bội, thứ tự tính, phần trăm, tỉ số bằng nhau và giá trị của ẩn. Không tạo bài hình học, đo lường, biểu đồ, bài toán có lời văn hoặc nhập chữ số Hán.

Bài được tạo ngẫu nhiên từ điều kiện của kỹ năng. Chữ ký của 24 bài gần nhất và chữ ký đã dùng trong lượt hiện tại được dùng để tránh lặp. Do có giới hạn số lần thử, kỹ năng ít ứng viên đôi khi vẫn lặp. Hộp thời gian và Ôn tập cố ý dùng lại bài đã lưu.

### 6.2 Hiển thị và mở khóa

Mỗi nhóm chia thành hai cột, tổng cộng tám cột; màn hình hẹp có thể cuộn ngang dọc. Thứ tự khối được ưu tiên, lớp 5–6 nằm dưới lớp 1–4. Đường tiên quyết vòng tránh các nút khác; chỉ nằm cùng cột không có nghĩa là phụ thuộc.

Kỹ năng không có tiên quyết được mở từ đầu; kỹ năng có nhiều tiên quyết cần tất cả đều thạo. Trạng thái gồm khóa, mới, đang học và thạo. Điều kiện thạo thông thường cần ít nhất 6 bài lịch sử và ít nhất 5/6 bài gần nhất đúng ngay lần đầu. Kỹ năng đã thạo không quay lại trạng thái khóa vì trả lời sai. Việc cấp hàng loạt trong kiểm tra năng lực là ngoại lệ số lượng này.

### 6.3 Sao kỹ năng

Sau khi thạo, người chơi lần lượt nhận ☆1–☆5. Cần đạt điều kiện từng cấp; nếu một kết quả thỏa nhiều cấp, sao có thể tăng nhiều bước. Tổng tối đa là 290.

Đánh giá tốc độ dùng tỉ lệ thời gian trả lời của từng bài so với thời gian chuẩn. Thời gian chuẩn là `thời gian combo của ô đầu + max(0, số ô − 1) × thời gian combo ô thường`. Chỉ các bài đúng ngay lần đầu được dùng để tính trung vị.

| Sao | Điều kiện |
| --- | --- |
| ☆1 | Đã thạo |
| ☆2 | Có đủ 20 bài gần nhất, tỷ lệ đúng ngay lần đầu từ 0,9 |
| ☆3 | Có đủ 10 bài gần nhất, ít nhất 5 bài đúng ngay lần đầu, trung vị tỉ lệ thời gian không quá 1 |
| ☆4 | 3 bài gần nhất đều đúng ngay lần đầu và ngày của từng bài cách ngày nhận ☆3 ít nhất 7 ngày |
| ☆5 | Có đủ 20 bài gần nhất, tỷ lệ đúng ngay lần đầu từ 0,95, trung vị tỉ lệ thời gian không quá 0,6 |

Ba bài của ☆4 không cần cùng ngày. Sao không giảm vì chơi hoặc nghỉ; xóa thành tích kỹ năng và xóa toàn bộ sẽ xóa sao. Màn thông tin hiển thị điều kiện sao tiếp theo, giá trị hiện tại, số bài đã giải và thời gian nhanh nhất.

### 6.4 Kỹ năng nguội

Kỹ năng thạo mà đã quá `21 × 86400000` ms kể từ lần đúng ngay lần đầu cuối cùng được đưa vào danh sách; tối đa 3 kỹ năng cũ nhất hiển thị trạng thái nguội. Nếu không có thời điểm đúng ngay lần đầu, hệ thống lần lượt dùng thời điểm được cấp trong kiểm tra năng lực và thời điểm thạo.

Trả lời đúng ngay lần đầu một bài của kỹ năng nguội sẽ làm nóng lại kỹ năng, giữ nguyên sao và xóa dấu nguội. Việc này có thể khiến một kỹ năng cũ khác xuất hiện. Kỹ năng nguội được dùng trong ôn tập của Trình độ của mình và nhiệm vụ làm nóng.

### 6.5 Xóa thành tích kỹ năng

Giữ một nút kỹ năng 600ms hoặc đưa tiêu điểm vào nút rồi nhấn Delete để mở xác nhận. Nếu con trỏ di chuyển hơn 10px, thao tác giữ sẽ bị hủy.

Khi xác nhận, thành tích và sao của kỹ năng đó cùng mọi kỹ năng phụ thuộc trực tiếp hoặc gián tiếp bị xóa. Kỹ năng được chọn trở lại trạng thái Mới nếu các tiên quyết vẫn đủ; nếu không thì trở lại trạng thái khóa. Lịch sử, Ôn tập, thống kê tích lũy, cúp, bộ sưu tập và trạng thái đã kiểm tra năng lực vẫn giữ nguyên.

## 7. Các cơ chế khuyến khích tiếp tục

### 7.1 Lịch sử, lịch và thưởng đăng nhập

Lịch sử được lưu ở kết quả cơ bản; sau khi màn thử thách kết thúc, điểm, số câu thử thách đúng, số lần suýt đúng và Dopa của cùng lượt được cập nhật. Tối đa 3.000 bản ghi được giữ. Lịch hiển thị điểm cao nhất và số lượt chơi mỗi ngày, mở chi tiết từ một ngày. Có thể chuyển về tháng trước nhưng không chuyển sang tháng tương lai.

Chuỗi ngày tính từ hôm nay, hoặc từ hôm qua nếu hôm nay chưa chơi. Lịch cũng hiển thị kỷ lục chuỗi và số nhãn đăng nhập. Ngày chơi và ngày mở ứng dụng là hai khái niệm khác nhau; chỉ mở trang chính không tính là đã chơi.

Thưởng đăng nhập nhận tối đa một lần mỗi ngày theo ngày của thiết bị. Chu kỳ 7 ngày lần lượt nhận sao, tim, hoa, nốt nhạc, cỏ bốn lá, dấu đúng và vương miện. Nếu có ngày nghỉ không được bỏ qua, chu kỳ bắt đầu lại. Nhãn được đánh dấu đã nhận khi thẻ mở; đóng hoặc tải lại không nhận trùng trong cùng ngày.

### 7.2 Búa bỏ qua

Một búa biến một ngày không chơi thành ngày không tính, nối chuỗi chơi và đăng nhập. Ngày đó không được cộng vào số ngày chơi và không tạo thêm nhãn của ngày nghỉ. Ban đầu có 1 búa, tối đa 3 búa.

Nếu lần chơi cuối nằm trong 7 ngày gần đây, mọi ngày trống đến hôm qua có thể được lấp bằng số búa đang có và việc đó giữ được chuỗi ít nhất 2 ngày, trang chính đề xuất dùng búa một lần mỗi ngày. Ngày đã từ chối sẽ không được đề xuất lại. Khi dùng, lịch được đóng dấu Bỏ qua. Lịch sử dùng búa giữ tối đa 50 bản ghi.

### 7.3 Nhiệm vụ hằng ngày

Từ ngày của thiết bị và dữ liệu tại thời điểm chọn nhiệm vụ, hệ thống chọn hai nhiệm vụ đơn giản và một nhiệm vụ nhiều bước rồi lưu lại. Trong cùng ngày, đổi cài đặt không chọn lại. Khi ngày mới được xử lý, danh sách mới thay thế danh sách cũ. Có 11 ứng viên cố định và 1 ứng viên phụ thuộc kỹ năng nguội.

| Ô | Ứng viên và điều kiện |
| --- | --- |
| Đơn giản | Hoàn thành 1 lượt, combo 5, 5 câu đúng ngay lần đầu, ôn tập 1 câu, giải 1 câu kỹ năng Mới |
| Nhiều bước | Vào màn thử thách, giải 5 câu thử thách, combo 20, hoàn thành 2 lượt, hoàn thành 1 lượt theo khối, giải 10 câu kỹ năng Mới hoặc Đang học, đúng ngay lần đầu 3 câu kỹ năng chỉ định |

Nếu không có đối tượng Ôn tập hoặc Mới, ứng viên tương ứng bị loại. Nhiệm vụ màn thử thách cần có bản ghi thử thách trong 5 lịch sử gần nhất; combo 20 cần `số câu × số ô trả lời trung bình >= 26`; nhiệm vụ 10 câu Đang học cần đã kiểm tra năng lực và còn kỹ năng chưa thạo. Trong cùng ngày không xếp trùng cùng một chỉ số.

Mô hình ước tính thời gian là `(số câu × 18 + 90 nếu dự kiến có màn thử thách + 30) / 60` phút cho một lượt. Năm câu đúng ngay lần đầu cần `ceil(5 / (số câu × 0.7))` lượt; 10 câu Đang học cần `ceil(10 / (số câu × 0.6))` lượt; combo 20 cần 2 lượt. Ôn tập tính tối đa 10 câu. Hệ thống ghép các mục có thể hoàn thành chung giữa các chế độ và chọn tổ hợp trong 15 phút. Đây là ước tính, không phải giới hạn thời gian thực.

Ứng viên làm nóng chỉ được chọn khi có kỹ năng nguội, số ngẫu nhiên theo ngày nhỏ hơn 0,5 và số lần đề xuất trong 7 ngày gần nhất dưới 2. Có thể bắt đầu luyện kỹ năng từ trang chính; để hoàn thành cần 3 câu đúng ngay lần đầu ở cùng kỹ năng. Điều này khác với điều kiện làm mất trạng thái nguội chỉ cần 1 câu.

Tiến độ tăng trong lúc chơi và hoàn thành được thông báo ở đầu màn hình. Ôn tập cũng tính vào điều kiện hoàn thành, đúng ngay lần đầu và combo. Khi hoàn thành cả 3 nhiệm vụ, mỗi ngày nhận 1 búa và đánh dấu ngày trên lịch. Nếu đã đủ búa, chỉ phát hiệu ứng và không chuyển phần thưởng sang ngày sau.

### 7.4 Cúp

Có 12 nhóm, 39 chuỗi và 306 cúp. Nhóm gồm Duy trì, Chăm chỉ, Kỹ năng, Tiến bộ, Thử thách, Combo, Chính xác, Dopa, Ôn tập, Theo khối, Bộ sưu tập và Bí mật. Khi đạt từng mốc trong chuỗi, cúp được nhận và giữ vĩnh viễn.

Cúp được xét ở kết quả, kết quả cuối, trang chính và một số thời điểm khác; không mở hộp thoại trong lúc đang chơi. Mỗi lần thông báo hiển thị tối đa 6 cúp và số còn lại. Nếu lần đầu xét từ dữ liệu cũ, các cúp đã đạt được thông báo theo nhóm yên lặng.

Danh sách có thể lọc tất cả, đã nhận hoặc chưa nhận; mở từng chuỗi để xem các mốc, ngày nhận và phần thưởng. “Sắp đạt” hiển thị 12 mục gần điều kiện nhất, bỏ qua cúp bí mật, Dopa và điều kiện đơn lẻ. Hạng gồm đồng, bạc, vàng và cầu vồng; mốc đơn là vàng, mốc cuối của chuỗi nhiều cấp là cầu vồng, cúp bí mật dùng hiển thị riêng.

Trong triển khai hiện tại, số lượt hoàn thành theo khối chưa được đưa vào thống kê tích lũy nên 18 cúp “chơi theo từng khối” không tăng. Các giá trị cần cho cúp bí mật “14 câu không sai”, “ít nhất 5 câu thử thách không sai” và “Chủ nhật” cũng chưa được cập nhật. Chúng vẫn nằm trong số lượng định nghĩa. Các cúp bí mật còn lại là ngày 1/1, quay lại sau ít nhất 7 ngày nghỉ và hoàn thành bốn chế độ thông thường.

Tổng thời gian chơi chỉ cộng thời gian của phần cơ bản đã hoàn thành, không gồm màn thử thách. Cúp về “thời gian đã chơi” dùng giá trị này.

Ngưỡng dưới đây đạt khi chỉ số bằng hoặc cao hơn; hoàn thành khối/nhóm và cúp bí mật là các điều kiện độc lập.

| Nhóm · chuỗi | Ngưỡng hoặc điều kiện độc lập |
| --- | --- |
| Duy trì: chơi liên tiếp | 3, 5, 7, 10, 14, 21, 30, 50, 75, 100, 150, 200, 365 |
| Duy trì: ngày đã chơi | 1, 3, 5, 7, 10, 15, 20, 30, 40, 50, 75, 100, 150, 200, 300, 365, 500, 730, 1000 |
| Duy trì: nhãn đăng nhập | 1, 7, 14, 30, 50, 100, 200, 365 |
| Duy trì: nhãn vương miện | 1, 3, 5, 10, 20, 52 |
| Chăm chỉ: câu đã giải | 10, 30, 50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 20000, 30000, 50000, 100000 |
| Chăm chỉ: chữ số đã nhập | 100, 500, 1000, 3000, 5000, 10000, 30000, 50000, 100000, 300000 |
| Chăm chỉ: số lượt chơi | 1, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000 |
| Chăm chỉ: thời gian chơi | 10, 30, 60, 120, 300, 600, 1200, 3000 phút |
| Kỹ năng: mở khóa kỹ năng | 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58 |
| Kỹ năng: thạo kỹ năng | 1, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58 |
| Kỹ năng: thạo toàn bộ khối | Thạo toàn bộ lớp 1, 2, 3, 4, 5 hoặc 6 |
| Kỹ năng: thạo toàn bộ nhóm | Thạo Cộng & trừ, Nhân & chia, Số thập phân & phân số hoặc Khác |
| Thử thách: vào màn thử thách | 1, 3, 5, 10, 20, 30, 50, 100, 200, 300 |
| Thử thách: kỷ lục một lượt | 3, 5, 7, 10, 12, 15, 18, 20, 23, 25, 30 |
| Thử thách: câu đã giải | 10, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000 |
| Combo: combo cao nhất | 5, 10, 15, 20, 30, 40, 50, 75, 100, 150, 200, 300 |
| Chính xác: lượt không sai | 1, 3, 5, 10, 20, 30, 50, 100, 200, 300 |
| Chính xác: đúng ngay lần đầu | 10, 50, 100, 300, 500, 1000, 3000, 5000, 10000, 30000 |
| Dopa: Dopa | 2, 3, 4, 5, 6, 7, 8, 9 theo logarit cơ số 10 |
| Ôn tập: ôn tập | 1, 5, 10, 30, 50, 100, 200, 300 |
| Theo khối: chơi lớp 1–6 | Mỗi khối: 1, 10, 30 |
| Bí mật | 14 câu hoàn hảo, màn thử thách không sai, toán Chủ nhật, bài đầu năm, Chào mừng trở lại, đủ mọi cách chơi |
| Duy trì: hoàn thành nhiệm vụ | 1, 3, 7, 14, 30, 50, 100, 200, 365 |
| Duy trì: chuỗi nhiệm vụ | 2, 3, 5, 7, 14, 30 |
| Duy trì: búa bỏ qua | 1, 3, 10 |
| Kỹ năng: tổng số sao | 5, 10, 25, 50, 75, 100, 150, 200, 250, 290 |
| Kỹ năng: kỹ năng ☆5 | 1, 3, 5, 10, 20, 30, 58 |
| Kỹ năng: toàn khối ☆3 | Mỗi khối 1–6 đều đạt ☆3 |
| Tiến bộ: làm nóng kỹ năng nguội | 1, 3, 5, 10, 30, 50 |
| Tiến bộ: hộp thời gian | 1, 3, 5, 10, 30 |
| Tiến bộ: nhanh hơn trước | 1, 5, 10 |
| Tiến bộ: bạn đã tiến bộ | 1, 5, 10, 30, 50, 100 |
| Bộ sưu tập: món đã nhận | 10, 20, 30, 40, 47 |
| Bộ sưu tập: hoàn thành danh mục | 1, 3, 5, 8 |

### 7.5 So sánh với lần trước

Ở kết quả cơ bản, tối đa 3 dòng hiển thị các kỹ năng tiến bộ so với bản ghi trước với tiêu đề “Bạn tiến bộ!”. Cả lượt hiện tại và lượt dùng để so sánh phải có ít nhất 3 câu. Lượt so sánh là ngày chơi trước, lượt gần nhất cách ít nhất 21 ngày, hoặc 3 câu đầu tiên từng giải. Các lượt cũ hơn trong cùng ngày không được chọn.

Thời gian được so sánh theo trung bình mỗi ô; màn hình quy đổi thành số giây mỗi bài với số ô trung bình của lượt hiện tại. Mục đủ điều kiện nếu nhanh hơn ít nhất 10% hoặc tỷ lệ đúng ngay lần đầu tăng ít nhất 10 điểm phần trăm. Mỗi kỹ năng chọn một cải thiện lớn nhất, rồi sắp toàn bộ theo mức cải thiện. Nếu không có cải thiện thì không hiển thị. Kiểm tra năng lực, chơi thử và các URL kiểm tra tắt ghi nhận tiến bộ đều bị loại.

### 7.6 Hộp thời gian

Từ 3 bài đầu được lưu của mỗi kỹ năng, chọn bài cũ nhất chưa dùng, thuộc kỹ năng đã thạo và đã quá `30 × 86400000` ms kể từ lúc giải.

Nếu bộ cơ bản của Trình độ của mình, Theo khối hoặc Luyện tập có ít nhất 4 câu, thay thế vị trí bắt đầu từ 0 là `max(1, min(N−2, floor(N/2)))`. Kiểm tra năng lực, Ôn tập, màn thử thách, chơi thử và URL tắt ghi nhận tiến bộ không dùng hộp thời gian. Mỗi ngày tối đa một bài. Ngày được lưu khi phần giới thiệu kết thúc, nên dù sau đó bỏ dở thì cùng ngày không giới thiệu lại. Bài được đánh dấu đã dùng khi hoàn thành.

Phong bì và viền cam cho biết đây là bài cũ. Nếu thời gian hiện tại nhỏ hơn 0,95 lần thời gian cũ thì hiển thị đã nhanh hơn; nếu không, so sánh số lần sai; nếu cả hai không đổi thì hiển thị đã giải lại và ngày. Đúng 5% nhanh hơn không được tính là cải thiện thời gian.

### 7.7 Bộ sưu tập và mở khóa hiệu ứng

Có 8 danh mục và 47 món. Mỗi danh mục có 1 món dùng ngay từ đầu; 39 món còn lại là phần thưởng của cúp. Món chưa mở hiển thị điều kiện nhận.

| Danh mục | Món và điều kiện mở khóa (trừ món ban đầu là tên cúp) |
| --- | --- |
| Nền (6) | Tia sáng (ban đầu), Bầu trời đêm (chuỗi 3 ngày), Biển và bong bóng (100 câu đúng), Lễ hội (15 ngày đã chơi), Đồ thủ công giấy (200 câu đúng), Vũ trụ (10 màn thử thách) |
| Dấu đúng (5) | Hoa điểm tốt (ban đầu), Con dấu đúng (3 lượt chơi), Huy chương (chuỗi 7 ngày), Vương miện (3 lượt không sai), Vòng pháo hoa (combo 30) |
| Giấy màu (6) | Giấy màu (ban đầu), Nốt nhạc (3 ngày đã chơi), Cánh hoa (7 nhãn), Chữ số (1.000 chữ số nhập), Bong bóng (10 câu ôn tập), Kẹo (10 câu trong một lượt) |
| Âm nhạc (5) | Nhạc marimba (ban đầu), 8-bit (10 lượt chơi), Nhạc lễ hội (chuỗi 5 ngày), Ban nhạc kèn đồng (5 ngày đã chơi), Nhạc điện tử (3 màn thử thách) |
| Trang phục (9) | Không (ban đầu), Mũ (1 ngày đã chơi), Khăn đội đầu (50 câu đúng), Áo choàng (combo 20), Kính tròn (100 câu đúng ngay lần đầu), Nơ (14 nhãn), Vương miện (chuỗi 14 ngày), Mũ phù thủy (1 kỹ năng ☆5), Tai nghe (1 hộp thời gian) |
| Màu Dopakichi (8) | Hồng (ban đầu), Xanh dương (5 lượt chơi), Xanh lá (7 ngày đã chơi), Trắng tuyết (hoàn thành nhiệm vụ 7 ngày), Vàng (300 câu đúng), Tím (100 câu thử thách), Vàng kim (chuỗi 30 ngày), Cầu vồng (100 ngày đã chơi) |
| Khán giả (4) | Nhiều màu (ban đầu), Khán giả mặc đẹp (50 câu đúng ngay lần đầu), Khán giả cầu vồng (30 ngày đã chơi), Khán giả đồng phục (100 sao) |
| Màn kết (4) | Dopakichi khổng lồ (ban đầu), Hội pháo hoa (5 màn thử thách), Diễu hành (chuỗi 10 ngày), Tên lửa (20 màn thử thách) |

Mỗi danh mục có thể cố định một món hoặc chọn “Ngẫu nhiên”. Ngẫu nhiên chọn từ món đang sở hữu khi bắt đầu mỗi lượt; trang chính dùng diện mạo cơ bản. Lựa chọn được lưu và không ảnh hưởng điểm hay độ khó.

Màn Bộ sưu tập cho xem thử nền, dấu, hạt, trang phục, màu, khán giả và màn kết; nhạc được nghe thử 7 giây. Trang phục và màu phủ lên hình dáng gốc của Dopakichi; khán giả và màn kết cũng dùng diện mạo đã chọn.

## 8. Dopakichi, hiệu ứng và âm thanh

Dopakichi về nguyên tắc không có lời thoại. Hình mẫu nằm ở `docs/dopakichi.svg`: tai ngang lớn, đầu tròn bè ngang, mặt và bụng màu kem, mắt hai vòng tròn, tay mảnh và chân xanh. Màu cơ bản là hồng `#FF97BF`, kem `#FFF3E4`, mặt trong tai `#FFE6F0`, xanh `#2F79F7`, viền `#000000`.

Các chữ số đã nhập được một bàn tay trống mang đi. Hai tay có thể mang hai chữ số khác nhau, tách việc chấm và vận chuyển để không chặn lần nhập tiếp theo. Câu đúng giữa chừng và câu đúng cuối dùng nhảy, vỗ tay, xoay; câu sai dùng cảnh chao đảo rồi khôi phục. Có 10 kiểu diễn sai: đầu lượt dùng 4, giữa lượt dùng 8, từ cường độ 0,6 dùng cả 10, đồng thời tránh lặp kiểu ngay trước đó.

Gọi số bài cơ bản bắt đầu từ 0 là `i`, số câu là `N`, cường độ hiệu ứng là `E = 0.08 + 0.92 × (i/(N−1))^1.3`. Nếu chỉ có một câu thì `E = 1`. Với màn thử thách, gọi số bài đã hoàn thành là `k`, `tier = floor(k/3)`, `E = 1 + min(0.5, tier × 0.1)`.

Theo cường độ, nền, dấu đúng, giấy màu, sao, pháo hoa, xu, khán giả, diễu hành, hiệu ứng gần đạt, đèn và rung được chồng lên. Màn kết chọn giữa Dopakichi khổng lồ, hội pháo hoa, tên lửa và diễu hành, cuối cùng hiển thị 100 điểm. Vị trí nhập, bàn phím và quan hệ hàng của phép tính dọc vẫn được giữ.

Nhạc và hiệu ứng âm thanh được tổng hợp bằng Web Audio API, không tải bản ghi bên ngoài. Có 5 bài: nhạc marimba cơ bản, 8-bit, nhạc lễ hội, ban nhạc kèn đồng và nhạc điện tử. Bộ tạo dao động, nhiễu, bộ lọc và vang được dùng để xếp dần bộ gõ, bass, hợp âm và giai điệu.

Tempo cơ bản là `112 + min(1, E) × 16` BPM; lượt thường bắt đầu ở 113,28 BPM và kết thúc ở 128 BPM. Câu cuối tăng 2 bán âm so với tông chuẩn. Màn thử thách dùng `134 + tier × 5` BPM và tông tăng `2 + min(tier, 5)` bán âm. Tông có giới hạn; tempo không có giới hạn cố định ngoài công thức này.

Âm thanh báo phím, chữ số hạ xuống, đúng, sai, mốc Dopa và đồng hồ được đồng bộ với hợp âm của bài. Trình duyệt yêu cầu thao tác người dùng để bắt đầu âm thanh. Nền dùng WebGL; nếu không khả dụng hoặc mất context, ứng dụng chuyển sang nền CSS.

## 9. Cài đặt và khả năng tiếp cận

| Cài đặt | Nội dung và mặc định |
| --- | --- |
| Số câu | 6, 10, 14; mặc định 10 |
| Âm thanh | Bật/tắt; mặc định bật; có thể đổi từ nút tắt âm thanh trong lúc chơi |
| Âm lượng | 0–100%; mặc định 80% |
| Mức chuyển động | 0–100%; nếu chưa thiết lập thì 0% khi thiết bị yêu cầu giảm chuyển động, ngược lại 100% |
| Chơi thử | Hiển thị một vòng thao tác tự động |
| Đặt lại tất cả | Xác nhận hai lần rồi khởi tạo dữ liệu trên thiết bị |

Mức chuyển động ảnh hưởng lượng hạt, rung, chớp, nền, khán giả và chuyển động lớn của Dopakichi. Ở 0%, các chuyển động/rung/chớp chính dừng lại và hướng dẫn dùng tư thế tĩnh. Đây không phải tắt toàn bộ kết xuất; nhịp thở ở màn thường và một lượng nhỏ hạt vẫn có thể còn. Khi kéo thanh, màn Cài đặt cho xem phản ứng. Quy tắc chấm và điểm không đổi.

Escape đóng hộp thoại đang mở; nếu không ở trang chính thì mở xác nhận “Về màn hình chính?”. Nút “Ở lại” nhận tiêu điểm mặc định. Trong xác nhận, nhập liệu, thời gian cơ bản, hạn màn thử thách/combo và bộ đếm từng bài đều dừng. Tiến độ của các bài đã hoàn thành trước khi dừng vẫn giữ. Nếu dừng trước kết quả cơ bản, không tạo lịch sử hoàn thành. Escape trong chơi thử kết thúc chơi thử.

Tên truy cập của nút, trạng thái tiêu điểm, nhãn cho nội dung không phải chữ số và vòng tiêu điểm trong hướng dẫn đều được cung cấp. Ứng dụng không cam kết toàn bộ lượt chơi có thể thực hiện chỉ bằng trình đọc màn hình hoặc mọi thiết bị.

Ở độ cao từ 700px trở xuống, giấy bài, vùng hiệu ứng và khoảng trống được điều chỉnh để hàng cuối của bàn phím nằm trong màn hình. Dù màn hình ngắn, chiều cao phím vẫn giữ 48px.

Lần xác nhận đầu tiên của Đặt lại tất cả liệt kê nội dung sẽ xóa; lần thứ hai hỏi lại rằng không thể khôi phục. Cả hai dùng Hủy làm tiêu điểm mặc định. Hủy, Escape hoặc nhấn nền không xóa. Khi xác nhận lần hai, mọi khóa lưu có tiền tố `dopa-drill` bị xóa, cache trong bộ nhớ bị bỏ và trang tải lại; khóa không liên quan được giữ.

Cài đặt, lịch sử, tiến độ, sao, thống kê tiến bộ, cúp, lựa chọn bộ sưu tập, nhãn, nhiệm vụ, vật phẩm và trạng thái hướng dẫn đầu tiên đều được đặt lại. Khi khởi động lại, hướng dẫn đầu tiên và vật phẩm ban đầu được tạo lại. Nếu trình duyệt từ chối xóa, ứng dụng không ném lỗi kết thúc nhưng không thể bảo đảm dữ liệu đã lưu biến mất.

## 10. Lưu trữ và quyền riêng tư

Dữ liệu lưu trong `localStorage` của trình duyệt, khóa là `dopa-drill:v1`, phiên bản dữ liệu là 1. Không có ô nhập tên hay thông tin cá nhân; ứng dụng không gửi lịch sử học tập lên máy chủ. Không có quảng cáo, phân tích bên ngoài, bảng xếp hạng hay đồng bộ thiết bị. Ứng dụng chỉ tải các tệp tĩnh từ máy chủ phân phối.

Nếu vùng lưu không dùng được, đọc thất bại hoặc JSON hỏng, ứng dụng khởi động với dữ liệu ban đầu và vẫn cho chơi khi việc lưu thất bại. Xóa dữ liệu trình duyệt, giới hạn lưu trữ, trình duyệt khác hoặc nguồn phân phối khác sẽ không kế thừa bản ghi.

| Dữ liệu | Nội dung · giới hạn |
| --- | --- |
| Cài đặt và hướng dẫn | Số câu, âm thanh, âm lượng, chuyển động, đã xem hướng dẫn |
| Lịch sử hoàn thành | Tối đa 3.000; ngày, chế độ, điểm, đúng, suýt đúng, thời gian cơ bản, Dopa, màn thử thách |
| Kỹ năng | 6 câu gần nhất đúng ngay lần đầu, 24 chữ ký gần nhất, 30 bài gần nhất về thời gian/ô/lỗi/ngày, tổng hợp 60 ngày gần nhất, 3 bài đầu, thời điểm đúng ngay lần đầu cuối, thời điểm thạo, sao |
| Ôn tập | Tối đa 40 bài nguyên dạng |
| Thống kê tích lũy | Bài/ô hoàn thành, đúng ngay lần đầu, lỗi, hoàn thành cơ bản và chế độ, thời gian cơ bản, Dopa cao nhất, màn thử thách, combo cao nhất, ôn tập, ngày chơi, số lần làm nóng, so sánh và hộp thời gian |
| Duy trì và phần thưởng | Nhãn, ngày đăng nhập, ngày bỏ qua, búa, nhiệm vụ, cúp đã nhận, lựa chọn hiệu ứng |

Thời gian một bài tính từ lúc mở nhận nhập đến lần nhập đúng cuối cùng, không gồm hiệu ứng chuyển bài và hộp xác nhận. Tổng bài/ô/lỗi cộng khi bài hoàn thành; thao tác của bài chưa hoàn thành không được thống kê.

Nếu dữ liệu lưu chưa có thống kê, các giá trị có thể lấy từ lịch sử sẽ được khởi tạo lại. Những giá trị lịch sử không suy ra được như số ô cũ hoặc combo cao nhất bắt đầu từ 0. URL kiểm tra không phải cơ chế tắt toàn bộ việc lưu; khác biệt cụ thể nằm ở mục tiếp theo.

## 11. Công nghệ, chạy và kiểm tra

### 11.1 Cấu trúc tệp

Ứng dụng dùng ES Modules không có thư viện phụ thuộc và không cần build. Ứng dụng chạy qua phân phối tĩnh, không cần xử lý tính toán phía máy chủ.

Trang phát hành là [dopa-drill.tanosix.com](https://dopa-drill.tanosix.com/). Cloudflare Workers Static Assets chỉ phân phối các tệp sản phẩm. `app/_headers` dùng `Cache-Control: no-transform` để ngăn máy chủ tự chèn script phân tích truy cập.

| Tệp/thư mục | Vai trò |
| --- | --- |
| `app/index.html`, `app/style.css` | Giao diện và kiểu dáng |
| `app/js/main.js` | Điều phối lượt chơi, nhập liệu, màn hình và hiệu ứng |
| `app/js/guide.js` | Hướng dẫn đầu tiên, trợ giúp và vị trí đối tượng |
| `app/js/skills.js`, `app/js/problems.js` | Định nghĩa kỹ năng, tạo bài và thứ tự nhập |
| `app/js/session.js` | Kế hoạch bài, thành thạo, sao, kỹ năng nguội, hộp thời gian |
| `app/js/scoring.js`, `app/js/growth.js` | Điểm, Dopa, combo, thống kê và so sánh tiến bộ |
| `app/js/quests.js`, `app/js/trophies.js`, `app/js/unlocks.js` | Nhiệm vụ, cúp và danh mục hiệu ứng |
| `app/js/store.js` | Lưu trữ, lịch sử, đăng nhập, búa và đặt lại |
| `app/js/dopakichi.js` | Linh vật SVG tách phần và các động tác |
| `app/js/fx.js`, `app/js/bg.js` | Hạt Canvas 2D và nền WebGL |
| `app/js/audio.js`, `app/js/core.js` | Tổng hợp Web Audio, đồng hồ, nội suy và lò xo |
| `app/fonts/` | Subset cục bộ của Baloo 2 và Nunito, SIL Open Font License |
| `tests/` | Kiểm thử tạo bài, chấm, lưu trữ, tiến bộ và các phần khác |
| `tools/build_fonts.sh` | Tạo lại font khi thay đổi chuỗi hiển thị |
| `docs/` | Đặc tả, chương trình học và tài liệu hình mẫu Dopakichi |

### 11.2 Khởi động và kiểm thử

Từ thư mục gốc, có thể phân phối tĩnh bằng:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Mở `/app/` tại địa chỉ máy chủ. Vì dùng ES Modules, không mở trực tiếp tệp HTML bằng `file://`.

Chạy kiểm thử Node.js:

```sh
node --test tests/*.test.mjs
```

Bộ kiểm thử sản phẩm nằm trong 11 tệp `tests/app_*.test.mjs` với 58 trường hợp. Lệnh trên bao gồm các test khác đi kèm nên tổng số có thể khác theo bản phân phối. Môi trường Node chỉ hiển thị số theo tệp có thể dùng `--experimental-test-isolation=none` để tổng hợp từng test.

Kiểm thử bao phủ tạo bài, thứ tự nhập, điểm, lưu và đặt lại, kỹ năng/sao, kế hoạch bài, so sánh tiến bộ, nhiệm vụ, cúp, hiệu ứng mở khóa và tính vị trí hướng dẫn. Test tự động không thay thế kiểm tra kết xuất, chất lượng âm thanh và cảm giác thao tác trên thiết bị thật.

### 11.3 Tham số URL kiểm tra

Có thể dùng dạng `/app/?count=6&seed=123`.

| Tham số | Hành vi |
| --- | --- |
| `count=6`, `count=10`, `count=14` | Chọn số câu khi khởi động |
| `seed=<số>` | Cố định ngẫu nhiên dùng để chọn/tạo bài; không cố định ngẫu nhiên của mọi hiệu ứng hình ảnh |
| `extra=<giây>` | Thay 90 giây mặc định của màn thử thách; cộng 900ms lúc bắt đầu vẫn giữ |
| `skill=<ID kỹ năng>` | Thay lựa chọn bài thông thường bằng kỹ năng chỉ định; Ôn tập và template cố định có thứ tự ưu tiên riêng |
| `demo` | Bắt đầu bộ bài cơ bản template cố định từ lối vào Trình độ của mình; bài đầu là 27 + 35; không tự thao tác |
| `capture` | Thu thập sự kiện âm thanh để kiểm tra; tắt âm thanh trực tiếp và thông báo hướng dẫn/phần thưởng trang chính tự động |

Trong lượt dùng `skill` và template cố định, thời gian trả lời, thống kê tiến bộ và nhiệm vụ thông thường bị tắt nhưng lịch sử hoàn thành và Ôn tập vẫn lưu. Với `skill`, nếu kế hoạch bài là kiểm tra năng lực thì việc cấp thạo và lưu hoàn thành kiểm tra của kế hoạch đó vẫn chạy. Xét cúp bị tắt với `skill` và `capture`, nhưng chỉ có `demo` không tắt. Với `capture`, tiến độ/lịch sử/thống kê thông thường vẫn lưu. Không coi các tham số này là chức năng luyện tập không lưu dữ liệu.