import { dateConvert } from "./utils";

export const appointmentColumns = [
  { header: "مراجع", accessor: "client" },
  { header: "مشاور", accessor: "doctor" },
  {
    header: "تاریخ و ساعت",
    accessor: (row: any) => row.time + " - " + dateConvert(row.date),
  },
  {
    header: "وضعیت",
    accessor: (row: any) =>
      row.status === "done" ? "انجام شده" : "انجام نشده",
    cellClassName: (row: any) =>
      row.status === "done" ? "text-blue-600" : "text-amber-500",
  },
  {
    header: "پرداخت",
    accessor: (row: any) => row.payment ?? "ندارد",
    cellClassName: (row: any) => row.payment_status === "paid" ? "text-indigo-500" : "text-rose-500",
  },
];
