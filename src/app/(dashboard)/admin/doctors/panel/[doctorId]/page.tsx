"use client";

import DoctorSevenDays from "@/app/(dashboard)/_components/DoctorSevenDays";
import DoctorThirtyDays from "@/app/(dashboard)/_components/DoctorThirtyDays";
import Header from "@/app/(dashboard)/_components/layout/Header";
import { Tab, Tabs } from "@/app/(dashboard)/_components/Tabs";
import WithRole from "@/app/(dashboard)/_components/WithRole";
import { useSendTodaySms, useSendTomorrowSms } from "@/hooks/useDoctors";
import React from "react";

interface Params {
  doctorId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

const DoctorPanel = ({ params }: PageProps) => {
  const { doctorId } = React.use<Params>(params);
  const {
    isLoading: todaySmsLoading,
    error: todaySmsError,
    refetch: sendTodaySms,
  } = useSendTodaySms(doctorId);
  const {
    isLoading: tomorrowSmsLoading,
    error: tomorrowSmsError,
    refetch: sendTomorrowSms,
  } = useSendTomorrowSms(doctorId);

  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />
      <WithRole allowedRoles={["boss", "manager"]}>
        <div className="w-full p-12">
          <div className="w-full h-full space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl">پنل مشاور</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => sendTodaySms()}
                  className={`px-12 py-2 rounded-md text-white text-center cursor-pointer ${
                    todaySmsLoading ? "bg-blue-400" : "bg-blue-600"
                  }`}
                >
                  {todaySmsLoading
                    ? "در حال ارسال..."
                    : "ارسال پیامک نوبت های امروز"}
                </button>
                <button
                  onClick={() => sendTomorrowSms()}
                  className={`px-12 py-2 rounded-md text-white text-center cursor-pointer ${
                    tomorrowSmsLoading ? "bg-blue-400" : "bg-blue-600"
                  }`}
                >
                  {tomorrowSmsLoading
                    ? "در حال ارسال..."
                    : "ارسال پیامک نوبت های فردا"}
                </button>
              </div>
            </div>
            <div className="mt-12 flex-1">
              <Tabs>
                <Tab label="نوبت های هفت روز گذشته" defaultTab>
                  <div className="py-4">
                    <DoctorSevenDays doctorId={doctorId} />
                  </div>
                </Tab>
                <Tab label="نوبت های سی روز گذشته" defaultTab={false}>
                  <div className="py-4">
                    <DoctorThirtyDays doctorId={doctorId} />
                  </div>
                </Tab>
                <Tab label="اطلاعات" defaultTab={false}>
                  <div className="py-4">
                    
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </WithRole>
    </div>
  );
};

export default DoctorPanel;
