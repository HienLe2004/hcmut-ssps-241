import { useState } from "react";
import { FaSearch } from "react-icons/fa"
import Select from "react-select"
import students from "../../../utils/students.json"
import { selectStudentStyles } from "../../../utils/selectStudentStyles";

export const PrinterHistoryTable = ({rows}) => {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedStart, setSelecetedStart] = useState();
    const [selectedEnd, setSelecetedEnd] = useState();
    const handleChangeStudent = (selectedStudents) => {
        setSelectedStudents(selectedStudents);
    }
    const handleChangeStart = (start) => {
        setSelecetedStart(start.target.value);
    }
    const handleChangeEnd = (end) => {
        setSelecetedEnd(end.target.value);
    }
    const handleSearch = () => {
        console.log(selectedStudents)
        console.log(selectedStart)
        console.log(selectedEnd)
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
                onChange={handleChangeStudent}
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
            <p>Thống kế: 41 A4</p>
        </div>
        <table className="bg-blue-2 overflow-x-scroll max-w-full min-w-[600px]">
            <thead className="bg-blue-3">
                <tr>
                    <th className="min-w-[100px] py-4">Tên file</th>
                    <th className="min-w-[80px]">Cỡ giấy</th>
                    <th className="min-w-[180px]">Số bản</th>
                    <th className="min-w-[180px]">MSSV</th>
                    <th className="min-w-[180px]">Thời gian bắt đầu</th>
                    <th className="min-w-[180px]">Thời gian kết thúc</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {rows.map((row, rowKey) => {
                    return <tr key={rowKey}>
                        <td className="text-center">{row.file}</td>
                        <td className="text-center">{row.size}</td>
                        <td className="text-center">{row.copy}</td>
                        <td className="text-center">{row.id}</td>
                        <td className="text-center">{row.start}</td>
                        <td className="text-center">{row.end}</td>
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
                onChange={handleChangeStudent}
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
            <p>Thống kế: 41 A4</p>
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
                {rows.map((row, rowKey) => {
                    return <tr key={rowKey} className={rowKey%2?"bg-blue-3":"bg-blue-2"}>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Tên file">{row.file}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Cỡ giấy">{row.size}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Số bản">{row.copy}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="MSSV">{row.id}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian bắt đầu">{row.start}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian kết thúc">{row.end}</td>    
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
    </div>
}