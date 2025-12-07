"use client";

import React from "react";
import Header from "../../_components/layout/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import { useBackupDoctors } from "@/hooks/useBackup";
import { PuffLoader } from "react-spinners";
import BackupButton from "../../_components/BackupButton";

const Settings = () => {
  const { mutate: backupDoctors, isPending: doctorsPending } =
    useBackupDoctors();
  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />
      <div className="w-full flex flex-col p-12">
        <div className="w-full h-full space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">تنظیمات</h2>
          </div>
          <div className="w-full h-full flex items-start justify-between gap-4">
            <div className="w-full space-y-3">
              <h2>تهیه نسخه پشتیبان از اطلاعات</h2>
              <Accordion type="multiple">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-3">
                    {" "}
                    رواندرمانگران
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white dark:bg-gray-800 rounded-lg p-3 space-y-2">
                    <BackupButton
                      text="تهیه پشتیبان از رواندرمانگران"
                      isLoading={doctorsPending}
                      backupFn={backupDoctors}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="w-full space-y-3">
              <h2>تنظیمات اعلانات</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
