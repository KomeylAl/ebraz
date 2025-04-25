import { Providers } from "@/store/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body className="">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
