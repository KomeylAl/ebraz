"use client";

import React from "react";
import { MdOutlinePerson } from "react-icons/md";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../common/Modal";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../ui/custom/Button";
import { CiTimer } from "react-icons/ci";
import { PiNewspaperThin } from "react-icons/pi";
import Image from "next/image";

interface PsyItemProps {
  name: string;
  image: string;
  resume: string;
}

const PsyItem = ({ name, image, resume }: PsyItemProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: timesOpen,
    openModal: timesOpenModal,
    closeModal: timesCloseModal,
  } = useModal();
  const {
    isOpen: resumeOpen,
    openModal: resumeOpenModal,
    closeModal: resumeCloseModal,
  } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <div className="w-80 h-96 bg-white shadow-lg rounded-md border border-gray-100 p-8 flex flex-col items-center justify-around">
      <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-white shadow-lg flex items-center justify-center overflow-hidden">
        {image ? (
          <Image src={image} alt="" width={300} height={300} className="object-cover w-32 h-32"/>
        ) : (
          <MdOutlinePerson size={60} className="text-gray-500" />
        )}
      </div>
      <p className="text-xl font-semibold">{name}</p>
      <p className="">دپارتمان ...</p>
      <div className="w-full flex items-center gap-2">
        <button
          onClick={resumeOpenModal}
          className="h-10 w-10 border border-black rounded-md cursor-pointer flex items-center justify-center text-black hover:bg-black hover:text-shelfish transition duration-300"
        >
          <PiNewspaperThin size={25} />
        </button>
        <button
          onClick={timesOpenModal}
          className="h-10 w-10 border border-black rounded-md cursor-pointer flex items-center justify-center text-black hover:bg-black hover:text-shelfish transition duration-300"
        >
          <CiTimer size={25} />
        </button>
        <button
          onClick={openModal}
          className="flex-1 px-4 h-10 hover:bg-primary border border-primary text-primary hover:text-shelfish rounded-md transition duration-300 cursor-pointer "
        >
          دریافت نوبت
        </button>
      </div>

      <Modal
        showCloseButton={false}
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pl-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              دریافت نوبت {name}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              لطفا روز و ساعت مدنظر را انتخاب کرده و اطلاعات خود را تکمیل کنید.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  روز ها و ساعات حضور مشاور
                </h5>

                {/* <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      defaultValue="https://www.facebook.com/PimjoHQ"
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input type="text" defaultValue="https://x.com/PimjoHQ" />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      defaultValue="https://www.linkedin.com/company/pimjo"
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input
                      type="text"
                      defaultValue="https://instagram.com/PimjoHQ"
                    />
                  </div>
                </div> */}
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  اطلاعات شخصی
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>نام ونام خانوادگی</Label>
                    <Input type="text" defaultValue="" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>شماره موبایل</Label>
                    <Input type="number" defaultValue="" />
                  </div>

                  <div className="col-span-2">
                    <Label>توضیحات</Label>
                    <Input type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                خروج
              </Button>
              <Button size="sm" variant="primary" onClick={handleSave}>
                ثبت نوبت
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={timesOpen}
        onClose={timesCloseModal}
        showCloseButton={false}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            روز های حضور {name}
          </h4>
        </div>
      </Modal>
      <Modal
        isOpen={resumeOpen}
        onClose={resumeCloseModal}
        showCloseButton={false}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            رزومه {name}
          </h4>
          <iframe
            src={resume}
            width="100%"
            height="600px"
            className="border rounded-lg"
          />
        </div>
      </Modal>
    </div>
  );
};

export default PsyItem;
