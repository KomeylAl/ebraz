"use client";

import { Modal } from "@/components/common/Modal";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useWorksops } from "@/hooks/useWorkshops";
import { workshopColumns } from "@/lib/columns";
import { useState } from "react";
import { PuffLoader } from "react-spinners";

const WorkShopsList = () => {
  const [page, setPage] = useState(1); // API page از 0 شروع میشه
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading, error, refetch } = useWorksops(
    page,
    pageSize,
    search
  );
  const { isOpen, openModal, closeModal } = useModal();

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
          columns={workshopColumns}
          currentPage={data.meta.current_page}
          pageSize={data.meta.per_page}
          showActions
          totalItems={data.meta.total}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      )}

      <Modal
        showCloseButton={false}
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] bg-white"
      >
        <div className="w-full h-40 flex flex-col items-start justify-between p-10">
          <p className="text-lg">آیا از حذف این مورد اطمینان دارید؟</p>
          <div className="w-full flex items-center justify-end gap-4">
            <Button
              variant="destructive"
              size="lg"
              // className={`cursor-pointer ${
              //   isPending ? "bg-rose-400" : "bg-rose-600"
              // }`}
              // onClick={() => deleteAppointment()}
            >
              {/* {isPending ? "در حال حذف..." : "حذف"} */}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer"
              onClick={closeModal}
            >
              بازگشت
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkShopsList;
