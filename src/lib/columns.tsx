import Link from "next/link";
import { convertPostStatus, convertRole, dateConvert } from "./utils";
import { MdInsertChart } from "react-icons/md";
import { IoDocument } from "react-icons/io5";

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
  { header: "نقش", accessor: (row: any) => convertRole(row.role) },
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

export const clientColumns = [
  { header: "نام", accessor: "name" },
  { header: "تلفن", accessor: "phone" },
  { header: "تاریخ تولد", accessor: (row: any) => dateConvert(row.birth_date) },
  {
    header: "پرونده پزشکی",
    accessor: (row: any) => (
      <Link href={`/admin/doctors/panel/${row.id}`}>
        <IoDocument size={25} className="text-blue-500" />
      </Link>
    ),
  },
];

export const workshopColumns = [
  { header: "عنوان", accessor: "title" },
  { header: "روز های برگزاری", accessor: "week_day" },
  { header: "زمان برگزاری", accessor: "time" },
  {
    header: "پنل کارگاه",
    accessor: (row: any) => (
      <Link href={`/dashboard/workshops/${row.id}`}>
        <MdInsertChart size={25} className="text-blue-500" />
      </Link>
    ),
  },
];

export const categoryColumns = [
  { header: "عنوان", accessor: "name" },
  { header: "اسلاگ", accessor: "slug" },
];

export const tagColumns = [
  { header: "عنوان", accessor: "name" },
  { header: "اسلاگ", accessor: "slug" },
];

export const postColumns = [
  {
    header: "عنوان",
    accessor: (item: any) => (
      <Link
        href={`/dashboard/posts/${item.slug}`}
        className="hover:text-blue-500"
      >
        {item.title}
      </Link>
    ),
  },
  { header: "نویسنده", accessor: (item: any) => item.author.name },
  { header: "دسته بندی", accessor: (item: any) => item.category?.name ?? "" },
  { header: "وضعیت", accessor: (item: any) => convertPostStatus(item.status) },
];

export const departmentColumns = [
  { header: "عنوان", accessor: "title" },
  { header: "اسلاگ", accessor: "slug" },
];

export const paymentColumns = [
  { header: "مراجع", accessor: (item: any) => item.referral.client },
  { header: "مشاور", accessor: (item: any) => item.referral.doctor },
  {
    header: "تاریخ مراجعه",
    accessor: (item: any) => dateConvert(item.referral.date),
  },
  {
    header: "مبلغ",
    accessor: (item: any) => item.referral.amount,
    cellClassName: (item: any) =>
      item.status === "unpaid" ? "text-amber-500" : "text-sky-600",
  },
  {
    header: "وضعیت",
    accessor: (item: any) =>
      item.status === "paid" ? "پرداخت شده" : "پرداخت نشده",
    cellClassName: (item: any) =>
      item.status === "unpaid" ? "text-rose-500" : "text-green-500",
  },
];
