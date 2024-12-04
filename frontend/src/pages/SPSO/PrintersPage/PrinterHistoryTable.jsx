import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import Select from "react-select"
import { selectStudentStyles } from "../../../utils/selectStudentStyles";
import { parse } from "date-fns";

export const PrinterHistoryTable = ({printerID}) => {
    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedStart, setSelecetedStart] = useState(null);
    const [selectedEnd, setSelecetedEnd] = useState(null);
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [statistic, setStatistic] = useState();
    const handleChangeStudents = (selectedStudents) => {
        setSelectedStudents(selectedStudents);
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
            if (data.size == "A3") numA3 += data.copy
            if (data.size == "A4") numA4 += data.copy
            if (data.size == "A5") numA5 += data.copy
        })
        let str = (numA3 == 0) ? "" : (numA3+" A3")
        str += (numA4 == 0) ? "" : (numA4+" A4")
        str += (numA5 == 0) ? "" : (numA5+" A5")
        setStatistic(str)
    }
    useEffect(() => {
        const fetchStudentData = async () => {
            const response = await fetch('/api/students')
            const json = await response.json()
            const data = json.students
            const transformedData = data.map(item => ({value: item.id, label: item.id}))
            setStudents(transformedData)
        }
        const fetchHistoryData = async () => {
            const response = await fetch("/api/printing-requests")
            const json = await response.json()
            const data = json.printingRequests
            const doneData = data.filter((item) => (item.status == "done" && item.printer_id == printerID))
            setHistory(doneData)
            setFilteredHistory(doneData)
            countPage(doneData)
        }
        fetchStudentData();
        fetchHistoryData();
    },[])
    const handleSearch = () => {
        const filterStudents = (selectedStudents.length == 0) ? students : selectedStudents
        const filterDocsWithDate = (history, filterStudents) => {
            return history.filter(doc => {
                return filterStudents.some(student => student.value == doc.student_id) &&
                    parse(doc.start, 'kk:mm dd/MM/yyyy', new Date()).getTime() >= selectedStart.getTime() &&
                    parse(doc.start, 'kk:mm dd/MM/yyyy', new Date()).getTime() <= selectedEnd.getTime()
            })
        }
        const filterDocsWithoutDate = (history, filterStudents) => {
            return history.filter(doc => {
                return filterStudents.some(student => student.value == doc.student_id)
            })
        }
        const filteredDocs = (selectedStart != null && selectedEnd != null) ? 
            filterDocsWithDate(history, filterStudents) : filterDocsWithoutDate(history, filterStudents);
        countPage(filteredDocs)
        setFilteredHistory(filteredDocs)
    }
    return <div className="w-full">
        {/* Big */}
        <div className="hidden md:flex justify-center flex-col items-center px-10 gap-y-2 my-10">
        <p className="text-xl font-bold">Lịch sử in</p>
        <div className="flex flex-row items-center gap-x-10 text-xl">
            <div className="flex flex-row items-center">
                <p>Mã số sinh viên:</p>
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
        <div className="text-right text-xs">
            <p>Thống kế: {statistic}</p>
        </div>
        <table className="bg-blue-2 overflow-x-scroll max-w-full min-w-[600px]">
            <thead className="bg-blue-3">
                <tr>
                    <th className="min-w-[100px] py-4 border-2 border-blue-4">Tên file</th>
                    <th className="min-w-[80px] border-2 border-blue-4">Cỡ giấy</th>
                    <th className="min-w-[100px] border-2 border-blue-4">Số bản</th>
                    <th className="min-w-[180px] border-2 border-blue-4">MSSV</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Thời gian bắt đầu</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Thời gian kết thúc</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {filteredHistory.map((row, rowKey) => {
                    return <tr key={rowKey}>
                        <td className="text-center border-2 border-blue-4">{row.file}</td>
                        <td className="text-center border-2 border-blue-4">{row.size}</td>
                        <td className="text-center border-2 border-blue-4">{row.copy}</td>
                        <td className="text-center border-2 border-blue-4">{row.student_id}</td>
                        <td className="text-center border-2 border-blue-4">{row.start}</td>
                        <td className="text-center border-2 border-blue-4">{row.end}</td>
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
                <p>Mã số sinh viên:</p>
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
        <div className="text-right text-xs">
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
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Tên file">{row.file}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Cỡ giấy">{row.size}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số bản">{row.copy}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="MSSV">{row.student_id}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian bắt đầu">{row.start}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian kết thúc">{row.end}</td>    
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {(filteredHistory.length == 0) && <p className="text-center">Không tồn tại</p>}
    </div>
}