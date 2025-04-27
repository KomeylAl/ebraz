import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAdmins(search: string = "") {
  return useQuery({
    queryKey: ["admins", search],
    queryFn: async () => {
      const res = await fetch(`/api/admins?search=${search}`);
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
  });
}
