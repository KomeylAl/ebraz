import { Toaster } from "react-hot-toast";
import "../../app/globals.css";
import { Providers } from "@/store/provider";

export const metadata = {
  title: "کلینیک ابراز - ورود",
  description: "کلینیک ابراز - ورود",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-200/40">
      <Toaster />
      {children}
    </div>
  );
}
