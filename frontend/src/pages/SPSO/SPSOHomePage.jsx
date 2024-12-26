import { SPSOHeader } from "../../components/SPSOHeader"
import { Footer } from "../../components/footer";
import test from '../../images/ssps_homepage.jpg'

export const SPSOHomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            <div className="flex flex-col flex-grow items-center justify-center w-full my-5">
                <img src={test} alt="Không có hình đâu hehehe"
                    className="w-[70%] rounded-xl"
                />
                <div className="w-[70%]   ">
                    <h1 className="text-2xl  font-semibold my-5" >
                        Thông tin sơ lược về hệ thống SSPS
                    </h1>
                    <p className="text-xl   ">
                        Hệ thống in ấn thông minh SSPS cung cấp cho người quản lí máy in có thể thuận tiện theo dõi và quản lí các máy in trên hệ thống. Người quản lí máy in có thể nhận các yêu cầu in ấn của sinh viên ngay trên hệ thống để đẩy nhanh quá trình in ấn tài liệu, tạo sự thuận tiện cho cả người quản lí máy in lẫn sinh viên tại HCMUT.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}