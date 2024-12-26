import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();
    return (
        <header className="flex items-center justify-between px-5 py-3 w-full min-h-[10vh] bg-blue-3 text-blue-900 font-bold">
        {/* Logo */}
        <div className="flex items-center gap-3.5 px-4 py-2 text-xs text-blue-900 bg-white rounded-2xl max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d6e3d0b82f1251f02c2f317eafb29fe09f47dbe5a226aa1dbeac5d7b6efbf04?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
            alt="University logo"
            className="object-contain shrink-0 aspect-[0.94] w-[35px]"
          />
          <div className="flex-auto my-auto">
            ĐẠI HỌC QUỐC GIA TP.HCM <br /> TRƯỜNG ĐẠI HỌC BÁCH KHOA
          </div>
        </div>
  
        {/* Buttons */}
        <div className="flex gap-4">
          <button className="px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>
        </div>
      </header>
    );
};

export default Header;



