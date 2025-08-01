"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PsyItem from "@/components/layout/PsyItem";
import { PuffLoader } from "react-spinners";

export default function PsyList({
  initialData,
  initialSearch,
}: {
  initialData: any;
  initialSearch: string;
}) {
  const [doctors, setDoctors] = useState(initialData.data || []);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialData.meta.current_page);
  const [lastPage, setLastPage] = useState(initialData.meta.last_page);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/psychologists?search=${encodeURIComponent(search)}`);
    setLoading(false);
  };

  useEffect(() => {
    setDoctors(initialData.data);
    setPage(initialData.meta.current_page);
    setLastPage(initialData.meta.last_page);
    setLoading(false);
  }, [initialData]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors?page=${nextPage}&search=${search}&sort_direction=asc`
      );
      const data = await res.json();
      setDoctors((prev: any[]) => [...prev, ...data.data]);
      setPage(data.meta.current_page);
      setLastPage(data.meta.last_page);
    } catch (err) {
      console.error("Error loading more", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full flex flex-wrap items-center justify-center gap-6">
        {doctors.map((item: any) => (
          <PsyItem
            key={item.id}
            name={item.name}
            image={item.avatar}
            resume={item.resume}
            departments={item.departments}
            days={item.days}
          />
        ))}
      </div>

      {page < lastPage && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "در حال بارگذاری..." : "بارگذاری موارد بیشتر"}
        </button>
      )}

      {loading && <PuffLoader color="#3b82f6" size={45} />}
    </div>
  );
}
