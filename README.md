# thailand-weather

เช็คสภาพอากาศและค่าฝุ่น PM2.5 ทั้ง 77 จังหวัดของไทย — Next.js 14 + TypeScript + Tailwind CSS

## ข้อมูลจาก
[Open-Meteo](https://open-meteo.com) — ฟรี ไม่ต้องขอ API key (สำหรับใช้งานส่วนตัว/ไม่ใช่เชิงพาณิชย์)

## Run locally
npm install
npm run dev

## โครงสร้าง
- app/page.tsx              — หน้าแรก, grid 77 จังหวัด (ค้นหาได้)
- app/province/[slug]/      — หน้ารายละเอียดแต่ละจังหวัด
- app/api/weather/route.ts  — API route ที่ดึงข้อมูลจาก Open-Meteo (backend เบาๆ)
- data/provinces.ts         — พิกัด lat/lon ของทั้ง 77 จังหวัด
- lib/weather.ts            — แปลง weather code เป็นภาษาไทย + เกณฑ์ PM2.5 ของไทย (PCD)


