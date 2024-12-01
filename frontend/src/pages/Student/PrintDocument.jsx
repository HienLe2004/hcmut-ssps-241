import { useState, useEffect } from "react";
import { StudentHeader } from "../../components/StudentHeader";
import { Footer } from "../../components/footer";
import { Confirm } from "./Confirm";
import { AddSuccess } from "./AddSuccess";
import { AlertAddFile } from "./Alert";
import axios from 'axios';

export const PrintDocument = () => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [pageSize, setPageSize] = useState('A4');
    const [numCopy, setNumCopy] = useState(1);
    const [printer, setPrinter] = useState('H1-101-1');

    const [printers, setPrinters] = useState([]);
    const [requests, setRequests] = useState([]);

    const [confirmPopup, setConfirmPopup] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [alertPopup, setAlertPopup] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);


    useEffect(() => {
        const fetchPrinters = async () => {
            try {
                const response = await axios.get();
                setPrinters(response.data.printers);
                if (response.data.printers.length > 0) {
                    setPrinter(response.data.printerss[0]);
                }
            }
            catch (error) {
                console.error("Không lấy được danh sách máy in", error);
            }
        };
        fetchPrinters();
    }, []);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!file) {
            // setCanSubmit(false);
            setAlertPopup(true);
        }
        else {
            // setCanSubmit(true);
            setConfirmPopup(true);

        }
    }

    const turnOffConfirm = () => {
        setConfirmPopup(false);

    }

    const sendForm = () => {
        setConfirmPopup(false);
        setSuccessPopup(true);
        const newRequest = {
            fileName,
            pageSize,
            numCopy,
            printer,
            status: "Đang xử lí",
            startTime: new Date().toLocaleString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
            endTime: null
        };
        handleRemoveFile();
        setRequests([newRequest, ...requests]);
    }

    const turnOffAddSuccess = () => {
        setSuccessPopup(false);
    }

    const turnOffAlertAddFile = () => {
        setAlertPopup(false);
    }

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
                                accept=".docx, .pdf, .png"
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
                                .docx, .pdf, .png
                            </div>
                        </div>
                        {/* Kích cỡ trang */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Kích cỡ trang in</label>
                            <select value={pageSize}
                                onChange={(event) => setPageSize(event.target.value)}
                                className="border-2 border-blue-4 rounded-lg px-2 py-1.5 bg-blue-3 text-white text-lg"
                            >
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
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
                        {/* Máy in */}
                        <div className="flex flex-row items-center p-2">
                            <label className="text-white text-2xl mr-6">Máy in</label>
                            <select value={printer}
                                onChange={(event) => setPrinter(event.target.value)}
                                className="border-2 border-blue-4 bg-blue-3 rounded-lg p-2 textx-lg text-white"
                            >
                                <option value="H1-101-1">H1-101-1</option>
                                <option value="H2-102-2">H2-102-2</option>
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
                                    <td className="p-6 border-2 border-blue-4">{request.endTime || "null"}</td>
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
                            <p>Yêu cầu này cần sử dụng {numCopy} tờ {pageSize}.</p>
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


