## Cách sử dụng tool "Cập nhật Presets"

### Bước 1
   - Vào file **settings_data.json**, trong phần `presets`, thêm vào `theme_id` muốn cập nhật presets. 
   - Ví dụ muốn cập nhật presets cho `xmas_003` thì thêm vào `"xmas_003": {}` . 
   - Lưu ý: phải có dấu phẩy phía trước mới đúng format của JSON, có thể thêm nhiều `theme_id` cùng lúc
   - [Xem hình mô tả](http://prntscr.com/lqm0q7)
### Bước 2
   - Truy cập vào tool [tại đây](https://vohuynhthehung.github.io/update-presets/index.html)
   - Copy và paste toàn bộ nội dung của `settings_data.json` vào mục `Input`
   - Nhấn nút `Click`
   - Copy kết quả ở `Output` và paste vào lại `settings_data.json`
### Lưu ý
   Trước khi copy kết quả nên kiểm tra output đã đúng định dạng json hay chưa?
   [Link kiểm tra định dạng JSON](https://jsonformatter.curiousconcept.com/)
