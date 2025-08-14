import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList
} from 'recharts';

const ChatMatcher = () => {
  const [studentInput, setStudentInput] = useState({
    code: '',
    name: '',
    description: ''
  });
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [curriculumData, setCurriculumData] = useState({});

  // ✅ โหลด JSON จาก Gist (แทน DATA.json)
  useEffect(() => {
    fetch('https://gist.githubusercontent.com/saffyzaza/1f22fb97930136b1ac7b5fdba49db995/raw/0c2dc79bb4f6d1d084aca91bc712fec764419fe8/curriculum.json')
      .then((res) => res.json())
      .then((data) => {
        setCurriculumData(data);
      })
      .catch((err) => {
        console.error("โหลด JSON ล้มเหลว:", err);
      });
  }, []);

  const handleChange = (e) => {
    setStudentInput({ ...studentInput, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    setLoading(true);
    setResponse('');

    // 🧠 ดึงข้อมูลวิชาทั้งหมดหมวดย่อ
    const flatCourses = [];
    Object.values(curriculumData).forEach((category) => {
      Object.values(category).forEach((group) => {
        if (Array.isArray(group)) {
          flatCourses.push(...group);
        }
      });
    });

    const curriculumText = flatCourses
      .map(c => `${c.code} : ${c.name} : ${c.description}`)
      .join('\n');

    const prompt = `
รหัสวิชา: ${studentInput.code}
ชื่อวิชา: ${studentInput.name}
คำอธิบาย: ${studentInput.description}
มีกี่วิชาในหลักสูตร: ${flatCourses.length} วิชา
รหัสวิชา : ชื่อวิชา score=xx,

(แสดงวิชาไม่เกิน 3 รายการ และเฉพาะที่ score > 30 เท่านั้น)

หลักสูตร:
${curriculumText}
`;

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://your-site.com',
          'X-Title': 'CourseMatcherApp'
        },
        body: JSON.stringify({
          model: 'google/gemma-3n-e4b-it:free',
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || '❌ ไม่พบคำตอบ';
      setResponse(content);

      const matches = content.matchAll(/([A-Z\-0-9]+)\s*:\s*(.+?)\s*score\s*=\s*(\d+)/g);
      const parsed = Array.from(matches).map(match => ({
        code: match[1],
        name: match[2],
        score: Number(match[3])
      }));

      setParsedData(parsed);
    } catch (err) {
      setResponse('❌ เกิดข้อผิดพลาดในการเรียกใช้ AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">🧠 เปรียบเทียบวิชานักศึกษากับหลักสูต</h2>

      <input
        type="text"
        name="code"
        placeholder="รหัสวิชา"
        value={studentInput.code}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        name="name"
        placeholder="ชื่อวิชา"
        value={studentInput.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name="description"
        placeholder="คำอธิบายรายวิชา"
        value={studentInput.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
        rows={4}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? '⌛ กำลังวิเราะ...' : '🔍 เปรียบเทียบ'}
      </button>

      <div className="mt-6 p-4 bg-gray-100 rounded whitespace-pre-wrap min-h-[100px]">
        <h3 className="font-semibold mb-2">📄 ข้อความจาก AI</h3>
        {response}
      </div>

      {parsedData.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6">📊 ตารางผลลัพธ์</h3>
          <table className="table-auto w-full border mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-2 py-1 border">รหัสวิชา</th>
                <th className="px-2 py-1 border">ชื่อวิชา</th>
                <th className="px-2 py-1 border">คะแนน</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.map((item, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border px-2 py-1">{item.code}</td>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1">{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mt-6">📈 กราฟคะแนนความคล้าย</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={parsedData} layout="vertical" margin={{ left: 40, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={200} />
              <Tooltip />
              <Bar dataKey="score" fill="#34d399">
                <LabelList dataKey="score" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default ChatMatcher;
