import { useStoreAssessment } from "@/hooks/useAssessments";
import { assessmentSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import toast from "react-hot-toast";
import DateObject from "react-date-object";
import { convertBaseDate } from "@/lib/utils";
import Label from "@/components/ui/custom/Label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const StoreAssessmentForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const today = Date.now();
  const { mutate: storeAssessment, isPending } = useStoreAssessment(onSuccess);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(assessmentSchema),
  });

  const onSubmit = (data: any) => {
    storeAssessment(data);
  };
  return (
    <div className="w-full h-full p-8 space-y-7">
      <h2 className="text-xl font-semibold">افزودن نوبت ارزیابی اولیه</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col lg:flex-row items-start justify-center gap-6"
      >
        <div className="w-full flex flex-col items-start gap-2">
          <Calendar
            calendar={persian}
            locale={persian_fa}
            minDate={today}
            plugins={[<TimePicker hideSeconds />]}
            mapDays={({ date }) => {
              let isWeekend = [6].includes(date.weekDay.index);
              let props: any = {};

              props.style = {
                borderRadius: "3px",
              };

              if (isWeekend)
                return {
                  disabled: true,
                  style: { color: "#ccc" },
                  onClick: () => toast.error("آخر هفته ها غیر فعال هستند"),
                };

              return props;
            }}
            className="calendar dark:!bg-gray-700 dark:!border dark:!border-gray-800"
            shadow={false}
            format="YYYY/MM/DD HH:mm:ss"
            value={new DateObject()}
            onChange={(selectedDate) => {
              setValue("date", convertBaseDate(selectedDate!));
              setValue("time", `${selectedDate!.hour}:${selectedDate!.minute}`);
            }}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col items-start gap-4">
          <div className="w-full flex flex-col items-start space-y-2">
            <Label>نام و نام خانوادگی</Label>
            <Input
              {...register("name")}
              placeholder="مثلا: علی احمدی"
              className="bg-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <Label>شماره تماس</Label>
            <Input
              {...register("phone")}
              placeholder="مثلا: 09123456789"
              className="bg-white"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "در حال ثبت" : "ثبت نوبت"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StoreAssessmentForm;
