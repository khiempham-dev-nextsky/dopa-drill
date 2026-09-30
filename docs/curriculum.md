# Dopa Drill — Phạm vi tính toán và danh sách kỹ năng

Tài liệu này mô tả các phép tính hiện được Dopa Drill đưa ra, quan hệ tiên quyết giữa các kỹ năng, điều kiện tạo bài và cách nhập đáp án. Các con số có thể thay đổi khi cân bằng trò chơi. Quy tắc toàn trò chơi nằm trong `docs/SPEC.md`; định nghĩa kỹ năng ở `app/js/skills.js`; xử lý tạo bài ở `app/js/problems.js`.

## 1. Phạm vi và cấu trúc

Trò chơi có 58 kỹ năng dành cho lớp 1–6, yêu cầu người chơi nhập chữ số để trả lời. Nội dung gồm bốn phép tính, phép tính dọc, số thập phân và phân số, số gần đúng, ước và bội, thứ tự tính, phần trăm, tỉ số bằng nhau và giá trị của ẩn. Không gồm hình học, đo độ dài/dung tích/thời gian, biểu đồ, bài toán có lời văn, nhập chữ số Hán hoặc bảng giá trị hàng.

Khối lớp ở đây là cách phân bổ của ứng dụng, không bao quát toàn bộ chương trình sách giáo khoa. Không nên suy đoán bài chỉ từ tên kỹ năng; hãy đọc cả điều kiện trong danh sách và mô tả bộ sinh bài.

| Khối | Số kỹ năng | Nội dung chính |
| --- | ---: | --- |
| 1 | 8 | Tách số 10, nhớ và mượn, tính với 3 số, cộng trừ hai chữ số đơn giản |
| 2 | 13 | Cộng trừ dọc hai chữ số và một phần ba chữ số, bảng nhân, số tròn chục × một chữ số, 1/2 và 1/4 của số ban đầu |
| 3 | 14 | Cộng trừ 3–4 chữ số, nhân số nguyên dọc, chia có dư, cộng trừ số thập phân một chữ số, phân số cùng mẫu |
| 4 | 10 | Chia số nguyên dọc, thứ tự tính, làm tròn, cộng trừ đến chữ số thập phân thứ hai, nhân chia số thập phân với số nguyên, hỗn số |
| 5 | 8 | Nhân chia số thập phân, ước chung lớn nhất và bội chung nhỏ nhất, rút gọn, phân số khác mẫu, phân số với số nguyên, phần trăm |
| 6 | 5 | Nhân chia phân số, nhân số thập phân với phân số, tỉ số bằng nhau, tìm x |

Bốn nhóm là “Cộng & trừ”, “Nhân & chia”, “Số thập phân & phân số” và “Khác”. Trên màn hình, mỗi nhóm được chia thành hai cột. Hai kỹ năng nằm cạnh nhau theo chiều dọc chưa chắc có quan hệ tiên quyết.

## 2. Danh sách kỹ năng

Bảng dưới đây theo đúng thứ tự định nghĩa trong mã nguồn, gồm ID, tên hiển thị, nhóm, toàn bộ tiên quyết, bộ sinh và tham số. “Không” trong cột tiên quyết nghĩa là kỹ năng được mở ngay từ đầu.

Tham số `[tối thiểu,tối đa]` là khoảng số nguyên bao gồm cả hai đầu. `dans` và `dens` là mảng ứng viên. `da` và `db` là số chữ số của các số bị tác động; `dd` và `ds` là số chữ số của số bị chia và số chia; `pa` và `pb` là số chữ số thập phân. Bộ lọc bổ sung khiến không phải mọi tổ hợp trong khoảng đều xuất hiện.

### Lớp 1

| ID | Tên | Nhóm | Tiên quyết (cần tất cả) | Bộ sinh · tham số |
| --- | --- | --- | --- | --- |
| `g1-compose10` | Gộp đủ 10 | Cộng & trừ | Không | `compose` `{"total":10}` |
| `g1-add-nc` | Cộng 1 chữ số | Cộng & trừ | Không | `hadd` `{"a":[1,9],"b":[1,9],"carry":"none"}` |
| `g1-sub-nb` | Trừ trong phạm vi 10 | Cộng & trừ | `g1-add-nc` | `hsub` `{"a":[2,10],"b":[1,9],"borrow":"none"}` |
| `g1-add-c` | Cộng có nhớ | Cộng & trừ | `g1-compose10`, `g1-add-nc` | `hadd` `{"a":[2,9],"b":[2,9],"carry":"yes"}` |
| `g1-sub-b` | Trừ có mượn | Cộng & trừ | `g1-add-c`, `g1-sub-nb` | `hsub` `{"a":[11,18],"b":[2,9],"borrow":"yes"}` |
| `g1-add3` | Tính với 3 số | Cộng & trừ | `g1-sub-b` | `add3` `{}` |
| `g1-add-2d1` | Hai chữ số + một chữ số | Cộng & trừ | `g1-add-c` | `hadd` `{"a":[11,89],"b":[1,9],"carry":"none","tensToo":true}` |
| `g1-sub-2d1` | Hai chữ số − một chữ số | Cộng & trừ | `g1-sub-b`, `g1-add-2d1` | `hsub` `{"a":[11,99],"b":[1,9],"borrow":"none","tensToo":true}` |

### Lớp 2

| ID | Tên | Nhóm | Tiên quyết (cần tất cả) | Bộ sinh · tham số |
| --- | --- | --- | --- | --- |
| `g2-vadd2-nc` | Cộng dọc hai chữ số | Cộng & trừ | `g1-add-2d1` | `vadd` `{"da":2,"db":2,"carry":"none","maxDigits":2}` |
| `g2-vadd2-c` | Cộng dọc có nhớ | Cộng & trừ | `g2-vadd2-nc`, `g1-add-c` | `vadd` `{"da":2,"db":[1,2],"carry":"some","maxDigits":2}` |
| `g2-vsub2-nb` | Trừ dọc hai chữ số | Cộng & trừ | `g1-sub-2d1` | `vsub` `{"da":2,"db":2,"borrow":"none"}` |
| `g2-vsub2-b` | Trừ dọc có mượn | Cộng & trừ | `g2-vsub2-nb`, `g1-sub-b` | `vsub` `{"da":2,"db":[1,2],"borrow":"some"}` |
| `g2-vadd3s` | Cộng vượt quá 100 | Cộng & trừ | `g2-vadd2-c` | `vadd` `{"da":2,"db":2,"carry":"many","maxDigits":3}` |
| `g2-vsub3s` | Trừ từ 100 | Cộng & trừ | `g2-vsub2-b`, `g2-vadd3s` | `vsub` `{"da":3,"db":2,"borrow":"some","aMax":199}` |
| `g2-kuku25` | Bảng nhân 5 và 2 | Nhân & chia | `g1-add-c` | `kuku` `{"dans":[5,2]}` |
| `g2-kuku34` | Bảng nhân 3 và 4 | Nhân & chia | `g2-kuku25` | `kuku` `{"dans":[3,4]}` |
| `g2-kuku67` | Bảng nhân 6 và 7 | Nhân & chia | `g2-kuku34` | `kuku` `{"dans":[6,7]}` |
| `g2-kuku891` | Bảng nhân 8, 9 và 1 | Nhân & chia | `g2-kuku67` | `kuku` `{"dans":[8,9,1]}` |
| `g2-kuku-mix` | Trộn các bảng nhân | Nhân & chia | `g2-kuku891` | `kuku` `{"dans":[1,2,3,4,5,6,7,8,9]}` |
| `g2-mul-tens` | Số tròn chục × một chữ số | Nhân & chia | `g2-kuku-mix` | `mulTens` `{}` |
| `g2-frac-of` | 1/2 và 1/4 của số | Số thập phân & phân số | `g2-kuku25` | `fracOf` `{"dens":[2,4]}` |

### Lớp 3

| ID | Tên | Nhóm | Tiên quyết (cần tất cả) | Bộ sinh · tham số |
| --- | --- | --- | --- | --- |
| `g3-vadd3` | Cộng dọc 3 chữ số | Cộng & trừ | `g2-vadd3s` | `vadd` `{"da":3,"db":3,"carry":"some","maxDigits":3}` |
| `g3-vsub3` | Trừ dọc 3 chữ số | Cộng & trừ | `g2-vsub3s` | `vsub` `{"da":3,"db":[2,3],"borrow":"some"}` |
| `g3-vadd4` | Cộng dọc 4 chữ số | Cộng & trừ | `g3-vadd3` | `vadd` `{"da":4,"db":[3,4],"carry":"many","maxDigits":4}` |
| `g3-vsub4` | Trừ dọc 4 chữ số | Cộng & trừ | `g3-vsub3` | `vsub` `{"da":4,"db":[3,4],"borrow":"zero"}` |
| `g3-div-basic` | Phép chia | Nhân & chia | `g2-kuku-mix` | `div` `{"exact":true}` |
| `g3-div-rem` | Chia có dư | Nhân & chia | `g3-div-basic` | `divRem` `{}` |
| `g3-div-tens` | Số tròn chục ÷ một chữ số | Nhân & chia | `g3-div-basic` | `divTens` `{}` |
| `g3-vmul-2x1` | Hai chữ số × một chữ số dọc | Nhân & chia | `g2-mul-tens` | `vmul` `{"da":2,"db":1}` |
| `g3-vmul-3x1` | Ba chữ số × một chữ số | Nhân & chia | `g3-vmul-2x1` | `vmul` `{"da":3,"db":1}` |
| `g3-vmul-2x2` | Hai chữ số × hai chữ số | Nhân & chia | `g3-vmul-2x1` | `vmul` `{"da":2,"db":2}` |
| `g3-vmul-3x2` | Ba chữ số × hai chữ số | Nhân & chia | `g3-vmul-2x2`, `g3-vmul-3x1` | `vmul` `{"da":3,"db":2}` |
| `g3-dec-add1` | Cộng số thập phân | Số thập phân & phân số | `g2-vadd2-c` | `vdec` `{"op":"add","places":1}` |
| `g3-dec-sub1` | Trừ số thập phân | Số thập phân & phân số | `g3-dec-add1`, `g2-vsub2-b` | `vdec` `{"op":"sub","places":1}` |
| `g3-frac-same` | Cộng trừ phân số cùng mẫu | Số thập phân & phân số | `g2-frac-of` | `frac` `{"op":"addsub","same":true,"maxOne":true}` |

### Lớp 4

| ID | Tên | Nhóm | Tiên quyết (cần tất cả) | Bộ sinh · tham số |
| --- | --- | --- | --- | --- |
| `g4-vdiv-2d1` | Hai chữ số ÷ một chữ số dọc | Nhân & chia | `g3-div-rem`, `g3-div-tens` | `vdiv` `{"dd":2,"ds":1}` |
| `g4-vdiv-3d1` | Ba chữ số ÷ một chữ số | Nhân & chia | `g4-vdiv-2d1` | `vdiv` `{"dd":3,"ds":1}` |
| `g4-vdiv-2d2` | Hai chữ số ÷ hai chữ số | Nhân & chia | `g4-vdiv-2d1`, `g3-vmul-2x1` | `vdiv` `{"dd":2,"ds":2}` |
| `g4-vdiv-3d2` | Ba chữ số ÷ hai chữ số | Nhân & chia | `g4-vdiv-2d2`, `g4-vdiv-3d1` | `vdiv` `{"dd":3,"ds":2}` |
| `g4-order` | Thứ tự tính | Khác | `g2-kuku-mix`, `g2-vsub2-b` | `order` `{}` |
| `g4-round` | Số gần đúng và làm tròn | Khác | `g3-vadd4` | `round` `{}` |
| `g4-dec-add2` | Cộng trừ đến chữ số thập phân thứ hai | Số thập phân & phân số | `g3-dec-sub1` | `vdec` `{"op":"addsub","places":2}` |
| `g4-dec-mul` | Số thập phân × số nguyên | Số thập phân & phân số | `g4-dec-add2`, `g3-vmul-2x1` | `vmul` `{"da":2,"db":1,"pa":1}` |
| `g4-dec-div` | Số thập phân ÷ số nguyên | Số thập phân & phân số | `g4-dec-mul`, `g4-vdiv-2d1` | `decDivInt` `{}` |
| `g4-frac-mixed` | Cộng trừ hỗn số | Số thập phân & phân số | `g3-frac-same` | `frac` `{"op":"addsub","same":true,"mixed":true}` |

### Lớp 5

| ID | Tên | Nhóm | Tiên quyết (cần tất cả) | Bộ sinh · tham số |
| --- | --- | --- | --- | --- |
| `g5-dec-mul` | Số thập phân × số thập phân | Số thập phân & phân số | `g4-dec-mul` | `vmul` `{"da":2,"db":2,"pa":1,"pb":1}` |
| `g5-dec-div` | Số thập phân ÷ số thập phân | Số thập phân & phân số | `g4-dec-div`, `g5-dec-mul` | `decDivDec` `{}` |
| `g5-gcd` | Ước chung lớn nhất | Khác | `g3-div-basic` | `gcdlcm` `{"kind":"gcd"}` |
| `g5-lcm` | Bội chung nhỏ nhất | Khác | `g5-gcd` | `gcdlcm` `{"kind":"lcm"}` |
| `g5-frac-reduce` | Rút gọn phân số | Số thập phân & phân số | `g5-gcd`, `g4-frac-mixed` | `frac` `{"op":"reduce"}` |
| `g5-frac-diff` | Phân số khác mẫu | Số thập phân & phân số | `g5-frac-reduce`, `g5-lcm` | `frac` `{"op":"addsub","same":false}` |
| `g5-frac-int` | Phân số ×÷ số nguyên | Số thập phân & phân số | `g5-frac-reduce` | `frac` `{"op":"muldivInt"}` |
| `g5-percent` | Phần trăm | Khác | `g4-dec-mul` | `percent` `{}` |

### Lớp 6

| ID | Tên | Nhóm | Tiên quyết (cần tất cả) | Bộ sinh · tham số |
| --- | --- | --- | --- | --- |
| `g6-frac-mul` | Phân số × phân số | Số thập phân & phân số | `g5-frac-int` | `frac` `{"op":"mul"}` |
| `g6-frac-div` | Phân số ÷ phân số | Số thập phân & phân số | `g6-frac-mul` | `frac` `{"op":"div"}` |
| `g6-frac-dec` | Tính với số thập phân và phân số | Số thập phân & phân số | `g6-frac-div`, `g5-dec-div` | `frac` `{"op":"decimal"}` |
| `g6-ratio` | Tỉ số bằng nhau | Khác | `g5-lcm` | `ratio` `{}` |
| `g6-letter` | Tìm x | Khác | `g4-order` | `letter` `{}` |

## 3. Điều kiện tạo bài

### 3.1 Phép tính ngang với số nguyên

`compose` tách 10 thành một số từ 1–9 và phần còn lại. Trong `hadd`, `carry: none` nghĩa là không có nhớ, còn `yes` nghĩa là có ít nhất một lần nhớ. `hsub` luôn tạo số bị trừ nhỏ hơn số bị trừ đi; `borrow: none` nghĩa là không mượn, `yes` nghĩa là có ít nhất một lần mượn.

`tensToo: true` bổ sung phép tính giữa hai số tròn chục khi số ngẫu nhiên nhỏ hơn 0,3. Phép cộng dùng bội số dương của 10 từ 10–80 sao cho tổng không quá 90; phép trừ lấy một bội số dương nhỏ hơn từ các số tròn chục 20–90. Vì vậy kỹ năng “hai chữ số + một chữ số” và “hai chữ số − một chữ số” đôi khi vẫn có hai số hạng đều là số có hai chữ số.

`add3` dùng ba số nguyên 1–9; mỗi phép tính có xác suất 0,6 là cộng, còn lại là trừ. Kết quả trung gian không âm, kết quả cuối từ 0–20. `kuku` nhân một bảng được chỉ định với số từ 1–9. `mulTens` nhân số tròn chục 10–90 với số từ 2–9.

`fracOf` tạo số ban đầu từ mẫu 2 hoặc 4 và đáp án từ 1–9. `div` tạo phép chia hết với số chia 2–9 và thương 1–9. `divRem` dùng cùng phạm vi cho thương và số chia, rồi thêm số dư từ 1 đến nhỏ hơn số chia.

`divTens` có hai dạng: chia số tròn chục cho một chữ số để được thương tròn chục, hoặc phép chia hai chữ số mà hàng chục và hàng đơn vị đều chia hết. Vì vậy tên “số tròn chục ÷ một chữ số” vẫn có thể xuất hiện số bị chia không kết thúc bằng 0.

### 3.2 Phép tính dọc với số nguyên

Trong phép cộng, `carry: some` có ít nhất một lần nhớ, `many` có ít nhất hai lần. Kết quả được giới hạn không quá `maxDigits`. “Cộng vượt quá 100” dùng hai số có hai chữ số và điều kiện có ít nhất hai lần nhớ.

Phép trừ luôn có số bị trừ lớn hơn số trừ; `borrow: some` có ít nhất một lần mượn. “Trừ từ 100” lấy một số có ba chữ số từ 100–199 rồi trừ số có hai chữ số. `borrow: zero` yêu cầu ít nhất hai lần mượn và đi qua số 0, hoặc được chọn thêm khi xác suất ngẫu nhiên nhỏ hơn 0,3. Không phải mọi phép trừ bốn chữ số đều đi qua 0.

Phép nhân chỉ định số chữ số của mỗi số. Số nhân một chữ số từ 2–9, chữ số hàng đơn vị của số bị nhân khác 0; số nhân hai chữ số cũng có hàng đơn vị khác 0. Với phép nhân số thập phân, loại các trường hợp tích kết thúc bằng 0 hoặc nhỏ hơn 1.

Số chia có một chữ số nằm trong 2–9, có hai chữ số nằm trong 11–49. Số bị chia có đúng số chữ số được chỉ định và ít nhất gấp đôi số chia. Với phép chia hai chữ số cho hai chữ số, thương là một chữ số. Cả phép chia hết và chia có dư đều có thể xuất hiện.

### 3.3 Số thập phân

`vdec` dùng các số đã nhân lên thành số nguyên để tạo phép cộng trừ dọc. `places: 1` xử lý đến chữ số thập phân thứ nhất; `places: 2` xử lý đến chữ số thứ hai và với xác suất 0,4, số hạng thứ hai chỉ có một chữ số thập phân. Loại các số hoặc kết quả có chữ số 0 ở cuối và luôn tạo kết quả trừ dương.

`decDivInt` dùng số chia 2–9 và thương có một chữ số thập phân từ 1,1–9,9, trừ các giá trị kết thúc bằng 0. `decDivDec` dùng số chia 0,2–0,9 hoặc 1,1–2,9 và thương nguyên 2–9. Đáp án của “số thập phân ÷ số thập phân” hiện là số nguyên. Cả hai dạng đều nhập đáp án ngang, không nhập các bước trung gian của phép chia dọc.

Phần kết hợp số thập phân và phân số hiện chỉ là phép nhân giữa một trong các giá trị 0,2; 0,4; 0,5; 0,6; 0,8 với một phân số tối giản thực sự. Không tạo phép cộng, trừ hoặc chia dạng kết hợp này.

### 3.4 Phân số

Mẫu của phân số cùng mẫu nằm trong 3–12. Phép cộng trừ lớp 3 chỉ nhận kết quả dương nhỏ hơn 1. Dù tên tham số là `maxOne: true`, giá trị đúng bằng 1 bị loại. Giữ nguyên mẫu ban đầu; kể cả khi kết quả rút gọn được, đáp án vẫn dùng tử và mẫu ban đầu.

Với hỗn số, phần nguyên của số hạng đầu từ 1–4, phần nguyên của số hạng thứ hai từ 0–3, tử số từ 1 đến nhỏ hơn mẫu. Chỉ nhận kết quả dương, không phải số nguyên và có phần phân số tối giản. Nếu kết quả từ 1 trở lên, nhập cả phần nguyên.

Bài rút gọn nhân tử số và mẫu của một phân số thực sự tối giản (mẫu 2–9) với cùng một số nguyên từ 2–6. Phép cộng trừ khác mẫu dùng hai phân số thực sự tối giản khác mẫu, mẫu từ 2–9; bội chung nhỏ nhất không quá 36 và kết quả dương nhỏ hơn 1, sau đó rút gọn.

Phép nhân chia phân số với số nguyên dùng phân số tối giản có mẫu 2–9 và số nguyên 2–9. Phép nhân chia hai phân số dùng phân số tối giản có mẫu và tử từ 1–9, loại kết quả là số nguyên và giới hạn tử/mẫu sau rút gọn không quá 99. Kết quả lớn hơn 1 được viết thành hỗn số.

### 3.5 Các phép tính khác

`order` có bốn dạng: `a＋b×c`, `a×(b＋c)`, `(a−b)×c` và `x−b×c`. `a`, `b`, `c` từ 2–9; ở dạng cuối, `x` là số nguyên lớn hơn tích từ 1–30. Kết quả dương và không quá 999. Bộ sinh hiện không có phép chia.

`round` làm tròn số từ 1001–99999 đến hàng chục, trăm hoặc nghìn tùy số chữ số ban đầu, loại các trường hợp làm tăng số chữ số. `gcdlcm` dùng hai số tạo từ một nhân tử chung 2–9 nhân với 1–6; hai số khác nhau, đều từ 4 trở lên, đáp án từ 2–99.

`percent` dùng các số ban đầu 20, 40, 50, 60, 80, 100, 200, 300, 400, 500 và các tỉ lệ 5, 10, 20, 25, 30, 40, 50, 60, 75%. Chỉ chọn tổ hợp cho kết quả là số nguyên dương.

`ratio` rút gọn một tỉ số gồm hai số khác nhau từ 1–9, rồi nhân cả hai vế với 2–9 để tạo tỉ số bằng nhau và bỏ trống một phía. Không có dạng yêu cầu tính riêng giá trị tỉ số. `letter` có các dạng `x×a=b`, `x＋a=b`, `x−a=b` và yêu cầu nhập giá trị của x.

### 3.6 Tránh trùng lặp

Chữ ký gồm tiêu đề và biểu thức của bài. Bộ sinh tránh 24 bài gần nhất của từng kỹ năng và các chữ ký đã dùng trong lượt chơi hiện tại. Sau tối đa 40 lần thử, nếu vẫn không tránh được trùng lặp thì dùng ứng viên cuối. Kỹ năng có ít ứng viên không được bảo đảm số lượng bài không trùng. Ôn tập và hộp thời gian là ngoại lệ vì dùng lại bài đã lưu.

## 4. Quan hệ giữa thành thạo, mở khóa và chế độ

Điều kiện thạo thông thường là giải ít nhất 6 câu và trong 6 câu gần nhất có ít nhất 5 câu hoàn thành không sai, kể cả các bước trung gian. Khi tất cả kỹ năng tiên quyết đều thạo thì kỹ năng phụ thuộc được mở. Một lỗi đơn lẻ không làm mất trạng thái thạo. Điều kiện nhận sao, nguội và xóa thành tích sau khi thạo nằm trong đặc tả toàn trò chơi.

Trình độ của mình lần đầu kiểm tra bằng cách nhảy qua các kỹ năng được sắp theo khối và độ sâu tiên quyết. Bài làm đúng ngay lần đầu cùng toàn bộ tiên quyết được thạo hàng loạt, khác với điều kiện thông thường phải giải 6 câu ở từng kỹ năng.

Chế độ theo khối lấy bài trong khối đã chọn bất kể trạng thái mở khóa, rồi từ câu thử thách thứ 7 chuyển sang khối tiếp theo. Ở lớp 6, tiếp tục dùng cùng khối. Luyện tập dùng kỹ năng đã chọn cho phần cơ bản. Hộp thời gian đủ điều kiện đôi khi thay thế một câu, kể cả khi kỹ năng nằm ngoài phạm vi của chế độ theo khối hoặc luyện tập.

## 5. Nhập đáp án và gợi ý

Đáp án ngang được nhập từng chữ số từ trái sang phải. Phép cộng, trừ và nhân dọc đi từ hàng thấp nhất; phép chia dọc đi từ chữ số đầu của thương. Các bước hiển thị tự động gồm thương, phần còn lại của phép trừ trung gian và thương tiếp theo; tích và chữ số hạ xuống cũng tự động hiện. Với phép chia ngang có dư, nhập thương rồi số dư.

Phân số nhập mẫu trước, tử sau; hỗn số nhập phần nguyên trước. Dấu thập phân và chữ số nhớ/mượn phụ trợ tự động hiển thị. Hệ thống so sánh với chuỗi chữ số được chuẩn bị khi tạo bài theo từng ô; không chấp nhận mọi biểu thức hoặc cách viết phân số tương đương.

Nếu lặp lại đáp án sai ở cùng ô, trò chơi sẽ nhấn mạnh các chữ số liên quan và đưa ra gợi ý. Gợi ý có thể là bước tính trung gian, cách tách số, bảng nhân hoặc mẫu số khi quy đồng, và đôi khi chứa cả giá trị kết quả.