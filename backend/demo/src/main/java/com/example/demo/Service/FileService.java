package com.example.demo.Service;

import com.example.demo.Config.FileStorageProperties;
import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.pdfbox.pdmodel.PDDocument;

import java.io.InputStream;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.Comparator;

public class FileService {
    private FileStorageProperties fileStorageProperties = new FileStorageProperties();

    public String getNewFileName(String originalFileName, int count) {
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex == -1) {
            // Nếu không có phần mở rộng
            return originalFileName + "(" + count + ")";
        } else {
            // Tách phần tên và phần mở rộng
            String namePart = originalFileName.substring(0, dotIndex);
            String extensionPart = originalFileName.substring(dotIndex);
            return namePart + "(" + count + ")" + extensionPart;
        }
    }
    public String saveReport(MultipartFile file){
        // Lấy đường dẫn thư mục upload từ cấu hình
        String uploadDir = fileStorageProperties.getUploadDir();

        if (uploadDir == null) {
            throw new IllegalArgumentException("Upload directory is not configured.");
        }
        Path uploadPath = Paths.get(uploadDir,"reports");
        try {

            // Tạo thư mục nếu chưa tồn tại
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            // Lấy tên gốc của file
            String originalFileName = file.getOriginalFilename();
            String fileName = originalFileName;
            Path destinationPath = uploadPath.resolve(fileName);
            //do các báo cáo có tên khác nhau (theo tháng, theo năm), nên không cần phải sợ các file trùng nhau
            // Lưu file vào thư mục nếu chưa tồn tại
            Files.copy(file.getInputStream(), destinationPath);

            // Kiểm tra xem file đã được lưu chưa
            if (Files.exists(destinationPath)) {
                return destinationPath.toString();
            } else {
                throw (new ResourceNotFoundException("can't save report"));
            }
        }catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload report: " + e.getMessage();
        }
    }

    public String saveFile(MultipartFile file, long studentID){
        // Lấy đường dẫn thư mục upload từ cấu hình
        String uploadDir = fileStorageProperties.getUploadDir();
        Path uploadPath = Paths.get(uploadDir,"documents",String.valueOf(studentID));
        try {

            // Tạo thư mục nếu chưa tồn tại
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            // Lấy tên gốc của file
            String originalFileName = file.getOriginalFilename();
            String fileName = originalFileName;
            Path destinationPath = uploadPath.resolve(fileName);

            // Kiểm tra file trùng tên và đổi tên nếu cần
            int count = 1;
            while (Files.exists(destinationPath)) {
                // Đổi tên file thành tên gốc + "(n)"
                String newFileName = getNewFileName(originalFileName, count);
                destinationPath = uploadPath.resolve(newFileName);
                count++;
            }

            // Lưu file vào thư mục nếu chưa tồn tại
            Files.copy(file.getInputStream(), destinationPath);

            // Kiểm tra xem file đã được lưu chưa
            if (Files.exists(destinationPath)) {
                return destinationPath.toString();
            } else {
                throw (new ResourceNotFoundException("can't save file"));
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file: " + e.getMessage();
        }

    }
    public void deleteFile(String filePath) {
        Path path = Paths.get(filePath);

        try {
            if(Files.exists(path)) {
                Files.delete(path); // Xóa file tại đường dẫn được chỉ định
                System.out.println("File đã được xóa: " + path.toAbsolutePath());
            }
        } catch (IOException e) {
            System.err.println("Không thể xóa file: " + e.getMessage());
        }
    }
    public void deleteAllFile(String dict){
        String uploadDir = fileStorageProperties.getUploadDir();
        Path dirPath = Paths.get(uploadDir,dict);
        try {
            if (Files.exists(dirPath) && Files.isDirectory(dirPath)) {
                Files.walk(dirPath) // Duyệt qua tất cả file và thư mục con
                        .sorted(Comparator.reverseOrder()) // Đảo ngược thứ tự để xóa từ file con lên thư mục cha
                        .forEach(path -> {
                            try {
                                Files.delete(path); // Xóa từng file và thư mục
                                System.out.println("Đã xóa: " + path.toAbsolutePath());
                            } catch (IOException e) {
                                System.err.println("Không thể xóa: " + path + " - " + e.getMessage());
                            }
                        });
            } else {
                System.out.println("Thư mục không tồn tại hoặc không hợp lệ.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    public int handlePdf(MultipartFile file) {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            return document.getNumberOfPages();
        }
        catch (Exception e) {
            return 0; // Không lấy được số trang
        }
    }
    public int handleWord(MultipartFile file){
        try (XWPFDocument document = new XWPFDocument(file.getInputStream())) {
            return document.getProperties().getExtendedProperties().getPages();
        } catch (Exception e) {
            return 0; // Không thể lấy số trang chính xác
        }
    }
    // Hàm xử lý Excel (XLSX/XLS)
    public int handleExcel(MultipartFile file) throws IOException{
        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            return workbook.getNumberOfSheets();
        }
    }

    // Hàm xử lý PowerPoint (PPT/PPTX)
    public int handlePowerPoint(MultipartFile file){
        try (XMLSlideShow ppt = new XMLSlideShow(file.getInputStream())) {
            return ppt.getSlides().size();
        } catch (Exception e) {
            return 0; // Không thể lấy số slide
        }
    }
}