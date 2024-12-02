import { useParams } from "react-router-dom"
import { SPSOHeader } from "../../../components/SPSOHeader";
import { Footer } from "../../../components/footer";
import { FaPen } from "react-icons/fa";

export const PrinterInfoPage = () => {
    const {id} = useParams();
    return <div>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            {/* {formOpen && <NewPrinterForm closeForm={() => setFormOpen(false)} submitForm={() => {setNotiOpen(true)}}/>}
            {notiOpen && <Notification noti="Đã thêm máy in mới thành công!" closeNoti={() => {setNotiOpen(false)}}/>} */}
            {/* Màn hình lớn */}
            <div className="hidden md:flex flex-col flex-grow items-center justify-center w-full my-5">
                {/* <PrintersTable printers={printers}/> */}
                <div className="bg-blue-2 text-white flex flex-col p-5 rounded-xl gap-y-2">
                    <p className="text-center font-bold text-xl">May in {id}</p>
                    <p>Vi tri: H1-101</p>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Trang thai: Dang hoat dong</p>
                        <div className="aspect-square w-8 rounded-full bg-blue-4 flex justify-center items-center">
                            <FaPen/>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                        <p>Mo ta: Canon LB0394</p>
                        <div className="aspect-square w-8 rounded-full bg-blue-4 flex justify-center items-center">
                            <FaPen/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Màn hình nhỏ */}
            <div className="flex md:hidden flex-grow w-full">
                {/* <PrintersTable printers={printers}/> */}
            </div>
            <Footer />
        </div>
    </div>
}