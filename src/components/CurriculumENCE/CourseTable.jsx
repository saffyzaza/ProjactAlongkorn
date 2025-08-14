import React, { useState, useMemo } from 'react';

const CourseTable = ({ courses, onUpdate }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [inputCode, setInputCode] = useState('');
  const [inputType, setInputType] = useState('');

  const toggleDescription = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const summary = useMemo(() => {
    let count = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      if (course.type?.includes('เทียบแล้ว')) {
        count++;
        const credit = parseInt(course.credit);
        if (!isNaN(credit)) {
          totalCredits += credit;
        }
      }
    });

    return { count, totalCredits };
  }, [courses]);

  const handleUpdate = () => {
    let found = false;

    const updatedCourses = courses.map((course) => {
      if (course.code === inputCode.trim()) {
        found = true;
        return { ...course, type: inputType.trim() || 'เทียบแล้ว' };
      }
      return course;
    });

    if (!found) {
      alert(`ไม่พบรหัสวิชา: ${inputCode}`);
      return;
    }

    if (onUpdate) {
      onUpdate(updatedCourses);
    }

    setInputCode('');
    setInputType('');
  };

  return (
    <div className="w-full">
      

      <table className="w-full border border-gray-300 text-[10px] md:text-sm table-auto">
        <thead className="bg-red-200 text-gray-800">
          <tr>
            <th className="p-1 md:p-2 border text-center w-8">ลำดับ</th>
            <th className="p-1 md:p-2 border text-center w-24">รหัส</th>
            <th className="p-1 md:p-2 border text-left">ชื่อรายวิชา</th>
            <th className="p-1 md:p-2 border text-center w-20">เทียบวิชา</th>
            <th className="p-1 md:p-2 border text-center w-20">หน่วยกิต</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <React.Fragment key={index}>
              <tr className="hover:bg-blue-50">
                <td className="p-1 md:p-2 border text-center">{index + 1}</td>
                <td className="p-1 md:p-2 border text-center">{course.code}</td>
                <td className="p-1 md:p-2 border break-words max-w-[120px]">
                  {course.name}
                  <button onClick={() => toggleDescription(index)} className="ml-1">🔍</button>
                </td>
                <td className="p-1 md:p-2 border text-center">{course.type}</td>
                <td className="p-1 md:p-2 border text-center">{course.credit}</td>
              </tr>
              {openIndex === index && (
                <tr>
                  <td colSpan="5" className="p-2 border bg-gray-50 text-[10px] md:text-sm">
                    {course.description || 'ไม่มีคำอธิบายสำหรับรายวิชานี้'}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="mt-4 bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded text-sm md:text-base">
        <strong className="font-bold">สรุปผลการเทียบรายวิชา:</strong>
        <ul className="list-disc list-inside mt-2">
          <li>จำนวนวิชาที่เทียบได้: <span className="font-semibold">{summary.count} วิชา</span></li>
          <li>รวมหน่วยกิตทั้งหมด: <span className="font-semibold">{summary.totalCredits} หน่วยกิต</span></li>
        </ul>
      </div>
      <br />
      <div className=" mb-4 p-4 bg-gray-100 border rounded">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          
          <input
            type="text"
            placeholder="รหัสวิชา (code)"
            className="border p-2 rounded text-sm"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <input
            type="text"
            placeholder='ประเภท เช่น "เทียบแล้ว"'
            className="border p-2 rounded text-sm"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
