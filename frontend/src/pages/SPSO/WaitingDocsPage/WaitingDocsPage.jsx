import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { useState } from "react"
import Select from "react-select"
import { FaSearch } from "react-icons/fa"
import { WaitingDocsTable } from "./WaitingDocsTable";
import { selectStudentStyles } from "../../../utils/selectStudentStyles";
import students from "../../../utils/students.json";
import printers from "../../../utils/printers.json";
import waitingDocs from "../../../utils/waitingDocs.json";


export const WaitingDocsPage = () => {
    const [selectedPrinters, setSelectedPrinters] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const handleChangePrinter = (selectedPrinters) => {
        setSelectedPrinters(selectedPrinters);
    }
    const handleChangeStudent = (selectedStudents) => {
        setSelectedStudents(selectedStudents);
    }
    const handleSearch = () => {
        console.log(selectedPrinters)
        console.log(selectedStudents)
    }
    return <>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            {/* Màn hình lớn */}
            <div className="hidden md:flex flex-col flex-grow items-center justify-center w-full my-5 gap-y-10">
                <div className="flex flex-row items-center gap-x-10 text-xl">
                    <div className="flex flex-row items-center">
                        <p>Mã số sinh viên:</p>
                        <Select 
                        options={students}
                        value={selectedStudents}
                        onChange={handleChangeStudent}
                        isMulti
                        placeholder="Tất cả"
                        styles={selectStudentStyles}
                        className="pl-1"
                        noOptionsMessage={() => {return "Không tìm thấy"}}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <p>Máy in:</p>
                        <Select 
                        options={printers}
                        value={selectedPrinters}
                        onChange={handleChangePrinter}
                        isMulti
                        placeholder="Tất cả"
                        styles={selectStudentStyles}
                        className="pl-1"
                        noOptionsMessage={() => {return "Không tìm thấy"}}
                        />
                    </div>
                    <button className="aspect-square rounded-full bg-blue-4 w-8  justify-items-center hover:scale-110 duration-200">
                        <FaSearch id="search-icon" className="text-white"/>
                    </button>
                </div>
                <WaitingDocsTable waitingDocs={waitingDocs}/>
            </div>
            {/* Màn hình nhỏ */}
            <div className="md:hidden flex flex-col flex-grow w-full my-5 gap-y-10">
                <div className="flex flex-col items-start text-xl gap-y-5 px-10">
                    <div className="flex flex-col">
                        <p>Mã số sinh viên:</p>
                        <Select 
                        options={students}
                        value={selectedStudents}
                        onChange={handleChangeStudent}
                        isMulti
                        placeholder="Tất cả"
                        styles={selectStudentStyles}
                        className=""
                        noOptionsMessage={() => {return "Không tìm thấy"}}
                        />
                    </div>
                    <div className="flex flex-col">
                        <p>Máy in:</p>
                        <Select 
                        options={printers}
                        value={selectedPrinters}
                        onChange={handleChangePrinter}
                        isMulti
                        placeholder="Tất cả"
                        styles={selectStudentStyles}
                        className=""
                        noOptionsMessage={() => {return "Không tìm thấy"}}
                        />
                    </div>
                    <button className="aspect-square rounded-full bg-blue-4 w-8 items-center justify-items-center hover:scale-110 duration-200"
                        onClick={handleSearch}>
                        <FaSearch id="search-icon" className="text-white"/>
                    </button>
                </div>
                <WaitingDocsTable waitingDocs={waitingDocs}/>
            </div>
            <Footer />
        </div>
    </>
}