"use client";

import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CgMenuRightAlt } from "react-icons/cg";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { useUser } from "@/hooks/useUser";
import Input from "@/components/ui/custom/Input";
import { useLogout } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { CiBellOn } from "react-icons/ci";
import { PiMoonThin } from "react-icons/pi";
import { PiSunDimLight } from "react-icons/pi";
import { useTheme } from "@/context/ThemeContext";

interface HeaderProps {
  onSearchChange: (e: any) => void;
}

const Header = ({ onSearchChange }: HeaderProps) => {
  const { data: userData } = useUser();
  const { toggleTheme } = useTheme();
  const {
    data: logoutData,
    isLoading: logoutLoading,
    refetch: logout,
  } = useLogout();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 w-full h-20 p-6 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between">
      <div className="w-full flex items-center gap-3">
        <div className="flex items-center justify-center p-2 border rounded-sm">
          <CgMenuRightAlt
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
            size={25}
            className="text-gray-500 dark:text-white"
          />
        </div>
        <Input
          onChange={onSearchChange}
          placeholder="جستجو"
          className="max-w-96 focus:ring-transparent"
        />
      </div>

      {userData && (
        <div className="w-full flex items-center justify-end gap-3">
          {/* <button
            onClick={() => {
              logout();
              router.refresh();
            }}
            className={`${
              logoutLoading ? "text-rose-300" : "text-rose-500"
            } cursor-pointer`}
          >
            <BiLogOut className="" size={20} />
          </button> */}
          <div
            className="w-12 h-12 rounded-full border cursor-pointer border-gray-200 dark:border-gray-700 flex items-center justify-center"
            onClick={toggleTheme}
          >
            <PiMoonThin className="text-gray-600 dark:hidden" size={20} />
            <PiSunDimLight className="text-gray-600 dark:text-white hidden dark:block" size={20} />
          </div>
          <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 cursor-pointer flex items-center justify-center">
            <CiBellOn className="text-gray-600 dark:text-white" size={20} />
          </div>
          <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 cursor-pointer flex items-center justify-center">
            <IoPersonOutline className="text-gray-500 dark:text-white" size={18} />
          </div>
          {/* {userData.role === "boss" ? (
            <Link href={"/admin/profile"}>
              <p className="cursor-pointer hover:text-sky-600 hidden md:block">
                {userData.name}
              </p>
            </Link>
          ) : (
            <p className="hover:text-sky-600 hidden md:block">
              {userData.name}
            </p>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Header;
