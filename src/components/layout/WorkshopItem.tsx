"use client";

import React from "react";
import imagee from "../../../public/images/hero1.webp";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../common/Modal";
import toast from "react-hot-toast";
import AddParticipantForm from "./AddParticipantForm";

interface WorkshopItemProps {
  title: string;
  organizers: string;
  image: string;
  id: string;
  day: string;
}

const WorkshopItem = ({
  title,
  organizers,
  image,
  id,
  day,
}: WorkshopItemProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="w-80 h-96 group rounded-md space-y-3 relative shadow-lg overflow-hidden">
      <Image
        src={image || imagee}
        alt=""
        width={400}
        height={400}
        className="absolute w-full h-full object-cover -z-10"
      />
      <div className="w-full h-full bg-linear-to-t from-black to-transparent flex flex-col items-start justify-end space-y-3 p-4">
        <p className="text-lg font-semibold text-white hover:text-beige">
          <Link href={`/workshops/${id}`}>{title}</Link>
        </p>
        <p className="text-sm text-white text-right">{organizers}</p>
        <p className="text-sm text-white text-right">{day}</p>
        <button
          onClick={openModal}
          className="w-full px-4 py-2 rounded-md border border-beige text-beige cursor-pointer hover:bg-beige hover:text-black transition duration-300"
        >
          درخواست ثبت نام
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] bg-white"
        showCloseButton={false}
      >
        <AddParticipantForm
          onCloseModal={() => {
            closeModal();
          }}
          workshopId={id}
        />
      </Modal>
    </div>
  );
};

export default WorkshopItem;
