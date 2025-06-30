import React from 'react';

export const TextInput = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* ซ้าย: รหัสวิชา + ชื่อวิชา */}
        <div className="flex-1 space-y-3">
          {/* รหัสวิชา */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รหัสวิชา
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกรหัสวิชา"
            />
          </div>

          {/* ชื่อวิชา */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อวิชา
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกชื่อวิชา"
            />
          </div>
        </div>

        {/* ขวา: คำอธิบายวิชา */}
        <div className="flex-1 mt-4 md:mt-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            คำอธิบายวิชา
          </label>
          <textarea
            rows={8}
            className="w-full u px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="กรอกคำอธิบายวิชาอย่างละเอียด"
          />
        </div>
      </div>
    </div>
  );
};
