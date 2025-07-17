"use client";

import Link from "next/link";
import Header from "../../_components/layout/Header";
import { PaymentsList } from "../../_components/PaymentsList";

const Payments = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header onSearchChange={() => {}} />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">پرداخت ها</h2>
            <Link
              href="/admin/invoices"
              className="px-12 py-2 bg-cyan-600 rounded-md text-white text-center cursor-pointer"
            >
              فاکتور ها
            </Link>
          </div>
          <PaymentsList />
        </div>
      </div>
    </div>
  );
};

export default Payments;
