"use client";

import { DoctorsList } from "../../_components/DoctorsList";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/Modal";
import AddDoctorForm from "../../_components/AddDoctorForm";
import Header from "../../_components/layout/Header";

const Doctors = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch/>
      <div className="w-full flex flex-col p-12">
        <div className="w-full h-full space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">مشاورین</h2>
            <div
              onClick={openModal}
              className="px-12 py-2 bg-blue-600 rounded-md text-white text-center cursor-pointer"
            >
              افزودن مشاور
            </div>
          </div>
          <DoctorsList />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] bg-white"
        showCloseButton={false}
      >
        <AddDoctorForm
          onCloseModal={closeModal}
          onDoctorAdded={() => {
            closeModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default Doctors;
