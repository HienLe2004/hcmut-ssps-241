import { SPSOHeader } from "../../components/SPSOHeader"
import { Footer } from "../../components/footer";
import { useState } from "react"
import Select from "react-select"
import { FaSearch } from "react-icons/fa"
import { WaitingDocsTable } from "./WaitingDocsTable";
import { UpdateWaitingDoc } from "./UpdateWaitingDoc";

const students = [
    {value:2211012 , label:2211012},
    {value:2213014 , label:2213014},
    {value:2120214 , label:2120214},
    {value:2301257 , label:2301257},
    {value:2415826 , label:2415826},
]
const printers = [
    {value:"H1-101-1.1", label:"H1-101-1.1"},
    {value:"H1-102-1.1", label:"H1-102-1.1"},
    {value:"H2-101-1.1", label:"H2-101-1.1"},
    {value:"H2-101-1.2", label:"H2-101-1.2"},
    {value:"H3-301-1.1", label:"H3-301-1.1"},
    {value:"H3-401-1.1", label:"H3-401-1.1"},
];
const waitingDocs = [
    {
        id: 2211024,
        printer: "H1-101-1",
        size: "A5",
        copy: 10,
        file: "oiwer.docx",
        start: "10:10 10/20/20",
        status: "Dang xu ly"
    }
]
export const WaitingDocsPage = () => {
    const [selectedPrinters, setSelectedPrinters] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const handleChangePrinter = (selectedPrinters) => {
        setSelectedPrinters(selectedPrinters);
    }
    const handleChangeStudent = (selectedStudents) => {
        setSelectedStudents(selectedStudents);
    }
    const selectStyles = {
        dropdownIndicator: (styles) => ({
            ...styles,
            color:`var(--blue-2)`
        }),
        clearIndicator: (styles) => ({
            ...styles,
            color: `var(--blue-2)`
        }),
        indicatorSeparator: (styles) => ({
            ...styles,
            backgroundColor: `var(--blue-2)`
        }),
        menuList: (styles) => ({
            ...styles,
            backgroundColor: `var(--blue-1)`
        }),
        multiValue: (styles) => ({
            ...styles,
            backgroundColor: `var(--blue-2)`,
            borderRadius:"10px",
            color:'black'
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color:'black'
        }),
        placeholder: (styles) => ({
            ...styles, 
            color:"black"
        }),
        control: (styles) => ({
            ...styles, 
            backgroundColor: `var(--blue-1)`, 
            borderRadius:"10px", 
            border:"1px solid var(--blue-5)",
            minWidth:"100px",
            maxWidth:"500px"
        }),
        option: (styles) => ({
            ...styles, 
            backgroundColor: `var(--blue-1)`,
            color: `black`,
            "&:hover": {
                backgroundColor: `var(--blue-2)`
            }
        }),
        input: (styles) => ({
            ...styles,
            color:`black`
        })
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
                        styles={selectStyles}
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
                        styles={selectStyles}
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
            <div className="md:hidden flex flex-col flex-grow items-center justify-center w-full my-5">
                <div className="flex flex-col items-start text-xl gap-y-1 px-3">
                    <div className="flex flex-col">
                        <p>Mã số sinh viên:</p>
                        <Select 
                        options={students}
                        value={selectedStudents}
                        onChange={handleChangeStudent}
                        isMulti
                        placeholder="Tất cả"
                        styles={selectStyles}
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
                        styles={selectStyles}
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