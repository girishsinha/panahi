import AdminSidenav from "@/components/layout/admin/sidenav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex sm:flex-row flex-col ">
      <AdminSidenav />
      {children}
    </div>
  );
}
