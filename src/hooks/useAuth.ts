import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogin(onLogedIn: () => void) {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("نام کاربری یا رمز عبور اشتباه است.!");
        }
        const data = await res.json();
        console.log(data);
        throw new Error("خطا در ارسال اطلاعات!");
      }
    },
    onError(error) {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: () => {
      toast.success("با موفقیت وارد شدید. لطفا کمی صبر کنید.");
      onLogedIn();
    },
  });
}
