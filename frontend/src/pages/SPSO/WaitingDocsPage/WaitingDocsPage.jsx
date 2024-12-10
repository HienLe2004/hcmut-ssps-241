import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { useEffect, useState } from "react"
import Select from "react-select"
import { FaSearch } from "react-icons/fa"
import { WaitingDocsTable } from "./WaitingDocsTable";
import { selectStudentStyles } from "../../../utils/selectStudentStyles";
import { getAllStudents } from "../../../api/students";
import { getAllPrinters } from "../../../api/printers";
import { getAllPrintLogs } from "../../../api/printLogs";


export const WaitingDocsPage = () => {
    const [students, setStudents] = useState([]);
    const [printers, setPrinters] = useState([]);
    const [waitingDocs, setWaitingDocs] = useState([]);
    const [selectedPrinters, setSelectedPrinters] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [filteredWaitingDocs, setFilteredWaitingDocs] = useState([]);
    const handleChangePrinter = (selectedPrinters) => {
        setSelectedPrinters(selectedPrinters);
    }
    const handleChangeStudent = (selectedStudents) => {
        setSelectedStudents(selectedStudents);
    }
    const handleSearch = () => {
        console.log(filteredWaitingDocs)
        const filterStudents = (selectedStudents.length == 0) ? students : selectedStudents
        const filterPrinters = (selectedPrinters.length == 0) ? printers : selectedPrinters
        const filterDocs = (waitingDocs, filterStudents, filterPrinters) => {
            return waitingDocs.filter(doc => {
                return filterStudents.some(student => student.value == doc.student.id) &&
                    filterPrinters.some(printer => printer.value == doc.printer.name)
            })
        }
        const filteredDocs = filterDocs(waitingDocs, filterStudents, filterPrinters);
        console.log(filteredDocs)
        setFilteredWaitingDocs(filteredDocs)
        console.log(selectedPrinters)
        console.log(selectedStudents)
    }
    useEffect(() => {
        const fetchStudentData = async () => {
            const {data} = await getAllStudents()
            const filteredData = data.filter(d => {return d.id != 0})
            const transformedData = filteredData.map(item => ({value: item.id, label: item.id}))
            setStudents(transformedData)
        }
        const fetchPrinterData = async () => {
            const {data} = await getAllPrinters()
            const transformedData = data.map(item => ({value: item.name, label: item.name}))
            setPrinters(transformedData)
        }
        const fetchWaitingDocData = async () => {
            const {data} = await getAllPrintLogs()
            const waitingData = data.filter((item) => item.status == "Đang xử lí")
            setWaitingDocs(waitingData)
            setFilteredWaitingDocs(waitingData)
        }
        fetchStudentData();
        fetchPrinterData();
        fetchWaitingDocData();
    }, [])
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
                    <button className="aspect-square rounded-full bg-blue-4 w-8  justify-items-center hover:scale-110 duration-200"
                        onClick={handleSearch}>
                        <FaSearch id="search-icon" className="text-white"/>
                    </button>
                </div>
                {filteredWaitingDocs.length !== 0 && <WaitingDocsTable waitingDocs={waitingDocs} filteredWaitingDocs={filteredWaitingDocs}/>}
                {filteredWaitingDocs.length === 0 && <p>Không tìm thấy</p>}
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
                {filteredWaitingDocs.length !== 0 && <WaitingDocsTable waitingDocs={waitingDocs} filteredWaitingDocs={filteredWaitingDocs}/>}
                {filteredWaitingDocs.length === 0 && <p className="text-center">Không tìm thấy</p>}
            </div>
            <Footer />
        </div>
    </>
}