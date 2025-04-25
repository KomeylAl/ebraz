"use client";

import React, { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { CgMenuRightAlt } from "react-icons/cg";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { useUser } from "@/hooks/useUser";
import Input from "@/components/ui/custom/Input";

interface HeaderProps {
  onSearchChange: () => void;
}

const Header = ({ onSearchChange }: HeaderProps) => {
  const { data: userData } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white w-full h-20 p-6 border-b border-gray-300 flex items-center justify-between">
      <div className="w-full flex items-center gap-3">
        <div className="flex items-center justify-center p-2 border rounded-sm">
          <CgMenuRightAlt
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
            size={25}
            className="text-gray-500"
          />
        </div>
        <Input placeholder="جستجو" className="max-w-96 focus:ring-transparent" />
      </div>

      {userData && (
        <div className="w-full flex items-center justify-end gap-3">
          <div
            className={`${
              isLoading ? "text-rose-300" : "text-rose-500"
            } cursor-pointer`}
          >
            <BiLogOut className="" size={20} />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            {userData.role === "boss" ? (
              <Link href={"/admin/profile"}>
                <IoMdPerson className="text-gray-400" size={20} />
              </Link>
            ) : (
              <IoMdPerson className="text-gray-400" size={20} />
            )}
          </div>
          {userData.role === "boss" ? (
            <Link href={"/admin/profile"}>
              <p className="cursor-pointer hover:text-sky-600 hidden md:block">
                {userData.name}
              </p>
            </Link>
          ) : (
            <p className="hover:text-sky-600 hidden md:block">
              {userData.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
