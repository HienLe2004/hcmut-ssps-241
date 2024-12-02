import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { PrintersTable } from "./PrintersTable";
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
    return <>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            {/* Màn hình lớn */}
            <div className="hidden md:flex flex-col flex-grow items-center justify-center w-full my-5">
                <PrintersTable printers={printers}/>
            </div>
            {/* Màn hình nhỏ */}
            <div className="flex md:hidden">
                <PrintersTable printers={printers}/>
            </div>
            <Footer />
        </div>
    </>
}