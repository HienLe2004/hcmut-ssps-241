import { SPSOHeader } from "../../components/SPSOHeader"
import { Footer } from "../../components/footer";
import { useState } from "react"
import Select from "react-select"
import { FaSearch } from "react-icons/fa"

const students = [
    {value:2211012 , label:2211012},
    {value:2213014 , label:2213014},
    {value:2120214 , label:2120214},
    {value:2301257 , label:2301257},
    {value:2415826 , label:2415826},
]
const printers = [
    {value:"all", label:"Tất cả"},
    {value:"H1-101-1.1", label:"H1-101-1.1"},
    {value:"H1-102-1.1", label:"H1-102-1.1"},
    {value:"H2-101-1.1", label:"H2-101-1.1"},
    {value:"H2-101-1.2", label:"H2-101-1.2"},
    {value:"H3-301-1.1", label:"H3-301-1.1"},
    {value:"H3-401-1.1", label:"H3-401-1.1"},
];

export const WaitingDocsPage = () => {
    const [selectedPrinters, setSelectedPrinters] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const handleChangePrinter = (selectedPrinters) => {
        setSelectedPrinters(selectedPrinters);
    }
    const handleChangeStudent = (selectedStudents) => {
        setSelectedStudents(selectedStudents);
    }
    return <>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            <div className="flex flex-col flex-grow items-center justify-center w-full my-5">
                <div className="flex flex-row items-center gap-x-10 text-xl">
                    <div className="flex flow-row items-center">
                        <p>Mã số sinh viên:</p>
                        <Select 
                        options={students}
                        value={selectedStudents}
                        onChange={handleChangeStudent}
                        isMulti
                        placeholder="Tất cả"
                        className="pl-1"
                        />
                    </div>
                    <div className="flex flow-row items-center">
                        <p>Máy in:</p>
                        <Select 
                        options={printers}
                        value={selectedPrinters}
                        onChange={handleChangePrinter}
                        isMulti
                        placeholder="Tất cả"
                        className="pl-1"
                        />
                    </div>
                    <button className="aspect-square rounded-full bg-blue-4 w-8 items-center justify-items-center">
                        <FaSearch id="search-icon" className="text-white"/>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    </>
}