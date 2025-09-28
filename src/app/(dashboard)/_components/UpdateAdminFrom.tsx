"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateAdmin } from "@/hooks/useAdmins";
import { adminSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { convertBaseDate, dateConvert } from "@/lib/utils";
import { adminType } from "@/types";
import { Combobox } from "@/components/ui/custom/Combobox";
import { roleOptions } from "@/lib/selectOptions";

const UpdateAdminFrom = ({
  onCloseModal,
  admin,
}: {
  onCloseModal: () => void;
  admin: adminType;
}) => {
  const { mutate: updateAdmin, isPending } = useUpdateAdmin(
    admin.id!,
    onCloseModal
  );
  const [birthDate, setBirthDate] = useState<any>(admin.birth_date || null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<adminType>({
    resolver: yupResolver(adminSchema),
    defaultValues: {
      name: admin.name,
      phone: admin.phone,
      birth_date: admin.birth_date,
      role: admin.role,
      password: admin.password,
    },
  });

  const onSubmit = (data: any) => {
    updateAdmin(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full p-8 space-y-7"
    >
      <h2 className="text-xl font-semibold">ویرایش مدیر</h2>

      <div className="w-full flex items-center gap-4">
        <div className="w-full">
          <label>نام و نام خانوادگی</label>
          <Input
            {...register("name")}
            className="w-full bg-white py-2 rounded-md  px-2 mt-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="w-full">
          <label>نقش</label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Combobox
                data={roleOptions || []}
                placeholder="انتخاب نقش"
                searchPlaceholder="جستجو..."
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-full">
          <label>تلفن</label>
          <Input
            {...register("phone")}
            className="w-full bg-white py-2 rounded-md  px-2 mt-2"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label>تاریخ تولد</label>
          <DatePicker
            calendar={persian}
            locale={fa}
            format="YYYY-MM-DD"
            value={dateConvert(birthDate)}
            onChange={(date: any) => {
              setBirthDate(date);
              setValue("birth_date", convertBaseDate(date));
            }}
            inputClass="w-full bg-white h-9 px-3 py-1 text-base shadow-xs rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-2 mt-2"
          />
        </div>
        <div className="w-full">
          <label>رمز عبور</label>
          <Input
            {...register("password")}
            className="w-full bg-white py-2 rounded-md  px-2 mt-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
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
          {isPending ? "در حال بروزرسانی..." : "بروزرسانی مدیر"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateAdminFrom;
