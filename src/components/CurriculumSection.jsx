import React, { useState } from 'react';
import CourseTable from './CourseTable';

const CurriculumSection = ({ title, courses }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-blue-100 px-3 py-2 rounded font-semibold text-sm md:text-base"
      >
        {title}
      </button>
      {open && (
        <div className="mt-2">
          <CourseTable courses={courses} />
        </div>
      )}
    </div>
  );
};

export default CurriculumSection;
