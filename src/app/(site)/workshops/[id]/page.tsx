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
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/workshops/${id}`,
    { next: { revalidate: 5 } }
  );

  const data = await res.json();
  const date = new Date(data.data.end_date);
  const now = new Date();
  return (
    <div>
      <Header
        pageTitle={data.data.title}
        bread="کارگاه ها"
        breadLink="/workshops"
      />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row items-start justify-start gap-4">
          <div className="w-96 h-96 relative overflow-hidden">
            <div
              className={`absolute w-48 h-10 ${
                date < now
                  ? "bg-primary text-shelfish"
                  : "bg-beige/80 backdrop-blur-sm text-zinc-900"
              } top-5 -right-15 rotate-45 flex items-center justify-center`}
            >
              {date < now ? "برگزار شده" : "در حال برگزاری"}
            </div>
            <Image
              src={data.data.img_path}
              alt={data.data.title}
              width={1200}
              height={400}
              className="object-cover w-96 h-96 rounded-lg"
            />
          </div>
          <div>
            <div className="w-full p-4 space-y-5">
              <h1 className="font-bold text-3xl">{data.data.title}</h1>
              <p>برگزار کنندگان: {data.data.organizers}</p>
              <p>روز های برگزاری: {data.data.week_day}</p>
              <p>تاریخ شروع: {dateConvert(data.data.start_date)}</p>
              <p>تاریخ پایان: {dateConvert(data.data.end_date)}</p>
              <p>زمان برگزاری: {data.data.time}</p>
              {date < now ? (
                <div className="w-full px-4 py-2 rounded-md border border-primary text-primary flex items-center justify-center hover:bg-beige hover:text-black transition duration-300">
                  زمان ثبت نام این کارگاه به پایان رسیده است.
                </div>
              ) : (
                <RegisterButton id={id} />
              )}
            </div>
          </div>
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg space-y-4">
          <div
            className="text-justify leading-8"
            dangerouslySetInnerHTML={{ __html: data.data.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default Workshop;
