import { NavLink, useParams } from "react-router-dom"
import { SPSOHeader } from "../../../components/SPSOHeader";
import { Footer } from "../../../components/footer";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import { UpdatePrinterStatus } from "./UpdatePrinterStatus";
import { Notification } from "../Notification";
import { useState } from "react";
import { UpdatePrinterDescription } from "./UpdatePrinterDescription";
import { PrinterHistoryTable } from "./PrinterHistoryTable";
import printerHistory from "../../../utils/printerHistory.json";
export const PrinterInfoPage = () => {
    const {id} = useParams();
    const [updateStatusOpen, setUpdateStatusOpen] = useState(false);
    const [updateDescriptionOpen, setUpdateDescriptionOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [noti, setNoti] = useState(""); 
    
    return <div>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            <NavLink to="/spso/printers" className="bg-blue-5 text-white p-4 absolute rounded-full left-3 top-20 hover:scale-110 duration-200">
                <FaArrowLeft className="w-full"/>
            </NavLink>
            {/* Màn hình lớn */}
            <div className="hidden md:flex flex-col flex-grow items-center justify-center w-full my-5">
                <div className="bg-blue-2 text-white flex flex-col p-5 rounded-xl gap-y-2">
                    <p className="text-center font-bold text-xl">Máy in {id}</p>
                    <p>Vị trí: H1-101</p>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Trạng thái: Đang hoạt động</p>
                        <div className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                            onClick={() => setUpdateStatusOpen(true)}>
                            <FaPen/>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Mô tả: Canon LB0394</p>
                        <div className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                            onClick={() => setUpdateDescriptionOpen(true)}>
                            <FaPen/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Màn hình nhỏ */}
            <div className="flex md:hidden flex-grow justify-center my-5 w-full">
                <div className="bg-blue-2 text-white flex flex-col p-5 rounded-xl gap-y-2">
                    <p className="text-center font-bold text-xl">Máy in {id}</p>
                    <p>Vị trí: H1-101</p>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Trạng thái: Đang hoạt động</p>
                        <div className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                            onClick={() => setUpdateStatusOpen(true)}>
                            <FaPen/>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Mô tả: Canon LB0394</p>
                        <div className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                            onClick={() => setUpdateDescriptionOpen(true)}>
                            <FaPen/>
                        </div>
                    </div>
                </div>
            </div>
            <PrinterHistoryTable rows={printerHistory}/>
            {updateDescriptionOpen && <UpdatePrinterDescription 
                closeUpdate = {() => {setUpdateDescriptionOpen(false)}} 
                openNoti={() => { setNoti("Đã xác nhận cập nhật mô tả thành công!"); setNotiOpen(true);}}/>}
            {updateStatusOpen && <UpdatePrinterStatus turnOn={false} 
                closeUpdate = {() => {setUpdateStatusOpen(false)}} 
                openNoti={() => { setNoti("Đã xác nhận tát máy thành công!"); setNotiOpen(true);}}/>}
            {notiOpen && <Notification noti={noti} closeNoti={()=>setNotiOpen(false)}/>}
            <Footer />
        </div>
    </div>
}