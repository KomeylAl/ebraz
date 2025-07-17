"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { workshopSchema } from "@/validation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertBaseDate, dateConvert } from "@/lib/utils";
import Image from "next/image";
import { useUpdateWorkshop } from "@/hooks/useWorkshops";

export default function EditWorkshopForm({
  onCloseModal,
  workshop,
}: {
  onCloseModal: () => void;
  workshop: any;
}) {
  const { mutate: updateWorkshop, isPending } = useUpdateWorkshop(
    workshop.id,
    onCloseModal
  );

  const [startDate, setStartDate] = useState<any>(workshop.start_date || null);
  const [endDate, setEndDate] = useState<any>(workshop.end_date || null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    workshop.img_path || null
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(workshopSchema),
    defaultValues: {
      title: workshop.title,
      description: workshop.description,
      organizers: workshop.organizers,
      week_day: workshop.week_day,
      time: workshop.time,
      start_date: workshop.start_date,
      end_date: workshop.end_date,
      image: null,
    },
  });

  // Watch for file input changes to show preview
  const watchImage: any = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(workshop.img_path || null);
    }
  }, [watchImage, workshop.img_path]);

  const onSubmit = (data: any) => {
    updateWorkshop(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full p-8 space-y-7"
    >
      <h2 className="text-xl font-semibold">ویرایش کارگاه</h2>

      <div className="w-full flex items-center gap-4">
        <div className="w-full">
          <label>عنوان</label>
          <Input
            {...register("title")}
            className="w-full bg-white py-2 rounded-md  px-2 mt-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="w-full">
          <label>برگزار کننده / برگزار کنندگان</label>
          <Input
            {...register("organizers")}
            className="w-full bg-white py-2 rounded-md  px-2 mt-2"
          />
          {errors.organizers && (
            <p className="text-red-500 text-sm">{errors.organizers.message}</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <label>توضیحات</label>
        <Textarea
          {...register("description")}
          className="w-full bg-white py-2 rounded-md px-2 mt-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <div className="w-full">
          <label>روز هفته</label>
          <Input
            {...register("week_day")}
            className="w-full bg-white py-2 rounded-md px-2 mt-2"
          />
        </div>
        <div className="w-full">
          <label>زمان</label>
          <Input
            {...register("time")}
            className="w-full bg-white py-2 rounded-md px-2 mt-2"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-full flex flex-col">
          <label>تاریخ شروع</label>
          <DatePicker
            calendar={persian}
            locale={fa}
            format="YYYY-MM-DD"
            value={dateConvert(startDate)}
            onChange={(date: any) => {
              setStartDate(date);
              setValue("start_date", convertBaseDate(date));
            }}
            inputClass="w-full bg-white py-1 shadow-sm rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-2 mt-2"
          />
        </div>
        <div className="w-full flex flex-col">
          <label>تاریخ پایان</label>
          <DatePicker
            calendar={persian}
            locale={fa}
            format="YYYY-MM-DD"
            value={dateConvert(endDate)}
            onChange={(date: any) => {
              setEndDate(date);
              setValue("end_date", convertBaseDate(date));
            }}
            inputClass="w-full bg-white py-1 shadow-sm rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-2 mt-2"
          />
        </div>
      </div>

      <div className="w-full">
        <label>تصویر</label>
        <Input
          type="file"
          accept="image/*"
          {...register("image")}
          className="w-full bg-white py-2 rounded-md px-2 mt-2"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
        {imagePreview && (
          <div className="mt-3">
            <Image
              src={imagePreview}
              alt="Workshop Preview"
              width={200}
              height={200}
              className="rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <Button variant="outline" onClick={onCloseModal} type="button">
          بازگشت
        </Button>
        <Button
          type="submit"
          className={`${isPending ? "bg-blue-400" : "bg-blue-600"}`}
          disabled={isPending}
        >
          {isPending ? "در حال بروزرسانی..." : "بروزرسانی کارگاه"}
        </Button>
      </div>
    </form>
  );
}
