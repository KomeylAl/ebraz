"use client";

import Input from "@/components/common/Input";
import { useEditDoctor } from "@/hooks/useDoctors";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { convertBaseDate, dateConvert } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface EditDoctorFormProps {
  doctor: any;
  onDoctorEditted: () => void;
  onCloseModal: () => void;
}

const EditDoctorForm = ({
  doctor,
  onDoctorEditted,
  onCloseModal,
}: EditDoctorFormProps) => {
  console.log(doctor);

  const [formData, setFormData] = useState({
    name: doctor.name,
    phone: doctor.phone,
    card_number: doctor.card_number,
    birth_date: doctor.birth_date,
    national_code: doctor.national_code,
    medical_number: doctor.medical_number,
    email: doctor.email,
  });

  const { mutate: editDoctor, isPending } = useEditDoctor(
    doctor.id,
    onDoctorEditted
  );

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
      editDoctor(formData);
    }
  };

  return (
    <div className="w-full h-full p-8 space-y-7">
      <h2 className="text-xl font-semibold">ویرایش مشاور</h2>
      <div className="w-full flex gap-3 mt-9">
        <div className="w-full">
          <label>نام و نام خانوادگی</label>
          <Input
            defaultValue={formData.name}
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
            defaultValue={formData.national_code}
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
            defaultValue={formData.phone}
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
            defaultValue={formData.medical_number}
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
            defaultValue={formData.card_number}
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
            defaultValue={formData.email}
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
            value={dateConvert(formData.birth_date)}
            calendarPosition="bottom-right"
            inputClass="w-full bg-white py-[9px] rounded-md border border-gray-300 px-2 mt-2"
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
          {isPending ? "در حال ویرایش..." : "ویرایش مشاور"}
        </Button>
      </div>
    </div>
  );
};

export default EditDoctorForm;
