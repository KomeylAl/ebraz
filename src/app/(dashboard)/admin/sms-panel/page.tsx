"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import WithRole from "../../_components/WithRole";
import Header from "../../_components/layout/Header";
import { useSendMultiSms, useSendSingleSms } from "@/hooks/useSms";

const SmsPanel = () => {
  const [singlePhone, setSinglePhone] = useState("");
  const [singleText, setSingleText] = useState("");

  const [multiPhone, setMultiPhone] = useState("");
  const [multiText, setMultiText] = useState("");

  const { mutate: sendSingle, isPending: isSendingSingle } = useSendSingleSms(
    () => {}
  );
  const { mutate: sendMulti, isPending: isSendingMulti } = useSendMultiSms(
    () => {}
  );

  const sendSingleSms = () => {
    if (!singlePhone || !singleText) {
      toast.error("لطفا همه فیلد ها را پر کنید");
    } else {
      sendSingle({ phone: singlePhone, text: singleText });
    }
  };

  const processPhoneNumbers = (textareaValue: string) => {
    return textareaValue
      .split("\n") // جدا کردن بر اساس اینتر
      .map((number) => number.trim()) // حذف فضاهای اضافی
      .filter((number) => number !== ""); // حذف خطوط خالی
  };

  const sendMultiSms = async () => {
    const phones = processPhoneNumbers(multiPhone);
    if (!multiPhone || !multiText) {
      toast.error("لطفا همه فیلد ها را پر کنید");
    } else {
      sendMulti({ phones, text: multiText });
    }
  };

  return (
    <WithRole allowedRoles={["boss", "manager"]}>
      <div className="w-full h-full flex flex-col">
        <Header isShowSearch={false} searchFn={() => {}} />
        <div className="flex flex-col lg:flex-row gap-6 p-8">
          <div className="flex flex-col items-start gap-3 w-full lg:w-[40%]">
            <p className="font-semibold">ارسال پیامک تکی</p>
            <div className="w-full flex flex-col">
              <label htmlFor="message">پیام</label>
              <textarea
                name="message"
                id=""
                onChange={(e: any) => setSingleText(e.target.value)}
                className="mt-3 bg-white p-2 rounded-md w-full"
              />
              <input
                onChange={(e: any) => setSinglePhone(e.target.value)}
                type="number"
                className="mt-3 bg-white rounded-sm w-full p-2"
                placeholder="شماره تلفن"
              />
              <button
                onClick={sendSingleSms}
                disabled={isSendingSingle}
                className="px-12 py-2 bg-blue-500 rounded-sm mt-3 w-72
               text-white text-center cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSendingSingle ? "در حال ارسال" : "ارسال پیامک"}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 w-full lg:w-[40%]">
            <p className="font-semibold">ارسال پیامک گروهی</p>
            <div className="w-full flex flex-col">
              <label htmlFor="message">پیام</label>
              <textarea
                name="message"
                id=""
                onChange={(e: any) => setMultiText(e.target.value)}
                className="mt-3 bg-white p-2 rounded-md w-full"
              />
              <label className="mt-3" htmlFor="phone_numbers">
                شمار های تلفن
              </label>
              <textarea
                onChange={(e: any) => setMultiPhone(e.target.value)}
                name="phone_numbers"
                rows={10}
                className="mt-3 bg-white rounded-sm w-full p-2"
                placeholder="شماره ها را با Enter از یکدیگر جدا کنید"
              />
              <button
                onClick={() => sendMultiSms()}
                disabled={isSendingMulti}
                className="px-12 py-2 bg-blue-500 rounded-sm mt-3 w-72
               text-white text-center cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSendingMulti ? "در حال ارسال" : "ارسال پیامک"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </WithRole>
  );
};

export default SmsPanel;
