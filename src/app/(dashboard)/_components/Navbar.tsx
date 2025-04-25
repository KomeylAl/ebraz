"use client";

import { MdClass, MdDashboard, MdPayment } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiList } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { IoPerson } from "react-icons/io5";
import { BiEnvelope } from "react-icons/bi";
import { useUser } from "@/hooks/useUser";
import { PuffLoader } from "react-spinners";

const Navbar = () => {
  const links = [
    {
      title: "داشبورد",
      link: "/admin",
      access: ["admin", "boss"],
      icon: <MdDashboard />,
    },
    {
      title: "نوبت ها",
      link: "/admin/appointments",
      access: ["admin", "boss"],
      icon: <SlCalender />,
    },
    {
      title: "مراجعان",
      link: "/admin/clients",
      access: ["admin", "boss"],
      icon: <FiList />,
    },
    {
      title: "مشاورین",
      link: "/admin/doctors",
      access: ["admin", "boss"],
      icon: <IoPerson />,
    },
    {
      title: "پرداخت ها",
      link: "/admin/payments",
      access: ["admin", "boss"],
      icon: <MdPayment />,
    },
    {
      title: "کلاس ها و کارگاه ها",
      link: "/admin/classes",
      access: ["admin", "boss"],
      icon: <MdClass />,
    },
    {
      title: "پنل پیامک",
      link: "/admin/sms-panel",
      access: ["admin", "boss"],
      icon: <BiEnvelope />,
    },
    {
      title: "مدیران سایت",
      link: "/admin/admins",
      access: ["boss"],
      icon: <FiList />,
    },
    {
      title: "داشبورد محتوا",
      link: "/admin/admins",
      access: ["author"],
      icon: <FiList />,
    },
  ];

  const pathName = usePathname();

  const { data, isLoading, error } = useUser();

  return (
    <div className="flex flex-col gap-4 w-full">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" size={45} />
        </div>
      )}

      {error && <p>خطا در دریافت اطلاعات</p>}

      {data &&
        links.map(
          (link) =>
            link.access.includes(data.role) && (
              <Link
                key={link.link}
                href={link.link}
                className={`flex items-center gap-2 text-lg w-full px-4 py-2 ${
                  pathName === link.link
                    ? "bg-blue-100 text-blue-600 font-semibold rounded-sm"
                    : "bg-transparent"
                }`}
              >
                {link.icon} {link.title}
              </Link>
            )
        )}
    </div>
  );
};

export default Navbar;
