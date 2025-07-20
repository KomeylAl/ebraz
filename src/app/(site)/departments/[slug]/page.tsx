import Header from "@/components/layout/Header";
import Image from "next/image";
import React from "react";

interface DepPageProps {
  params: {
    slug: string;
  };
}

const Department = async ({ params }: DepPageProps) => {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/departments/${slug}`,
    { next: { revalidate: 5 } }
  );

  const data = await res.json();
  return (
    <div>
      <Header
        pageTitle={data.data.title}
        bread="دپارتمان ها"
        breadLink="/departments"
      />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <div className="w-full h-64">
          <Image
            src={data.data.thumbnail}
            alt={data.data.title}
            width={1200}
            height={400}
            className="object-cover w-full h-64 rounded-lg"
          />
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h1 className="font-bold text-3xl">{data.data.title}</h1>
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

export default Department;
