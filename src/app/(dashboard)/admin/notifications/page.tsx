"use client";

import { Modal } from "@/components/common/Modal";
import Header from "../../_components/layout/Header";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useModal } from "@/hooks/useModal";
import { PuffLoader } from "react-spinners";
import Table from "@/components/common/Table";
import { clientColumns, notificationColumns } from "@/lib/columns";
import AdminEditComp from "../../_components/AdminEditComp";
import { useGetNotifications } from "@/hooks/useNotifications";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading, error, refetch } = useGetNotifications(
    page,
    pageSize,
    search
  );

  const debouncedSearch = useCallback(
    debounce((text) => {
      setSearch(text);
      refetch();
    }, 300),
    [refetch]
  );

  const onSearchChange = (e: any) => {
    debouncedSearch(e.target.value);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={onSearchChange} isShowSearch />
      <div className="w-full flex flex-col p-12">
        <div className="w-full h-full space-y-6">
          <h2 className="font-bold text-2xl">اعلانات</h2>
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
                columns={notificationColumns}
                currentPage={data.current_page}
                pageSize={data.page_size}
                totalItems={data.total}
                onPageChange={(newPage) => {
                  setPage(newPage);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
