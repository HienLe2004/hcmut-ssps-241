import { useState } from "react";

export const UpdatePrinterDescription = ({closeUpdate, openNoti, oldDescription, updateDescription}) => {
    const [description, setDescription] = useState(oldDescription)
    return <div className="fixed bg-black/50 left-0 top-0 z-1 w-full h-full flex items-center justify-center">
        <div className="p-5 bg-blue-4 text-white rounded-xl flex flex-col gap-y-5 items-center w-max-[300px]">
            <div className="flex flex-col items-center gap-y-2"> 
                <p>Cập nhật mô tả máy in</p>
                <input className="pl-1 bg-blue-2 py-2 rounded-xl" type="text" defaultValue={oldDescription} onChange={(e)=>{setDescription(e.target.value)}}/>
            </div>
            <div className="flex flex-row justify-around w-full">
                <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {openNoti(); updateDescription(description); closeUpdate()}}>
                    Đồng ý
                </button>
                <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {closeUpdate()}}>
                    Hủy
                </button>
            </div>
        </div>
    </div>
}