import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import Select from "react-select"
import { selectStudentStyles } from "../../../utils/selectStudentStyles";
import { SPSOHeader } from "../../../components/SPSOHeader";
import { Footer } from "../../../components/footer";
import { parse } from "date-fns";
import { getAllStudents } from "../../../api/students";
import { getAllPrinters } from "../../../api/printers";
import { getAllPrintLogs } from "../../../api/printLogs";

export const SystemHistoryPage = () => {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedPrinters, setSelectedPrinters] = useState([]);
    const [selectedStart, setSelecetedStart] = useState(null);
    const [selectedEnd, setSelecetedEnd] = useState(null);
    const [students, setStudents] = useState([]);
    const [printers, setPrinters] = useState([]);
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [statistic, setStatistic] = useState();
    const handleChangeStudents = (selectedStudents) => {
        setSelectedStudents(selectedStudents);
    }
    const handleChangePrinters = (selectedPrinters) => {
        setSelectedPrinters(selectedPrinters);
    }
    const handleChangeStart = (start) => {
        setSelecetedStart(new Date(start.target.value));
    }
    const handleChangeEnd = (end) => {
        setSelecetedEnd(new Date(end.target.value));
    }
    const countPage = (doneData) => {
        let numA3 = 0
        let numA4 = 0
        let numA5 = 0
        doneData.forEach(data => {
            if (data.printModification.paperSize == "A3") 
                numA3 += Math.round(data.document.numPages/(data.printModification.doubleSize?2:1)) * data.printModification.copies
            if (data.printModification.paperSize == "A4") 
                numA4 += Math.round(data.document.numPages/(data.printModification.doubleSize?2:1)) * data.printModification.copies
            if (data.printModification.paperSize == "A5") 
                numA5 += Math.round(data.document.numPages/(data.printModification.doubleSize?2:1)) * data.printModification.copies
        })
        let str = (numA3 == 0) ? "" : (numA3+" A3 ")
        str += (numA4 == 0) ? "" : (numA4+" A4 ")
        str += (numA5 == 0) ? "" : (numA5+" A5 ")
        setStatistic(str)
    }
    const processFilePath = (filePath) => {
        // Tìm vị trí đầu tiên của "uploads" trong chuỗi
        const uploadsIndex = filePath.indexOf('uploads');
      
        // Nếu tìm thấy "uploads", cắt chuỗi từ vị trí đó trở đi
        if (uploadsIndex !== -1) {
          return filePath.slice(uploadsIndex);
        } else {
          // Xử lý trường hợp không tìm thấy "uploads" (có thể báo lỗi hoặc trả về giá trị mặc định)
          console.error('Không tìm thấy "uploads" trong đường dẫn');
          return '';
        }
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
        const fetchHistoryData = async () => {
            const {data} = await getAllPrintLogs()
            const doneData = data.filter((item) => item.status == "Đã in xong")
            setHistory(doneData)
            setFilteredHistory(doneData)
            countPage(doneData)
        }
        fetchStudentData();
        fetchPrinterData();
        fetchHistoryData();
    },[])
    const handleSearch = () => {
        const filterStudents = (selectedStudents.length == 0) ? students : selectedStudents
        const filterPrinters = (selectedPrinters.length == 0) ? printers : selectedPrinters
        const filterDocsWithDate = (history, filterStudents, filterPrinters) => {
            return history.filter(doc => {
                return filterStudents.some(student => student.value == doc.student.id) &&
                    filterPrinters.some(printer => printer.value == doc.printer.name) &&
                    parse(doc.startTime, 'kk:mm dd/MM/yyyy', new Date()).getTime() >= selectedStart.getTime() &&
                    parse(doc.startTime, 'kk:mm dd/MM/yyyy', new Date()).getTime() <= selectedEnd.getTime()
            })
        }
        const filterDocsWithoutDate = (history, filterStudents, filterPrinters) => {
            return history.filter(doc => {
                return filterStudents.some(student => student.value == doc.student.id) &&
                    filterPrinters.some(printer => printer.value == doc.printer.name) 
            })
        }
        const filteredDocs = (selectedStart != null && selectedEnd != null) ? 
            filterDocsWithDate(history, filterStudents, filterPrinters) : filterDocsWithoutDate(history, filterStudents, filterPrinters);
        countPage(filteredDocs)
        setFilteredHistory(filteredDocs)
    }
    return <div className="flex flex-col min-h-screen">
        <SPSOHeader/>
        {/* Big */}
        <div className="hidden md:flex justify-center flex-col items-center px-10 gap-y-2 my-10">
        <p className="text-2xl font-bold mb-5">Lịch sử in</p>
        <div className="flex flex-col gap-y-10">
            <div className="flex flex-row items-center gap-x-10 text-xl">
                <div className="flex flex-row items-center">
                    <p>MSSV:</p>
                    <Select 
                    options={students}
                    value={selectedStudents}
                    onChange={handleChangeStudents}
                    isMulti
                    placeholder="Tất cả"
                    styles={selectStudentStyles}
                    className="ml-1"
                    noOptionsMessage={() => {return "Không tìm thấy"}}
                    />
                </div>
                <div className="flex flex-row items-center">
                    <p>Máy in:</p>
                    <Select 
                    options={printers}
                    value={selectedPrinters}
                    onChange={handleChangePrinters}
                    isMulti
                    placeholder="Tất cả"
                    styles={selectStudentStyles}
                    className="ml-1"
                    noOptionsMessage={() => {return "Không tìm thấy"}}
                    />
                </div>
            </div>
            <div className="flex flex-row items-center gap-x-10 text-xl">
                <div className="flex flex-row items-center">
                    <p>Từ:</p>
                    <input type="date" className="bg-blue-1 px-2 py-1 ml-1 rounded-xl border-blue-2 border-2 border-solid"
                        onChange={handleChangeStart}></input>
                </div>
                <div className="flex flex-row items-center">
                    <p>Đến:</p>
                    <input type="date" className="bg-blue-1 px-2 py-1 ml-1 rounded-xl border-blue-2 border-2 border-solid"
                        onChange={handleChangeEnd}></input>
                </div>
                <button className="aspect-square rounded-full bg-blue-4 w-8 items-center justify-items-center hover:scale-110 duration-200"
                    onClick={handleSearch}>
                    <FaSearch id="search-icon" className="text-white"/>
                </button>
            </div>
        </div>
        <div className="text-right text-xs py-5">
            <p>Thống kê: {statistic}</p>
        </div>
        <table className="bg-blue-2 overflow-x-scroll max-w-full min-w-[600px]">
            <thead className="bg-blue-3">
                <tr>
                    <th className="min-w-[180px] border-2 border-blue-4">MSSV</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Máy in</th>
                    <th className="min-w-[100px] py-4 border-2 border-blue-4">Tên file</th>
                    <th className="min-w-[80px] border-2 border-blue-4">Cỡ giấy</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Số bản</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Số trang</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Số mặt</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Thời gian bắt đầu</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Thời gian kết thúc</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {filteredHistory.map((row, rowKey) => {
                    return <tr key={rowKey}>
                        <td className="text-center border-2 border-blue-4">{row.student.id}</td>
                        <td className="text-center border-2 border-blue-4">{row.printer.name}</td>
                        <td className="text-center border-2 border-blue-4">
                            <a href={"../"+processFilePath(row.document.filePath)} target="_blank" 
                                download={row.document.fileName}
                                rel="noopener noreferrer">
                                    {row.document.fileName}
                            </a>
                        </td>
                        <td className="text-center border-2 border-blue-4">{row.printModification.paperSize}</td>
                        <td className="text-center border-2 border-blue-4">{row.printModification.copies}</td>
                        <td className="text-center border-2 border-blue-4">{row.document.numPages}</td>
                        <td className="text-center border-2 border-blue-4">{row.printModification.doubleSize?"2":"1"}</td>
                        <td className="text-center border-2 border-blue-4">{row.startTime}</td>
                        <td className="text-center border-2 border-blue-4">{row.finishedTime}</td>
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {/* Small */}
        <div className="flex md:hidden justify-center flex-col items-center px-10 gap-y-2 my-10">
        <p className="text-xl font-bold">Lịch sử in</p>
        <div className="flex flex-col gap-y-10 text-xl">
            <div className="flex flex-row items-center">
                <p>MSSV:</p>
                <Select 
                options={students}
                value={selectedStudents}
                onChange={handleChangeStudents}
                isMulti
                placeholder="Tất cả"
                styles={selectStudentStyles}
                className="ml-1"
                noOptionsMessage={() => {return "Không tìm thấy"}}
                />
            </div>
            <div className="flex flex-row items-center">
                <p>Máy in:</p>
                <Select 
                options={printers}
                value={selectedPrinters}
                onChange={handleChangePrinters}
                isMulti
                placeholder="Tất cả"
                styles={selectStudentStyles}
                className="ml-1"
                noOptionsMessage={() => {return "Không tìm thấy"}}
                />
            </div>
            <div className="flex flex-row items-center">
                <p>Từ:</p>
                <input type="date" className="bg-blue-1 px-2 py-1 ml-1 rounded-xl border-blue-2 border-2 border-solid"
                    onChange={handleChangeStart}></input>
            </div>
            <div className="flex flex-row items-center">
                <p>Đến:</p>
                <input type="date" className="bg-blue-1 px-2 py-1 ml-1 rounded-xl border-blue-2 border-2 border-solid"
                    onChange={handleChangeEnd}></input>
            </div>
            <button className="aspect-square rounded-full bg-blue-4 w-8 items-center justify-items-center hover:scale-110 duration-200"
                onClick={handleSearch}>
                <FaSearch id="search-icon" className="text-white"/>
            </button>
        </div>
        <div className="text-right text-xs py-5">
            <p>Thống kế: {statistic}</p>
        </div>
        <table className="bg-blue-2 overflow-x-scroll w-full">
            {/* <thead className="bg-blue-3">
                <tr>
                    <th className="min-w-[100px] py-4">Tên</th>
                    <th className="min-w-[80px] w-full">Mô tả</th>
                    <th className="min-w-[180px]">Bắt đầu sử dụng</th>
                    <th className="min-w-[180px]">Trạng thái</th>
                </tr>
            </thead> */}
            <tbody className="text-white">
                {filteredHistory.map((row, rowKey) => {
                    return <tr key={rowKey} className={rowKey%2?"bg-blue-3":"bg-blue-2"}>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="MSSV">{row.student.id}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Máy in">{row.printer.name}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Tên file">
                            <a href={"../"+processFilePath(row.document.filePath)} target="_blank" 
                                download={row.document.fileName}
                                rel="noopener noreferrer">
                                    {row.document.fileName}
                            </a>
                        </td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Cỡ giấy">{row.printModification.paperSize}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số bản">{row.printModification.copies}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số trang">{row.document.numPages}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số mặt">{row.printModification.doubleSize?"2":"1"}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian bắt đầu">{row.startTime}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian kết thúc">{row.finishedTime}</td>    
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {filteredHistory.length === 0 && <p className="mb-10 py-5 text-center">Không tìm thấy</p>}
        <Footer/>
    </div>
}