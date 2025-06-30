import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { CompareButton } from './CompareButton';
import { MatchedSubjects } from './MatchedSubjects';

const SubjectComparePage = () => {
  const [matchedSubjects, setMatchedSubjects] = useState([]);

  const handleCompare = () => {
    // ตัวอย่างข้อมูลที่เทียบได้ (ในระบบจริงควรเชื่อมกับ backend หรือ logic)
    const mockMatched = [
      {
        code: 'CS101',
        name: 'Introduction to Computer Science',
        description: 'พื้นฐานเกี่ยวกับคอมพิวเตอร์และการเขียนโปรแกรม',
      },
      {
        code: 'CS102',
        name: 'Data Structures',
        description: 'โครงสร้างข้อมูลและการจัดการข้อมูลในโปรแกรม',
      },
    ];
    setMatchedSubjects(mockMatched);
  };

  return (
    
      
    <><TextInput />
      <CompareButton onCompare={handleCompare} />
      <MatchedSubjects subjects={matchedSubjects} />
      </>
  );
};

export default SubjectComparePage;
