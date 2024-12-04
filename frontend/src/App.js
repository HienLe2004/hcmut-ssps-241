import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { students, rooms, waitingDocs, printers} from "./utils/mock-data";
import { createServer, Model } from "miragejs";
createServer({
  models: {
    printer: Model,
    student: Model
  },
  seeds(server) {
    printers.forEach((printer) => {server.create('printer', printer);});
    students.forEach((student) => {server.create('student', student);})
  },
  routes() {
    //Lấy danh sách sinh viên trong hệ thống
    this.get("/api/students", (schema, request) => {
      return schema.students.all()
    })
    //Lấy sinh viên theo id
    this.get("/api/students/:id", (schema, request) => {
      let id = request.params.id
      return schema.students.find(id)
    })
    //Lấy danh sách máy in trong hệ thống
    this.get("/api/printers", (schema, request) => {
      console.log(schema.printers.all())
      return schema.printers.all()
    })
    //Lấy máy in theo id
    this.get("api/printers/:id", (schema, request) => {
      let id = request.params.id
      return schema.printers.find(id)
    })
    //Thêm máy in mới
    this.post("/api/printers", (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      const printerAtRoom = printers.filter(printer => printer.room == attrs.room)
      attrs.id = attrs.room + "-" + (printerAtRoom.length + 1)
      attrs.start = (format(new Date(),'kk:mm dd/MM/Y'))
      attrs.status = "on"
      printers.push(attrs)
      console.log(printers)
      return {printer: attrs}
    })
    //Cập nhật thông tin máy in
    this.patch("/api/printers/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody)
      let id = request.params.id
      let printer = schema.printers.find(id)
      return printer.update(newAttrs)
    })
    //Lấy danh sách phòng trên hệ thống
    this.get("/api/rooms", () => rooms)
    //Lấy danh sách yêu cầu đang chờ in trong hệ thống
    this.get("/api/waiting-docs", () => waitingDocs)
  }
})

function App() {
  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/homepage" element={<StudentHomePage />} />
      <Route path="/student/printDoc" element={<PrintDocument />} />
      <Route path="/student/printHistory" element={<PrintingHistory />} />
      <Route path="/student/buyPage" element={<BuyPage />} />

      <Route path="/spso/homepage" element={<SPSOHomePage/>}/>
      <Route path="/spso/waiting-docs" element={<WaitingDocsPage/>}/>
      <Route path="/spso/printers" element={<PrintersPage/>}/>
      <Route path="/spso/printers/:id" element={<PrinterInfoPage/>}/>
      <Route path="/spso/history" element={<SystemHistoryPage/>}/>
      <Route path="/spso/management" element={<ManagementPage/>}/>
      <Route path="/spso/reports" element={<ReportsPage/>}/>    
    </Routes>    
    </div>
  );
}

export default App;