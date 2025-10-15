"use client";

import { useEffect, useRef, useState } from "react";
import { initializeEcho } from "@/lib/echo";
import NotificationContainer, {
  ToastNotification,
} from "@/components/common/notifications/NotificationContainer";

export default function NotificationToast() {
  const notifRef = useRef<any>(null);

  useEffect(() => {
    const getToken = async () => {
      const res = await fetch("/api/auth/token");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();

      // فرض می‌کنیم API token را در data.access_token برمی‌گردونه
      const realToken = data.access_token ?? data;
      // حالا که token داریم، Echo را initialize کنیم
      const echo = initializeEcho(realToken);

      echo.connector.pusher.connection.bind("connected", () =>
        console.log("connected")
      );

      const channel = echo.private("Admins");
      channel.listen(".NotificationCreated", (data: any) => {
        console.log("📢 Notification:", data);
        const notif: ToastNotification = {
          id: data.id,
          title: data.title ?? "نوتیف جدید",
          message: data.message ?? "",
          duration: 3000,
        };

        notifRef.current?.addNotification(notif);
      });

      // cleanup
      return () => {
        echo.leave("Admins");
      };
    };

    getToken();
  }, []);

  return (
    <>
      <NotificationContainer ref={notifRef} />
    </>
  );
}
