"use client";

import React from "react";
import { PuffLoader } from "react-spinners";
import { useAppointmentsByDate } from "@/hooks/useAppointments";
import Table from "@/components/common/Table";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/Modal";
import { appointmentColumns } from "@/lib/columns";

const ToDaysList = () => {
  const date = new Date().toJSON().slice(0, 10);
  const { data, isLoading } = useAppointmentsByDate(date);
  const { isOpen, openModal, closeModal } = useModal();

  console.log(data);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLoading && <PuffLoader size={60} color="#3e86fa" />}

      {data && (
        <Table
          data={data}
          columns={appointmentColumns}
          currentPage={1}
          pageSize={10}
          showActions
          totalItems={117}
          onDelete={openModal}
        />
      )}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="max-w-[500px] h-20 bg-"></div>
      </Modal>
    </div>
  );
};

export default ToDaysList;
