import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDoctors(
  page: number = 0,
  pageSize: number = 10,
  search: string = ""
) {
  return useQuery({
    queryKey: ["doctors", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/doctors?page=${page}&size=${pageSize}&search=${search}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    // placeholderData: (prev) => prev,
  });
}

export function useDoctorSevenDays(
  doctorId: string,
  page: number = 0,
  pageSize: number = 10,
  search: string = ""
) {
  return useQuery({
    queryKey: ["doctorSevenDays", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/doctors/${doctorId}/sevenDays?page=${page}&size=${pageSize}&search=${search}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
}

export function useDoctorThirtyDays(
  doctorId: string,
  page: number = 0,
  pageSize: number = 10,
  search: string = ""
) {
  return useQuery({
    queryKey: ["doctorThirtyDays", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/doctors/${doctorId}/thirtyDays?page=${page}&size=${pageSize}&search=${search}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
}

export function useSendTodaySms(doctorId: string) {
  return useQuery({
    queryKey: ["todaySms"],
    queryFn: async () => {
      const res = await fetch(`/api/doctors/${doctorId}/todaySms`);
      if (res.status !== 200) {
        const data = await res.json();
        toast.error("خطا در ارسال پیامک");
        console.log(data);
      }
      toast.success("پیامک با موفقیت ارسال شد");
      return res.json();
    },
    enabled: false,
  });
}

export function useSendTomorrowSms(doctorId: string) {
  return useQuery({
    queryKey: ["tomorrowSms"],
    queryFn: async () => {
      const res = await fetch(`/api/doctors/${doctorId}/tomorrowSms`);
      if (res.status !== 200) {
        const data = await res.json();
        toast.error("خطا در ارسال پیامک");
        console.log(data);
      }
      toast.success("پیامک با موفقیت ارسال شد");
      return res.json();
    },
    enabled: false,
  });
}

export function useAddDoctor(onDoctorAdded: () => void) {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/doctors/`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const data = await res.json();
        // console.log(data.errors);
        const errors = Object.entries(data.errors).map((error) => error[1]);
        console.log(errors);
        // toast.error("مشکلی در افزودن مشاور پیش آمده!");
        errors.map((error: any) => toast.error(error[0]));
        throw new Error(data.errors);
      }
    },
    onError(error) {
      // toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مشاور با موفقیت افزوده شد");
      onDoctorAdded();
    },
  });
}

export function useEditDoctor(doctorId: number, onDoctorEditted: () => void) {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/doctors/${doctorId}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("مشکلی در ویرایش مشاور پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مشاور با موفقیت ویرایش شد");
      onDoctorEditted();
    },
  });
}

export function useDeleteDoctor(onDeletedTenant: () => void) {
  return useMutation({
    mutationFn: async (doctorId: number) => {
      const res = await fetch(`/api/doctors/${doctorId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف مشاور پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مشاور با موفقیت حذف شد");
      onDeletedTenant();
    },
  });
}
