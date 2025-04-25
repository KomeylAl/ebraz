import React from "react";
import BlogPostItem from "./BlogPostItem";

const blogPosts = [
  {
    title: "اولین مقاله وب سایت",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ...",
    image: "",
  },
  {
    title: "اولین مقاله وب سایت",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ...",
    image: "",
  },
  {
    title: "اولین مقاله وب سایت",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ...",
    image: "",
  },
  {
    title: "اولین مقاله وب سایت",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ...",
    image: "",
  }
];

const BlogPosts = () => {
  return (
    <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 text-center mt-10">
      <h2 className="text-3xl font-semibold">وبلاگ کلینیک ابراز</h2>
      <p className="text-xl">آخرین مقالات منتشر شده در وبلاگ مرکز ابراز</p>
      <div className="w-full flex flex-wrap items-center justify-center gap-16">
        {blogPosts.map((post: any, index: any) => (
          <BlogPostItem
            key={index}
            title={post.title}
            description={post.description}
            image={post.image}
          />
        ))}
      </div>
      <button className="w-80 px-4 py-2 bg-black/75 text-beige mt-8 rounded-md hover:text-white hover:bg-black/95 transition-all duration-300">مشاهده همه</button>
    </div>
  );
};

export default BlogPosts;
