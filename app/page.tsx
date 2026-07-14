import ProvinceGrid from "@/components/ProvinceGrid";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-line bg-white px-6 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky">
            Live weather & air quality
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            สภาพอากาศ &amp; PM2.5 ทั่วไทย
          </h1>
          <p className="mt-4 max-w-xl text-mist">
            เลือกจังหวัดที่อยากดู ระบบจะดึงข้อมูลอุณหภูมิ ความชื้น
            และค่าฝุ่น PM2.5 แบบเรียลไทม์จาก Open-Meteo
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <ProvinceGrid />
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs text-mist">
            ข้อมูลจาก Open-Meteo · อัปเดตทุก 10 นาที
          </p>
        </div>
      </footer>
    </main>
  );
}
