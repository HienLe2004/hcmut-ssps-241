import { useState } from "react";
import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { NewPrinterForm } from "./NewPrinterForm";
import { PrintersTable } from "./PrintersTable";
import { Notification } from "../Notification";
const printers = [
    {
        name: "H1-101-1",
        description: "Hp-202",
        start: "10:10 11/11/2011",
        status: "Dang hoat dong"
    },
    {
        name: "H1-101-1",
        description: "Hp-202",
        start: "10:10 11/11/2011",
        status: "Dang hoat dong"
    },
    {
        name: "H1-101-1",
        description: "Hp-202",
        start: "10:10 11/11/2011",
        status: "Dang hoat dong"
    },
    {
        name: "H1-101-1",
        description: "Hp-202",
        start: "10:10 11/11/2011",
        status: "Dang hoat dong"
    }
]
export const PrintersPage = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const handleNewPrinter = () => {
        setFormOpen(true);
    }
    return <>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            <button className="bg-blue-5 text-white p-2 absolute rounded-xl right-3 top-20"
                onClick={handleNewPrinter}>
                Thêm mới
            </button>
            {formOpen && <NewPrinterForm closeForm={() => setFormOpen(false)} submitForm={() => {setNotiOpen(true)}}/>}
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