import AdminSidenav from "@/components/layout/admin/sidenav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <AdminSidenav />
      {children}
    </div>
  );
}
