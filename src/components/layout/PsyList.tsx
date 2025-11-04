"use client";

import React, { useEffect, useState } from "react";
import PsyItem from "@/components/layout/PsyItem";
import { PuffLoader } from "react-spinners";
import { Button } from "../ui/button";

export default function PsyList({
  initialData,
  initialSearch,
}: {
  initialData: any;
  initialSearch: string;
}) {
  const [doctors, setDoctors] = useState(initialData.data || []);
  const [page, setPage] = useState(initialData.meta.current_page);
  const [lastPage, setLastPage] = useState(initialData.meta.last_page);
  const [loading, setLoading] = useState(false);

  console.log(initialData);

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
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors?page=${nextPage}&sort_direction=asc`
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
        {Array.isArray(doctors) && doctors.length === 0 && (
          <p className="text-gray-500">هیچ مشاوری پیدا نشد.</p>
        )}

        {doctors.map((item: any) => (
          <PsyItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.avatar}
            resume={item.resume}
            departments={item.departments}
            days={item.days}
          />
        ))}
      </div>

      {page < lastPage && (
        <Button onClick={loadMore} disabled={loading}>
          {loading ? "در حال بارگذاری..." : "بارگذاری موارد بیشتر"}
        </Button>
      )}

      {loading && <PuffLoader color="#3b82f6" size={45} />}
    </div>
  );
}
