import { getAllCategoriesAction } from "@/actions/category";
import AddCategory from "@/components/module/category/add-category";
import CategoryCard from "@/components/module/category/category-card";
import GetCategoryById from "@/components/module/category/get-category-by-id";

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
    return <GetCategoryById />;
  }
};

export default Dashboard;
