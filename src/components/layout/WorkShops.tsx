import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WorkshopItem from "./WorkshopItem";

const items = [
  {
    title: "کارگاه سلامت فردی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ...",
    image: "",
  },
  {
    title: "کارگاه سلامت فردی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ...",
    image: "",
  },
  {
    title: "کارگاه سلامت فردی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ...",
    image: "",
  },
  {
    title: "کارگاه سلامت فردی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ...",
    image: "",
  },
  {
    title: "کارگاه سلامت فردی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ...",
    image: "",
  },
  {
    title: "کارگاه سلامت فردی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ...",
    image: "",
  },
  {
    title: "کارگاه سلامت فردی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و ...",
    image: "",
  },
];

const WorkShops = () => {
  return (
    <div className="w-full h-[630px] mt-10 workshop">
      <div className="w-full h-full px-5 md:px-24 lg:px-32 py-12 space-y-6 text-center bg-black/80 text-white">
        <h2 className="text-3xl font-semibold">کلاس ها و کارگاه ها</h2>
        <p className="text-xl">لیست کلاس ها و کارگاهی های جاری در مرکز ابراز</p>
        <Carousel
          className="mt-16"
          opts={{
            align: "end",
            axis: "x",
            direction: "rtl",
          }}
        >
          <CarouselContent className="text-black">
            {items.map((item: any, index: any) => (
              <CarouselItem className="lg:basis-1/2 xl:basis-1/4" key={index}>
                <WorkshopItem
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="text-black hidden md:block" />
          <CarouselPrevious className="text-black hidden md:block" />
        </Carousel>
      </div>
    </div>
  );
};

export default WorkShops;
