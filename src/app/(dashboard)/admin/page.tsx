"use client";

import React from "react";
import Header from "../_components/Header";
import Link from "next/link";
import { Tab, Tabs } from "../_components/Tabs";
import ToDaysList from "../_components/TodaysList";
import { ClientsList } from "../_components/ClientsList";

const AdminDashboard = () => {
  return (
    <div className="flex-1 h-screen overflow-y-auto flex flex-col">
      <Header onSearchChange={() => {}} />

      <div className="flex-1 p-8 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">نوبت های امروز</h2>
          <Link
            href="/admin/appointments/add"
            className="px-12 py-2 bg-blue-600 rounded-sm text-white text-center cursor-pointer"
          >
            افزودن نوبت
          </Link>
        </div>

        <div className="mt-12 flex-1">
          <Tabs>
            <Tab label="نوبت های امروز" defaultTab>
              <div className="py-4">
                <ToDaysList />
              </div>
            </Tab>
            <Tab label="مراجعان" defaultTab={false}>
              <div className="py-4">
                <ClientsList />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
