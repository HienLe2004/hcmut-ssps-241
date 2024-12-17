import { FaPen } from "react-icons/fa"
import { UpdateWaitingDoc } from "./UpdateWaitingDoc"
import { useEffect, useState } from "react"
import { Notification } from "../Notification";
import { updatePrintLogByID } from "../../../api/printLogs";
export const WaitingDocsTable = ({waitingDocs, filteredWaitingDocs}) => {
    const [updateOpen, setUpdateOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [currentWaitingDoc, setCurrentWaitingDoc] = useState();
    const [docs,setDocs] = useState(waitingDocs);
    const [filteredDocs, setFilteredDocs] = useState(filteredWaitingDocs);
    const formatDateTime = (date) => {
        if (!date) return "null";
        return date.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    const doneWaitingDoc = async () => {
        setDocs(docs.filter((doc) => doc.id != currentWaitingDoc.id))
        setFilteredDocs(filteredDocs.filter((doc) => doc.id != currentWaitingDoc.id))
        const response = await updatePrintLogByID(currentWaitingDoc.id, {status: "Đã in xong", finishedTime: formatDateTime(new Date)})
        console.log(response)
    }
    const processFilePath = (filePath) => {
        // Tìm vị trí đầu tiên của "uploads" trong chuỗi
        const uploadsIndex = filePath.indexOf('uploads');
      
        // Nếu tìm thấy "uploads", cắt chuỗi từ vị trí đó trở đi
        if (uploadsIndex !== -1) {
          return filePath.slice(uploadsIndex);
        } else {
          // Xử lý trường hợp không tìm thấy "uploads" (có thể báo lỗi hoặc trả về giá trị mặc định)
          console.error('Không tìm thấy "uploads" trong đường dẫn');
          return '';
        }
    }
    return <div className="w-full text-xl">
        {/* Màn hình lớn */}
        <div className="hidden md:flex justify-center">
        <table className="overflow-x-scroll max-w-full min-w-[800px]">
            <thead className="bg-blue-3 text-blue-0">
                <tr>
                    <th className="min-w-[100px] py-4 border-2 border-blue-4">MSSV</th>
                    <th className="min-w-[80px] border-2 border-blue-4">Máy in</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Cỡ</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Số bản</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Số trang</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Số mặt</th>
                    <th className="min-w-[100px] border-2 border-blue-4">File</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Thời gian bắt đầu</th>
                    <th className="min-w-[160px] border-2 border-blue-4">Trạng thái</th>
                </tr>
            </thead>
            <tbody className="bg-blue-0 text-blue-5">
                {filteredDocs.map((waitingDoc, docKey) => {
                    return <tr key={docKey}>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.student.id}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.printer.name}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.printModification.paperSize}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.printModification.copies}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.document.numPages}</td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.printModification.doubleSided?"2":"1"}</td>
                        <td className="text-center border-2 border-blue-4">
                            <a href={"../"+processFilePath(waitingDoc.document.filePath)} target="_blank" 
                                download={waitingDoc.document.fileName}
                                rel="noopener noreferrer">
                                    {waitingDoc.document.fileName}
                            </a>
                        </td>
                        <td className="text-center border-2 border-blue-4">{waitingDoc.startTime}</td>
                        <td className="text-center border-2 border-blue-4">
                            <span className="flex items-center flex-row-reverse my-1 mx-1 gap-x-3">
                                <button className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                                    onClick={() => {setCurrentWaitingDoc(waitingDoc);setUpdateOpen(true)}}>
                                    <FaPen className="aspect-square text-white w-6"/>
                                </button>
                                <p>Đang xử lí</p>
                                {/* <p>{waitingDoc.status}</p> */}
                            </span>
                        </td>
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {/* Màn hình nhỏ */}
        <div className="flex md:hidden px-10">
        <table className="bg-blue-3 overflow-x-scroll w-full">
            <tbody className="text-white">
                {filteredDocs.map((waitingDoc, docKey) => {
                    return <tr key={docKey} className={docKey%2?"bg-blue-3":"bg-blue-4"}>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="MSSV">{waitingDoc.student.id}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Máy in">{waitingDoc.printer.name}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Cỡ">{waitingDoc.printModification.paperSize}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số bản">{waitingDoc.printModification.copies}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số trang">{waitingDoc.document.numPages}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số mặt">{waitingDoc.printModification.doubleSided?"2":"1"}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="File">
                            <a href={"../"+processFilePath(waitingDoc.document.filePath)} target="_blank" 
                                download={waitingDoc.document.fileName}
                                rel="noopener noreferrer">
                                    {waitingDoc.document.fileName}
                            </a>
                        </td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian bắt đầu">{waitingDoc.startTime}</td>
                        <td className="text-left flex items-center before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Trạng thái">
                            <span className="flex items-center  my-1 mx-1 gap-x-3">
                                <p>Đang xử lí</p>
                                {/* <p>{waitingDoc.status}</p> */}
                                <button className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
                                    onClick={() => {setCurrentWaitingDoc(waitingDoc);setUpdateOpen(true)}}>
                                    <FaPen className="aspect-square text-white w-6"/>
                                </button>
                            </span>
                        </td>
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {updateOpen && <UpdateWaitingDoc closeUpdate = {() => {setUpdateOpen(false)}} openNoti={() => {doneWaitingDoc();setNotiOpen(true)}}/>}
        {notiOpen && <Notification noti="Đã xác nhận in tài liệu xong thành công!" closeNoti={()=>setNotiOpen(false)}/>}
    </div>
}