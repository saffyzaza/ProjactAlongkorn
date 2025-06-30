import React, { useState } from 'react';

const EditableCourseRow = ({ course, index, onEdit }) => {
  const [showDesc, setShowDesc] = useState(false);

  const toggleDescription = () => {
    setShowDesc(!showDesc);
  };

  const handleChange = (field, value) => {
    onEdit(course.code, field, value);
  };

  return (
    <>
      <tr className="hover:bg-blue-50">
        <td className="p-1 md:p-2 border text-center">{index + 1}</td>
        <td className="p-1 md:p-2 border text-center">{course.code}</td>
        <td className="p-1 md:p-2 border break-words max-w-[140px]">
          <input
            type="text"
            value={course.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full border rounded px-1"
          />
          <button onClick={toggleDescription} className="ml-1 border-0">🔍</button>
        </td>
        <td className="p-1 md:p-2 border text-center">
          <select
            value={course.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full border rounded"
          >
            <option value="ยังไม่เทียบ">ยังไม่เทียบ</option>
            <option value="เทียบแล้ว">เทียบแล้ว</option>
          </select>
        </td>
        <td className="p-1 md:p-2 border text-center">
          <input
            type="number"
            value={course.credit}
            onChange={(e) => handleChange('credit', e.target.value)}
            className="w-full border rounded px-1 text-center"
          />
        </td>
      </tr>

      {showDesc && (
        <tr>
          <td colSpan="5" className="p-2 border bg-gray-50 text-[10px] md:text-sm">
            {course.description || 'ไม่มีคำอธิบายสำหรับรายวิชานี้'}
          </td>
        </tr>
      )}
    </>
  );
};

export default EditableCourseRow;
