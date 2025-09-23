import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import { convertBaseDate } from "@/lib/utils";
import { Button } from "../ui/button";
import DateObject from "react-date-object";

const OnlineAppointment = () => {
  const today = Date.now();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });
  const [values, setValues] = useState(
  [1, 2, 3].map((number) =>
    new DateObject({ calendar: persian, locale: persian_fa}).set({
      day: number,
      hour: number,
      minute: number,
      second: number,
    })
  )
);
  return (
    <div className="w-full flex items-start justify-center gap-6">
      <Calendar
        calendar={persian}
        locale={persian_fa}
        minDate={today}
        plugins={[<TimePicker hideSeconds/>, weekends()]}
        mapDays={({ date }) => {
          let isWeekend = [6].includes(date.weekDay.index);

          if (isWeekend)
            return {
              disabled: true,
              style: { color: "#ccc" },
              onClick: () => alert("آخر هفته ها غیر فعال هستند"),
            };
        }}
        className="calendar"
        shadow={false}
        format="YYYY/MM/DD HH:mm:ss"
        value={values}
        onChange={setValues}
      />
      <Button onClick={() => console.log(values)}>ثبت نوبت</Button>
    </div>
  );
};

export default OnlineAppointment;
