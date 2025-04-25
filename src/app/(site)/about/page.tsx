import Image from "next/image";
import React from "react";
import logo from "../../../../public/images/logo.png";
import { BiMapPin, BiMobile, BiPhone } from "react-icons/bi";
import Header from "@/components/layout/Header";

const About = () => {
  return (
    <div>
      <Header pageTitle="درباره و تماس با ما" />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <Image src={logo} alt="" width={300} height={300} className="w-32" />
        <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-10 xl:h-[500px]">
          <div className="flex-1 space-y-5">
            <h2 className="text-xl font-semibold">
              کلینیک تخصصی مشاوره و روان درمانی ابراز
            </h2>
            <p className="text-justify">
              مرکز جامع مشاوره و رواندرمانی ابراز (با تاسیس و مدیریت دکتر علی
              محرابی، متخصص روانشناسی بالینی و عضو هیئت علمی دانشگاه اصفهان)
              دارای دپارتمان های تخصصی رواندرمانی فردی (بالینی و سلامت)، زوج
              درمانی و خانواده درمانی، گروه درمانی، بازی درمانی، درمان سوگ و
              تروما، هنردرمانی، درمان عصبی (نوروتراپی) و مشاوره های تحصیلی، شغلی
              و سازمانی. با امکان برگزاری جلسات به هر دو صورت حضوری و آنلاین (به
              ویژه برای مراجعین سایر شهرها و خارج از کشور) دارای آکادمی آموزش
              های تخصصی روانشناسی و تربیت رواندرمانگر
            </p>
            <div>
              <div className="flex gap-2 mt-6 items-center">
                <BiMapPin size={30} />{" "}
                <p>
                  اصفهان، خ هزارجریب، خ آزادی یا کلینی (مرداویج)، خ ملاصدرای
                  جنوبی، بن بست شاهد، پلاک ۹
                </p>
              </div>
              <div className="flex gap-2 mt-6 items-center">
                <BiPhone size={30} />{" "}
                <p>03191095184 - 03191093136 - 03136680262 - 03136680290</p>
              </div>
              <div className="flex gap-2 mt-6 items-center">
                <BiMobile size={30} /> <p>09228728245</p>
              </div>
            </div>
          </div>
          <div className="w-[1px] h-full bg-gray-200" />
          <div className="xl:flex-1 w-full h-[400px] overflow-hidden shadow-lg">
            {/* <MapWrapper /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
