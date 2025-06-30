import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-4 px-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-2 md:mb-0">
            <p className="font-semibold">มหาวิทยาลัยตัวอย่าง</p>
            <p className="text-sm">123 ถนนการศึกษา ตำบลความรู้ จังหวัดปัญญา 40000</p>
          </div>
          <div className="text-sm text-center md:text-right">
            © {new Date().getFullYear()} มหาวิทยาลัยตัวอย่าง. สงวนลิขสิทธิ์.
          </div>
        </div>
      </footer>
  )
}
