import { StudentHeader } from "../../components/StudentHeader"
import { Footer } from "../../components/footer";
import test from '../../images/ssps_homepage.jpg'

export const StudentHomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <StudentHeader />
            <div className="flex flex-col flex-grow items-center justify-center w-full my-5">
                <img src={test} alt="Không có hình đâu hehehe"
                    className="w-[70%] "
                />
                <div className="w-[70%]   ">
                    <h1 className="text-2xl  font-semibold my-5    " >
                        Thông tin sơ lược về hệ thống SSPS
                    </h1>
                    <p className="text-xl   ">
                        Hệ thống in ấn thông minh SSPS cung cấp cho sinh viên HCMUT giải pháp giúp quá trình in ấn tài liệu học tập trở nên thuận tiện hơn. Với hệ thống này, sinh viên có thể yêu cầu được in ấn tài liệu ở bất kì máy in nào đang hoạt động trong khuôn viên nhà trường và thanh toán nhanh chóng ngay trên hệ thống.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}