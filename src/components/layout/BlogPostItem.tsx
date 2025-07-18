import Image from "next/image";
import React from "react";
import imagess from "../../../public/images/hero2.webp";
import { dateConvert } from "@/lib/utils";
import Link from "next/link";

interface BlogPostItemProps {
  title: string;
  description: string;
  image: string;
  date: string;
  slug: string;
}

const BlogPostItem = ({
  title,
  description,
  image,
  date,
  slug,
}: BlogPostItemProps) => {
  const cDate = dateConvert(date);
  function previewText(text: string, maxLength = 100) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
  return (
    <div className="w-80 group rounded-md space-y-3 relative bg-white shadow-lg">
      <Image
        src={image || imagess}
        alt=""
        width={300}
        height={300}
        className="w-full h-44 rounded-t-md object-cover saturate-0 group-hover:saturate-100 transition-all duration-300 z-10"
      />
      <div className="absolute top-28 left-0 w-12 h-40 -z-10 group-hover:-translate-x-12 rounded-l-md bg-black/85 transition-all duration-300">
        <div className="w-full h-full relative flex flex-col items-center justify-center gap-3 text-shelfish">
          <Image
            src={image || imagess}
            alt=""
            width={300}
            height={300}
            className="w-full h-40 object-cover opacity-15 absolute"
          />
          <p>{cDate.split("/")[2]}</p>
          <p>{cDate.split("/")[1]}</p>
          <p>{cDate.split("/")[0]}</p>
        </div>
      </div>
      <div className="w-full h-full p-4 flex flex-col items-start space-y-2">
        <p className="font-semibold">{title}</p>
        <p className="text-right">{previewText(description, 100)}</p>
      </div>
      <div className="w-full h-full p-4">
        <Link href={`/posts/${slug}`}>
          <div className="w-full px-4 py-2 rounded-md border border-beige text-beige group-hover:bg-black/85 transition-all duration-300">
            اطلاعات بیشتر
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostItem;
