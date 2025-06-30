import React from 'react';
import { SubjectCard } from './SubjectCard';

export const MatchedSubjects = ({ subjects }) => {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold text-blue-700">วิชาที่เทียบได้</h2>
      {subjects.length > 0 ? (
        subjects.map((subject, index) => (
          <SubjectCard key={index} subject={subject} />
        ))
      ) : (
        <p className="text-gray-500">ไม่มีวิชาที่เทียบได้</p>
      )}
    </div>
  );
};
