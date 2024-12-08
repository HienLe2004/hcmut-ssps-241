import { StudentHeader } from "../../components/StudentHeader";
import { Footer } from "../../components/footer";
import avatar from '../../images/VitaminMeo.jpg'
import axios from 'axios';

import { useEffect, useState } from "react";

export const PrintingHistory = () => {

    const [studentId, setStudentId] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [history, setHistory] = useState([
        { fileName: "Hello.docx", pageSize: "A4", numCopy: 5, printer: "H1-101-1", status: "Đã in xong", startTime: "2024-11-24T09:30", endTime: "2024-11-24T10:15" },
        { fileName: "NguyenQuocDat.pdf", pageSize: "A3", numCopy: 10, printer: "H2-102-1", status: "Đã in xong", startTime: "2024-11-15T15:30", endTime: "2024-11-15T16:00" },
        { fileName: "Hello2.png", pageSize: "A4", numCopy: 3, printer: "H1-101-1", status: "Đã bị hủy", startTime: "2024-10-29T12:00", endTime: "2024-10-29T13:00" },
        { fileName: "Hello3.docx", pageSize: "A3", numCopy: 5, printer: "H2-102-1", status: "Đã in xong", startTime: "2024-11-01T00:00", endTime: "2024-11-01T10:15" },

    ]);

    const [filteredDate, setFilteredDate] = useState(history);
    const [totalA3page, setTotalA3page] = useState(0);
    const [totalA4page, setTotalA4page] = useState(0);


    const normalizeDate = (date) => {
        
    };

    const searchDate = () => {
        if (startDate && endDate) {

            const start = new Date(startDate).setHours(0, 0, 0, 0);
            const end = new Date(endDate).setHours(0, 0, 0, 0);

            const filtered = history.filter((choice) => {
                const comparedTime = new Date(choice.startTime).setHours(0, 0, 0, 0);

                return comparedTime >= start && comparedTime <= end;
            })
            setFilteredDate(filtered);
        }
        else {
            setFilteredDate(history);
        }
    }

    const formatDateTime = (date) => {
        if (!date) return "null";
        return date.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
        });
    };

    useEffect(() => {
        const calculatedA3 = filteredDate.reduce((sum, choice) => {
            return (choice.pageSize === "A3" && choice.status === "Đã in xong") ? sum + choice.numCopy : sum;
        }, 0);
        const calculatedA4 = filteredDate.reduce((sum, choice) => {
            return (choice.pageSize === "A4" && choice.status === "Đã in xong") ? sum + choice.numCopy : sum;
        }, 0);

        const fetchStudentPrintLog = async (studentId) => {
            try{
                const response = await axios.get(`http://localhost:8080/api/v1/student/${studentId}/printLogs`);
                setHistory(response.data);
                console.log(response.data);
            }
            catch (error){
                console.log("Không lấy được printLog của SV", error);
            }
        }
        
        setTotalA3page(calculatedA3);
        setTotalA4page(calculatedA4);
        fetchStudentPrintLog("2210694")
        
    }, [filteredDate]);

    return (
        <div className="flex flex-col min-h-screen">
            <StudentHeader />
            <div className="flex flex-col flex-grow items-center w-full ">
                {/* Lọc lịch sử in */}
                <div className="flex flex-row items-center justify-center mx-5 mt-5">
                    <p className="mx-6 text-3xl font-normal">Từ</p>
                    <input type="date"
                        min="2024-01-01"
                        max="2030-12-31"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        className="appearance-none outline-none border-2 border-blue-4 py-1 px-2 rounded-md bg-blue-2 text-xl text-center translate-y-0.5  "
                    />
                    <p className="mx-6 text-3xl font-normal">Đến</p>
                    <input type="date"
                        min="2024-01-01"
                        max="2030-12-31"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        className="appearance-none outline-none border-2 border-blue-4 py-1 px-2 rounded-md bg-blue-2 text-xl text-center translate-y-0.5 "
                    />
                    <img src={avatar}
                        alt="Không có gì hết á=))"
                        className="w-12 aspect-square mx-6 border-2 border-black rounded-full hover:cursor-pointer "
                        onClick={searchDate}
                    />

                </div>

                {/* Hiển thị lịch sử in */}
                <div className="w-[70%] my-8 flex flex-col ">
                    <p className="self-end text-lg mb-5">
                        Tổng số trang đã sử dụng: {totalA3page} trang A3, {totalA4page} trang A4.
                    </p>
                    <table className="w-full bg-blue-2 border-2 border-blue-4 rounded-none">
                        <thead>
                            <tr className="text-black text-xl">
                                <th className="border-2 border-blue-4 p-4 w-[20%] ">Tên file</th>
                                <th className="border-2 border-blue-4 p-4 ">Cỡ giấy</th>
                                <th className="border-2 border-blue-4 p-4 ">Số bản</th>
                                <th className="border-2 border-blue-4 p-4 ">Máy in</th>
                                <th className="border-2 border-blue-4 p-4 ">Trạng thái</th>
                                <th className="border-2 border-blue-4 p-4 ">Thời gian bắt đầu</th>
                                <th className="border-2 border-blue-4 p-4 ">Thời gian kết thúc</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDate.map((hist, index) => (
                                <tr key={index}
                                    className="border border-blue-4 text-white font-light text-center text-lg">
                                    <td className="p-6 border-2 border-blue-4 max-w-[96px] overflow-hidden whitespace-nowrap text-ellipsis">{hist.fileName}</td>
                                    <td className="p-6 border-2 border-blue-4">{hist.pageSize}</td>
                                    <td className="p-6 border-2 border-blue-4">{hist.numCopy}</td>
                                    <td className="p-6 border-2 border-blue-4">{hist.printer}</td>
                                    <td className="p-6 border-2 border-blue-4">{hist.status}</td>
                                    <td className="p-6 border-2 border-blue-4">{formatDateTime(new Date(hist.startTime))}</td>
                                    <td className="p-6 border-2 border-blue-4">{formatDateTime(new Date(hist.endTime))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}