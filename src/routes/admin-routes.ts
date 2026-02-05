import { TRoute } from "@/types";

export const adminRoutes: TRoute[] = [
  {
    title: "Category Management",
    items: [
      { title: "Add a category", tab: "add-category" },
      { title: "Get All categories", tab: "get-categories" },
      { title: "Get a category by ID", tab: "get-category-by-id" },
      { title: "Get a category by slug", tab: "get-category-by-slug" },
    ],
  },
  {
    title: "User Management",
    items: [
      { title: "Get All users", tab: "get-users" },
      { title: "Get a user by ID", tab: "get-user-by-id" },
    ],
  },
];
