import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser, setCurrentUser } from "../config/auth"
import { getAllStudents } from "../api/students"
import { getAllSPSOs } from "../api/spsos"
export const LoginPage = () => {
    const [isStudent, setIsStudent] = useState(true)
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [students, setStudents] = useState([])
    const [spsos, setSPSOs] = useState([])
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        if (isStudent) {
            const foundStudent = students.find(student => {
                return student.login?.username == username && student.login?.password == password
            })
            if (foundStudent) {
                setCurrentUser(foundStudent)
                alert("Đăng nhập thành công")
                navigate("/student/homepage")
            }
            else {
                alert("Đăng nhập thất bại")
            }
        }
        else {
            const foundSPSO = spsos.find(spso => {
                return spso.login?.username == username && spso.login?.password == password
            })
            if (foundSPSO) {
                setCurrentUser(foundSPSO)
                alert("Đăng nhập thành công")
                navigate("/spso/homepage")
            }
            else {
                alert("Đăng nhập thất bại")
            }
        }
    }
    useEffect(()=>{
        const fetchStudentData = async () => {
            try{
                const {data} = await getAllStudents();
                setStudents(data);
                console.log(data);
            }catch(err){
                console.log(err)
            }
        }
        const fetchSPSOData = async () => {
            try{
                const {data} = await getAllSPSOs();
                setSPSOs(data);
                console.log(data);
            }catch(err){
                console.log(err)
            }
        }
        fetchStudentData()
        fetchSPSOData()
    },[])
    return <>
        <section className="min-h-screen flex flex-col items-center justify-center bg-[#65c2f5]">
        <h1 className="text-center text-3xl font-bold">HCMUT SSPS</h1>
        <div className="flex bg-[#b0d6f5] rounded-xl p-5 px-12 mt-4">
            <div>
                <h1 className="font-bold text-2xl text-center text-[#0463ca]">Đăng nhập</h1>
                <div className="mt-2">
                    <div className="flex justify-stretch">
                        <div className=" grid-cols-2 items-center flex-1" onClick={()=>setIsStudent(true)}>
                            <h1 className={"text-center hover:scale-110 duration-200 " + (isStudent ? "font-bold" : "")}>Sinh viên</h1>
                            <hr className={"border-[#0463ca] " + (isStudent ? "border-2" :"")}/>
                        </div>
                        <div className="grid-cols-2 items-center flex-1" onClick={()=>setIsStudent(false)}>
                            <h1 className={"text-center hover:scale-110 duration-200 " + (isStudent ? "":"font-bold")}>SPSO</h1>
                            <hr className={"border-[#0463ca] " + (isStudent ? "":"border-2")}/>
                        </div>
                    </div>
                </div>
                <form className="mt-6 flex flex-col gap-4">
                    <input className="p-2 rounded-xl border" type="text" name="email" placeholder="BKID" 
                        onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input className="p-2 rounded-xl border" type="password" name="password" placeholder="Password"
                        onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button className="py-2 rounded-xl bg-[#0463ca] text-white  hover:scale-105 duration-200"
                        onClick={handleLogin}>Đăng nhập</button>
                    <a className=" text-xs text-right  hover:scale-105 duration-200" href="#">Quên mật khẩu?</a>
                </form>
            </div>
        </div>
        </section>
    </>    
}