import { useState } from "react"
import { FaPen } from "react-icons/fa";
import { UpdatePrinterStatus } from "./UpdatePrinterStatus";
import { Notification } from "../Notification";
import { NavLink } from "react-router-dom";
import { updatePrinterByID } from "../../../api/printers";

export const PrintersTable = ({printers}) => {
    const [updateOpen, setUpdateOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [currentPrinter, setCurrentPrinter] = useState();
    const updateStatus = async () => {
        try{
            const newProps = {state: currentPrinter.state=="on"?"off":"on"}
            await updatePrinterByID(currentPrinter.name, newProps)
        }catch(err){
            console.log(err)
        }
        printers.forEach(printer => {if (printer.name == currentPrinter.name) printer.state = printer.state=="on"?"off":"on"})
    }
    return <div className="w-full text-xl">
        {/* Big */}
        <div className="hidden md:flex justify-center">
        <table className="bg-blue-2 overflow-x-scroll max-w-full min-w-[600px]">
            <thead className="bg-blue-3 text-blue-0">
                <tr>
                    <th className="min-w-[100px] py-4 border-2 border-blue-4">Tên</th>
                    <th className="min-w-[80px] border-2 border-blue-4">Mô tả</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Bắt đầu sử dụng</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Trạng thái</th>
                </tr>
            </thead>
            <tbody className="bg-blue-0 text-blue-5">
                {printers.map((printer, printerKey) => {
                    return <tr key={printerKey}>
                        <td className="text-center border-2 border-blue-4 px-2 font-medium"><NavLink to={`/spso/printers/${printer.name}`}>{printer.name}</NavLink></td>
                        <td className="text-center border-2 border-blue-4 px-2">{printer.description}</td>
                        <td className="text-center border-2 border-blue-4">{printer.startTime}</td>
                        <td className="text-center border-2 border-blue-4">
                            <span className="flex items-center flex-row-reverse my-1 mx-1 gap-x-3">
                                <button className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                                    onClick={() => {setCurrentPrinter(printer);setUpdateOpen(true)}}>
                                    <FaPen className="aspect-square text-white w-6"/>
                                </button>
                                <p>{printer.state == "on" ? "Đang hoạt động" : "Tạm dừng"}</p>
                            </span>
                        </td>
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {/* Small */}
        <div className="flex md:hidden px-10 mt-10">
        <table className="bg-blue-2 overflow-x-scroll w-full">
            <tbody className="text-white">
                {printers.map((printer, printerKey) => {
                    return <tr key={printerKey} className={printerKey%2?"bg-blue-3":"bg-blue-4"}>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Tên">
                            <NavLink to={`/spso/printers/${printer.name}`} className="italic font-medium">{printer.name}</NavLink>
                        </td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Mô tả">{printer.description}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Bắt đầu sử dụng">{printer.startTime}</td>
                        <td className="text-left flex items-center before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Trạng thái">
                            <span className="flex items-center flex-row-reverse my-1 mx-1 gap-x-3">
                                <button className={`${(printerKey%2?"bg-blue-4":"bg-blue-3")} aspect-square rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200`}
                                    onClick={() => {setCurrentPrinter(printer);setUpdateOpen(true)}}>
                                    <FaPen className="aspect-square text-white w-6"/>
                                </button>
                                <p>{printer.state == "on" ? "Đang hoạt động" : "Tạm dừng"}</p>
                            </span>
                        </td>
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {updateOpen && <UpdatePrinterStatus turnOn={currentPrinter.state=="off"} closeUpdate = {() => {setUpdateOpen(false)}} openNoti={() => {updateStatus() ;setNotiOpen(true)}}/>}
        {notiOpen && <Notification noti={"Đã xác nhận "+ (currentPrinter.state == "on" ? "tắt":"bật") +" máy thành công!"} closeNoti={()=>setNotiOpen(false)}/>}
    </div>
}