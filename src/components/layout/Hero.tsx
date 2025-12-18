import React from "react";
import Link from "next/link";
import TransitionLink from "../ui/TransitionLink";

const Hero = () => {
  return (
    <section className="min-h-screen w-full hero">
      <div className="w-full min-h-screen bg-black/75 backdrop-blur-lg flex flex-col items-center justify-between pt-24 pb-10">
        <p></p>
        <div className="space-y-10 px-8">
          <h1 className="text-white text-2xl lg:text-[70px] font-semibold text-center leading-14">
            مرکز تخصصی مشاوره و رواندرمانی{" "}
            <strong className="text-beige">ابراز</strong>
          </h1>
          <p className="text-center text-white lg:text-xl">
            با تاسیس و مدیریت{" "}
            <span className="text-beige">دکتر علی محرابی</span>، متخصص روانشناسی
            بالینی و عضو هیئت علمی دانشگاه اصفهان
          </p>
          <div className="w-full flex items-center justify-center">
            <TransitionLink
              href="/appointment#assessment"
              className="text-center text-beige py-3 rounded-md border border-beige cursor-pointer hover:bg-beige hover:text-black transition duration-200 w-46 lg:w-[408px]"
            >
              دریافت نوبت ارزیابی اولیه رایگان
            </TransitionLink>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full">
            <Link
              href="/appointment"
              className="text-center text-beige py-3 rounded-md border border-beige cursor-pointer hover:bg-beige hover:text-black transition duration-200 w-46"
            >
              دریافت نوبت
            </Link>
            <Link
              href="/psychologists"
              className="text-center text-beige py-3 rounded-md border border-beige cursor-pointer hover:bg-beige hover:text-black transition duration-200 w-46"
            >
              روان‌درمانگران
            </Link>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <a href="#departments">
            <div className="w-5 h-12 mt-32 md:mt-10 border border-shelfish text-shelfish rounded-full animate-bounce flex items-end justify-center">
              .
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
