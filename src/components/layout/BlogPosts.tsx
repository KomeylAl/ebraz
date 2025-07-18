import React from "react";
import BlogPostItem from "./BlogPostItem";
import Link from "next/link";

// const blogPosts = [
//   {
//     title: "اولین مقاله وب سایت",
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ...",
//     image: "",
//   },
//   {
//     title: "اولین مقاله وب سایت",
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ...",
//     image: "",
//   },
//   {
//     title: "اولین مقاله وب سایت",
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ...",
//     image: "",
//   },
//   {
//     title: "اولین مقاله وب سایت",
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ...",
//     image: "",
//   }
// ];

const BlogPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/posts?page=0&per_page=4`,
    { next: { revalidate: 5 } }
  );

  const data = await response.json();
  return (
    <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-8 text-center mt-10">
      <h2 className="text-3xl font-semibold">وبلاگ کلینیک ابراز</h2>
      <p className="text-xl">آخرین مقالات منتشر شده در وبلاگ مرکز ابراز</p>
      <div className="w-full flex flex-wrap items-center justify-center gap-16">
        {data.data.map((post: any, index: any) => {
          if (post.status === "published") {
            return (
              <BlogPostItem
                key={index}
                title={post.title}
                description={post.excerpt}
                image={post.thumbnail}
                date={post.published_at}
                slug={post.slug}
              />
            );
          }
        })}
      </div>
      <Link
        href="/posts"
        className="w-80 px-20 py-2 bg-black/75 text-beige mt-12 rounded-md hover:text-white hover:bg-black/95 transition-all duration-300"
      >
        مشاهده همه
      </Link>
    </div>
  );
};

export default BlogPosts;
