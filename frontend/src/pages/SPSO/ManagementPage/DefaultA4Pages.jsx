import { parse, format } from "date-fns";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";

export const DefaultA4Pages = () => {
    const [editable, setEditable] = useState(false);
    const [pageDefaultPage, setPageDefaultPage] = useState();
    const [dateDefaultPage, setDateDefaultPage] = useState(null);
    useEffect(()=>{
        const fetchDefaultPage = async () => {
            const response = await fetch('/api/defaultPage')
            const json = await response.json()
            setPageDefaultPage(json.page)
            const dateTime = parse(json.date,'dd/MM/yyyy',new Date())
            
            setDateDefaultPage(format(dateTime,'yyyy-MM-dd'))
        }
        fetchDefaultPage()
    },[])
    const updateDefaultPage = () => {
        fetch(`/api/defaultPage`, {
            method: 'PATCH',
            body: JSON.stringify({page: pageDefaultPage, date: format(parse(dateDefaultPage, 'yyyy-MM-dd',new Date()),'dd/MM/yyyy')})
        })
        .then((res)=>res.json())
        .then(json=>console.log(json))
    }
    return <div className="p-4 bg-blue-4 rounded-xl text-white flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
            <p className="font-bold">Số trang A4 mặc định:</p>
            <input type="number" className="pl-1 bg-blue-2 py-2 rounded-xl" readOnly={!editable} 
                defaultValue={pageDefaultPage}
                onChange={(e)=>setPageDefaultPage(e.target.value)}
                ></input>
        </div>
        <div className="flex flex-col gap-y-2">
            <p className="font-bold">Ngày thiết lập:</p>
            <input type="date" className="pl-1 bg-blue-2 py-2 rounded-xl" readOnly={!editable} 
                defaultValue={dateDefaultPage}
                onChange={(e)=>setDateDefaultPage(e.target.value)}
                ></input>
        </div>
        {editable && <div className="flex flex-row justify-around w-full">
            <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                onClick={() => {updateDefaultPage();setEditable(false);}}>
                Cập nhật
            </button>
            <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                onClick={() => {setEditable(false);}}>
                Hủy
            </button>
        </div>}
        {!editable && <div className="aspect-square bg-blue-5 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
            onClick={() => {setEditable(true);}}>
            <FaPen/>
        </div>}
    </div>
}