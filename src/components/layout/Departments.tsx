import React from "react";
import Image from "next/image";

import dep1 from "../../../public/images/d-item-1.png";
import dep2 from "../../../public/images/d-item-2.png";
import dep3 from "../../../public/images/d-item-3.png";
import dep4 from "../../../public/images/d-item-4.png";
import dep5 from "../../../public/images/d-item-5.png";
import dep6 from "../../../public/images/d-item-6.png";
import dep7 from "../../../public/images/d-item-7.png";
import dep8 from "../../../public/images/d-item-8.png";
import Link from "next/link";

// const departments = [
//   {
//     title: "رواندرمانی فردی (بالینی و سلامت)",
//     image: dep1,
//   },
//   {
//     title: "زوج درمانی و خانواده درمانی",
//     image: dep2,
//   },
//   {
//     title: "گروه درمانی",
//     image: dep3,
//   },
//   {
//     title: "بازی درمانی",
//     image: dep4,
//   },
//   {
//     title: "درمان سوگ و تروما",
//     image: dep5,
//   },
//   {
//     title: "هنر درمانی",
//     image: dep6,
//   },
//   {
//     title: "درمان عصبی (نوروتراپی)",
//     image: dep7,
//   },
//   {
//     title: "مشاوره های تحصیلی، شغلی و سازمانی",
//     image: dep8,
//   },
// ];

const Departments = async () => {
  let departments: any = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/departments`,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    if (response.ok) {
      departments = await response.json();
    } else {
      departments = [];
    }
  } catch (e: any) {
    console.log(e);
  }

  return (
    <div
      className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 text-center"
      id="departments"
    >
      <h2 className="text-3xl font-semibold">دپارتمان های کلینیک ابراز</h2>
      <p className="text-xl">
        دپارتمان های تخصصی مرکز مشاوره و رواندرمانی ابراز
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {!departments && <p>در حال بارگزاری اطلاعات...</p>}
        {departments &&
          departments.data.map((d: any) => (
            <Link key={d.id} href={`/departments/${d.slug}`}>
              <Image
                src={d.thumbnail}
                width={600}
                height={300}
                alt={d.title}
                className="object-cover w-80 saturate-0 hover:saturate-100 transition-all duration-500"
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Departments;
