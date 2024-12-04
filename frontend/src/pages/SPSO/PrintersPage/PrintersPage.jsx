import { useEffect, useState } from "react";
import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { NewPrinterForm } from "./NewPrinterForm";
import { PrintersTable } from "./PrintersTable";
import { Notification } from "../Notification";
export const PrintersPage = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [printers, setPrinters] = useState([]);
    const handleNewPrinter = () => {
        setFormOpen(true);
    }
    useEffect(() => {
        const fetchPrinterData = async () => {
            const response = await fetch("/api/printers");
            const data = await response.json();
            setPrinters(data);
        }
        fetchPrinterData();
    }, [])
    const handleSubmit = async (room, description) => {
        try {
            const response = await fetch("/api/printers",{method:"POST", body:JSON.stringify({room,description})})
            setNotiOpen(true)
        } catch (err) {
            console.log(err)
        }
    }
    return <>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            <button className="bg-blue-5 text-white p-2 absolute rounded-xl right-3 top-20 hover:scale-110 duration-200"
                onClick={handleNewPrinter}>
                Thêm mới
            </button>
            {formOpen && <NewPrinterForm closeForm={() => setFormOpen(false)} submitForm={(room, description) => {handleSubmit(room, description)}}/>}
            {notiOpen && <Notification noti="Đã thêm máy in mới thành công!" closeNoti={() => {setNotiOpen(false)}}/>}
            {/* Màn hình lớn */}
            <div className="hidden md:flex flex-col flex-grow items-center justify-center w-full my-5">
                <PrintersTable printers={printers}/>
            </div>
            {/* Màn hình nhỏ */}
            <div className="flex md:hidden flex-grow w-full">
                <PrintersTable printers={printers}/>
            </div>
            <Footer />
        </div>
    </>
}