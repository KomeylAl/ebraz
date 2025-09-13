import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiFolderOn, CiShoppingTag } from "react-icons/ci";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/categories/${slug}`,
    { next: { revalidate: 5 } }
  );

  const data = await res.json();
  return (
    <div>
      <Header
        pageTitle={data.data.name}
        bread="دسته بندی ها"
        breadLink="/posts"
      />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <div className="w-full h-64">
          <Image
            src={data.data.image}
            alt={data.data.name}
            width={1200}
            height={400}
            className="object-cover w-full h-64 rounded-lg"
          />
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h1 className="font-bold text-3xl">{data.data.name}</h1>
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

export default CategoryPage;
