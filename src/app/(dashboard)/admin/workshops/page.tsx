"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Header from "../../_components/Header";
import WorkShopsList from "../../_components/WorkShopsList";

const Workshops = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col">
      <Header onSearchChange={() => {}} />
      <div className="w-full flex flex-col p-12">
        <div className="w-full h-full space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">کارگاه ها</h2>
            <div
              onClick={() => router.push("/admin/doctors/add")}
              className="px-12 py-2 bg-blue-600 rounded-md text-white text-center cursor-pointer"
            >
              افزودن کارگاه
            </div>
          </div>
          <WorkShopsList />
        </div>
      </div>
    </div>
  );
};

export default Workshops;
