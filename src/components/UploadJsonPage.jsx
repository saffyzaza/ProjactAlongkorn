import React, { useState } from "react";
import axios from "axios";

const CourseUploader = () => {
  // state สำหรับไฟล์ JSON
  const [file, setFile] = useState(null);
  const [fileStatus, setFileStatus] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  // state สำหรับฟอร์มรายวิชา
  const [courseForm, setCourseForm] = useState({
    code: "",
    name: "",
    credit: "",
    description: "",
    type: "",
    subcategoryId: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // handle change ฟอร์ม
  const onFormChange = (e) => {
    setCourseForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormStatus("");
  };

  // handle change ไฟล์
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileStatus("");
  };

  // อัปโหลดไฟล์ JSON
  const uploadFile = async () => {
    if (!file) {
      setFileStatus("❌ กรุณาเลือกไฟล์ก่อน");
      return;
    }
    setFileLoading(true);
    setFileStatus("");

    try {
      const formData = new FormData();
      formData.append("jsonFile", file);

      const res = await axios.post("http://localhost:8080/api/import-file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFileStatus(res.data.message || "✅ อัปโหลดไฟล์สำเร็จ");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message || err);
      setFileStatus("❌ อัปโหลดไฟล์ล้มเหลว");
    } finally {
      setFileLoading(false);
    }
  };

  // ส่งฟอร์มรายวิชา
  const submitForm = async () => {
    const { code, name, credit, description, type, subcategoryId } = courseForm;
    if (!code || !name || !subcategoryId) {
      setFormStatus("❌ กรุณากรอก code, name และ subcategoryId");
      return;
    }
    setFormLoading(true);
    setFormStatus("");

    try {
      const payload = {
        code,
        name,
        credit,
        description,
        type,
        subcategory_id: parseInt(subcategoryId, 10),
      };

      const res = await axios.post("http://localhost:8080/api/import", payload);
      setFormStatus(res.data.message || "✅ สร้าง/อัปเดตรายวิชาสำเร็จ");
      setCourseForm({ code: "", name: "", credit: "", description: "", type: "", subcategoryId: "" });
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message || err);
      setFormStatus("❌ สร้าง/อัปเดตรายวิชาล้มเหลว");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8 bg-white rounded shadow">
      {/* อัปโหลดไฟล์ JSON */}
      <section>
        <h2 className="text-xl font-bold mb-2">📁 อัปโหลดไฟล์ JSON</h2>
        <input type="file" accept=".json" onChange={onFileChange} />
        <button
          onClick={uploadFile}
          disabled={fileLoading}
          className={`mt-2 px-4 py-2 rounded text-white ${
            fileLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {fileLoading ? "⏳ กำลังอัปโหลด..." : "ส่งไฟล์"}
        </button>
        {fileStatus && (
          <p className={`mt-2 p-2 rounded ${fileStatus.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {fileStatus}
          </p>
        )}
      </section>

      {/* ฟอร์มกรอกข้อมูลรายวิชา */}
      <section>
        <h2 className="text-xl font-bold mb-2">📝 สร้าง/แก้ไขรายวิชา</h2>
        <input
          name="code"
          value={courseForm.code}
          onChange={onFormChange}
          placeholder="Code"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="name"
          value={courseForm.name}
          onChange={onFormChange}
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="credit"
          value={courseForm.credit}
          onChange={onFormChange}
          placeholder="Credit"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="description"
          value={courseForm.description}
          onChange={onFormChange}
          placeholder="Description"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="type"
          value={courseForm.type}
          onChange={onFormChange}
          placeholder="Type"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="subcategoryId"
          value={courseForm.subcategoryId}
          onChange={onFormChange}
          placeholder="Subcategory ID (ตัวเลข)"
          type="number"
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={submitForm}
          disabled={formLoading}
          className={`w-full py-2 rounded text-white ${
            formLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {formLoading ? "⏳ กำลังส่ง..." : "สร้าง/อัปเดตรายวิชา"}
        </button>

        {formStatus && (
          <p className={`mt-2 p-2 rounded text-center ${formStatus.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {formStatus}
          </p>
        )}
      </section>
    </div>
  );
};

export default CourseUploader;
