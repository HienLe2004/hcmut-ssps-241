import { useRef, useState } from "react"
import { Navigate, redirect, useNavigate } from "react-router-dom"

export const LoginPage = () => {
    const [isStudent, setIsStudent] = useState(true)
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("login");
        navigate(isStudent ? "/student/homepage" : "/spso/homepage")
    }
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
                    <input className="p-2 rounded-xl border" type="email" name="email" placeholder="BKID"/>
                    <input className="p-2 rounded-xl border" type="password" name="password" placeholder="Password"/>
                    <button className="py-2 rounded-xl bg-[#0463ca] text-white  hover:scale-105 duration-200"
                        onClick={handleLogin}>Đăng nhập</button>
                    <a className=" text-xs text-right  hover:scale-105 duration-200" href="#">Quên mật khẩu?</a>
                </form>
            </div>
        </div>
        </section>
    </>    
}