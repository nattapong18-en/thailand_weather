"use client";

import { useState } from "react";
import Link from "next/link";
import { provinces } from "@/data/provinces";

export default function ProvinceGrid() {
  const [query, setQuery] = useState("");

  const filtered = provinces.filter(
    (p) =>
      p.nameTh.includes(query) ||
      p.nameEn.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="ค้นหาจังหวัด เช่น เชียงใหม่ หรือ Chiang Mai"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-xl border border-line bg-white px-5 py-3.5 text-sm text-ink placeholder:text-mist focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
      />

      <p className="mt-3 font-mono text-xs text-mist">
        {filtered.length} จาก {provinces.length} จังหวัด
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/province/${p.slug}`}
            className="group rounded-xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-sky hover:shadow-md"
          >
            <p className="font-medium text-ink">{p.nameTh}</p>
            <p className="mt-1 font-mono text-xs text-mist group-hover:text-sky">
              {p.nameEn}
            </p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-mist">ไม่พบจังหวัดที่ค้นหา</p>
      )}
    </div>
  );
}
