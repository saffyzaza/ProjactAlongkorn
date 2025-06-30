import React from 'react';

function SaveButton({ data }) {
  const handleSave = () => {
    const fileData = JSON.stringify(data, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'updated_curriculum.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className="text-sm bg-green-600 text-white px-2 py-1 rounded"
      onClick={handleSave}
    >
      💾 บันทึกข้อมูล
    </button>
  );
}

export default SaveButton;
