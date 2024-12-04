import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";

export const ValidDocuments = () => {
    const [editable, setEditable] = useState(false);
    const [validDocs, setValidDocs] = useState([]);
    const [validDocsStr, setValidDocsStr] = useState();
    useEffect(()=>{
        const fetchValidDocs = async () => {
            const response = await fetch('/api/validDocs')
            const json = await response.json()
            setValidDocs(json.array)
        }
        fetchValidDocs()
    },[])
    const handleChangeValidDocs = (e) => {
        setValidDocsStr(e.target.value)
    }
    const updateValidDocs = () => {
        setValidDocs(validDocsStr.split(','));
        fetch(`/api/validDocs`, {
            method: 'PATCH',
            body: JSON.stringify({array: validDocsStr.split(',')})
        })
        .then((res)=>res.json())
        .then(json=>console.log(json))
    }
    return <div className="p-4 bg-blue-4 rounded-xl text-white flex flex-col gap-y-2">
        <p className="font-bold">Danh sách các loại tệp được in:</p>
        <input type="text" className="pl-1 bg-blue-2 py-2 rounded-xl" readOnly={!editable} defaultValue={validDocs} 
            onChange={handleChangeValidDocs}></input>
        
        {editable && <div className="flex flex-row justify-around w-full">
            <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                onClick={() => {updateValidDocs();setEditable(false);}}>
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