"use client";

import { useEffect, useState } from "react";
import { Province } from "@/data/provinces";
import { describeWeatherCode, getAqiBand, WeatherResult } from "@/lib/weather";

export default function WeatherDetail({ province }: { province: Province }) {
  const [data, setData] = useState<WeatherResult | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/weather?lat=${province.lat}&lon=${province.lon}`)
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [province.lat, province.lon]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-line bg-white p-10 text-center text-mist">
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-line bg-white p-10 text-center text-mist">
        ดึงข้อมูลไม่สำเร็จ ลองรีเฟรชหน้าใหม่อีกครั้ง
      </div>
    );
  }

  const weather = describeWeatherCode(data.weatherCode);
  const aqi = data.pm25 !== null ? getAqiBand(data.pm25) : null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Weather card */}
      <div className="rounded-2xl border border-line bg-white p-8">
        <p className="font-mono text-xs uppercase tracking-wide text-mist">
          สภาพอากาศตอนนี้
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-6xl">{weather.icon}</span>
          <div>
            <p className="text-4xl font-semibold text-ink">
              {Math.round(data.temperature)}°C
            </p>
            <p className="text-sm text-mist">{weather.label}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6">
          <div>
            <p className="font-mono text-xs text-mist">ความชื้น</p>
            <p className="mt-1 text-lg font-medium text-ink">
              {data.humidity}%
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-mist">ความเร็วลม</p>
            <p className="mt-1 text-lg font-medium text-ink">
              {data.windSpeed} km/h
            </p>
          </div>
        </div>
      </div>

      {/* PM2.5 card */}
      <div className="rounded-2xl border border-line bg-white p-8">
        <p className="font-mono text-xs uppercase tracking-wide text-mist">
          ค่าฝุ่น PM2.5
        </p>
        {data.pm25 !== null && aqi ? (
          <>
            <div className="mt-4 flex items-baseline gap-3">
              <span
                className="text-5xl font-semibold"
                style={{ color: aqi.color }}
              >
                {data.pm25.toFixed(1)}
              </span>
              <span className="font-mono text-sm text-mist">µg/m³</span>
            </div>
            <span
              className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: aqi.color }}
            >
              {aqi.label}
            </span>
            <div className="mt-6 border-t border-line pt-6">
              <p className="font-mono text-xs text-mist">PM10</p>
              <p className="mt-1 text-lg font-medium text-ink">
                {data.pm10 !== null ? `${data.pm10.toFixed(1)} µg/m³` : "—"}
              </p>
            </div>
          </>
        ) : (
          <p className="mt-4 text-mist">ไม่มีข้อมูลฝุ่นสำหรับพื้นที่นี้</p>
        )}
      </div>
    </div>
  );
}
