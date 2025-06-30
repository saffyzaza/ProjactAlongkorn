import React from 'react';

export const CompareButton = ({ onCompare }) => {
  return (
    <div className="text-center mt-4">
      <button
        onClick={onCompare}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm md:text-base"
      >
        คำนวณการเทียบวิชา
      </button>
    </div>
  );
};
