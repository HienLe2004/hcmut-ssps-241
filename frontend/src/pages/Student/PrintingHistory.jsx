import { StudentHeader } from "../../components/StudentHeader";
import { Footer } from "../../components/footer";
import avatar from '../../images/VitaminMeo.jpg'
import { parse, format } from "date-fns";
import { FaSearch } from "react-icons/fa"
import axios from 'axios';

import { useEffect, useState } from "react";

export const PrintingHistory = () => {

    const [studentId, setStudentId] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [history, setHistory] = useState([]);

    const [filteredDate, setFilteredDate] = useState(history);

    const [statistic, setStatistic] = useState();

    const countPage = (doneData) => {
        let numA3 = 0
        let numA4 = 0
        let numA5 = 0
        doneData.forEach(data => {
            if (data.pageSize == "A3") 
                numA3 += Math.round(data.numPageInFile/(data.doubleSide?2:1)) * data.numCopy
            if (data.pageSize == "A4") 
                numA4 += Math.round(data.numPageInFile/(data.doubleSide?2:1)) * data.numCopy
            if (data.pageSize == "A5") 
                numA5 += Math.round(data.numPageInFile/(data.doubleSide?2:1)) * data.numCopy
        })
        let str = (numA3 == 0) ? "" : (numA3+" trang A3 ")
        str += (numA4 == 0) ? "" : (numA4+" trang A4 ")
        str += (numA5 == 0) ? "" : (numA5+" trang A5 ")
        setStatistic(str)
    }

    const searchDate = () => {
        if (startDate && endDate) {

            const start = new Date(startDate).setHours(0, 0, 0, 0);
            const end = new Date(endDate).setHours(23, 59, 59, 99);

            console.log("Check start", start);
            console.log("Check end", end);

            const filtered = history.filter((choice) => {
                const comparedTime = parse(choice.startTime, "HH:mm dd/MM/yyyy", new Date());
                console.log("Check compare time", choice.startTime, comparedTime);
                return comparedTime >= start && comparedTime <= end;
            })
            setFilteredDate(filtered);
            countPage(filtered);
        }
        else {
            setFilteredDate(history);
            countPage(history);
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
        setFilteredDate(history);
    }, [history])


    useEffect(() => {
        const fetchPrintLog = async () => {
            try {
                const student_id = 2211024;
                const response = await axios.get(`http://localhost:8080/api/v1/student/${student_id}/printLogs`);


                // Tạo mảng tạm để lưu kết quả
                const newRequests = response.data.map((logs) => {

                    return {
                        fileName: logs.document.fileName,
                        pageSize: logs.printModification.paperSize,
                        numCopy: logs.printModification.copies,
                        numPageInFile: logs.document.numPages,
                        doubleSide: logs.printModification.doubleSided,
                        printer: logs.printer.name,
                        status: logs.status,
                        startTime: logs.startTime,
                        endTime: logs.finishedTime,
                    };
                });

                // Cập nhật trạng thái một lần
                console.log("Fetch gòi nè chaaaa:", newRequests);
                setHistory(newRequests);
                setFilteredDate(history);
                countPage(newRequests);
                console.log("Check history:", history);
            } catch (error) {
                console.error("Error fetching printer list:", error.message);
            }
        };

        fetchPrintLog();
    }, [])

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
                    <button className="aspect-square rounded-full bg-blue-4 w-8 ml-5 items-center justify-items-center hover:scale-110 duration-200"
                        onClick={searchDate}>
                        <FaSearch id="search-icon" className="text-white" />
                    </button>

                </div>

                {/* Hiển thị lịch sử in */}
                <div className="w-[80%] my-8 flex flex-col ">
                    <p className="self-end text-lg mb-5">
                        {/* Tổng số trang đã sử dụng: {totalA3page} trang A3, {totalA4page} trang A4, {totalA5page} trang A5. */}
                        Thống kê sử dụng: {statistic}
                    </p>
                    <table className="w-full bg-blue-2 border-2 border-blue-4 rounded-none">
                        <thead>
                            <tr className="text-white bg-blue-3 text-xl">
                                <th className="border-2 border-blue-4 p-2 w-[20%] ">Tên file</th>
                                <th className="border-2 border-blue-4 p-2 ">Cỡ giấy</th>
                                <th className="border-2 border-blue-4 p-2 ">Số bản</th>
                                <th className="border-2 border-blue-4 p-2 ">Số trang của tài liệu</th>
                                <th className="border-2 border-blue-4 p-2 ">Số mặt</th>
                                <th className="border-2 border-blue-4 p-2 ">Máy in</th>
                                <th className="border-2 border-blue-4 p-2 ">Trạng thái</th>
                                <th className="border-2 border-blue-4 p-2 ">Thời gian bắt đầu</th>
                                <th className="border-2 border-blue-4 p-2 ">Thời gian kết thúc</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDate.filter((hist) => hist.status === "Đã in xong").map((hist, index) => (
                                <tr key={index}
                                    className="border border-blue-4 text-blue-5 bg-white font-normal text-center text-xl">
                                    <td className="p-2 border-2 border-blue-4 max-w-[96px] overflow-hidden whitespace-nowrap text-ellipsis">{hist.fileName}</td>
                                    <td className="p-2 border-2 border-blue-4">{hist.pageSize}</td>
                                    <td className="p-2 border-2 border-blue-4">{hist.numCopy}</td>
                                    <td className="p-2 border-2 border-blue-4">{hist.numPageInFile}</td>
                                    <td className="p-2 border-2 border-blue-4">{hist.doubleSide === true ? 2 : 1}</td>
                                    <td className="p-2 border-2 border-blue-4">{hist.printer}</td>
                                    <td className="p-2 border-2 border-blue-4">{hist.status}</td>
                                    <td className="p-2 border-2 border-blue-4">{hist.startTime}</td>
                                    <td className="p-2 border-2 border-blue-4">{hist.endTime || null}</td>
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