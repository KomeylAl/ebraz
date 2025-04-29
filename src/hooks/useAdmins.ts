import { useMutation, useQuery } from "@tanstack/react-query";
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

export function useAddAdmin(onAddedAdmin: () => void) {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/admins/`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("مشکلی در افزودن مدیر پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مدیر با موفقت افزودن شد");
      onAddedAdmin();
    },
  });
}
