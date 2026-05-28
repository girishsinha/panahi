import AdminSidenav from "@/components/layout/admin/sidenav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminSidenav />
        {children}
      </body>
    </html>
  );
}
