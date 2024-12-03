import { StudentHeader } from "../../components/StudentHeader";
import { Footer } from "../../components/footer";
import { AddSuccess } from "./AddSuccess";
import { AlertAddFile } from "./Alert";
import { Confirm } from "./Confirm";
import avatar from '../../images/VitaminMeo.jpg'


import { useEffect, useState } from "react";

export const BuyPage = () => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [isSearched, setIsSearch] = useState(false);

    const [numA4page, setNumA4page] = useState(0);
    const [numA3page, setNumA3page] = useState(0);

    const [numA4buy, setNumA4buy] = useState(0);
    const [numA3buy, setNumA3buy] = useState(0);
    const [total, setTotal] = useState(0);

    const [confirmPopup, setConfirmPopup] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [alertPopup, setAlertPopup] = useState(false);


    const [buyHistory, setBuyHistory] = useState([
        { numA3buy: 1, numA4buy: 2, total: 1000, buyTime: new Date("2024-11-24T09:30") },
        { numA3buy: 1, numA4buy: 2, total: 1000, buyTime: new Date("2024-11-23T09:30") },
        { numA3buy: 1, numA4buy: 2, total: 1000, buyTime: new Date("2024-11-22T09:30") },
        { numA3buy: 1, numA4buy: 2, total: 1000, buyTime: new Date("2024-11-21T09:30") },
        { numA3buy: 1, numA4buy: 2, total: 1000, buyTime: new Date("2024-11-20T09:30") },
    ]);

    const [filteredDate, setFilteredDate] = useState(buyHistory);

    const handleSubmit = (event) => {
        event.preventDefault();
        setTotal(numA4buy * 500 + numA3buy * 1000);
        if (!numA3buy && !numA4buy) {
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

    const turnOffAlertAddFile = () => {
        setAlertPopup(false);
    }

    const sendForm = () => {
        setConfirmPopup(false);
        setSuccessPopup(true);
        setNumA3page(numA3page + numA3buy);
        setNumA4page(numA4page + numA4buy);
        setNumA3buy(0);
        setNumA4buy(0);
        const newBuy = {
            numA4buy,
            numA3buy,
            total,
            buyTime: new Date()
            //     .toLocaleString('vi-VN', {
            //         year: 'numeric',
            //         month: '2-digit',
            //         day: '2-digit',
            //         hour: '2-digit',
            //         minute: '2-digit',
            //     }
            // ),
        };
        setBuyHistory([newBuy, ...buyHistory]);
        setFilteredDate(buyHistory);

    }

    const searchDate = () => {
        if (startDate && endDate) {

            const start = new Date(startDate).setHours(0, 0, 0, 0);
            const end = new Date(endDate).setHours(0, 0, 0, 0);

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


    return (
        <div className="flex flex-col min-h-screen">
            <StudentHeader />
            <div className="flex flex-col flex-grow items-center w-full ">
                {/* Form mua trang in + Bảng số trang hiện có */}

                <form onSubmit={handleSubmit}
                    className="flex flex-col w-[40%]  bg-blue-2 rounded-md m-5  text-white text-xl font-normal "

                >
                    <p className="m-5">Số trang A3 hiện có: {numA3page}</p>
                    <div className="flex flex-row m-5">
                        <label className="text-white mr-6">Số trang A3 mua thêm</label>
                        <input type="number"
                            value={numA3buy}
                            onChange={(event) => setNumA3buy(parseInt(event.target.value))}
                            min="0"
                            className="border-2 border-blue-4 rounded-lg h-9 w-16 bg-blue-2 text-center text-lg text-white -translate-y-1"
                        />
                    </div>

                    <p className="m-5">Số trang A4 hiện có: {numA4page}</p>
                    <div className="flex flex-row m-5">
                        <label className="text-white mr-6">Số trang A4 mua thêm</label>
                        <input type="number"
                            value={numA4buy}
                            onChange={(event) => setNumA4buy(parseInt(event.target.value))}
                            min="0"
                            className="border-2 border-blue-4 rounded-lg h-9 w-16 bg-blue-2 text-center text-lg text-white -translate-y-1"
                        />
                    </div>


                    <button type="submit"
                        className=" w-[150px] self-center bg-blue-4 text-white text-2xl p-3 m-4 rounded-full hover:bg-blue-5 duration-200"
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
                    <img src={avatar}
                        alt="Không có gì hết á=))"
                        className="w-12 aspect-square mx-6 border-2 border-black rounded-full hover:cursor-pointer "
                        onClick={searchDate}
                    />

                </div>

                {/* Hiển thị lịch sử mua */}
                <div className="w-[70%] my-8 flex flex-col ">
                    <table className="w-full bg-blue-2 border-2 border-blue-4 rounded-none">
                        <thead>
                            <tr className="text-black text-xl">
                                <th className="border-2 border-blue-4 p-4 w-[20%] ">Số trang A3 đã mua</th>
                                <th className="border-2 border-blue-4 p-4 ">Số trang A4 đã mua</th>
                                <th className="border-2 border-blue-4 p-4 ">Giá tiền (VNĐ)</th>
                                <th className="border-2 border-blue-4 p-4 ">Thời gian thanh toán</th>

                            </tr>
                        </thead>
                        <tbody>
                            {!isSearched &&
                                (buyHistory.map((hist, index) => (
                                    <tr key={index}
                                        className="border border-blue-4 text-white font-light text-center text-lg">
                                        {/* <td className="p-6 border-2 border-blue-4 max-w-[96px] overflow-hidden whitespace-nowrap text-ellipsis">{hist.fileName}</td> */}
                                        <td className="p-6 border-2 border-blue-4">{hist.numA3buy}</td>
                                        <td className="p-6 border-2 border-blue-4">{hist.numA4buy}</td>
                                        <td className="p-6 border-2 border-blue-4">{hist.total}</td>
                                        <td className="p-6 border-2 border-blue-4">{formatDateTime(hist.buyTime)}</td>

                                    </tr>
                                )))
                            }
                            {isSearched &&
                                (filteredDate.map((hist, index) => (
                                    <tr key={index}
                                        className="border border-blue-4 text-white font-light text-center text-lg">
                                        {/* <td className="p-6 border-2 border-blue-4 max-w-[96px] overflow-hidden whitespace-nowrap text-ellipsis">{hist.fileName}</td> */}
                                        <td className="p-6 border-2 border-blue-4">{hist.numA3buy}</td>
                                        <td className="p-6 border-2 border-blue-4">{hist.numA4buy}</td>
                                        <td className="p-6 border-2 border-blue-4">{hist.total}</td>
                                        <td className="p-6 border-2 border-blue-4">{formatDateTime(hist.buyTime)}</td>

                                    </tr>
                                )))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {confirmPopup && (
                <Confirm onClose={turnOffConfirm}
                    onConfirm={sendForm}
                    message={
                        <>
                            {numA3buy > 0 && numA4buy > 0 && (<p>Bạn có đồng ý mua {numA3buy} trang A3 và {numA4buy} trang A4 với giá {total} VNĐ không ? </p>)}
                            {numA3buy > 0 && numA4buy == 0 && (<p>Bạn có đồng ý mua {numA3buy} trang A3 với giá {total} VNĐ không ? </p>)}
                            {numA4buy > 0 && numA3buy == 0 && (<p>Bạn có đồng ý mua {numA4buy} trang A4 với giá {total} VNĐ không ? </p>)}
                        </>
                    }
                />
            )}

            {successPopup && (
                <AddSuccess onClose={turnOffAddSuccess} message={"Thanh toán thành công!"} />
            )}

            {alertPopup && (
                <AlertAddFile onClose={turnOffAlertAddFile} message={"Bạn hãy chọn số trang cần mua!"} />
            )}
            <Footer />
        </div>
    );
}