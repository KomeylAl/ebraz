"use client";

import { Button } from "@/components/ui/button";
import { useAddDoctor } from "@/hooks/useDoctors";
import { convertBaseDate } from "@/lib/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import Input from "@/components/common/Input";

interface AddDoctorFormProps {
  onDoctorAdded: () => void;
  onCloseModal: () => void;
}

const AddDoctorForm = ({ onDoctorAdded, onCloseModal }: AddDoctorFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    card_number: "",
    birth_date: "",
    national_code: "",
    medical_number: "",
    email: "",
  });

  const { mutate: addDoctor, isPending, error } = useAddDoctor(onDoctorAdded);

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.card_number ||
      !formData.birth_date ||
      !formData.national_code ||
      !formData.medical_number ||
      !formData.email
    ) {
      toast.error("لطفا همه فیلد هارا پر کنید");
    } else {
      addDoctor(formData);
    }
  };

//   console.log(error);

  return (
    <div className="w-full h-full p-8 space-y-7">
      <h2 className="text-xl font-semibold">افزودن مشاور</h2>
      <div className="w-full flex gap-3 mt-9">
        <div className="w-full">
          <label>نام و نام خانوادگی</label>
          <Input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            type="text"
            className="mt-2"
          />
        </div>
        <div className="w-full">
          <label>کد ملی</label>
          <Input
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                national_code: e.target.value,
              }))
            }
            type="number"
            className="mt-2"
          />
        </div>
        <div className="w-full">
          <label>شماره تلفن</label>
          <Input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            type="number"
            className="mt-2"
          />
        </div>
      </div>
      <div className="w-full flex gap-3 mt-9">
        <div className="w-full">
          <label>شماره نظام روانشناسی</label>
          <Input
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                medical_number: e.target.value,
              }))
            }
            type="number"
            className="mt-2"
          />
        </div>
        <div className="w-full">
          <label>شماره کارت</label>
          <Input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, card_number: e.target.value }))
            }
            type="number"
            className="mt-2"
          />
        </div>
      </div>
      <div className="w-full flex gap-3 mt-9">
        <div className="w-full">
          <label>ایمیل</label>
          <Input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            className="mt-2"
          />
        </div>
        <div className="w-full">
          <label>تاریخ تولد</label>
          <DatePicker
            calendarPosition="bottom-right"
            inputClass="w-full bg-white py-[9px] rounded-md border border-gray-300 px-2 mt-2 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:border-ray-700"
            containerClassName="w-full"
            onChange={(value: any) =>
              setFormData((prev) => ({
                ...prev,
                birth_date: convertBaseDate(value),
              }))
            }
            calendar={persian}
            locale={fa}
            format="YYYY-MM-DD"
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-3">
        <Button
          variant="outline"
          size="lg"
          className="cursor-pointer"
          onClick={onCloseModal}
        >
          بازگشت
        </Button>
        <Button
          variant="default"
          size="lg"
          className={`cursor-pointer ${
            isPending ? "bg-blue-400" : "bg-blue-600"
          }`}
          onClick={handleSubmit}
        >
          {isPending ? "در حال افزودن..." : "افزودن مشاور"}
        </Button>
      </div>
    </div>
  );
};

export default AddDoctorForm;
