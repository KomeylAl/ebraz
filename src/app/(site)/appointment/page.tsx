"use client";

import React from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import AnalogTimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import Header from "@/components/layout/Header";

const Appointment = () => {
  const today = Date.now();

  return (
    <div>
      <Header pageTitle="دریافت نوبت" />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">دریافت نوبت کلینیک ابراز</h2>
        <p>برای دریافت نویت میتوانید یکی از شیوه های زیر را انتخاب کنید.</p>
        <div className="w-full text-center flex flex-col items-center justify-center gap-4 mt-8">
          <div className="w-12 h-12 bg-black/85 rounded-full flex items-center justify-center text-beige text-2xl font-semibold">
            1
          </div>
          <p className="text-lg">تماس با یکی از شماره های:</p>
          <p className="text-xl">
            03191095184 - 03191093136 - 03136680262 - 03136680290
          </p>
          <p className="text-lg">و دریافت نوبت به صورت تلفنی.</p>
          <div className="w-12 h-12 bg-black/85 rounded-full flex items-center justify-center text-beige text-2xl font-semibold mt-6">
            2
          </div>
          <p className="text-lg">دریافت نوبت به صورت آنلاین</p>
          <div className="w-full flex items-start justify-center gap-6">
            <Calendar
              disabled
              calendar={persian}
              locale={persian_fa}
              minDate={today}
              plugins={[<TimePicker />, weekends()]}
              mapDays={({ date }) => {
                let isWeekend = [6].includes(date.weekDay.index);

                if (isWeekend)
                  return {
                    disabled: true,
                    style: { color: "#ccc" },
                    onClick: () => alert("آخر هفته ها غیر فعال هستند"),
                  };
              }}
              className="text-lg"
              shadow={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
