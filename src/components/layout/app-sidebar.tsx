import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/admin-routes";
import { customerRoutes } from "@/routes/customer-routes";
import { sellerRoutes } from "@/routes/seller-routes";
import { ROLE, TRoute } from "@/types";
import AppDashboardItem from "./app-dashboard-item";

export function AppSidebar({
  role,
  ...props
}: { role: string } & React.ComponentProps<typeof Sidebar>) {
  let routes: TRoute[] = [];

  switch (role) {
    case ROLE.ADMIN:
      routes = adminRoutes;
      break;
    case ROLE.SELLER:
      routes = sellerRoutes;
      break;
    case ROLE.CUSTOMER:
      routes = customerRoutes;
      break;
    default:
      routes = [];
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div>Logo</div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <AppDashboardItem tab={item.tab} title={item.title} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
