import { useEffect, useState } from "react";
import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { NewPrinterForm } from "./NewPrinterForm";
import { PrintersTable } from "./PrintersTable";
import { Notification } from "../Notification";
import { createPrinter, getAllPrinters } from "../../../api/printers";
export const PrintersPage = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    const [noti, setNoti] = useState(null);
    const [printers, setPrinters] = useState([]);
    const handleNewPrinter = () => {
        setFormOpen(true);
    }
    useEffect(() => {
        const fetchPrintersData = async () => {
            try{
                const {data} = await getAllPrinters();
                setPrinters(data);
            }catch(err){
                console.log(err)
            }
        }
        fetchPrintersData()
    }, [])
    const handleSubmit = async (location, description) => {
        try {
            if (location == null) {
                setNoti("Hãy điền vị trí máy in!")
                setNotiOpen(true)
                return;
            }
            const response = await createPrinter({location: location, description: description})
            setPrinters([...printers, response.data])
            setNoti("Đã thêm máy in mới thành công!")
            setNotiOpen(true)
        } catch (err) {
            console.log(err)
        }
    }
    return <>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            <button className="bg-blue-5 text-white font-bold p-2 absolute rounded-xl right-3 top-20 hover:scale-110 duration-200"
                onClick={handleNewPrinter}>
                Thêm mới
            </button>
            {formOpen && <NewPrinterForm closeForm={() => setFormOpen(false)} submitForm={(room, description) => {handleSubmit(room, description)}}/>}
            {notiOpen && <Notification noti={noti} closeNoti={() => {setNotiOpen(false)}}/>}
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