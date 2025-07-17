export const metadata = {
  title: "ETC Pump Dashboard",
  description: "Dự báo khả năng ETC pump dựa trên dữ liệu thị trường",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}