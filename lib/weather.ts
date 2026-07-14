// WMO weather codes -> Thai description + emoji
// https://open-meteo.com/en/docs (weather_code table)
export function describeWeatherCode(code: number): { label: string; icon: string } {
  const map: Record<number, { label: string; icon: string }> = {
    0: { label: "ท้องฟ้าแจ่มใส", icon: "☀️" },
    1: { label: "แจ่มใสเป็นส่วนใหญ่", icon: "🌤️" },
    2: { label: "มีเมฆบางส่วน", icon: "⛅" },
    3: { label: "มีเมฆมาก", icon: "☁️" },
    45: { label: "หมอก", icon: "🌫️" },
    48: { label: "หมอกน้ำแข็ง", icon: "🌫️" },
    51: { label: "ฝนละอองเบา", icon: "🌦️" },
    53: { label: "ฝนละออง", icon: "🌦️" },
    55: { label: "ฝนละอองหนาแน่น", icon: "🌧️" },
    61: { label: "ฝนตกเล็กน้อย", icon: "🌧️" },
    63: { label: "ฝนตกปานกลาง", icon: "🌧️" },
    65: { label: "ฝนตกหนัก", icon: "⛈️" },
    80: { label: "ฝนซู่ๆ เบา", icon: "🌦️" },
    81: { label: "ฝนซู่ๆ ปานกลาง", icon: "🌧️" },
    82: { label: "ฝนซู่ๆ รุนแรง", icon: "⛈️" },
    95: { label: "พายุฝนฟ้าคะนอง", icon: "⛈️" },
    96: { label: "พายุฝนฟ้าคะนองมีลูกเห็บ", icon: "⛈️" },
    99: { label: "พายุฝนฟ้าคะนองรุนแรง", icon: "⛈️" },
  };
  return map[code] ?? { label: "ไม่ทราบสภาพอากาศ", icon: "❓" };
}

// Thai PCD PM2.5 24-hr index bands (µg/m³), revised 2022 criteria
export type AqiBand = {
  key: "verygood" | "good" | "moderate" | "unhealthy" | "hazardous";
  label: string;
  color: string;
};

export function getAqiBand(pm25: number): AqiBand {
  if (pm25 <= 25) return { key: "verygood", label: "ดีมาก", color: "#3B82F6" };
  if (pm25 <= 37.5) return { key: "good", label: "ดี", color: "#22C55E" };
  if (pm25 <= 75) return { key: "moderate", label: "ปานกลาง", color: "#EAB308" };
  if (pm25 <= 150) return { key: "unhealthy", label: "เริ่มมีผลกระทบต่อสุขภาพ", color: "#F97316" };
  return { key: "hazardous", label: "มีผลกระทบต่อสุขภาพ", color: "#DC2626" };
}

export type WeatherResult = {
  temperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  pm25: number | null;
  pm10: number | null;
};
