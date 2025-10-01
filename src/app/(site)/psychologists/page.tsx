import Header from "@/components/layout/Header";
import PsyList from "@/components/layout/PsyList"; // این میشه کامپوننت کلاینتی
import SearchBar from "@/components/layout/SearchBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "مشاوران - مرکز جامع مشاوره و رواندرمانی ابراز",
  description: "بهترین مشاوران و متخصصن حوزه روانشناسی و روانشناسی بالینی",
};

export default async function Psychologists({
  searchParams
}: {
  searchParams: {
    query: string;
  };
}) {
  const { query } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors?page=1&search=${query || ""}&sort_direction=asc`,
    { next: { revalidate: 5 } }
  );

  const data = await res.json();
  return (
    <div>
      <Header pageTitle="مشاوران" />
      <div className="w-full px-5 md:px-16 lg:px-12 py-12 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">
          مشاوران کلینیک رواندرمانی ابراز
        </h2>
        <p>بهترین متخصصان و رواندرمانگران در مسیر درمان همراه شما هستند.</p>
        <SearchBar />
        <PsyList initialData={data} initialSearch={query} />
      </div>
    </div>
  );
}
