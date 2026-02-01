import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { userServices } from "@/services/user-service";
import { ROLE } from "@/types";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({
  customer,
  seller,
  admin,
}: {
  customer: ReactNode;
  seller: ReactNode;
  admin: ReactNode;
}) => {
  const { success, data } = await userServices.getUserSession();
  if (!success || !data) {
    redirect("/signin");
  }
  const userRole = data.user?.role;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {userRole === ROLE.CUSTOMER && customer}
        {userRole === ROLE.SELLER && seller}
        {userRole === ROLE.ADMIN && admin}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
