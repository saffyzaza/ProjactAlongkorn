import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: 'true', // อนุญาตเข้าจากทุก IP
    port: 5173,      // พอร์ตที่ใช้ (ปรับตามต้องการ)
    allowedHosts: [
      '.loca.lt',
      '127.0.0.1',
      '.ngrok-free.app', // อนุญาตโดเมน ngrok ทุกโดเมนที่ลงท้ายด้วย ngrok-free.app
    ],
  },
})
