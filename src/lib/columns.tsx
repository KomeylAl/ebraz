import Link from "next/link";
import { convertPostStatus, convertRole, dateConvert } from "./utils";
import { MdInsertChart } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import TransitionLink from "@/components/ui/TransitionLink";
import ClientCard from "@/app/(dashboard)/_components/layout/ClientCard";
import DoctorCard from "@/app/(dashboard)/_components/layout/DoctorCard";

export const appointmentColumns = [
  {
    header: "مراجع",
    accessor: (row: any) => (
      <div className="relative inline-block">
        <TransitionLink
          className="peer"
          href={`/admin/clients/${row.client.id}`}
        >
          {row.client?.name}
        </TransitionLink>

        <ClientCard client={row.client} />
      </div>
    ),
    cellClassName: (row: any) => "text-violet-500",
  },
  {
    header: "مشاور",
    accessor: (row: any) => (
      <div className="relative inline-block">
        <TransitionLink
          className="peer"
          href={`/admin/doctors/panel/${row.doctor.id}`}
        >
          {row.doctor?.name}
        </TransitionLink>

        <DoctorCard doctor={row.doctor} />
      </div>
    ),
    cellClassName: (row: any) => "text-cyan-500",
  },
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
      <Link href={`/admin/clients/${row.id}`}>
        <IoDocument size={25} className="text-blue-500" />
      </Link>
    ),
  },
];

export const assessmentsColumns = [
  {
    header: "مراجع",
    accessor: (row: any) => (
      <div className="relative inline-block">
        <TransitionLink
          className="peer"
          href={`/admin/clients/${row.client.id}`}
        >
          {row.client?.name}
        </TransitionLink>

        <ClientCard client={row.client} />
      </div>
    ),
    cellClassName: (row: any) => "text-violet-500",
  },
  {
    header: "مشاور",
    accessor: (row: any) => (
      <div className="relative inline-block">
        <TransitionLink
          className="peer"
          href={`/admin/doctors/panel/${row.doctor.id}`}
        >
          {row.doctor?.name}
        </TransitionLink>

        <DoctorCard doctor={row.doctor} />
      </div>
    ),
    cellClassName: (row: any) => "text-cyan-500",
  },
  { header: "تاریخ درخواست", accessor: (row: any) => dateConvert(row.date) },
  { header: "زمان درخواست", accessor: (row: any) => row.time },
  {
    header: "وضعیت",
    accessor: (row: any) =>
      row.status === "done" ? "انجام شده" : "انجام نشده",
    cellClassName: (row: any) =>
      row.status === "done" ? "text-blue-600" : "text-amber-500",
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
