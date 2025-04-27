"use client";

import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { PuffLoader } from "react-spinners";
import { useUser } from "@/hooks/useUser";

interface WithRoleProps {
  allowedRoles: Array<String>;
  children: React.ReactNode;
}

const WithRole = ({ allowedRoles, children }: WithRoleProps) => {
  const { data } = useUser();

  const userRole = data?.role ?? null;

  if (!userRole) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <PuffLoader
          className="text-center mt-20 flex items-center justify-center"
          color={"#3fb2f2"}
          size={80}
        />
      </div>
    );
  }

  if (!allowedRoles.includes(userRole!)) {
    return (
      <div className="w-full h-full flex flex-col">
        <Header onSearchChange={() => {}} />
        <div className="w-full h-full flex items-center justify-center p-10">
          شما به این قسمت دسترسی ندرید.
        </div>
      </div>
    );
  }

  return children;
};

export default WithRole;
