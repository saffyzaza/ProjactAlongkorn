import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo_eng.png'; // Assuming you have a logo image in assets folder
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-red-800 shadow-md w-full fixed top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13">
          {/* Left: Logo + Title */}
          <div className="flex items-center">
            <img src={logo} alt="University Logo" className="h-10 w-auto" />
            <span className="ml-2 text-base sm:text-lg md:text-xl font-bold text-white">
              คณะวิศวกรรมศาสตร์และเทคโนโลยีอุตสาหกรรม
            </span>
          </div>

          {/* Right: Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-200 hover:text-black transition">หน้าแรก</Link>
            {/* <Link to="/curriculum" className="text-gray-200 hover:text-black transition">เทียบหลักสูตร</Link> */}
          </nav>

          {/* Mobile: Hamburger Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-red-900 shadow-md px-4 py-4 space-y-2">
          <Link to="/" className="block text-gray-200 hover:text-blue-600">หน้าแรก</Link>
          {/* <Link to="/curriculum" className="block text-gray-200 hover:text-blue-600">เทียบหลักสูตร</Link>
          <Link to="/about" className="block text-gray-200 hover:text-blue-600">เกี่ยวกับ</Link>
          <Link to="/contact" className="block text-gray-200 hover:text-blue-600">ติดต่อ</Link> */}
        </div>
      )}
    </header>
  );
};

export default Header;
