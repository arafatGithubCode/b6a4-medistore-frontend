import { TRoute } from "@/types";

export const adminRoutes: TRoute[] = [
  {
    title: "User Management",
    items: [
      { title: "Customers", tab: "customers" },
      { title: "Sellers", tab: "sellers" },
      { title: "Admins", tab: "admins" },
    ],
  },
];
