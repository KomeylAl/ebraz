import Header from "@/components/layout/Header";
import PsyList from "@/components/layout/PsyList"; // این میشه کامپوننت کلاینتی
import { Metadata } from "next";
import { headers } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "مشاوران - مرکز جامع مشاوره و رواندرمانی ابراز",
  description: "بهترین مشاوران و متخصصن حوزه روانشناسی و روانشناسی بالینی",
};

export default async function Psychologists() {
  const headersList = await headers();
  const referer = headersList.get("referer") || "";

  // اگر fullUrl رو از هدر x-url بگیریم یا دستی بسازیم
  const fullUrl =
    headersList.get("x-url") ||
    `http://localhost:3000${referer?.replace(/^.*:\/\/[^/]+/, "")}`;

  const url = new URL(fullUrl);
  const search = url.searchParams.get("search") || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors?page=1&search=${search}&sort_direction=asc`,
    { next: { revalidate: 5 } }
  );

  const data = await res.json();
  return (
    <div>
      <Header pageTitle="مشاوران" />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">
          مشاوران مرکز رواندرمانی ابراز
        </h2>
        <p>بهترین متخصصان و رواندرمانگران در مسیر درمان همراه شما هستند.</p>
        <PsyList initialData={data} initialSearch={search} />
      </div>
    </div>
  );
}
