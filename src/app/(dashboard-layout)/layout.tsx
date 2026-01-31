import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({
  customer,
  seller,
  admin,
}: {
  customer: ReactNode;
  seller: ReactNode;
  admin: ReactNode;
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {customer}
        {seller}
        {admin}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
