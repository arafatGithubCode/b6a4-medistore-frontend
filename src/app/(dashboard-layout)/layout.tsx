import { AppSidebar } from "@/components/layout/app-sidebar";
import ModeToggle from "@/components/layout/mode-toggle";
import NavbarUser from "@/components/layout/navbar-user";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
      <AppSidebar role={userRole} />
      <SidebarInset>
        {/* <Navbar /> */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto flex items-center gap-4">
            <NavbarUser user={data.user} />
            <ModeToggle />
          </div>
        </header>
        {userRole === ROLE.CUSTOMER && customer}
        {userRole === ROLE.SELLER && seller}
        {userRole === ROLE.ADMIN && admin}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
