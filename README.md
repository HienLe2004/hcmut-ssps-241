I/Người thực hiện
-	Nguyễn Ngọc Quế Chi (2210371)
-	Nguyễn Quốc Đạt (2210694)
-	Võ Ninh Giang (2210834)
-	Lê Ngọc Hiền (2211024)
-	Lâm Phúc Thịnh (2213276)
  
II/ Hệ thống Dịch vụ In Thông minh (HCMUT_SSPS)
HCMUT_SSPS là hệ thống dịch vụ in ấn được thiết kế dành riêng cho sinh viên trường Đại học Bách Khoa – ĐHQG TP Hồ Chí Minh. Hệ thống ra đời nhằm giải quyết những bất cập của mô hình in ấn truyền thống, giúp sinh viên có một trải nghiệm thuận tiện, nhanh chóng và linh hoạt hơn trong việc in tài liệu phục vụ học tập và nghiên cứu. 

Hệ thống cho phép sinh viên gửi yêu cầu in ấn trực tuyến mọi lúc, mọi nơi thông qua giao diện web thân thiện, giúp loại bỏ nhu cầu phải đến trực tiếp các địa điểm in, tiết kiệm thời gian di chuyển và chờ đợi. Đồng thời, HCMUT_SSPS đảm bảo tính minh bạch trong quá trình in ấn, cho phép sinh viên theo dõi chi tiết trạng thái của từng yêu cầu in và quản lý lịch sử in một cách rõ ràng. Bên cạnh đó, hệ thống còn hỗ trợ người quản lý trong việc giám sát hoạt động của các máy in, báo cáo tình trạng sử dụng theo thời gian, từ đó tối ưu hóa tài nguyên và đảm bảo dịch vụ in luôn sẵn sàng phục vụ nhu cầu của sinh viên.

Với HCMUT_SSPS, việc in tài liệu trở nên dễ dàng và hiệu quả hơn bao giờ hết, đáp ứng nhu cầu học tập ngày càng cao của sinh viên trong môi trường đại học năng động và hiện đại.

III/ Các chức năng chính
III.1/Đối với sinh viên:
-	Hệ thống cho phép sinh viên đăng nhập và sử dụng hệ thống bằng tài khoản được xác thực bởi đội ngũ nhà trường.
-	Hệ thống cho phép sinh viên thực hiện được tạo một yêu cầu in, bao gồm cả việc tải tài liệu lên, lựa chọn các cấu hình cho trang in, lựa chọn máy in có vị trí phù hợp với mong muốn của sinh viên, đồng thời, sinh viên cũng có thể xem được những yêu cầu in của bản thân, bao gồm cả những yêu cầu in trên hàng chờ, có thể xóa yêu cầu đó nếu không còn nhu cầu, và cả các yêu cầu in đã hoàn thành.
-	Hệ thống cũng cho phép sinh viên xem số trang A4 còn lại mà mình có thể dùng, đồng thời mua thêm các trang A4 để phục vụ cho các yêu cầu in tiếp theo.
  
III.1/ Đối với nhân viên quản lí (SPSO)
-	Hệ thống cũng cho phép nhân viên quản lí có thể đăng nhập và sử dụng hệ thống bằng tài khoản được xác thực.
-	Hệ thống cho phép các nhân viên quản lí xem và quản lí được lịch sử in của tất cả sinh viên trong trường và lịch sử in của một máy in cụ thể, đồng thời xem được các báo cáo thống kê các yêu cầu in sau mỗi tháng và mỗi năm.
-	Hệ thống cho phép nhân viên quản lí có thể định nghĩa được các loại file nào sinh viên được phép tải lên, và số lượng trang A4 mặc định của mỗi sinh viên là bao nhiêu. 
-	Hệ thống còn cho phép nhân viên quản lí kiểm soát trạng thái hoạt động của một máy in, như bật tắt máy in đó.
  
IV/Các thành phần của hệ thống
-	Giao diện web (front end) được hiện thực bằng ReactJs, và được tổ chức trong thư mục front-end.
-	Back-end của hệ thống được hiện thực bằng ngôn ngữ Java, sử dụng framework Java Spring Boot, và liên kết với cơ sở dữ liệu bằng framework Hibernate.
-	Cơ sở dữ liệu được sử dụng là CockroachDB Cloud và PosgregSQL.
  
V/Cài đặt và sử dụng
1/ Clone repository của project về từ GitHub
-	Bash:
git clone https://github.com/HienLe2004/hcmut-ssps-241

2/ Chạy back-end
-	Backend của dự án được hiện thực bằng Java Spring Boot, do đó để chạy được back-end cần cài đặt JDK và Maven, đồng thời cần cài đặt các phụ thuộc trong file pom.xml.
-	Sau khi đảm bảo có đủ các phụ thuộc, thực hiện run  class DemoApplication.
  
3/Chạy front-end
-	Front end của dự án được hiện thực bằng ReactJs, do đó cần cài đặt các phụ thuộc và các công cụ liên quan.
-	Sau khi đảm bảo có đủ các phụ thuộc, chạy lệnh npm start trong terminal.
