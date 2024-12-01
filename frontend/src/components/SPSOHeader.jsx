import { useState } from "react";
import { useNavigate } from "react-router-dom"
import avatar from '../images/VitaminMeo.jpg'

export const SPSOHeader = () => {

  const navigate = useNavigate();

  const [imgClick, setImgClick] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const clickImage = () => {
    setImgClick(!imgClick);
  }

  const clickMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return <>
    <header class="flex items-center justify-between px-5 w-full bg-blue-2 text-blue-900 font-bold h-[10vh]  ">

      <div class="flex flex-row items-center h-full">
        <img
          loading="lazy"
          src="https://lms.hcmut.edu.vn/pluginfile.php/3/theme_academi/logo/1725955904/logoBK.png"
          alt="University logo"
          class="aspect-square w-16"
        />

        {/* Màn hình lớn */}

        <div class="hidden md:flex flex-row w-full h-full text-xl ml-4           ">
          <button class="hover:bg-blue-4 duration-200 px-2"
            onClick={() => navigate("/")}
          >
            Trang chủ
          </button>

          <button class="hover:bg-blue-4 duration-200 px-2"
            onClick={() => navigate("/")}
          >
            Tài liệu chờ
          </button>

          <button class="hover:bg-blue-4 duration-200 px-2"
            onClick={() => navigate("/")}
          >
            Máy in
          </button>

          <button class="hover:bg-blue-4 duration-200 px-2"
            onClick={() => navigate("/")}
          >
            Lịch sử
          </button>

          <button class="hover:bg-blue-4 duration-200 px-2"
            onClick={() => navigate("/")}
          >
            Quản lí
          </button>

          <button class="hover:bg-blue-4 duration-200 px-2"
            onClick={() => navigate("/")}
          >
            Báo cáo
          </button>

        </div>

        {/* Màn hình nhỏ */}

        <div className="flex md:hidden">
          <button
            onClick={clickMenu}
            className="text-2xl p-2 h-12 bg-blue-4 rounded-md focus:outline-none"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col items-center text-md text-blue-5 absolute top-[10vh] left-0 w-36 bg-white rounded-md shadow-lg z-10">

            <button className="block px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/"); setMenuOpen(false);
              }}
            >
              Trang chủ
            </button>

            <button className="block px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}

            >
              Tài liệu chờ
            </button>

            <button className="block px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Máy in
            </button>

            <button className="block px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Lịch sử
            </button>

            <button className="block px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Quản lí
            </button>

            <button className="block px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Báo cáo
            </button>
          </div>
        )}

      </div>

      {/* Ảnh đại diện */}

      <img src={avatar} alt="Không có gì đâu hehehe"
        class="h-[80%] aspect-square bg-red-300 rounded-full mr-5 hover:cursor-pointer    "
        onClick={clickImage}
      />
      {imgClick && (
        <div className="flex flex-col items-center absolute right-9 mt-40 w-36 text-blue-5 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <button
              onClick={clickImage}
              className="block px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
            >
              Thông tin
            </button>
            <button
              onClick={() => navigate("/")}
              className="block px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
            >
              Đăng xuất
            </button>

        </div>
      )}

    </header>

  </>
}