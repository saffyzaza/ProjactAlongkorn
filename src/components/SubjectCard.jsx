import React from 'react';

export const SubjectCard = ({ subject }) => {
  return (
    <div className="border rounded-md p-3 bg-white shadow-sm">
      <h3 className="text-md font-bold text-blue-600">{subject.code} - {subject.name}</h3>
      <p className="text-sm text-gray-700 mt-1">{subject.description}</p>
    </div>
  );
};
