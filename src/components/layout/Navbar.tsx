"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { BiArrowToRight } from "react-icons/bi";
import TransitionLink from "../ui/TransitionLink";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../public/images/logo-w.png";

import workshop from "../../../public/images/in1.jpg";
import blog from "../../../public/images/blog.webp";
import appointment from "../../../public/images/appointment.webp";

// داده‌های مگامنو
const megaMenuData: any = {
  appointment: {
    title: "دریافت نوبت",
    desc: "دیدن نحوه دریافت نوبت و دریافت نوبت ارزیابی اولیه رایگان.",
    image: appointment,
    links: [
      { label: "رزرو نوبت جدید", href: "/appointment" },
      { label: "لیست روان‌درمانگران", href: "/psychologists" },
      {
        label: "دریافت نوبت ارزیابی اولیه رایگان",
        href: "/appointment/#assessment",
      },
    ],
  },
  workshops: {
    title: "کارگاه‌ها",
    desc: "کارگاه‌های تخصصی روانشناسی با مدرسین برجسته.",
    image: workshop,
    links: [
      { label: "همه کارگاه‌ها", href: "/workshops" },
      { label: "کارگاه‌های حضوری", href: "/workshops" },
      { label: "کارگاه‌های آنلاین", href: "/workshops" },
    ],
  },
  posts: {
    title: "مجله ابراز",
    desc: "مقالات علمی، نکات روانشناسی، خودآگاهی و رشد فردی.",
    image: blog,
    links: [
      { label: "مقالات تخصصی", href: "/posts?type=specialized" },
      { label: "مقالات عمومی", href: "/posts?type=general" },
      { label: "دسته‌بندی‌ها", href: "/categories" },
    ],
  },
};

const items = [
  { title: "خانه", link: "/" },
  { title: "دریافت نوبت", link: "appointment", mega: true },
  { title: "دپارتمان ها", link: "/departments" },
  { title: "کارگاه ها", link: "workshops", mega: true },
  { title: "مجله ابراز", link: "posts", mega: true },
  { title: "رواندرمانگران", link: "/psychologists" },
  { title: "درباره مرکز ابراز", link: "/about" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="w-full flex lg:flex-row-reverse items-center lg:justify-between gap-6 p-4 xl:px-32 lg:py-4 bg-black/30 backdrop-blur-md">
        {/* موبایل */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden"
        >
          <HiMenuAlt4 className="text-shelfish" size={30} />
        </button>

        {/* منوی موبایل */}
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
              {items.map((item) => (
                <li
                  key={item.link}
                  className={`${
                    pathname === item.link ? "text-gray-800" : "text-gray-500"
                  } text-lg font-semibold hover:text-gray-800 transition-all duration-200`}
                >
                  <TransitionLink
                    href={item.mega ? `/${item.link}` : item.link}
                  >
                    {item.title}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* لوگو */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="لوگو" width={30} height={100} />
          <p className="font-semibold text-white text-xl">کلینیک ابراز</p>
        </div>

        {/* دسکتاپ */}
        <nav>
          <ul className="w-full hidden lg:flex items-center gap-16 text-white">
            {items.map((item) => (
              <li
                key={item.link}
                onMouseEnter={() => item.mega && setActiveMega(item.link)}
                onMouseLeave={() => item.mega && setActiveMega(null)}
                className={`relative ${
                  pathname === item.link
                    ? "text-beige font-semibold"
                    : "text-shelfish"
                } text-xl hover:text-beige transition-all duration-200 cursor-pointer`}
              >
                {item.mega ? (
                  item.title
                ) : (
                  <TransitionLink href={item.link}>{item.title}</TransitionLink>
                )}

                {/* خط زیر لینک (Hover Effect) */}
                {item.mega && (
                  <div className="absolute left-0 right-0 -bottom-2 h-[2px] bg-beige opacity-0 group-hover:opacity-100 transition-all"></div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* مگامنو */}
      <AnimatePresence>
        {activeMega && (
          <motion.div
            key={activeMega}
            onMouseEnter={() => setActiveMega(activeMega)}
            onMouseLeave={() => setActiveMega(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 w-full h-96 bg-shelfish shadow-xl z-10 flex overflow-hidden"
          >
            {/* عکس */}
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-1/2 h-full relative"
            >
              <Image
                src={megaMenuData[activeMega].image}
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </motion.div>

            {/* محتوا */}
            <div className="w-1/2 p-12 flex flex-col gap-6 justify-center">
              <motion.h2
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="text-3xl font-bold text-gray-800"
              >
                {megaMenuData[activeMega].title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-gray-600 leading-7"
              >
                {megaMenuData[activeMega].desc}
              </motion.p>

              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                  },
                }}
                className="flex flex-col gap-3 mt-4"
              >
                {megaMenuData[activeMega].links.map((link: any) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: 10 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <TransitionLink
                      href={link.href}
                      className="text-lg text-primary hover:text-beige transition-all"
                    >
                      {link.label}
                    </TransitionLink>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
