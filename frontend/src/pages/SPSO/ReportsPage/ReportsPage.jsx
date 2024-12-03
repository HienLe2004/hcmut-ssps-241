import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { useState } from "react";
import { FaSearch } from "react-icons/fa"
import rows from "../../../utils/reports.json";
export const ReportsPage = () => {
    const [selectedStart, setSelecetedStart] = useState();
    const [selectedEnd, setSelecetedEnd] = useState();
    const handleChangeStart = (start) => {
        setSelecetedStart(start.target.value);
    }
    const handleChangeEnd = (end) => {
        setSelecetedEnd(end.target.value);
    }
    const handleSearch = () => {
        console.log(selectedStart)
        console.log(selectedEnd)
    }
    return <div className="flex flex-col min-h-screen">
        <SPSOHeader/>
        {/* Big */}
        <div className="hidden md:flex justify-center flex-col items-center px-10 gap-y-10 my-10">
        <div className="flex flex-col gap-y-10">
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
        <table className="bg-blue-2 overflow-x-scroll max-w-full min-w-[600px]">
            <thead className="bg-blue-3">
                <tr>
                    <th className="min-w-[100px] py-4 border-2 border-blue-4">Tên báo cáo</th>
                    <th className="min-w-[80px] border-2 border-blue-4">Link file</th>
                    <th className="min-w-[180px] border-2 border-blue-4">Thời gian xuất file</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {rows.map((row, rowKey) => {
                    return <tr key={rowKey}>
                        <td className="text-center border-2 border-blue-4">{row.name}</td>
                        <td className="text-center border-2 border-blue-4">{row.link}</td>
                        <td className="text-center border-2 border-blue-4">{row.date}</td>
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
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Tên báo cáo">{row.name}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Link file">{row.link}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian xuất file">{row.date}</td>    
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        <Footer/>
    </div>
}