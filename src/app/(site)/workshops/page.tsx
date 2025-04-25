import Header from "@/components/layout/Header";
import React from "react";

const Workshops = () => {
  return (
    <div>
      <Header pageTitle="کلاس ها و کارگاه ها" />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">
          کلاس ها و کارگاه های مرکز ابراز
        </h2>
        <p>مشاهده فهرست کلاس و کارگاه های در حال برگزاری و کارگاه های آینده</p>
        <div className="w-full flex flex-wrap items-center justify-center gap-6"></div>
      </div>
    </div>
  );
};

export default Workshops;
