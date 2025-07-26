import Header from "@/components/layout/Header";
import RegisterButton from "@/components/layout/RegisterButton";
import { dateConvert } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface WorkshopPageProps {
  params: {
    id: string;
  };
}

const Workshop = async ({ params }: WorkshopPageProps) => {
  const { id } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/workshops/${id}`,
    { next: { revalidate: 5 } }
  );

  const data = await res.json();
  console.log(data.data.participants)
  return (
    <div>
      <Header
        pageTitle={data.data.title}
        bread="کارگاه ها"
        breadLink="/workshops"
      />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <div className="w-full flex items-start justify-start gap-4">
        <div className="w-96 h-96">
          <Image
            src={data.data.img_path}
            alt={data.data.title}
            width={1200}
            height={400}
            className="object-cover w-96 h-96 rounded-lg"
          />
        </div>
        <div >
        <div className="w-full p-4 space-y-5">
          <h1 className="font-bold text-3xl">{data.data.title}</h1>
          <p>برگزار کنندگان: {data.data.organizers}</p>
          <p>روز های برگزاری: {data.data.week_day}</p>
          <p>تاریخ شروع: {dateConvert(data.data.start_date)}</p>
          <p>تاریخ پایان: {dateConvert(data.data.end_date)}</p>
          <p>زمان برگزاری: {data.data.time}</p>
          <RegisterButton id={id}/>
        </div>
        </div>
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg space-y-4">
          <div
            className="text-justify leading-8"
            dangerouslySetInnerHTML={{ __html: data.data.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default Workshop;
