import { useState, useEffect } from "react";
import { StudentHeader } from "../../components/StudentHeader";
import { Footer } from "../../components/footer";
import { Confirm } from "./Confirm";
import { AddSuccess } from "./AddSuccess";
import { Alert } from './Alert';
import axios from "axios";


export const PrintDocument = () => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const [pageSize, setPageSize] = useState("");
    const [pageSizeList, setPageSizeList] = useState([]);

    const [defaultPage, setDefaultPage] = useState(0);
    const [remainPage, setRemainPage] = useState(0);
    const [numPageDocument, setNumPageDocument] = useState(0);

    const [validTypeFile, setValidFileType] = useState("");

    const [numCopy, setNumCopy] = useState(1);
    const [doubleSide, setDoubleSide] = useState(false);

    const [printer, setPrinter] = useState([]);
    const [printerList, setPrinterList] = useState([]);

    const [fileData, setFileData] = useState();

    const [isTwoSide, setIsTwoSide] = useState(false);

    const [printModi, setPrintModi] = useState();

    const [numPageUsed, setNumPageUsed] = useState(0);
    const [isEnough, setIsEnough] = useState(true);

    const [requests, setRequests] = useState([]);

    const [confirmPopup, setConfirmPopup] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [alertPopup, setAlertPopup] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    }

    const handleRemoveFile = () => {
        setFile(null);
        setFileName('');
    }

    const turnOffConfirm = () => {
        setConfirmPopup(false);
    }

    const turnOffAddSuccess = () => {
        setSuccessPopup(false);
    }

    const turnOffAlert = () => {
        setAlertPopup(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!file) {
            // setCanSubmit(false);
            setAlertPopup(true);
        }
        else {
            // setCanSubmit(true);
            setConfirmPopup(true);
            calculateNumPageUsed();
            console.log("Print modification:", printModi);
            console.log("File data:", fileData);
            console.log("Remaining page:", remainPage);
        }
    }

    const sendForm = () => {

        if(remainPage < numPageUsed){
            setConfirmPopup(false);
            setIsEnough(false);
            return;
        }
        setConfirmPopup(false);
        setSuccessPopup(true);

        createPrintLog();
        

        setRemainPage(remainPage - numPageUsed);
        handleRemoveFile();
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

    const calculateNumPageUsed = () => {
        var val = fileData.numPages;
        console.log("Check 1:",printModi.doubleSided)
        console.log("Check 2:",printModi.paperSize)
        if (printModi.doubleSided === true) { val = val / 2; }
        if (printModi.paperSize === "A3") { val = val * 2; }
        else if (printModi.paperSize === "A5") { val = val / 2; }
        
        val = Math.ceil(val) * printModi.copies;
        console.log("Check val:", val);
        setNumPageUsed(prev => val);
        return val;
    }


    const createPrintLog = async () => {
        console.log("Check file data:", fileData);
        console.log("Check print modification:", printModi);
        const formData = {
            status: "Đang xử lí",
            startTime: formatDateTime(new Date),
            // startTime: new Date(),
            finishedTime: null,
            document: { id: fileData.id },
            printModification: { id: printModi.id },
            student: { id: fileData.student.id },
            printer: { name: printer }
        }
        try {
            const response = await axios.post('http://localhost:8080/api/v1/printLog', formData);
            console.log("Gui printLog thanh cong", response.data);
        } catch (error) {
            console.error("Error posting printLog:", error.message);
        }
    }

    // Lấy các print log
    const fetchPrintLog = async () => {
        try {
            const student_id = 2211024;
            const response = await axios.get(`http://localhost:8080/api/v1/student/${student_id}/printLogs`);
            console.log("Check print log:", response.data);
            const data = response.data;

            // Tạo mảng tạm để lưu kết quả
            const newRequests = data.map((logs) => {

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
            // setRequests([...requests, ...newRequests]);
            setRequests(newRequests);
        } catch (error) {
            console.error("Error fetching printer list:", error.message);
        }
    };



    useEffect(() => {
        const updateStudentBalance = async (id, numPage) => {
            try {

                const response = await axios.put(`http://localhost:8080/api/v1/student/${id}`,
                    {
                        balance: numPage
                    }
                );
            } catch (error) {
                console.error("Error updating student balance:", error.message);
            }
        };                                                                                                                      

        updateStudentBalance("2211024", remainPage);
    }, [remainPage])

    useEffect(() => {
        const sendPrintModification = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/v1/printModification',
                    {
                        paperSize: pageSize,
                        copies: numCopy,
                        doubleSided: isTwoSide
                    }
                );
                console.log("Đã gửi modification", response.data);
                setPrintModi(response.data);
            } catch (error) {
                console.error("Error uploading modification:", error.message);
            }
        }
        sendPrintModification();
    }, [pageSize, numCopy, isTwoSide])

    useEffect(() => {
        const fetchInfoFile = async (file) => {
            if (file) {
                const formData = new FormData();
                formData.append("file", file); // Thêm file vào FormData với key là "file"

                try {
                    const response = await axios.post("http://localhost:8080/api/v1/document/2211024", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    // console.log("Upload successful:", response.data);
                    setNumPageDocument(response.data.numPages);
                    setFileData(response.data);
                } catch (error) {
                    console.error("Error uploading file:", error.message);
                }
            }
        }
        fetchInfoFile(file);
    }, [file])

    useEffect(() => {

        // Lấy các cấu hình cho máy in
        const fetchPrinterSetting = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/paperSetting');
                // console.log("Check printer setting:", response.data);

                const validType = response.data.validFileType;
                const numDefaultPage = response.data.numPage;
                const paperSize = response.data.paperSize;

                setValidFileType(validType.split(",").map(type => `.${type.trim()}`).join(","));
                setDefaultPage(numDefaultPage);

                setPageSizeList(paperSize.split(",").map(item => item.trim()));

            } catch (error) {
                console.error("Error fetching printer list:", error.message);
            }
        };

        

        // Lấy thống tin sinh viên

        const fetchInfoStudent = async (id) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/student/${id}`);

                setRemainPage(response.data.balance);

                console.log("Remain page:", remainPage);
            } catch (error) {
                console.error("Error fetching student:", error.message);
            }
        }

        // Lấy danh sách máy in
        const fetchPrinterList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/printers');

                const printers = response.data.map((pList) => {

                    return {
                        Name: pList.name,
                        State: pList.state
                    };
                });
                setPrinterList(printers);

            } catch (error) {
                console.error("Error fetching printer list:", error.message);
            }

        };

        fetchPrinterList();
        fetchPrinterSetting();
        fetchPrintLog();
        fetchInfoStudent("2211024");
    }, []);

    useEffect(() => {
        fetchPrintLog();
    }, [requests]);


    return (
        <div className="flex flex-col min-h-screen">
            <StudentHeader />

            <div className="flex flex-col flex-grow items-center w-full mt-5 " >

                {/* Form  */}

                <div className="  w-[60%] mt-5  ">

                    <form className="flex flex-col bg-blue-3 rounded-xl p-4  "
                        onSubmit={handleSubmit}
                    >
                        {/* Chọn tài liệu */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Tài liệu cần in:</label>
                            <input type="file"
                                accept={validTypeFile}
                                onChange={handleFileChange}
                                className="hidden"
                                id="fileUpload"
                            />
                            {fileName && (
                                <div className="flex flex-row w-[50%] ">
                                    <span className="text-white text-md rounded-lg bg-blue-3 px-3 py-2 mr-4 inline-block max-w-auto overflow-hidden whitespace-nowrap text-ellipsis ">{fileName}</span>
                                    <label className="bg-blue-4 text-white text-md px-4 py-2 cursor-pointer rounded-lg"
                                        onClick={handleRemoveFile}>
                                        Xóa
                                    </label>
                                </div>
                            )}
                            {!fileName && (
                                <label htmlFor="fileUpload"
                                    className="bg-blue-4 text-white text-md px-4 py-2 cursor-pointer rounded-lg hover:bg-[#2d66c1] duration-200"

                                >
                                    Tải lên:
                                </label>
                            )}
                            <div className="text-white ml-auto ">
                                {validTypeFile}
                            </div>
                        </div>
                        {/* Kích cỡ trang */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Kích cỡ trang in:</label>
                            <select value={pageSize}
                                onChange={(event) => setPageSize(event.target.value)}
                                className="border-2 border-blue-4 rounded-lg px-2 py-1.5 bg-blue-3 text-white text-lg"
                            >
                                <option value="" disabled hidden>Chọn cỡ trang</option>
                                {pageSizeList.map((size, index) => (
                                    <option value={size} key={index}>
                                        {size}
                                    </option>
                                ))}
                            </select>

                        </div>

                        {/* Số bản in */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Số bản cần in:</label>
                            <input type="number"
                                value={numCopy}
                                onChange={(event) => setNumCopy(event.target.value)}
                                min="1"
                                className="border-2 border-blue-4 rounded-lg px-2 py-1 w-16 bg-blue-3 text-center text-lg text-white"
                            />
                        </div>

                        {/* Số trang còn lại */}
                        <div className="flex flex-row items-center p-2 text-white text-2xl">
                            <label className=" mr-6">Số trang còn lại: </label>
                            <div>{remainPage}</div>
                        </div>

                        {/* In 2 mặt */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">In 2 mặt giấy:</label>
                            <input type="checkbox"
                                onChange={(event) => { setIsTwoSide(event.target.checked) }}

                                className="w-8 h-8"
                            />
                        </div>

                        {/* Máy in */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Máy in:</label>
                            <select value={printer}
                                onChange={(event) => setPrinter(event.target.value)}
                                className="border-2 border-blue-4 bg-blue-3 rounded-lg p-2 textx-lg text-white"
                            >
                                <option value="" disabled hidden>Chọn máy in</option>
                                {printerList.map((item, index) => (
                                    item.State === "on" && (
                                        <option value={item.Name} key={index}>
                                            {item.Name}
                                        </option>
                                    )
                                ))}
                            </select>
                        </div>

                        {/* Nút gửi yêu cầu in */}
                        <button type="submit"
                            className=" w-56 self-center bg-blue-4 text-white text-2xl p-3 m-4 rounded-full hover:bg-[#2d66c1] duration-200"
                        >
                            Yêu cầu in tài liệu
                        </button>


                    </form>


                </div>

                {/* Lịch sử in */}
                <div className="w-[80%] my-8 ">
                    <h2 className="text-4xl text-center text-black mb-4">
                        Danh sách yêu cầu đang chờ
                    </h2>
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
                            </tr>
                        </thead>
                        <tbody>
                            {requests.filter((request) => request.status === "Đang xử lí").map((request, index) => (
                                <tr key={index}
                                    className="border border-blue-4 bg-white text-blue-5 font-normal text-center text-xl">
                                    <td className="p-2 border-2 border-blue-4 max-w-[96px] overflow-hidden whitespace-nowrap text-ellipsis">{request.fileName}</td>
                                    <td className="p-2 border-2 border-blue-4">{request.pageSize}</td>
                                    <td className="p-2 border-2 border-blue-4">{request.numCopy}</td>
                                    <td className="p-2 border-2 border-blue-4">{request.numPageInFile}</td>
                                    <td className="p-2 border-2 border-blue-4">{request.doubleSide === true ? 2 : 1}</td>
                                    <td className="p-2 border-2 border-blue-4">{request.printer}</td>
                                    <td className="p-2 border-2 border-blue-4">{request.status}</td>
                                    <td className="p-2 border-2 border-blue-4">{request.startTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {confirmPopup && (
                <Confirm onClose={turnOffConfirm}
                    onConfirm={sendForm}
                    message={
                        <>
                            <p>Yêu cầu này cần sử dụng {numPageUsed} tờ.</p>
                            <p>Bạn có chắc chắn yêu cầu này không?</p>
                        </>
                    }
                />
            )}

            {!isEnough && (
                <Alert onClose={() => {setIsEnough(true)}} message={"Số trang của bạn không đủ, hãy mua thêm"}/>
            )}

            {successPopup && (
                <AddSuccess onClose={turnOffAddSuccess} message={"Bạn đã yêu cầu in thành công"} />
            )}

            {alertPopup && (
                <Alert onClose={turnOffAlert} message={"Bạn hãy chọn tài liệu muốn in!"} />
            )}



            <Footer />



        </div>
    );
}


