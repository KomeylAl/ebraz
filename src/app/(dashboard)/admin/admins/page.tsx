"use client";

import { AdminsList } from "@/app/(dashboard)/_components/AdminsList";
import Header from "@/app/(dashboard)/_components/Header";
import { useRouter } from "next/navigation";
import React from "react";
import WithRole from "@/app/(dashboard)/_components/WithRole";

const Admins = () => {
  const router = useRouter();
  return (
    <WithRole allowedRoles={["boss"]}>
      <div className="w-full h-full flex flex-col">
        <Header onSearchChange={() => {}} />
        <div className="w-full flex flex-col p-12">
          <div className="w-full h-full space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl">مدیران</h2>
              <div
                onClick={() => router.push("/admin/admins/add")}
                className="px-12 py-2 bg-blue-600 rounded-md text-white text-center cursor-pointer"
              >
                افزودن مدیر
              </div>
            </div>
            <AdminsList />
          </div>
        </div>
      </div>
    </WithRole>
  );
};

export default Admins;
