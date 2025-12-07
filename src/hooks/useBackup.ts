import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useBackupDoctors() {
  return useMutation({
    mutationKey: ["backupDoctors"],
    mutationFn: async () => {
      const res = await fetch("/api/backup/doctors");
      if (!res.ok) throw new Error("خطا در تهیه کپی پشتیبان");
      return res.json(); // ⬅️ مستقیماً JSON برگردان
    },
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.href = data.url;
      link.download = "doctors_backup.json";
      link.click();
      toast.success("پشتیبان گیری انجام شد.");
    },
  });
}
