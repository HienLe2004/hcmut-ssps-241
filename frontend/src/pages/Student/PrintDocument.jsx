import { useState, useEffect } from "react";
import { StudentHeader } from "../../components/StudentHeader";
import { Footer } from "../../components/footer";
import { Confirm } from "./Confirm";
import { AddSuccess } from "./AddSuccess";
import { AlertAddFile } from "./Alert";
import axios from "axios";

export const PrintDocument = () => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const [pageSize, setPageSize] = useState('A3');
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

    const [requests, setRequests] = useState([]);

    const [confirmPopup, setConfirmPopup] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [alertPopup, setAlertPopup] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);





    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            fetchInfoFile(selectedFile);
        }
    }

    const handleRemoveFile = () => {
        setFile(null);
        setFileName('');
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
            sendPrintModification();
            fakeFunc();
            setNumPageUsed(calculateNumPageUsed());
        }
    }

    const turnOffConfirm = () => {
        setConfirmPopup(false);

    }

    const sendPrintModification = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/printModification',
                {
                    paperSize: pageSize,
                    copies: numCopy,
                    doubleSided: isTwoSide
                }
            );
            // console.log("Đã gửi modification", response.data);
            setPrintModi(response.data);
        } catch (error) {
            console.error("Error uploading modification:", error.message);
        }
    }

    const sendForm = () => {
        setConfirmPopup(false);
        setSuccessPopup(true);

        createPrintLog();
        updateStudentBalance("2211024", remainPage - numPageUsed);
        setRemainPage(remainPage - numPageUsed);
        fakeFunc();
        console.log("Check remaining page 1:", remainPage);
        handleRemoveFile();
    }

    const fakeFunc = () => {
        console.log("Fake hehehe");
    }

    const turnOffAddSuccess = () => {
        setSuccessPopup(false);
    }

    const turnOffAlertAddFile = () => {
        setAlertPopup(false);
    }

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

    const updateStudentBalance = async (id, balance) => {
        try {
            const data = { balance }; // Tạo object body chỉ với trường cần cập nhật
            const response = await axios.put(`http://localhost:8080/api/v1/student/${id}`, data, {
                headers: {
                    "Content-Type": "application/json", // Đảm bảo header đúng
                },
            });
            // console.log("Update successful:", response.data);
        } catch (error) {
            console.error("Error updating student balance:", error.message);
        }
    };

    // updateStudentBalance("2211024", 80);
    // fetchInfoStudent("2211024");

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
        var val = fileData.numPages * printModi.copies;
        if (printModi.doubleSided === true) { val = val / 2; }
        if (printModi.paperSize === "A3") { val = val * 2; }
        else if (printModi.paperSize === "A5") { val = val / 2; }
        return val;
    }


    const createPrintLog = async () => {
        console.log("Check file data:", fileData);
        console.log("Check print modification:", printModi);
        const formData = {
            status: "Đang xử lí",
            startTime: formatDateTime(new Date),
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


    useEffect(() => {

        // Lấy danh sách máy in
        const fetchPrinterList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/printers');
                // console.log("Check printer:", response.data);
                const printers = response.data.map((pList) => {

                    return {
                        Name: pList.name,
                        State: pList.state
                    };
                });
                setPrinterList([...printers, ...printerList]);
                // console.log("Hello printer", printers);
            } catch (error) {
                console.error("Error fetching printer list:", error.message);
            }

        };
        fetchPrinterList();
    }, [])

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

                // console.log("Check valid type", validType);
                // console.log("Check defaultpage", defaultPage);
                // console.log("Check paperSize:", pageSizeList);


            } catch (error) {
                console.error("Error fetching printer list:", error.message);
            }
        };
        // console.log("Check default 123:", defaultPage);
        // Lấy các print log
        const fetchPrintLog = async () => {
            try {
                const student_id = 2211024;
                const response = await axios.get(`http://localhost:8080/api/v1/student/${student_id}/printLogs`);
                console.log("Check print log:", response.data);
                const data = response.data;

                // Tạo mảng tạm để lưu kết quả
                const newRequests = data.map((logs) => {
                    // console.log(logs.document.fileName);
                    // console.log(logs.printModification.paperSize);
                    // console.log(logs.printModification.copies);
                    // console.log(logs.printer.name);
                    // console.log(logs.status);
                    // console.log(logs.startTime);
                    // console.log(logs.finishedTime);

                    return {
                        fileName: logs.document.fileName,
                        pageSize: logs.printModification.paperSize,
                        numCopy: logs.printModification.copies,
                        printer: logs.printer.name,
                        status: logs.status,
                        startTime: logs.startTime,
                        endTime: logs.finishedTime,
                    };
                });

                // Cập nhật trạng thái một lần
                setRequests([...newRequests, ...requests]);
            } catch (error) {
                console.error("Error fetching printer list:", error.message);
            }
        };

        // Lấy thống tin sinh viên

        const fetchInfoStudent = async (id) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/student/${id}`);
                // console.log("Fetch successful:", response.data);
                setRemainPage(response.data.balance);
                fakeFunc();
                console.log("Remain page:",remainPage);
            } catch (error) {
                console.error("Error fetching student:", error.message);
            }
        }

        fetchPrinterSetting();
        fetchPrintLog();
        fetchInfoStudent("2211024");
    }, []);


    return (
        <div className="flex flex-col min-h-screen">
            <StudentHeader />

            <div className="flex flex-col flex-grow items-center w-full mt-5 " >

                {/* Form  */}

                <div className="  w-[60%] mt-5  ">

                    <form className="flex flex-col bg-blue-2 rounded-xl p-4  "
                        onSubmit={handleSubmit}
                    >
                        {/* Chọn tài liệu */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Tài liệu cần in</label>
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
                                    className="bg-blue-4 text-white text-md px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-5 duration-200"

                                >
                                    Tải lên
                                </label>
                            )}
                            <div className="text-white ml-auto ">
                                {validTypeFile}
                            </div>
                        </div>
                        {/* Kích cỡ trang */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Kích cỡ trang in</label>
                            <select value={pageSize}
                                onChange={(event) => setPageSize(event.target.value)}
                                className="border-2 border-blue-4 rounded-lg px-2 py-1.5 bg-blue-3 text-white text-lg"
                            >

                                {pageSizeList.map((size, index) => (
                                    <option value={size} key={index}>
                                        {size}
                                    </option>
                                ))}
                            </select>

                        </div>

                        {/* Số bản in */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Số bản cần in</label>
                            <input type="number"
                                value={numCopy}
                                onChange={(event) => setNumCopy(event.target.value)}
                                min="1"
                                className="border-2 border-blue-4 rounded-lg px-2 py-1 w-16 bg-blue-3 text-center text-lg text-white"
                            />
                        </div>

                        {/* Số trang còn lại */}
                        <div className="flex flex-row items-center p-2 text-white text-2xl">
                            <label className=" mr-6">Số trang A4 còn lại: </label>
                            <div>{remainPage}</div>
                        </div>

                        {/* In 2 mặt */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">In 2 mặt giấy</label>
                            <input type="checkbox"
                                onChange={(event) => { setIsTwoSide(event.target.checked) }}

                                className="w-8 h-8"
                            />
                        </div>

                        {/* Máy in */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Máy in</label>
                            <select value={printer}
                                onChange={(event) => setPrinter(event.target.value)}
                                className="border-2 border-blue-4 bg-blue-3 rounded-lg p-2 textx-lg text-white"
                            >
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
                            className=" w-56 self-center bg-blue-4 text-white text-2xl p-3 m-4 rounded-full hover:bg-blue-5 duration-200"
                        >
                            Yêu cầu in tài liệu
                        </button>


                    </form>


                </div>

                {/* Lịch sử in */}
                <div className="w-[70%] my-8 ">
                    <h2 className="text-4xl text-center text-black mb-4">
                        Danh sách yêu cầu đang chờ
                    </h2>
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
                            {requests.map((request, index) => (
                                <tr key={index}
                                    className="border border-blue-4 text-white font-light text-center text-lg">
                                    <td className="p-6 border-2 border-blue-4 max-w-[96px] overflow-hidden whitespace-nowrap text-ellipsis">{request.fileName}</td>
                                    <td className="p-6 border-2 border-blue-4">{request.pageSize}</td>
                                    <td className="p-6 border-2 border-blue-4">{request.numCopy}</td>
                                    <td className="p-6 border-2 border-blue-4">{request.printer}</td>
                                    <td className="p-6 border-2 border-blue-4">{request.status}</td>
                                    <td className="p-6 border-2 border-blue-4">{request.startTime}</td>
                                    <td className="p-6 border-2 border-blue-4">{request.endTime || null}</td>
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
                            <p>Yêu cầu này cần sử dụng {numPageUsed} tờ {pageSize}.</p>
                            <p>Bạn có chắc chắn yêu cầu này không?</p>
                        </>
                    }
                />
            )}

            {successPopup && (
                <AddSuccess onClose={turnOffAddSuccess} message={"Bạn đã yêu cầu in thành công"} />
            )}

            {alertPopup && (
                <AlertAddFile onClose={turnOffAlertAddFile} message={"Bạn hãy chọn tài liệu muốn in!"} />
            )}



            <Footer />



        </div>
    );
}


