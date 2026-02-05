import { getAllCategoriesAction } from "@/actions/category";
import { getAllUsersAction } from "@/actions/user";
import GetSingleResource from "@/components/common/get-single-resource";
import AddCategory from "@/components/module/category/add-category";
import CategoryCard from "@/components/module/category/category-card";
import UserCard from "@/components/module/user/user-card";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) => {
  const { tab } = await searchParams;

  // All categories
  if (tab === "get-categories") {
    const { data } = await getAllCategoriesAction();
    return data && data.length > 0 ? (
      <div className="p-2">
        <h1 className="text-center text-xl my-5">All Categories</h1>
        <ul className="flex items-center justify-center gap-3 flex-wrap mt-6">
          {data.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </ul>
      </div>
    ) : (
      <div>No categories found.</div>
    );
  }

  // Add a new category
  if (tab === "add-category") {
    return <AddCategory />;
  }

  // Get category By ID
  if (tab === "get-category-by-id") {
    return (
      <GetSingleResource
        path="/categories/id"
        resourceType="category"
        label="ID"
      />
    );
  }

  // Get category By slug
  if (tab === "get-category-by-slug") {
    return (
      <GetSingleResource
        path="/categories"
        resourceType="category"
        label="slug"
      />
    );
  }

  // Get user by ID
  if (tab === "get-user-by-id") {
    return <GetSingleResource path="/users" resourceType="user" label="ID" />;
  }

  // Get All users
  if (tab === "get-users") {
    const { data, success } = await getAllUsersAction();
    return success && data ? (
      <div className="p-2">
        <h1 className="text-center text-xl my-5">All Users</h1>
        <ul className="flex items-center justify-center gap-3 flex-wrap mt-6">
          {data.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      </div>
    ) : (
      <div>No users found.</div>
    );
  }
};

export default Dashboard;
