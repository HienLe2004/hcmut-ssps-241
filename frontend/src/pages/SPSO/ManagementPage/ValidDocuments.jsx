import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { getPaperSetting, updatePaperSetting } from "../../../api/paperSetting";

export const ValidDocuments = () => {
    const [editable, setEditable] = useState(false);
    const [validDocs, setValidDocs] = useState([]);
    const [paperSettingID, setPaperSettingID] = useState();
    useEffect(()=>{
        const fetchValidDocs = async () => {
            const {data} = await getPaperSetting();
            setPaperSettingID(data.id);
            setValidDocs(data.validFileType?data.validFileType.split(','):null);
        }
        fetchValidDocs()
    },[])
    const handleChangeValidDocs = (e) => {
        setValidDocs(e.target.value.split(','))
    }
    const updateValidDocs = async () => {
        const formatedStr = validDocs.join(',');
        console.log({validFileType: formatedStr});
        const newSetting = await updatePaperSetting(paperSettingID, {validFileType: formatedStr})
        console.log(newSetting)
    }
    return <div className="p-4 bg-blue-3 rounded-xl text-white flex flex-col gap-y-2">
        <p className="font-bold">Danh sách các loại tệp được in:</p>
        <input type="text" className="pl-1 bg-blue-2 py-2 rounded-xl" readOnly={!editable} defaultValue={validDocs} 
            onChange={handleChangeValidDocs}></input>
        
        {editable && <div className="flex flex-row justify-around w-full">
            <button className="p-2 bg-blue-4 rounded-xl hover:scale-110 duration-200"
                onClick={() => {updateValidDocs();setEditable(false);}}>
                Cập nhật
            </button>
            <button className="p-2 bg-blue-4 rounded-xl hover:scale-110 duration-200"
                onClick={() => {setEditable(false);}}>
                Hủy
            </button>
        </div>}
        {!editable && <div className="aspect-square bg-blue-4 rounded-full w-8 justify-center items-center flex hover:scale-110 duration-200"
            onClick={() => {setEditable(true);}}>
            <FaPen/>
        </div>}
    </div>
}