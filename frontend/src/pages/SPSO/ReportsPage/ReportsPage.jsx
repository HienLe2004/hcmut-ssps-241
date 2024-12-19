import { parse } from "date-fns";
import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import { getAllReports } from "../../../api/reports";
export const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [selectedStart, setSelecetedStart] = useState(null);
    const [selectedEnd, setSelecetedEnd] = useState(null);
    const handleChangeStart = (start) => {
        setSelecetedStart(new Date(start.target.value));
    }
    const handleChangeEnd = (end) => {
        setSelecetedEnd(new Date(end.target.value));
    }
    const handleSearch = () => {
        const filterReportsWithDate = (reports) => {
            return reports.filter(report => {
                return  parse(report.date, 'kk:mm dd/MM/yyyy', new Date()).getTime() >= selectedStart.getTime() &&
                    parse(report.date, 'kk:mm dd/MM/yyyy', new Date()).getTime() <= selectedEnd.getTime()
            })
        }
        
        const filteredReports = (selectedStart != null && selectedEnd != null) ? 
            filterReportsWithDate(reports) : (()=>reports);
        setFilteredReports(filteredReports)
    }
    useEffect(()=>{
        const fetchReports = async () => {
            const {data} = await getAllReports()
            setReports(data)
            setFilteredReports(data)
        }
        fetchReports();
    },[])
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
    return <div className="flex flex-col min-h-screen text-xl">
        <SPSOHeader/>
        {/* Big */}
        <div className="hidden md:flex justify-center flex-col items-center px-10 gap-y-10 my-10">
        <div className="flex flex-col gap-y-10">
            <div className="flex flex-row items-center gap-x-10 text-xl">
                <div className="flex flex-row items-center">
                    <p className="font-bold text-blue-5">Từ:</p>
                    <input type="date" className="bg-blue-1 px-2 py-1 ml-1 rounded-xl border-blue-2 border-2 border-solid"
                        onChange={handleChangeStart}></input>
                </div>
                <div className="flex flex-row items-center">
                    <p className="font-bold text-blue-5">Đến:</p>
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
            <thead className="bg-blue-3 text-blue-0">
                <tr>
                    <th className="min-w-[100px] py-4 border-2 border-blue-4">Tên báo cáo</th>
                    <th className="min-w-[80px] border-2 border-blue-4">Link file</th>
                    <th className="min-w-[180px] border-2 border-blue-4 px-2">Thời gian xuất file</th>
                </tr>
            </thead>
            <tbody className="bg-blue-0 text-blue-5">
                {filteredReports.map((row, rowKey) => {
                    return <tr key={rowKey}>
                        <td className="text-center border-2 border-blue-4 px-2">{row.name}</td>
                        <td className="text-center border-2 border-blue-4 px-2">
                            <a href={"../"+processFilePath(row.filePath)} target="_blank" 
                                download={row.name}
                                rel="noopener noreferrer">
                                    Download
                            </a>
                        </td>
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
                <p className="font-bold text-blue-5">Từ:</p>
                <input type="date" className="bg-blue-1 px-2 py-1 ml-1 rounded-xl border-blue-2 border-2 border-solid"
                    onChange={handleChangeStart}></input>
            </div>
            <div className="flex flex-row items-center">
                <p className="font-bold text-blue-5">Đến:</p>
                <input type="date" className="bg-blue-1 px-2 py-1 ml-1 rounded-xl border-blue-2 border-2 border-solid"
                    onChange={handleChangeEnd}></input>
            </div>
            <button className="aspect-square rounded-full bg-blue-4 w-8 items-center justify-items-center hover:scale-110 duration-200"
                onClick={handleSearch}>
                <FaSearch id="search-icon" className="text-white"/>
            </button>
        </div>
        <table className="bg-blue-2 overflow-x-scroll w-full">
            <tbody className="text-white">
                {filteredReports.map((row, rowKey) => {
                    return <tr key={rowKey} className={rowKey%2?"bg-blue-3":"bg-blue-2"}>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Tên báo cáo">{row.name}</td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Link file">
                            <a href={"../"+processFilePath(row.filePath)} target="_blank" 
                                download={row.name}
                                rel="noopener noreferrer">
                                    Download
                            </a>
                        </td>
                        <td className="text-left block before:content-[attr(name)':'] before:mr-2 before:font-bold p-2" name="Thời gian xuất file">{row.date}</td>    
                    </tr>
                })}  
            </tbody>
        </table>
        </div>
        {(filteredReports.length == 0) && <p className="text-center">Không tìm thấy</p>}
        <Footer/>
    </div>
}