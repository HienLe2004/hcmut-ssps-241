import { FaPen } from "react-icons/fa"
import { UpdateWaitingDoc } from "./UpdateWaitingDoc"
import { useState } from "react"
import { Notification } from "../Notification";
export const WaitingDocsTable = ({waitingDocs}) => {
    const [updateOpen, setUpdateOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    return <div className="w-full">
        {/* Màn hình lớn */}
        <div className="hidden md:flex justify-center">
        <table className="bg-blue-2 overflow-x-scroll max-w-full min-w-[800px]">
            <thead className="bg-blue-3">
                <tr>
                    <th className="min-w-[100px] py-4 border-2 border-blue-4">MSSV</th>
                    <th className="min-w-[80px] border-2 border-blue-4">Máy in</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Cỡ</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Số bản</th>
                    <th className="min-w-[100px] border-2 border-blue-4">File</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Thời gian bắt đầu</th>
                    <th className="min-w-[160px] border-2 border-blue-4">Trạng thái</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {waitingDocs.map((waitingDoc, docKey) => {
                    return <tr key={docKey}>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.id}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.printer}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.size}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.copy}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.file}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.start}</td>
                        <td className="text-center border-2 border-blue-4">
                            <span className="flex items-center flex-row-reverse my-1 mx-1 gap-x-3">
                                <button className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                                    onClick={() => {setUpdateOpen(true)}}>
                                    <FaPen className="aspect-square text-white w-6"/>
                                </button>
                                <p>{waitingDoc.status}</p>
                            </span>
                        </td>
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {/* Màn hình nhỏ */}
        <div className="flex md:hidden px-10">
        <table className="bg-blue-2 overflow-x-scroll w-full">
            {/* <thead className="bg-blue-3">
                <tr>
                    <th className="min-w-[100px] py-4">MSSV</th>
                    <th className="min-w-[80px]">Máy in</th>
                    <th className="min-w-[100px]">Cỡ</th>
                    <th className="min-w-[100px]">Số bản</th>
                    <th className="min-w-[100px]">File</th>
                    <th className="min-w-[180px]">Thời gian bắt đầu</th>
                    <th className="min-w-[160px]">Trạng thái</th>
                </tr>
            </thead> */}
            <tbody className="text-white">
                {waitingDocs.map((waitingDoc, docKey) => {
                    return <tr key={docKey} className={docKey%2?"bg-blue-3":"bg-blue-2"}>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="MSSV">{waitingDoc.id}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Máy in">{waitingDoc.printer}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Cỡ">{waitingDoc.size}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số bản">{waitingDoc.cop}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="File">{waitingDoc.file}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian bắt đầu">{waitingDoc.start}</td>
                        <td className="text-left flex items-center before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Trạng thái">
                            <span className="flex items-center  my-1 mx-1 gap-x-3">
                                <p>{waitingDoc.status}</p>
                                <button className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                                    onClick={() => {setUpdateOpen(true)}}>
                                    <FaPen className="aspect-square text-white w-6"/>
                                </button>
                            </span>
                        </td>
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {updateOpen && <UpdateWaitingDoc closeUpdate = {() => {setUpdateOpen(false)}} openNoti={() => setNotiOpen(true)}/>}
        {notiOpen && <Notification noti="Đã xác nhận in tài liệu xong thành công!" closeNoti={()=>setNotiOpen(false)}/>}
    </div>
}