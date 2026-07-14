import { NextRequest, NextResponse } from "next/server";
import { WeatherResult } from "@/lib/weather";

// GET /api/weather?lat=13.72&lon=100.52
// Combines Open-Meteo's forecast + air-quality endpoints into one response.
// No API key required — Open-Meteo is free for non-commercial use.
export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "missing lat/lon" }, { status: 400 });
  }

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`;
  const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm2_5,pm10&timezone=Asia%2FBangkok`;

  try {
    const [weatherRes, airRes] = await Promise.all([
      fetch(weatherUrl, { next: { revalidate: 600 } }),
      fetch(airUrl, { next: { revalidate: 600 } }),
    ]);

    if (!weatherRes.ok) {
      throw new Error(`weather api ${weatherRes.status}`);
    }

    const weatherData = await weatherRes.json();
    const airData = airRes.ok ? await airRes.json() : null;

    const result: WeatherResult = {
      temperature: weatherData.current?.temperature_2m ?? 0,
      humidity: weatherData.current?.relative_humidity_2m ?? 0,
      weatherCode: weatherData.current?.weather_code ?? 0,
      windSpeed: weatherData.current?.wind_speed_10m ?? 0,
      pm25: airData?.current?.pm2_5 ?? null,
      pm10: airData?.current?.pm10 ?? null,
    };

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "failed to fetch weather data" },
      { status: 502 }
    );
  }
}
