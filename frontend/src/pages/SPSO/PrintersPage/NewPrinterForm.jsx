import { useEffect, useState } from "react"
import Select from "react-select"
import { getAllLocations } from "../../../api/locations";
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
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [description, setDescription] = useState(null);
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        const fetchLocationData = async () => {
            try{
                const {data} = await getAllLocations()
                const tranformedData = await data.map(item => ({
                    name: item.name,
                    value: item.name,
                    label: item.name
                }))
                setLocations(tranformedData)
            }catch(err){
                console.log(err)
            }
        }
        fetchLocationData()
    },[])
    const handleChangeLocaiton = (location) => {
        setSelectedLocation(location)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    return <div className="fixed bg-black/50 left-0 top-0 z-1 w-full h-full flex items-center justify-center">
        <div className="p-5 bg-blue-4 text-white rounded-xl flex flex-col gap-y-5 w-max-[300px]">
            <p className="font-bold text-center text-xl">Thêm máy in mới</p>
            <div className="flex items-center">
                <p>Vị trí</p>
                <Select
                options={locations}
                value={selectedLocation}
                onChange={handleChangeLocaiton}
                placeholder="phòng..."
                styles={selectStyles}
                className="pl-1"
                noOptionsMessage={() => {return "Không tìm thấy"}}
                />
            </div>
            <div className="flex items-center gap-x-1"> 
                <p>Mô tả</p>
                <input className="pl-1 bg-blue-2 py-2 rounded-xl" type="text" onChange={handleChangeDescription}/>
            </div>
            <div className="flex flex-row justify-around w-full">
                <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {submitForm((selectedLocation==null)?null:selectedLocation.value, description); closeForm();}}>
                    Đồng ý
                </button>
                <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {closeForm();}}>
                    Hủy
                </button>
            </div>
        </div>
    </div>
}