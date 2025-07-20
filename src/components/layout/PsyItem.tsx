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
  departments: any;
  days: string;
}

const PsyItem = ({ name, image, resume, departments, days }: PsyItemProps) => {
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
          <Image
            src={image}
            alt=""
            width={300}
            height={300}
            className="object-cover w-32 h-32"
          />
        ) : (
          <MdOutlinePerson size={60} className="text-gray-500" />
        )}
      </div>
      <p className="text-xl font-semibold">{name}</p>
      <p className="">دپارتمان ها:</p>
      <div className="w-full flex flex-wrap justify-center">
        {departments.map((item: any) => (
          <p key={item.id} className="text-sm">
            {item.title}
          </p>
        ))}
      </div>
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
            <p>برای دریافت نویت میتوانید تماس بگیرید.</p>
            <div className="w-full text-right flex flex-col items-center justify-center gap-4 mt-8">
              <p className="text-lg">تماس با یکی از شماره های:</p>
              <p className="text-xl">
                03191095184 - 03191093136 - 03136680262 - 03136680290
              </p>
              <p className="text-lg">و دریافت نوبت به صورت تلفنی.</p>
            </div>
          </div>
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
          <p>{days}</p>
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
