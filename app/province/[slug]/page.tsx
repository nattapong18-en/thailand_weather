import Link from "next/link";
import { notFound } from "next/navigation";
import { provinces } from "@/data/provinces";
import WeatherDetail from "@/components/WeatherDetail";

export function generateStaticParams() {
  return provinces.map((p) => ({ slug: p.slug }));
}

export default function ProvincePage({
  params,
}: {
  params: { slug: string };
}) {
  const province = provinces.find((p) => p.slug === params.slug);
  if (!province) return notFound();

  return (
    <main className="min-h-screen">
      <section className="border-b border-line bg-white px-6 py-12 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="font-mono text-xs text-mist transition-colors hover:text-sky"
          >
            ← กลับไปทุกจังหวัด
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {province.nameTh}
          </h1>
          <p className="mt-2 font-mono text-sm text-mist">
            {province.nameEn} · {province.lat}, {province.lon}
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-4xl">
          <WeatherDetail province={province} />
        </div>
      </section>
    </main>
  );
}
