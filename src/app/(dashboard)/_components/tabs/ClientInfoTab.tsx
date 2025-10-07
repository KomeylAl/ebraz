import { Input } from "@/components/ui/input";
import { dateConvert } from "@/lib/utils";
import React from "react";

interface ClientInfoTabProps {
  client: any;
}

const ClientInfoTab = ({ client }: ClientInfoTabProps) => {
  return (
    <div>
      {client && (
        <div className="">
          <div className="w-full mt-4 flex items-center justify-between gap-3">
            <Input
              type="text"
              className="bg-white"
              value={client.name}
              onChange={() => {}}
            />
            <Input
              type="text"
              className="bg-white"
              value={client.phone}
              onChange={() => {}}
            />
          </div>
          <div className="w-full mt-4 flex items-center justify-center gap-3">
            <Input
              type="text"
              className="bg-white"
              value={dateConvert(client.birth_date)}
            />
            <Input
              type="text"
              className="bg-white"
              value={client.address}
              onChange={() => {}}
            />
          </div>
          {/* <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>مشخصات همراه</h3>
                <div className="w-full mt-4 flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={formData.companion_name}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        companion_name: e.target.value,
                      }))
                    }
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="نام و نام خانوادگی*"
                    required
                  />
                  <input
                    type="text"
                    value={formData.companion_phone}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        companion_phone: e.target.value,
                      }))
                    }
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="شماره تلفن*"
                    required
                  />
                  <input
                    type="text"
                    value={formData.companion_address}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        companion_address: e.target.value,
                      }))
                    }
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="آدرس"
                  />
                </div>
              </div> */}
          {/* <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>اطلاعات اصلی پرونده</h3>
                <div className="w-full mt-4 flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={formData.record_number}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        record_number: e.target.value,
                      }))
                    }
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="شماره پرونده*"
                    required
                  />
                  <input
                    type="text"
                    value={formData.reference_source}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        reference_source: e.target.value,
                      }))
                    }
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="منبع ارجاع"
                    required
                  />
                  <ReactSelect
                    className="w-full rounded-sm p-2"
                    placeholder="روانشناس*"
                    options={doctorsOptions}
                    onChange={handleDoctorsChange}
                    required
                  />
                  <ReactSelect
                    className="w-full rounded-sm p-2"
                    placeholder="سوپروایزر*"
                    options={superVisorsOptions}
                    onChange={handleSuperVisorsChange}
                    required
                  />
                </div>
              </div> */}
          {/* <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>طلاعات پذیرش</h3>
                <div className="w-full mt-4 flex items-center justify-between gap-3">
                  <ReactSelect
                    className="w-full rounded-sm p-2"
                    placeholder="پذیرش کننده*"
                    options={adminsOptions}
                    onChange={handleAdminsChange}
                    required
                  />
                  <DatePicker
                    calendarPosition="bottom-right"
                    inputClass="w-full bg-white p-2 rounded-sm"
                    containerClassName="w-full"
                    placeholder="تاریخ مراجعه*"
                    value={dateConvert(client.data.record.admission_date)}
                    onChange={handleAdmissionDateChange}
                    calendar={persian}
                    locale={fa}
                    format="YYYY-MM-DD"
                  />
                  <DatePicker
                    calendarPosition="bottom-right"
                    inputClass="w-full bg-white p-2 rounded-sm"
                    containerClassName="w-full"
                    placeholder="تاریخ ویزیت*"
                    onChange={handleVisitDateChange}
                    calendar={persian}
                    locale={fa}
                    format="YYYY-MM-DD"
                  />
                </div>
              </div> */}

          {/* <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Chief Complaints</h3>
                <textarea
                  value={formData.chief_complaints}
                  onChange={(e: any) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      chief_complaints: e.target.value,
                    }))
                  }
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Present Ilness</h3>
                <textarea
                  value={formData.present_illness}
                  onChange={(e: any) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      present_illness: e.target.value,
                    }))
                  }
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Past History</h3>
                <textarea
                  value={formData.past_history}
                  onChange={(e: any) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      past_history: e.target.value,
                    }))
                  }
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Family History</h3>
                <textarea
                  value={formData.family_history}
                  onChange={(e: any) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      family_history: e.target.value,
                    }))
                  }
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Personal History</h3>
                <textarea
                  value={formData.personal_history}
                  onChange={(e: any) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      personal_history: e.target.value,
                    }))
                  }
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>MSE</h3>
                <textarea
                  value={formData.mse}
                  onChange={(e: any) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      mse: e.target.value,
                    }))
                  }
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Diagnosis</h3>
                <textarea
                  value={formData.diagnosis}
                  onChange={(e: any) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      diagnosis: e.target.value,
                    }))
                  }
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
            </div>
            <div className="w-[30%] bg-white/45 rounded-sm p-4">
              <h3>ویرایش پرونده</h3>
              <div className="w-full flex items-center gap-4 mt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-500 text-center text-white p-2 rounded-sm"
                >
                  ویرایش
                </button>
                <Link
                  href="/admin/clients"
                  className="w-full border border-blue-500 text-center p-2 rounded-sm"
                >
                  لغو تغییرات
                </Link>
              </div>
              <div className="mt-8">
                <h3>تصاویر پرونده</h3>
                <FileUploader
                  images={client.data.record.images || []}
                  onFilesSelected={handleFilesSelected}
                  allowMultiple
                />
              </div> */}
        </div>
      )}
    </div>
  );
};

export default ClientInfoTab;
