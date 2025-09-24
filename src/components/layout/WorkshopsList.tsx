"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import WorkshopItem from "./WorkshopItem";

const WorkshopsList = ({
  initialData,
  initialSearch,
}: {
  initialData: any;
  initialSearch: string;
}) => {
  const [workshops, setWorkshops] = useState(initialData.data || []);
  const [page, setPage] = useState(initialData.meta.current_page);
  const [lastPage, setLastPage] = useState(initialData.meta.last_page);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setWorkshops(initialData.data);
    setPage(initialData.meta.current_page);
    setLastPage(initialData.meta.last_page);
    setLoading(false);
  }, [initialData]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/workshops?page=${nextPage}`
      );
      const data = await res.json();
      setWorkshops((prev: any[]) => [...prev, ...data.data]);
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
      <div className="w-full flex flex-wrap items-center justify-center gap-16">
        {workshops.map((item: any) => (
          <WorkshopItem
            key={item.id}
            image={item.img_path}
            title={item.title}
            organizers={item.organizers}
            id={item.id}
            day={item.week_day}
            endDate={item.end_date}
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
};

export default WorkshopsList;
