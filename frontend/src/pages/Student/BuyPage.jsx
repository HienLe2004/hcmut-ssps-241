import { StudentHeader } from "../../components/StudentHeader";
import { Footer } from "../../components/footer";
import { AddSuccess } from "./AddSuccess";
import { Alert } from "./Alert";
import { Confirm } from "./Confirm";
import avatar from '../../images/VitaminMeo.jpg'

import axios from "axios";
import { FaSearch } from "react-icons/fa"


import { useEffect, useState } from "react";


export const BuyPage = () => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [isSearched, setIsSearch] = useState(false);

    const [remainPage, setRemainPage] = useState(0);

    const [numPageBuy, setNumPageBuy] = useState(0);
    const [pageSize, setPageSize] = useState("");

    const [total, setTotal] = useState(0);

    const [confirmPopup, setConfirmPopup] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [alertPopup, setAlertPopup] = useState(false);


    const [buyHistory, setBuyHistory] = useState([]);

    const [filteredDate, setFilteredDate] = useState(buyHistory);

    const totalPrice = () => {
        if (pageSize === "A3") { return numPageBuy * 1000 }
        else if (pageSize === "A4") { return numPageBuy * 500 }
        else { return numPageBuy * 250 }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setTotal(totalPrice());
        if (!numPageBuy) {
            setAlertPopup(true);
        }
        else {
            setConfirmPopup(true);
        }
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

    const convertToVietnamTime = (utcDate) => {
        const date = new Date(utcDate);
        // Cộng thêm 7 giờ để chuyển đổi sang múi giờ UTC+7
        return new Date(date.getTime() + 7 * 60 * 60 * 1000);
    };

    const formatDateTime = (date) => {
        console.log("Check formatDT:", date);
        if (!date) return "null";
        console.log("Is Date Instance:", date instanceof Date);
        return date.toLocaleString("vi-VN", { timeZone: "Asia/Bangkok" });
    };

    const postBuyLog = async (idStu) => {
        const buyLog = {
            paperSize: pageSize,
            boughtPageNum: numPageBuy,
            price: total,
            paymentTime: new Date,
            student: { id: idStu }
        }
        console.log("Check buy log:", buyLog.paymentTime)
        try {
            const response = await axios.post('http://localhost:8080/api/v1/buyLog', buyLog);
        } catch (error) {

        }
    }
    const sendForm = () => {
        setConfirmPopup(false);
        setSuccessPopup(true);
        setRemainPage(remainPage + numPageBuy);
        const newBuy = {
            numPageBuy,
            pageSize,
            total,
            buyTime: new Date
        };
        const user = JSON.parse(localStorage.getItem('user'));

        postBuyLog(user.id);
        setBuyHistory([newBuy, ...buyHistory]);
        setFilteredDate(buyHistory);

    }

    useEffect(() => {
        const fetchInfoStudent = async (id) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/student/${id}`);

                setRemainPage(response.data.balance);
                console.log("Check fetch student", response.data.balance);

                console.log("Remain page:", remainPage);
            } catch (error) {
                console.error("Error fetching student:", error.message);
            }

        }

        const fetchBuyLog = async (id) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/student/${id}/buyLogs`);

                const data = response.data;

                const newBuyLog = data.map((logs) => {

                    return {
                        numPageBuy: logs.boughtPageNum,
                        pageSize: logs.paperSize,
                        total: logs.price,
                        // buyTime: logs.paymentTime
                        buyTime: convertToVietnamTime(logs.paymentTime),
                    };
                });

                // Cập nhật trạng thái một lần
                setBuyHistory(newBuyLog);
                console.log("Check buy log:", newBuyLog)
            } catch (error) {
                console.error("Error fetching buy log:", error.message);
            }
        }
        const user = JSON.parse(localStorage.getItem('user'));

        fetchInfoStudent(user.id);
        fetchBuyLog(user.id);

    }, [])

    const searchDate = () => {
        if (startDate && endDate) {

            const start = new Date(startDate).setHours(0, 0, 0, 0);
            const end = new Date(endDate).setHours(23, 59, 59, 99);

            const filtered = buyHistory.filter((choice) => {
                const comparedTime = new Date(choice.buyTime).setHours(0, 0, 0, 0);

                return comparedTime >= start && comparedTime <= end;
            })
            setFilteredDate(filtered);
            setIsSearch(true);
        }
        else {
            setFilteredDate(buyHistory);
            setIsSearch(false);
        }
    }

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
        const user = JSON.parse(localStorage.getItem('user'));

        updateStudentBalance(user.id, remainPage);
    }, [remainPage])


    return (
        <div className="flex flex-col min-h-screen">
            <StudentHeader />
            <div className="hidden md:flex flex-col flex-grow items-center w-full ">
                {/* Form mua trang in + Bảng số trang hiện có */}

                <form onSubmit={handleSubmit}
                    className="flex flex-col w-[40%]  bg-blue-3 rounded-md m-5  text-white text-xl font-normal "

                >
                    <p className="m-5">Số trang hiện có: {remainPage}</p>
                    <div className="flex flex-row m-5">
                        <label className="text-white mr-5">Số trang mua thêm:</label>
                        <input type="number"
                            value={numPageBuy}
                            onChange={(event) => setNumPageBuy(parseInt(event.target.value))}
                            min="0"
                            className="border-2 border-blue-4 rounded-lg h-9 w-16 bg-blue-2 text-center text-lg text-white -translate-y-1"
                        />
                    </div>

                    <div className="flex flex-row m-5">
                        <label className="text-white mr-6">Kích cỡ trang:</label>
                        <select value={pageSize}
                            onChange={(event) => setPageSize(event.target.value)}
                            className="border-2 border-blue-4 rounded-lg px-2 py-1.5 bg-blue-3 text-white text-lg"

                        >
                            <option value="" disabled hidden>Chọn cỡ giấy</option>
                            <option value="A3">A3</option>
                            <option value="A4">A4</option>
                            <option value="A5">A5</option>
                        </select>
                    </div>
                    <button type="submit"
                        className=" w-[150px] self-center bg-blue-4 text-white text-2xl p-3 m-4 rounded-full hover:bg-[#2d66c1] duration-200"
                    >
                        Mua
                    </button>
                </form>

                {/* Lọc lịch sử mua */}
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

                {/* Hiển thị lịch sử mua - Màn hình lớn */}
                <div className="flex :w-[70%] my-8 flex-col ">
                    <table className="w-full bg-blue-2 border-2 border-blue-4 rounded-none">
                        <thead>
                            <tr className="text-white bg-blue-3 text-xl">
                                <th className="border-2 border-blue-4 p-4 w-[20%] ">Số trang đã mua</th>
                                <th className="border-2 border-blue-4 p-4 ">Kích cỡ trang</th>
                                <th className="border-2 border-blue-4 p-4 ">Giá tiền (VNĐ)</th>
                                <th className="border-2 border-blue-4 p-4 ">Thời gian thanh toán</th>

                            </tr>
                        </thead>
                        <tbody>
                            {!isSearched &&
                                (buyHistory.map((hist, index) => (

                                    <tr key={index}
                                        className="border border-blue-4 text-blue-5 bg-white font-normal text-center text-xl">

                                        <td className="p-6 border-2 border-blue-4">{hist.numPageBuy}</td>
                                        <td className="p-6 border-2 border-blue-4">{hist.pageSize}</td>
                                        <td className="p-6 border-2 border-blue-4">{hist.total}</td>
                                        <td className="p-6 border-2 border-blue-4">{formatDateTime(new Date(hist.buyTime))}</td>
                                        {console.log("Check buy time:", formatDateTime(new Date(hist.buyTime)))}
                                    </tr>
                                )))
                            }
                            {isSearched &&
                                (filteredDate.map((hist, index) => (
                                    <tr key={index}
                                        className="border border-blue-4 text-blue-5 bg-white font-normal text-center text-xl">

                                        <td className="p-6 border-2 border-blue-4">{hist.numPageBuy}</td>
                                        <td className="p-6 border-2 border-blue-4">{hist.pageSize}</td>
                                        <td className="p-6 border-2 border-blue-4">{hist.total}</td>
                                        <td className="p-6 border-2 border-blue-4">{formatDateTime(new Date(hist.buyTime))}</td>

                                    </tr>
                                )))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Màn hình nhỏ */}
            <div className="flex md:hidden flex-col flex-grow items-center w-full ">
                {/* Form mua trang in + Bảng số trang hiện có */}

                <form onSubmit={handleSubmit}
                    className="flex flex-col w-[65%]  bg-blue-3 rounded-md m-5  text-white text-xl font-normal "

                >
                    <p className="m-5">Số trang hiện có: {remainPage}</p>
                    <div className="flex flex-row m-5">
                        <label className="text-white mr-5">Số trang mua thêm:</label>
                        <input type="number"
                            value={numPageBuy}
                            onChange={(event) => setNumPageBuy(parseInt(event.target.value))}
                            min="0"
                            className="border-2 border-blue-4 rounded-lg h-9 w-16 bg-blue-2 text-center text-lg text-white -translate-y-1"
                        />
                    </div>

                    <div className="flex flex-row m-5">
                        <label className="text-white mr-6">Kích cỡ trang:</label>
                        <select value={pageSize}
                            onChange={(event) => setPageSize(event.target.value)}
                            className="border-2 border-blue-4 rounded-lg px-2 py-1.5 bg-blue-3 text-white text-lg"

                        >
                            <option value="" disabled hidden>Chọn cỡ giấy</option>
                            <option value="A3">A3</option>
                            <option value="A4">A4</option>
                            <option value="A5">A5</option>
                        </select>
                    </div>
                    <button type="submit"
                        className=" w-[150px] self-center bg-blue-4 text-white text-2xl p-3 m-4 rounded-full hover:bg-[#2d66c1] duration-200"
                    >
                        Mua
                    </button>
                </form>

                {/* Lọc lịch sử mua */}
                <div className="flex flex-col items-center justify-center my-5">
                    <div className="flex flex-row mb-5">
                    <p className="mx-6 text-3xl font-normal">Từ</p>
                    <input type="date"
                        min="2024-01-01"
                        max="2030-12-31"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        className="appearance-none outline-none border-2 border-blue-4 py-1 px-2 rounded-md bg-blue-2 text-xl text-center translate-y-0.5  "
                    />
                    </div>
                    <div className="flex flex-row mb-5">
                    <p className="mx-6 text-3xl font-normal">Đến</p>
                    <input type="date"
                        min="2024-01-01"
                        max="2030-12-31"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        className="appearance-none outline-none border-2 border-blue-4 py-1 px-2 rounded-md bg-blue-2 text-xl text-center translate-y-0.5 "
                    />
                    </div>
                    <button className="aspect-square rounded-full bg-blue-4 w-8 ml-5 items-center justify-items-center hover:scale-110 duration-200"
                        onClick={searchDate}>
                        <FaSearch id="search-icon" className="text-white" />
                    </button>
                </div>

                {/* Hiển thị lịch sử mua*/}
                <div className=" px-10 py-2 text-xl">
                    {!isSearched && (
                        <table className="bg-blue-3 overflow-x-scroll w-full">
                            <tbody className="text-white">
                                {buyHistory.map((hist, docKey) => {
                                    return <tr key={docKey} className={docKey % 2 ? "bg-blue-3" : "bg-blue-4"}>
                                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số trang đã mua">{hist.numPageBuy}</td>
                                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Kích cỡ trang">{hist.pageSize}</td>
                                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Giá tiền">{hist.total}</td>
                                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian thanh toán">{formatDateTime(new Date(hist.buyTime))}</td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    )}

                    {isSearched && (
                        <table className="bg-blue-3 overflow-x-scroll w-full">
                            <tbody className="text-white">
                                {filteredDate.map((hist, docKey) => {
                                    return <tr key={docKey} className={docKey % 2 ? "bg-blue-3" : "bg-blue-4"}>
                                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số trang đã mua">{hist.numPageBuy}</td>
                                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Kích cỡ trang">{hist.pageSize}</td>
                                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Giá tiền">{hist.total}</td>
                                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian thanh toán">{formatDateTime(new Date(hist.buyTime))}</td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    )}

                </div>
            </div>

            {confirmPopup && (
                <Confirm onClose={turnOffConfirm}
                    onConfirm={sendForm}
                    message={
                        <>
                            Bạn có đồng ý mua {numPageBuy} trang {pageSize} với giá {total} VNĐ không?
                        </>
                    }
                />
            )}

            {successPopup && (
                <AddSuccess onClose={turnOffAddSuccess} message={"Thanh toán thành công!"} />
            )}

            {alertPopup && (
                <Alert onClose={turnOffAlert} message={"Bạn hãy chọn số trang cần mua!"} />
            )}
            <Footer />
        </div>
    );
}