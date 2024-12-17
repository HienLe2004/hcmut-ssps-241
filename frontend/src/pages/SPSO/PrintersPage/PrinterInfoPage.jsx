import { NavLink, useParams } from "react-router-dom"
import { SPSOHeader } from "../../../components/SPSOHeader";
import { Footer } from "../../../components/footer";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import { UpdatePrinterStatus } from "./UpdatePrinterStatus";
import { Notification } from "../Notification";
import { useEffect, useState } from "react";
import { UpdatePrinterDescription } from "./UpdatePrinterDescription";
import { PrinterHistoryTable } from "./PrinterHistoryTable";
import { getPrinterByID, updatePrinterByID } from "../../../api/printers";
export const PrinterInfoPage = () => {
    const {id} = useParams();
    const [updateStatusOpen, setUpdateStatusOpen] = useState(false);
    const [updateDescriptionOpen, setUpdateDescriptionOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [noti, setNoti] = useState(""); 
    const [printer, setPrinter] = useState();
    useEffect(() => {
        const fetchPrinterData = async () => {
            try{
                const {data} = await getPrinterByID(id);
                setPrinter(data);
            }catch(err){
                console.log(err)
            }
        }
        fetchPrinterData()
    },[])
    const updateStatus = async () => {
        try{
            const newProps = {state: printer.state=="on"?"off":"on"}
            await updatePrinterByID(id, newProps)
        }catch(err){
            console.log(err)
        }
        printer.state = printer.state=="on"?"off":"on"
    }
    const updateDescription = async (newDes) => {
        try{
            const newProps = {description: newDes}
            await updatePrinterByID(id, newProps)
        }catch(err){
            console.log(err)
        }
        printer.description = newDes
    }
    return <div>
        <div className="flex flex-col min-h-screen text-xl">
            <SPSOHeader />
            <NavLink to="/spso/printers" className="bg-blue-5 text-white p-4 absolute rounded-full left-3 top-20 hover:scale-110 duration-200">
                <FaArrowLeft className="w-full"/>
            </NavLink>
            {/* Màn hình lớn */}
            <div className="hidden md:flex flex-col flex-grow items-center justify-center w-full my-5">
                <div className="bg-blue-2 text-white flex flex-col p-5 rounded-xl gap-y-2">
                    <p className="text-center font-bold text-2xl">Máy in {id}</p>
                    <p className="text-xl">Vị trí: {printer?.location}</p>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Trạng thái: {printer?.state == "on" ? "Đang hoạt động" : "Tạm dừng"}</p>
                        <div className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                            onClick={() => setUpdateStatusOpen(true)}>
                            <FaPen/>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Mô tả: {printer?.description}</p>
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
                    <p className="text-center font-bold text-2xl">Máy in {id}</p>
                    <p>Vị trí: {printer?.location}</p>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Trạng thái: {printer?.state == "on" ? "Đang hoạt động" : "Tạm dừng"}</p>
                        <div className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                            onClick={() => setUpdateStatusOpen(true)}>
                            <FaPen/>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Mô tả: {printer?.description}</p>
                        <div className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                            onClick={() => setUpdateDescriptionOpen(true)}>
                            <FaPen/>
                        </div>
                    </div>
                </div>
            </div>
            <PrinterHistoryTable printerID={id}/>
            {updateDescriptionOpen && <UpdatePrinterDescription 
                closeUpdate = {() => {setUpdateDescriptionOpen(false)}} 
                openNoti={() => { setNoti("Đã xác nhận cập nhật mô tả thành công!"); setNotiOpen(true);}}
                oldDescription={printer.description}
                updateDescription={(newDes) => updateDescription(newDes)}
            />}
            {updateStatusOpen && <UpdatePrinterStatus turnOn={printer.state=="off"} 
                closeUpdate = {() => {setUpdateStatusOpen(false)}} 
                openNoti={() => { updateStatus();setNoti("Đã xác nhận "+(printer.state=="on"?"tắt":"bật")+" máy thành công!"); setNotiOpen(true);}}
            />}
            {notiOpen && <Notification noti={noti} closeNoti={()=>setNotiOpen(false)}/>}
            <Footer />
        </div>
    </div>
}