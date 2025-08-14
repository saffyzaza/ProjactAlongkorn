import React, { useState, useEffect } from 'react';
import CourseTable from './CourseTable';
import SaveButton from './SaveFile'; // นำเข้า SaveButton

const CurriculumPage = () => {
  const [curriculumData, setCurriculumData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  // 👉 ใช้เมื่อเลือกหมวด/กลุ่มย่อยใหม่
  const updateSelectedCourses = (category, subcategory) => {
    const sub = curriculumData[category];
    let courses = [];
    if (Array.isArray(sub)) {
      courses = sub;
    } else if (typeof sub === 'object' && sub[subcategory]) {
      courses = sub[subcategory];
    }
    setSelectedCourses(courses);
  };

  const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const jsonData = JSON.parse(e.target.result);
      setCurriculumData(jsonData);
      setUploaded(true);

      // 👇 อัปเดตหมวด/กลุ่ม และรีเฟรช CourseTable
      const firstCategory = Object.keys(jsonData)[0];
      setSelectedCategory(firstCategory);

      const sub = jsonData[firstCategory];
      if (typeof sub === 'object' && !Array.isArray(sub)) {
        const firstSub = Object.keys(sub)[0];
        setSelectedSubcategory(firstSub);
        setSelectedCourses(sub[firstSub]); // ✅ โหลดรายวิชาไปยัง CourseTable
      } else {
        setSelectedSubcategory('');
        setSelectedCourses(sub); // ✅ ถ้าเป็น array ตรงๆ
      }

    } catch (error) {
      console.error('Invalid JSON file:', error);
      setUploaded(false);
    }
  };
  reader.readAsText(file);
};

  useEffect(() => {
  fetch('https://gist.githubusercontent.com/saffyzaza/1f22fb97930136b1ac7b5fdba49db995/raw/0c2dc79bb4f6d1d084aca91bc712fec764419fe8/curriculum.json')
    .then((res) => res.json())
    .then((data) => {
      setCurriculumData(data);
      const firstCategory = Object.keys(data)[0];
      setSelectedCategory(firstCategory);

      const sub = data[firstCategory];
      if (typeof sub === 'object' && !Array.isArray(sub)) {
        const firstSub = Object.keys(sub)[0];
        setSelectedSubcategory(firstSub);
        updateSelectedCourses(firstCategory, firstSub);
      } else {
        setSelectedSubcategory('');
        updateSelectedCourses(firstCategory, '');
      }
    })
    .catch((err) => {
      console.error("โหลด JSON ล้มเหลว:", err);
    });
}, []);


  const getCategoryCourseCount = (category) => {
    const sub = curriculumData[category];
    if (Array.isArray(sub)) return sub.length;
    if (typeof sub === 'object') {
      return Object.values(sub).reduce((sum, group) => sum + group.length, 0);
    }
    return 0;
  };

  const getSubcategoryCourseCount = (category, subcategory) => {
    const sub = curriculumData[category];
    if (typeof sub === 'object' && sub[subcategory]) {
      return sub[subcategory].length;
    }
    return 0;
  };

  const handleCourseUpdate = (updatedCourses) => {
    setSelectedCourses(updatedCourses);

    const updatedData = { ...curriculumData };
    if (Array.isArray(updatedData[selectedCategory])) {
      updatedData[selectedCategory] = updatedCourses;
    } else if (
      updatedData[selectedCategory] &&
      updatedData[selectedCategory][selectedSubcategory]
    ) {
      updatedData[selectedCategory][selectedSubcategory] = updatedCourses;
    }

    setCurriculumData(updatedData);
  };

  const renderSubcategoryButtons = () => {
    const subcategories = curriculumData[selectedCategory];
    if (typeof subcategories === 'object' && !Array.isArray(subcategories)) {
      return (
        <ul className="space-y-2 mt-2">
          {Object.keys(subcategories).map((sub) => (
            <li key={sub}>
              <button
                onClick={() => {
                  setSelectedSubcategory(sub);
                  updateSelectedCourses(selectedCategory, sub);
                }}
                className={`w-full text-left px-3 py-2 rounded text-sm md:text-base ${
                  selectedSubcategory === sub ? 'bg-yellow-500 text-white' : 'bg-yellow-100'
                }`}
              >
                {sub} ({getSubcategoryCourseCount(selectedCategory, sub)} วิชา)
              </button>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6">
      {/* ซ้าย: หมวดวิชา */}
      <div className="md:w-1/3 w-full">
        
          <button
            onClick={() => window.location.reload()}
            className="text-sm bg-blue-500 text-white px-2 py-1 rounded ml-2"
          >
            🔄 รีเฟรชข้อมูล
          </button>
          <SaveButton data={curriculumData} className="ml-2" />
          <label
            className={`text-sm ml-2 ${
              uploaded ? 'bg-green-500' : 'bg-purple-500'
            } text-white px-2 py-1 rounded cursor-pointer`}
          >
            📁 {uploaded ? 'อัปโหลดแล้ว' : 'นำเข้าไฟล์'}
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        <h2 className="text-base md:text-lg font-bold mb-2">
          หมวดวิชาวิศวกรรมคอมพิวเตอร์
        </h2>
        <ul className="space-y-2">
          {Object.keys(curriculumData).map((category) => (
            <li key={category}>
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  const sub = curriculumData[category];
                  if (typeof sub === 'object' && !Array.isArray(sub)) {
                    const firstSub = Object.keys(sub)[0];
                    setSelectedSubcategory(firstSub);
                    updateSelectedCourses(category, firstSub);
                  } else {
                    setSelectedSubcategory('');
                    updateSelectedCourses(category, '');
                  }
                }}
                className={`w-full text-left px-3 py-2 rounded text-sm md:text-base ${
                  selectedCategory === category ? 'bg-red-600 text-white' : 'bg-red-100'
                }`}
              >
                {category} ({getCategoryCourseCount(category)} วิชา)
              </button>
            </li>
          ))}
        </ul>

        {renderSubcategoryButtons()}
      </div>

      {/* ขวา: รายวิชา */}
      <div className="md:w-2/3 w-full">
        <h2 className="text-base md:text-lg font-bold mb-2">รายการรายวิชา</h2>
        <CourseTable courses={selectedCourses} onUpdate={handleCourseUpdate} />
      </div>
    </div>
  );
};

export default CurriculumPage;
