"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";

import logo from "../../../public/images/logo-w.png";
import { BiArrowToRight } from "react-icons/bi";
import { NavItem } from "@/lib/types";
import TransitionLink from "../ui/TransitionLink";

const items = [
  {
    title: "خانه",
    link: "/",
  },
  {
    title: "دریافت نوبت",
    link: "/appointment",
  },
  {
    title: "دپارتمان ها",
    link: "/departments",
  },
  {
    title: "کارگاه ها",
    link: "/workshops",
  },
  {
    title: "وبلاگ",
    link: "/posts",
  },
  {
    title: "مشاوران",
    link: "/psychologists",
  },
  {
    title: "درباره مرکز ابراز",
    link: "/about",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full flex items-center lg:justify-between gap-6 p-4 xl:px-32 lg:py-4 ${
        isScrolled ? "bg-black/35 backdrop-blur-xl" : ""
      } transition-colors duration-200`}
    >
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
        <HiMenuAlt4 className="text-shelfish" size={30} />
      </button>
      <div
        className={`fixed top-0 right-0 z-10 lg:hidden h-screen w-56 bg-white flex flex-col items-center justify-center gap-10 shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="fixed top-10 right-10 z-10">
          <button onClick={() => setIsMenuOpen(false)}>
            <BiArrowToRight size={30} />
          </button>
        </div>
        <nav>
          <ul className="flex flex-col items-start gap-6">
            {items.map((item: NavItem) => (
              <li
                className={`${
                  pathname === item.link ? "text-gray-800" : "text-gray-500"
                } text-lg font-semibold hover:text-gray-800 transition-all duration-200`}
                key={item.link}
              >
                <TransitionLink href={item.link}>{item.title}</TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Image src={logo} alt="لوگو" width={30} height={100} />
        <p className="font-semibold text-white text-xl">مرکز ابراز</p>
      </div>
      <nav>
        <ul className={`w-full hidden lg:flex items-center gap-16 text-white`}>
          {items.map((item: NavItem) => (
            <li
              className={`${
                pathname === item.link
                  ? "text-beige font-semibold"
                  : "text-shelfish"
              } text-xl hover:text-beige transition-all duration-200`}
              key={item.link}
            >
              <TransitionLink href={item.link}>{item.title}</TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
