import { useQuery } from "@tanstack/react-query";
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
    placeholderData: (prev) => prev,
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
      toast.success("پیامک با موفقت ارسال شد");
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
      toast.success("پیامک با موفقت ارسال شد");
      return res.json();
    },
    enabled: false,
  });
}
