export const LoginPage = () => {
    return <>
        <section class="min-h-screen flex flex-col items-center justify-center bg-[#65c2f5]">
        <h1 class="text-center text-3xl font-bold">HCMUT SSPS</h1>
        <div class="flex bg-[#b0d6f5] rounded-xl p-5 px-12 mt-4">
            <div>
                <h1 class="font-bold text-2xl text-center text-[#0463ca]">Đăng nhập</h1>
                <div class="mt-2">
                    <div class="flex justify-stretch">
                        <div class=" grid-cols-2 items-center flex-1" id="sv_option">
                            <h1 class="text-center font-bold hover:scale-110 duration-200">Sinh viên</h1>
                            <hr class=" border-[#0463ca] border-2"/>
                        </div>
                        <div class=" grid-cols-2 items-center flex-1" id="spso_option">
                            <h1 class="text-center hover:scale-110 duration-200">SPSO</h1>
                            <hr class=" border-[#0463ca]"/>
                        </div>
                    </div>
                </div>
                <form class="mt-6 flex flex-col gap-4">
                    <input class="p-2 rounded-xl border" type="email" name="email" placeholder="BKID"/>
                    <input class="p-2 rounded-xl border" type="password" name="password" placeholder="Password"/>
                    <button class="py-2 rounded-xl bg-[#0463ca] text-white  hover:scale-105 duration-200">Đăng nhập</button>
                    <a class=" text-xs text-right  hover:scale-105 duration-200" href="#">Quên mật khẩu?</a>
                </form>
            </div>
        </div>
        </section>
    </>    
}