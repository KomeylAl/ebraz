import Header from "@/components/layout/Header";
import WorkshopsList from "@/components/layout/WorkshopsList";
import { headers } from "next/headers";
import React from "react";

const Workshops = async () => {
  const headersList = await headers();
  const referer = headersList.get("referer") || "";

  // اگر fullUrl رو از هدر x-url بگیریم یا دستی بسازیم
  const fullUrl =
    headersList.get("x-url") ||
    `http://localhost:3000${referer?.replace(/^.*:\/\/[^/]+/, "")}`;

  const url = new URL(fullUrl);
  const search = url.searchParams.get("search") || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/workshops?page=1&search=${search}`,
    { next: { revalidate: 5 } }
  );

  const data = await res.json();
  console.log(data);
  return (
    <div>
      <Header pageTitle="کلاس ها و کارگاه ها" />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">
          کلاس ها و کارگاه های مرکز ابراز
        </h2>
        <p>مشاهده فهرست کلاس و کارگاه های در حال برگزاری و کارگاه های آینده</p>
        <WorkshopsList initialData={data} initialSearch={search} />
      </div>
    </div>
  );
};

export default Workshops;
