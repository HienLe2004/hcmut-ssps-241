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
                        styles={selectStyles}
                        className="pl-1"
                        noOptionsMessage={() => {return "Không tìm thấy"}}
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
                        styles={selectStyles}
                        className="pl-1"
                        noOptionsMessage={() => {return "Không tìm thấy"}}
                        />
                    </div>
                    <button className="aspect-square rounded-full bg-blue-4 w-8 items-center justify-items-center hover:scale-110 duration-200">
                        <FaSearch id="search-icon" className="text-white"/>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    </>
}