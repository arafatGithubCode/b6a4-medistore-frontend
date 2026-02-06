import { TRoute } from "@/types";

export const adminRoutes: TRoute[] = [
  {
    title: "My Profile",
    items: [{ title: "View and update profile", tab: "profile" }],
  },
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
  {
    title: "Medicine Management",
    items: [
      { title: "Add a medicine", tab: "add-medicine" },
      { title: "Get All medicines", tab: "medicines" },
      {
        title: "Get medicines by Seller ID",
        tab: "get-medicines-by-seller-id",
      },
      { title: "Get a medicine by ID", tab: "get-medicine-by-id" },
    ],
  },
  {
    title: "Review Management",
    items: [
      { title: "Get All reviews", tab: "task" },
      { title: "Get a review by ID", tab: "task" },
      {
        title: "Get reviews by Medicine ID",
        tab: "task",
      },
      { title: "Delete a review", tab: "task" },
    ],
  },
  {
    title: "Order Management",
    items: [
      { title: "Get All orders", tab: "task" },
      { title: "Get an order by ID", tab: "task" },
      { title: "Update order status", tab: "task" },
      { title: "Cancel an order", tab: "task" },
    ],
  },
];
