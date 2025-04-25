import React from "react";
import CommentItem from "./CommentItem";

const items = [
   { name: "علی احمدی", comment: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ..." },
   { name: "علی احمدی", comment: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ..." },
   { name: "علی احمدی", comment: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ..." },
   { name: "علی احمدی", comment: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ..." },
];

const Comments = () => {
  return (
    <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 text-center mt-10">
      <h2 className="text-3xl font-semibold">نظرات مراجعین</h2>
      <p className="text-xl">نظرات برخی از مراجعین کلینیک ابراز</p>
      <div className="w-full flex flex-wrap items-center justify-center gap-5">
         {items.map((items: any, index: any) => (
            <CommentItem key={index} name={items.name} comment={items.comment}/>
         ))}
      </div>
    </div>
  );
};

export default Comments;
