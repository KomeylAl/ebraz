import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGetNotifications(
  page: number = 0,
  pageSize: number = 10,
  search: string = ""
) {
  return useQuery({
    queryKey: ["notifications", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/notifications?page=${page}&pageSize=${pageSize}&search=${search}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
}
