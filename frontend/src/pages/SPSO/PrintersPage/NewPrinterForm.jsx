import { useState } from "react"
import Select from "react-select"

const rooms = [
    {value:"H1-101", label:"H1-101"},
    {value:"H2-101", label:"H2-101"},
    {value:"H2-201", label:"H2-201"},
    {value:"H3-101", label:"H3-101"},
    {value:"H3-301", label:"H3-301"},
]
const selectStyles = {
    dropdownIndicator: (styles) => ({
        ...styles,
        color:`var(--blue-4)`
    }),
    clearIndicator: (styles) => ({
        ...styles,
        color: `var(--blue-2)`
    }),
    indicatorSeparator: (styles) => ({
        ...styles,
        backgroundColor: `var(--blue-4)`
    }),
    menuList: (styles) => ({
        ...styles,
        backgroundColor: `var(--blue-3)`
    }),
    placeholder: (styles) => ({
        ...styles, 
        color:"white"
    }),
    control: (styles) => ({
        ...styles, 
        backgroundColor: `var(--blue-2)`, 
        borderRadius:"10px", 
        border:"1px solid var(--blue-5)",
        minWidth:"100px",
        maxWidth:"500px",
        color: "blue"
    }),
    option: (styles) => ({
        ...styles, 
        backgroundColor: `var(--blue-3)`,
        color: `white`,
        "&:hover": {
            backgroundColor: `var(--blue-2)`
        }
    }),
    input: (styles) => ({
        ...styles,
        color:`white`
    }),
    singleValue: (styles) => ({
        ...styles,
        color:"white"
    })
}

export const NewPrinterForm = ({closeForm, submitForm}) => {
    const [selectedRoom, setSelectedRoom] = useState();
    const handleChangeRoom = (room) => {
        setSelectedRoom(room)
    }
    return <div className="fixed bg-black/50 left-0 top-0 z-1 w-full h-full flex items-center justify-center">
        <form className="p-5 bg-blue-4 text-white rounded-xl flex flex-col gap-y-5 w-max-[300px]">
            <p className="font-bold text-center text-xl">Thêm máy in mới</p>
            <div className="flex items-center">
                <p>Vị trí</p>
                <Select
                options={rooms}
                value={selectedRoom}
                onChange={handleChangeRoom}
                placeholder="phòng..."
                styles={selectStyles}
                className="pl-1"
                noOptionsMessage={() => {return "Không tìm thấy"}}
                />
            </div>
            <div className="flex items-center gap-x-1"> 
                <p>Mô tả</p>
                <input className="pl-1 bg-blue-2 py-2 rounded-xl" type="text"/>
            </div>
            <div className="flex flex-row justify-around w-full">
                <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {submitForm(); closeForm();}}>
                    Đồng ý
                </button>
                <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {closeForm();}}>
                    Hủy
                </button>
            </div>
        </form>
    </div>
}