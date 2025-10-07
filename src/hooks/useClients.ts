import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useClients(
  page: number = 0,
  pageSize: number = 10,
  search: string = ""
) {
  return useQuery({
    queryKey: ["clients", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/clients?page=${page}&pageSize=${pageSize}&search=${search}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
}

export function useClient(clientId: string = "") {
  return useQuery({
    queryKey: ["client"],
    queryFn: async () => {
      const res = await fetch(`/api/clients/${clientId}`);
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
}

export function useDeleteClient(onSuccess: () => void) {
  return useMutation({
    mutationFn: async (clientId: string) => {
      const res = await fetch(`/api/clients/${clientId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف مراجع پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مراجع با موفقیت حذف شد");
      onSuccess();
    },
  });
}
