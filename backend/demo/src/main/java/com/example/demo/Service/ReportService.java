package com.example.demo.Service;

import com.example.demo.Model.PrintLog;
import com.example.demo.Model.Report;
import com.example.demo.Repository.PrintLogRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;


import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private final PrintLogRepository printLogRepository;

    FileService fileService = new FileService();


    // Constructor Injection
    public ReportService(PrintLogRepository printLogRepository) {
        this.printLogRepository = printLogRepository;
    }

    public Report generateExcelReport(LocalDateTime startDate, LocalDateTime endDate, Boolean isMonth) throws IOException {
        // Tạo workbook và sheet
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
        Month month = startDate.getMonth();
        int monthValue = month.getValue();
        Year year = Year.of(startDate.getYear());
        int yearValue = year.getValue();
        if(isMonth) {
            sheet = workbook.createSheet("Báo cáo tháng "+monthValue + " năm " + year);
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Báo cáo tháng " + monthValue + " năm "+ year);
            headerRow.createCell(1).setCellValue("Từ ngày: "+ startDate);
            headerRow.createCell(2).setCellValue("Đến ngày:" + endDate);
        }
        else
        {
            sheet = workbook.createSheet("Báo cáo năm " + yearValue);
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Báo cáo năm "+yearValue);
            headerRow.createCell(1).setCellValue("Từ ngày: "+ startDate);
            headerRow.createCell(2).setCellValue("Đến ngày:" + endDate);
        }

        List<PrintLog> printLogs = printLogRepository.findByStartTimeBetweenOrderByStartTimeAsc(startDate,endDate);

        // Điền dữ liệu vào các row
        int rowIndex = 1;
        Row dataRow = sheet.createRow(rowIndex++);
        dataRow.createCell(0).setCellValue("Tháng: "+ monthValue);
        dataRow = sheet.createRow(rowIndex++);
        dataRow.createCell(0).setCellValue("Tài liệu");
        dataRow.createCell(1).setCellValue("Sinh viên");
        dataRow.createCell(2).setCellValue("MSSV");
        dataRow.createCell(3).setCellValue("Trạng thái");
        dataRow.createCell(4).setCellValue("Ngày bắt đầu");
        dataRow.createCell(5).setCellValue("Ngày kết thúc");
        dataRow.createCell(6).setCellValue("Máy in.");

        for (PrintLog printLog : printLogs) {
            Month startMonth = startDate.getMonth();
            int startMonthValue = startMonth.getValue();
            if(startMonthValue != monthValue)
            {
                dataRow = sheet.createRow(rowIndex++);
                dataRow.createCell(rowIndex++).setCellValue("Tháng: "+ monthValue);
                dataRow = sheet.createRow(rowIndex++);
                dataRow.createCell(0).setCellValue("Tài liệu");
                dataRow.createCell(1).setCellValue("Sinh viên");
                dataRow.createCell(2).setCellValue("MSSV");
                dataRow.createCell(3).setCellValue("Trạng thái");
                dataRow.createCell(4).setCellValue("Ngày bắt đầu");
                dataRow.createCell(5).setCellValue("Ngày kết thúc");
                dataRow.createCell(6).setCellValue("Máy in.");
            }
            dataRow = sheet.createRow(rowIndex++);
            dataRow.createCell(0).setCellValue(printLog.getDocument().getFileName());
            dataRow.createCell(1).setCellValue(printLog.getStudent().getName());
            dataRow.createCell(2).setCellValue(printLog.getStudent().getId());
            dataRow.createCell(3).setCellValue(printLog.getStatus());
            dataRow.createCell(4).setCellValue(printLog.getStartTime().format(formatter));
            if(printLog.getFinishedTime()!= null)
                dataRow.createCell(5).setCellValue(printLog.getFinishedTime().format(formatter));
            dataRow.createCell(6).setCellValue(printLog.getPrinter().getName());
        }
        //lưu thử vào local để check
        //String filePath = "D:/HK241/CNPM/241/test.xlsx";
        //FileOutputStream outputStreamFile = new FileOutputStream(filePath);
        //workbook.write(outputStreamFile);

        // Lưu file vào ByteArrayOutputStream
        // Tạo file Excel với tên báo cáo
        // Lưu workbook vào byte array
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        workbook.write(byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();

        // Đóng workbook
        workbook.close();

        // Tạo MultipartFile từ byte array
        String fileName ="";
        if(isMonth) {
            fileName = "Báo_cáo_tháng_"+monthValue+"_năm_"+yearValue+".xlsx";
        }
        else fileName = "Báo_cáo_năm_"+yearValue+".xlsx";

        MultipartFile multipartFile = new MockMultipartFile("file", fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", byteArray);

        String filepath = fileService.saveReport(multipartFile);

        Report report = new Report();
        report.setName(fileName);
        report.setFilePath(filepath);
        report.setEndDate(endDate);
        report.setStartDate(startDate);
        report.setDate(LocalDateTime.now());
        report.setMonth(isMonth);
        return report;
    }
}