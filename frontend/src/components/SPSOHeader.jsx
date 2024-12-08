import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import avatar from '../images/VitaminMeo.jpg'
import { setCurrentUser } from "../config/auth";

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
    <header className="flex items-center justify-between px-5 w-full bg-blue-2 text-blue-900 font-bold h-[10vh]">

      <div className="flex flex-row items-center h-full">
        <img
          loading="lazy"
          src="https://lms.hcmut.edu.vn/pluginfile.php/3/theme_academi/logo/1725955904/logoBK.png"
          alt="University logo"
          className="aspect-square w-16"
        />

        {/* Màn hình lớn */}

        <div className="hidden md:flex items-center flex-row w-full h-full text-xl ml-4">
          <NavLink to="/spso/homepage" className="hover:bg-blue-4 duration-200 px-2 h-full flex items-center [&.active]:bg-blue-3">
          Trang chủ
          </NavLink>
          <NavLink to="/spso/waiting-docs" className="hover:bg-blue-4 duration-200 px-2 h-full flex items-center [&.active]:bg-blue-3">
          Tài liệu chờ
          </NavLink>
          <NavLink to="/spso/printers" className="hover:bg-blue-4 duration-200 px-2 h-full flex items-center [&.active]:bg-blue-3">
          Máy in
          </NavLink>
          <NavLink to="/spso/history" className="hover:bg-blue-4 duration-200 px-2 h-full flex items-center [&.active]:bg-blue-3">
          Lịch sử
          </NavLink>
          <NavLink to="/spso/management" className="hover:bg-blue-4 duration-200 px-2 h-full flex items-center [&.active]:bg-blue-3">
          Quản lí
          </NavLink>
          <NavLink to="/spso/reports" className="hover:bg-blue-4 duration-200 px-2 h-full flex items-center [&.active]:bg-blue-3">
          Báo cáo
          </NavLink>

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
            <NavLink to="/spso/homepage" className="hover:bg-blue-4 duration-200 px-4 py-2 w-full flex items-center justify-center [&.active]:bg-blue-3"
              onClick={() => {
                setMenuOpen(false);
              }}>
            Trang chủ
            </NavLink>
            <NavLink to="/spso/waiting-docs" className="hover:bg-blue-4 duration-200 px-4 py-2 w-full flex items-center justify-center [&.active]:bg-blue-3"
              onClick={() => {
                setMenuOpen(false);
              }}>
            Tài liệu chờ
            </NavLink>
            <NavLink to="/spso/printers" className="hover:bg-blue-4 duration-200 px-4 py-2 w-full flex items-center justify-center [&.active]:bg-blue-3"
              onClick={() => {
                setMenuOpen(false);
              }}>
            Máy in
            </NavLink>
            <NavLink to="/spso/history" className="hover:bg-blue-4 duration-200 px-4 py-2 w-full flex items-center justify-center [&.active]:bg-blue-3"
              onClick={() => {
                setMenuOpen(false);
              }}>
            Lịch sử
            </NavLink>
            <NavLink to="/spso/management" className="hover:bg-blue-4 duration-200 px-4 py-2 w-full flex items-center justify-center [&.active]:bg-blue-3"
              onClick={() => {
                setMenuOpen(false);
              }}>
            Quản lí
            </NavLink>
            <NavLink to="/spso/reports" className="hover:bg-blue-4 duration-200 px-4 py-2 w-full flex items-center justify-center [&.active]:bg-blue-3"
              onClick={() => {
                setMenuOpen(false);
              }}>
            Báo cáo
            </NavLink>
          </div>
        )}

      </div>

      {/* Ảnh đại diện */}

      <img src={avatar} alt="Không có gì đâu hehehe"
        className="h-[80%] aspect-square bg-red-300 rounded-full mr-5 hover:cursor-pointer    "
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
              onClick={() => {setCurrentUser({});navigate("/")}}
              className="block px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
            >
              Đăng xuất
            </button>

        </div>
      )}

    </header>

  </>
}