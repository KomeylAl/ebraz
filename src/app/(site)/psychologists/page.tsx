import Header from "@/components/layout/Header";
import PsyItem from "@/components/layout/PsyItem";
import React from "react";
import { PuffLoader } from "react-spinners";

export default async function Psychologists() {
  let doctors: any = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors`,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    if (response.ok) {
      doctors = await response.json();
    } else {
      doctors = [];
    }
  } catch (e: any) {
    console.log(e);
  }

  return (
    <div>
      <Header pageTitle="مشاوران" />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">
          مشاوران مرکز رواندرمانی ابراز
        </h2>
        <p>بهترین متخصصان و رواندرمانگران در مسیر درمان همراه شما هستند.</p>
        <div className="w-full flex flex-wrap items-center justify-center gap-6">
          {!doctors && <PuffLoader color="#3b82f6" size={45} />}

          {doctors &&
            doctors.data.map((item: any, index: any) => (
              <PsyItem key={index} name={item.name} image="" />
            ))}
        </div>
      </div>
    </div>
  );
}
