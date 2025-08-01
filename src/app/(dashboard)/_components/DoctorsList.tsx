"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { Modal } from "@/components/common/Modal";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import { useDeleteDoctor, useDoctors, useEditDoctor } from "@/hooks/useDoctors";
import { useModal } from "@/hooks/useModal";
import { doctorColumns } from "@/lib/columns";
import { useState } from "react";
import { BeatLoader, PuffLoader } from "react-spinners";
import EditDoctorForm from "./EditDoctorForm";

export const DoctorsList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [doctorId, setDoctorId] = useState(0);
  const [doctor, setDoctor] = useState<any>({});

  const { data, isLoading, error, refetch } = useDoctors(
    page,
    pageSize,
    search
  );

  const { mutate: deleteDoctor, isPending: isDeleting } = useDeleteDoctor(() =>
    refetch()
  );

  const { mutate: editDoctor, isPending: isEditting } = useEditDoctor(
    doctorId,
    refetch
  );

  const {
    isOpen: deleteOpen,
    openModal: openDelete,
    closeModal: closeDelete,
  } = useModal();

  const {
    isOpen: editOpen,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModal();

  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLoading && <PuffLoader size={60} color="#3e86fa" />}

      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-rose-500">خطا در دریافت اطلاعات</p>
        </div>
      )}

      {data && (
        <Table
          data={data.data}
          columns={doctorColumns}
          currentPage={data.meta.current_page}
          pageSize={data.meta.per_page}
          showActions
          totalItems={data.meta.total}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          onDelete={(item: any) => {
            setDoctorId(item.id);
            openDelete();
          }}
          onEdit={(item: any) => {
            setDoctorId(item.id);
            setDoctor(item);
            openEdit();
          }}
        />
      )}

      <Modal
        showCloseButton={false}
        isOpen={deleteOpen}
        onClose={closeDelete}
        className="max-w-[700px] bg-white"
      >
        <DeleteModal
          deleteFn={() => {
            deleteDoctor(doctorId);
            closeDelete();
          }}
          isDeleting={isDeleting}
          onCancel={closeDelete}
        />
      </Modal>

      <Modal
        showCloseButton={false}
        isOpen={editOpen}
        onClose={closeEdit}
        className="max-w-[700px] bg-white max-h-[90%] overflow-y-auto"
      >
        <EditDoctorForm
          doctor={doctor}
          onCloseModal={closeEdit}
          onDoctorEditted={() => {
            closeEdit();
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};
