import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaLightbulb, FaRobot } from 'react-icons/fa'; // Example icons

// Optional: A reusable ProgramCard component
const ProgramCard = ({ title, color, textColor, description }) => (
  <div
    className={`rounded-2xl shadow-md p-6 ${color} border-l-4 border-red-500 transform transition duration-300 hover:scale-105`}
  >
    <h3 className={`text-xl sm:text-2xl font-semibold mb-4 ${textColor}`}>
      {title}
    </h3>
    <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
      {description.map((desc, i) => (
        <li key={i}>{desc}</li>
      ))}
    </ul>
  </div>
);

const HomePage = () => {
  const programs = [
    {
      title: 'ภาคปกติ',
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      description: [
        'เรียนในวันจันทร์ - ศุกร์ (เช้า-บ่าย)',
        'เหมาะสำหรับนักเรียนที่เพิ่งจบ ม.6 หรือเทียบเท่า',
        'ค่าเล่าเรียนตามอัตราอุดหนุนของภาครัฐ',
        'สามารถสมัครทุน กยศ./กรอ. ได้',
      ],
    },
    {
      title: 'ภาคพิเศษ',
      color: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      description: [
        'เรียนวันเสาร์ - อาทิตย์ หรือภาคค่ำ',
        'เหมาะสำหรับผู้ทำงานประจำ หรือผู้มีเวลาจำกัด',
        'ค่าเล่าเรียนสูงกว่าภาคปกติ',
        'สามารถเรียนควบคู่กับงานประจำได้',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
            มหาวิทยาลัยกาฬสินธุ์
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fadeIn delay-200">
            แหล่งรวมความรู้เพื่ออนาคตของคุณ
          </p>
          {/* Changed to Link if "เทียบวิชาแต่ละสาขา" is a specific page, otherwise keep <a> */}
          <a href="#about" className="inline-block bg-white text-red-600 font-bold px-8 py-4 rounded-full hover:bg-red-100 hover:shadow-lg transition transform hover:-translate-y-1">
            เทียบวิชาแต่ละสาขา
          </a>
        </div>
      </section>

      {/* Programs Section */}
      <section className="px-4 sm:px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-600 mb-8">
            หลักสูตรภาคปกติและภาคพิเศษ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, idx) => (
              <ProgramCard key={idx} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Programs / Fields of Study */}
      <section id="about" className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-red-600">
            สาขาที่น่าสนใจ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Link
              to="/curriculumCE"
              className="group block w-full bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <FaLaptopCode className="text-5xl text-red-500 mb-4 mx-auto group-hover:text-red-700 transition" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 group-hover:text-red-600">
                วิศวคอมพิวเตอร์
              </h3>
              <p className="text-base text-gray-600">วิศวกรรมศาสตรบัณฑิต</p>
            </Link>
            <Link
              to="/curriculumEN"
              className="group block w-full bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <FaLightbulb className="text-5xl text-red-500 mb-4 mx-auto group-hover:text-red-700 transition" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 group-hover:text-red-600">
                วิศวกรรมไฟฟ้า
              </h3>
              <p className="text-base text-gray-600">วิศวกรรมศาสตรบัณฑิต</p>
            </Link>
            <Link
              to="/curriculumMCE"
              className="group block w-full bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <FaRobot className="text-5xl text-red-500 mb-4 mx-auto group-hover:text-red-700 transition" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 group-hover:text-red-600">
                วิศวกรรมเมคคาทรอนิกส์
              </h3>
              <p className="text-base text-gray-600">วิศวกรรมศาสตรบัณฑิต</p>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 bg-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">เกี่ยวกับเรา</h2>
          <p className="leading-relaxed text-lg">
            มหาวิทยาลัยกาฬสินธุ์มุ่งมั่นในการสร้างบุคลากรที่มีคุณภาพ มีคุณธรรม และสามารถปรับตัวในโลกอนาคต
            เรามีหลักสูตรหลากหลาย ทั้งวิทยาศาสตร์ วิศวกรรม ศิลปศาสตร์ และอื่นๆ ที่ตอบโจทย์ความต้องการของตลาดแรงงานและการพัฒนาประเทศ
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;