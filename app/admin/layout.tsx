import AdminSidenav from "@/components/layout/admin/sidenav";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex sm:flex-row flex-col ">
      <TooltipProvider delayDuration={0}>
        <SidebarProvider>
          <AdminSidenav />

          <SidebarInset>
            <header className="absolute  h-14 w-14 flex items-center gap-2  px-4">
              <SidebarTrigger />
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}
