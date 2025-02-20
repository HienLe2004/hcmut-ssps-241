import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { format, parse } from "date-fns";
import { LoginPage } from "./pages/loginPage";
import { HomePage } from "./pages/Student/HomePage";
import { StudentHomePage } from "./pages/Student/StudentHomePage";
import { PrintDocument } from "./pages/Student/PrintDocument";
import { SPSOHomePage } from "./pages/SPSO/SPSOHomePage";
import { WaitingDocsPage } from "./pages/SPSO/WaitingDocsPage/WaitingDocsPage";
import { PrintersPage } from "./pages/SPSO/PrintersPage/PrintersPage";
import { SystemHistoryPage } from "./pages/SPSO/SystemHistoryPage/SystemHistoryPage";
import { ManagementPage } from "./pages/SPSO/ManagementPage/ManagementPage";
import { ReportsPage } from "./pages/SPSO/ReportsPage/ReportsPage";
import { PrintingHistory } from "./pages/Student/PrintingHistory";
import { BuyPage } from "./pages/Student/BuyPage";
import { PrinterInfoPage } from "./pages/SPSO/PrintersPage/PrinterInfoPage";
import { students, rooms, printingRequests, printers, validDocs, defaultPage, reports } from "./utils/mock-data";
import { createServer, Model } from "miragejs";
// createServer({
//   models: {
//     printer: Model,
//     student: Model,
//     room: Model,
//     printingRequests: Model,
//     reports: Model
//   },
//   seeds(server) {
//     printers.forEach((printer) => {server.create('printer', printer);});
//     students.forEach((student) => {server.create('student', student);});
//     rooms.forEach((room) => {server.create('room', room)});
//     printingRequests.forEach((printingRequest) => {server.create('printingRequest', printingRequest)});
//     reports.forEach((report) => {server.create('report',report)})
//   },
//   routes() {
//     //Lấy danh sách sinh viên trong hệ thống
//     this.get("/api/students", (schema, request) => {
//       return schema.students.all()
//     })
//     this.get("/api.v1/students", (schema, request) => {
//       fe
//       return schema.students.all()
//     })
//     //Lấy sinh viên theo id
//     this.get("/api/students/:id", (schema, request) => {
//       let id = request.params.id
//       return schema.students.find(id)
//     })
//     //Lấy danh sách máy in trong hệ thống
//     this.get("/api/printers", (schema, request) => {
//       console.log(schema.printers.all())
//       return schema.printers.all()
//     })
//     //Lấy máy in theo id
//     this.get("api/printers/:id", (schema, request) => {
//       let id = request.params.id
//       return schema.printers.find(id)
//     })
//     //Thêm máy in mới
//     this.post("/api/printers", (schema, request) => {
//       let attrs = JSON.parse(request.requestBody)
//       const printerAtRoom = printers.filter(printer => printer.room == attrs.room)
//       attrs.id = attrs.room + "-" + (printerAtRoom.length + 1)
//       attrs.start = (format(new Date(),'kk:mm dd/MM/yyyy'))
//       attrs.status = "on"
//       printers.push(attrs)
//       console.log(printers)
//       return {printer: attrs}
//     })
//     //Cập nhật thông tin máy in
//     this.patch("/api/printers/:id", (schema, request) => {
//       let newAttrs = JSON.parse(request.requestBody)
//       let id = request.params.id
//       let printer = schema.printers.find(id)
//       return printer.update(newAttrs)
//     })
//     //Lấy danh sách phòng trên hệ thống
//     this.get("/api/rooms", (schema, request) => {
//       return schema.rooms.all()
//     })
//     //Lấy danh sách yêu cầu trong hệ thống
//     this.get("/api/printing-requests", (schema, request) => {
//       return schema.printingRequests.all()
//     })
//     //Chuyển yều cầu đang chờ in thành in xong theo id
//     this.patch("/api/printing-requests/:id", (schema, request) => {
//       let newAttrs = JSON.parse(request.requestBody)
//       let id = request.params.id  
//       newAttrs.end = (format(new Date(),'kk:mm dd/MM/Y'))
//       let printingRequest = schema.printingRequests.find(id)
//       return printingRequest.update(newAttrs)
//     })
//     //Lấy mảng tài liệu được in
//     this.get("/api/validDocs", (schema, request) => {
//       return validDocs
//     })
//     //Cập nhật mảng tài liệu được in
//     this.patch("/api/validDocs", (schema, request) => {
//       validDocs.array = JSON.parse(request.requestBody)
//       return validDocs
//     })
//     //Lấy số trang mặc định và ngày
//     this.get("/api/defaultPage", (schema, request) => {
//       return defaultPage
//     })
//     //Cập nhật số trang mặc định và ngày
//     this.patch("/api/defaultPage", (schema, request) => {
//       let attrs = JSON.parse(request.requestBody)
//       defaultPage.page = attrs.page
//       defaultPage.date = attrs.date
//       return defaultPage
//     })
//     //Lấy danh sách báo cáo trên hệ thống
//     this.get("/api/reports", (schema, request) => {
//       return schema.reports.all()
//     })
//     // //Lấy yêu cầu đang chờ in theo id
//     // this.get("/api/printing-requests/:id", (schema,request) => {
//     //   let id = request.params.id
//     //   return schema.printingRequests.find(id)
//     // })
//     // //Xóa yêu cầu đang chờ in theo id
//     // this.delete("/api/printing-requests/:id", (schema, request) => {
//     //   let id = request.params.id
//     //   return schema.printingRequests.find(id).destroy()
//     // })
//   }
// })

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user") : JSON.stringify({})))
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage login={setUser} />} />

        {/* <Route path="/student/homepage" element={<StudentHomePage />} />
        <Route path="/student/printDoc" element={<PrintDocument />} />
        <Route path="/student/printHistory" element={<PrintingHistory />} />
        <Route path="/student/buyPage" element={<BuyPage />} /> */}

        <Route path="/student/homepage" element={(user?.role != "student") ? <Navigate to="/login" /> : <StudentHomePage />} />
        <Route path="/student/printDoc" element={(user?.role != "student") ? <Navigate to="/login" /> : <PrintDocument />} />
        <Route path="/student/printHistory" element={(user?.role != "student") ? <Navigate to="/login" /> : <PrintingHistory />} />
        <Route path="/student/buyPage" element={(user?.role != "student") ? <Navigate to="/login" /> : <BuyPage />} />

        <Route path="/spso/homepage" element={(user?.role != "spso") ? <Navigate to="/login" /> : <SPSOHomePage />} />
        <Route path="/spso/waiting-docs" element={(user?.role != "spso") ? <Navigate to="/login" /> : <WaitingDocsPage />} />
        <Route path="/spso/printers" element={(user?.role != "spso") ? <Navigate to="/login" /> : <PrintersPage />} />
        <Route path="/spso/printers/:id" element={(user?.role != "spso") ? <Navigate to="/login" /> : <PrinterInfoPage />} />
        <Route path="/spso/history" element={(user?.role != "spso") ? <Navigate to="/login" /> : <SystemHistoryPage />} />
        <Route path="/spso/management" element={(user?.role != "spso") ? <Navigate to="/login" /> : <ManagementPage />} />
        <Route path="/spso/reports" element={(user?.role != "spso") ? <Navigate to="/login" /> : <ReportsPage />} />
      </Routes>
    </div>
  );
}

export default App;