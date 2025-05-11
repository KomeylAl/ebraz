import Link from "next/link";
import { converRole, dateConvert } from "./utils";
import { MdInsertChart } from "react-icons/md";

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
    accessor: (row: any) => row.amount ?? "ندارد",
    cellClassName: (row: any) =>
      row.payment_status === "paid" ? "text-indigo-500" : "text-rose-500",
  },
];

export const adminColumns = [
  { header: "نام", accessor: "name" },
  { header: "تلفن", accessor: "phone" },
  { header: "تاریخ تولد", accessor: (row: any) => dateConvert(row.birth_date) },
  { header: "نقش", accessor: (row: any) => converRole(row.role) },
];

export const doctorColumns = [
  { header: "نام", accessor: "name" },
  { header: "تلفن", accessor: "phone" },
  { header: "تاریخ تولد", accessor: (row: any) => dateConvert(row.birth_date) },
  {
    header: "پنل مشاور",
    accessor: (row: any) => (
      <Link href={`/admin/doctors/panel/${row.id}`}>
        <MdInsertChart size={25} className="text-blue-500" />
      </Link>
    ),
  },
];

export const workshopColumns = [
  { header: "عنوان", accessor: "title" },
  { header: "روز های برگزاری", accessor: "week_days" },
  { header: "زمان برگزاری", accessor: "time" },
  {
    header: "پنل کارگاه",
    accessor: (row: any) => (
      <Link href={`/admin/workshops/panel/${row.id}`}>
        <MdInsertChart size={25} className="text-blue-500" />
      </Link>
    ),
  },
];
