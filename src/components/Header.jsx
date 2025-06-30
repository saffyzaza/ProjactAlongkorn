import React from 'react';

import logo from './img/logo_eng.png';


export const Header = () => {
  return (
    
    <><div className="sticky top-0 z-50 flex items-center justify-between px-2 py-2 bg-red-600 text-white shadow-md">
      {/* ปุ่ม เมนู */}
      <div>
        <button onClick={() => window.location.reload()}
                className="text-base bg-white text-red-600 px-3 py-1 rounded hover:bg-blue-100 ">
          Home
        </button>
      </div>
      {/* ชื่อมหาวิทยาลัย */}
      <h2 className="text-center text-lg font-semibold flex-1 mx-2 truncate">
        วิศวคอมพิวเตอร์ มหาวิทยาลัยกาฬสินธุ์
      </h2>

      {/* โลโก้ */}
      <a href="#" class="-m-1.5 p--11.5">
        <span class="sr-only">Your Company</span>
        <img class="h-12 w-auto" src={logo} alt="" />
      </a>

      {/* ปุ่ม คำนวณการเทียบวิชา */}
      
    </div>
    </>
  );
};
