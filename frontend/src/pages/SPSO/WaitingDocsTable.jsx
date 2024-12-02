import { FaPen } from "react-icons/fa"
import { UpdateWaitingDoc } from "./UpdateWaitingDoc"
import { useState } from "react"
import { ConfirmUpdate } from "./CofirmUpdate";
export const WaitingDocsTable = ({waitingDocs}) => {
    const [updateOpen, setUpdateOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    return <div>
        <table className="bg-blue-2">
            <thead className="bg-blue-3">
                <tr>
                    <th className="min-w-[100px] py-4">MSSV</th>
                    <th className="min-w-[80px]">Máy in</th>
                    <th className="min-w-[100px]">Cỡ</th>
                    <th className="min-w-[100px]">Số bản</th>
                    <th className="min-w-[100px]">File</th>
                    <th className="min-w-[180px]">Thời gian bắt đầu</th>
                    <th className="min-w-[160px]">Trạng thái</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {waitingDocs.map((waitingDoc, docKey) => {
                    return <tr key={docKey}>
                        <td className="text-center">{waitingDoc.id}</td>
                        <td className="text-center">{waitingDoc.printer}</td>
                        <td className="text-center">{waitingDoc.size}</td>
                        <td className="text-center">{waitingDoc.copy}</td>
                        <td className="text-center">{waitingDoc.file}</td>
                        <td className="text-center">{waitingDoc.start}</td>
                        <td>
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
        {updateOpen && <UpdateWaitingDoc closeUpdate = {() => {setUpdateOpen(false)}} openConfirm={() => setConfirmOpen(true)}/>}
        {confirmOpen && <ConfirmUpdate noti="Đã xác nhận in tài liệu xong thành công!" closeConfirm={()=>setConfirmOpen(false)}/>}
    </div>
}