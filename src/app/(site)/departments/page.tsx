import DepartmentsModal from "@/components/layout/DepartmentsModal";
import DepsList from "@/components/layout/DepsList";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { headers } from "next/headers";
import React from "react";

const Departments = async () => {
  const headersList = await headers();
  const referer = headersList.get("referer") || "";

  // اگر fullUrl رو از هدر x-url بگیریم یا دستی بسازیم
  const fullUrl =
    headersList.get("x-url") ||
    `http://localhost:3000${referer?.replace(/^.*:\/\/[^/]+/, "")}`;

  const url = new URL(fullUrl);
  const search = url.searchParams.get("search") || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/departments?page=1&search=${search}`,
    { next: { revalidate: 5 } }
  );

  const data = await res.json();

  
  return (
    <div>
      <Header pageTitle="دپارتمان ها" />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">دپارتمان های مرکز ابراز</h2>
        <p>دپارتمان های تخصصی ابراز را از این قسمت مشاهده کنید</p>
        <DepartmentsModal />
        <DepsList initialData={data} initialSearch={search} />
      </div>
    </div>
  );
};

export default Departments;
