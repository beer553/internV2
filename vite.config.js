import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ใช้ '0.0.0.0' เพื่อให้เข้าถึงได้จากเครือข่ายภายนอก
    port: 3000, // หรือพอร์ตที่คุณต้องการใช้
  },
})
