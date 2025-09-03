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
        `/api/doctors?page=${page}&pageSize=${pageSize}&search=${search}`
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

export function useAddDoctor(onDuccess: () => void) {
  return useMutation({
    mutationFn: async (formData: any) => {
      const newData = new FormData();
      newData.append("name", formData.name);
      newData.append("phone", formData.phone);
      newData.append("national_code", formData.national_code);
      newData.append("medical_number", formData.medical_number);
      newData.append("card_number", formData.card_number);
      newData.append("birth_date", formData.birth_date);
      newData.append("email", formData.email);
      newData.append("days", formData?.days ?? "");
      if (formData.department_ids) {
        formData.department_ids.forEach((id: number) => {
          newData.append("department_ids[]", id.toString());
        });
      }

      if (formData.avatar && formData.avatar.length > 0) {
        newData.append("avatar", formData.avatar[0]);
      }

      if (formData.resume && formData.resume.length > 0) {
        newData.append("resume", formData.resume[0]);
      }

      const res = await fetch(`/api/doctors/`, {
        method: "POST",
        body: newData,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "خطا در افزودن مشاور");
      }

      return json;
    },
    onError(error) {
      console.log(error);
      toast.error("خطا در افزودن مشاور");
    },
    onSuccess: () => {
      toast.success("مشاور با موفقیت افزوده شد");
      onDuccess();
    },
  });
}

export function useEditDoctor(doctorId: number, onSuccess: () => void) {
  return useMutation({
    mutationFn: async (formData: any) => {
      const newData = new FormData();
      newData.append("name", formData.name);
      newData.append("phone", formData.phone);
      newData.append("national_code", formData.national_code);
      newData.append("medical_number", formData.medical_number);
      newData.append("card_number", formData.card_number);
      newData.append("birth_date", formData.birth_date);
      newData.append("email", formData.email);
      newData.append("days", formData.days);
      formData.department_ids.forEach((id: number) => {
        newData.append("department_ids[]", id.toString());
      });

      if (formData.avatar && formData.avatar.length > 0) {
        newData.append("avatar", formData.avatar[0]);
      }

      if (formData.resume && formData.resume.length > 0) {
        newData.append("resume", formData.resume[0]);
      }

      const res = await fetch(`/api/doctors/${doctorId}`, {
        method: "POST",
        body: newData,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "خطا در ویرایش مشاور");
      }

      return json;
    },
    onError() {
      toast.error("خطا در ویرایش مشاور");
    },
    onSuccess: () => {
      toast.success("مشاور با موفقیت ویرایش شد");
      onSuccess();
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
