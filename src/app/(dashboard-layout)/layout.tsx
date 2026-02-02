import { AppSidebar } from "@/components/layout/app-sidebar";
import ModeToggle from "@/components/layout/mode-toggle";
import NavbarUser from "@/components/layout/navbar-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
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
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
