"use client";

import React, { useEffect, useState } from "react";
import WithRole from "@/app/(dashboard)/_components/WithRole";
import Header from "@/app/(dashboard)/_components/layout/Header";
import { useClient } from "@/hooks/useClients";
import ClientInfoTab from "@/app/(dashboard)/_components/tabs/ClientInfoTab";
import { Tab, Tabs } from "@/app/(dashboard)/_components/Tabs";
import { PuffLoader } from "react-spinners";
import Image from "next/image";
import images from "@/lib/images";
import { Button } from "@/components/ui/button";

interface Params {
  clientId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

const ClientPage = ({ params }: PageProps) => {
  const { clientId } = React.use<Params>(params);

  const { data: client, isLoading, error, refetch } = useClient(clientId);
  console.log(client);

  const [formData, setFormData] = useState({
    doctor_id: 0,
    supervisor_id: 0,
    admin_id: 0,
    record_number: "",
    reference_source: "",
    admission_date: "",
    visit_date: "",
    chief_complaints: "",
    present_illness: "",
    past_history: "",
    family_history: "",
    personal_history: "",
    mse: "",
    diagnosis: "",
    companion_name: "",
    companion_phone: "",
    companion_address: "",
  });

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    // اضافه کردن داده‌های متنی
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") {
        formDataToSend.append(key, value as string);
      }
    });
  };
  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />
      <WithRole allowedRoles={["boss", "manager"]}>
        <div className="w-full h-full p-12">
          <div className="flex-1">
            {isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader size={60} color="#3e86fa" />
              </div>
            )}
            {client?.data && (
              <div className="space-y-12">
                <h2 className="font-bold text-2xl">
                  پنل مراجع {client && client.data?.name}
                </h2>
                <Tabs>
                  <Tab label="اطلاعات شخصی مراجع" defaultTab>
                    <div className="py-4">
                      <ClientInfoTab client={client.data} />
                    </div>
                  </Tab>
                  <Tab label="پرونده پزشکی" defaultTab={false}>
                    <div className="py-4"></div>
                  </Tab>
                </Tabs>
              </div>
            )}
            {error && (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <Image
                  src={images.error}
                  alt="error image"
                  width={200}
                  height={200}
                />
                <p className="text-center">
                  متاسفیم. ظاهرا در دریافت اطلاعات مشکلی پیش اومده.
                  <br /> لطفا دوباره امتحان کنین یا اینترنتتون رو بررسی کنین.
                </p>
                <Button onClick={() => refetch()}>تلاش دوباره</Button>
              </div>
            )}
          </div>
        </div>
      </WithRole>
    </div>
  );
};

export default ClientPage;
