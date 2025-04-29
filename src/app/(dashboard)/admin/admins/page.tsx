"use client";

import { AdminsList } from "@/app/(dashboard)/_components/AdminsList";
import Header from "@/app/(dashboard)/_components/Header";
import { useRouter } from "next/navigation";
import React from "react";
import WithRole from "@/app/(dashboard)/_components/WithRole";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/Modal";
import AddAdminForm from "../../_components/AddAdminForm";

const Admins = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  return (
    <WithRole allowedRoles={["boss"]}>
      <div className="w-full h-full flex flex-col">
        <Header onSearchChange={() => {}} />
        <div className="w-full flex flex-col p-12">
          <div className="w-full h-full space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl">مدیران</h2>
              <div
                onClick={openModal}
                className="px-12 py-2 bg-blue-600 rounded-md text-white text-center cursor-pointer"
              >
                افزودن مدیر
              </div>
            </div>
            <AdminsList />
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          showCloseButton={false}
          className="max-w-[700px] bg-white"
        >
          <AddAdminForm
            onCloseModal={closeModal}
            onAddedAdmin={() => {
              closeModal();
            }}
          />
        </Modal>
      </div>
    </WithRole>
  );
};

export default Admins;
