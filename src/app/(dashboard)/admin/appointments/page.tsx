"use client";

import React from "react";
import Header from "../../_components/Header";
import { AppinmentsList } from "../../_components/AppointmentsList";

const Appinments = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header onSearchChange={() => {}}/>
      <div className="w-full flex flex-col p-12">
        <div className="w-full h-full flex flex-col">
          <AppinmentsList />
        </div>
      </div>
    </div>
  );
};

export default Appinments;
