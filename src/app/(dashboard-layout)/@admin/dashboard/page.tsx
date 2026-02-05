import { getAllCategoriesAction } from "@/actions/category";
import { getMedicineByIdAction, getMedicinesAction } from "@/actions/medicine";
import { getAllUsersAction } from "@/actions/user";
import GetSingleResource from "@/components/common/get-single-resource";
import MedicineCard from "@/components/common/medicine-card";
import AddCategory from "@/components/module/category/add-category";
import CategoryCard from "@/components/module/category/category-card";
import AddMedicineForm from "@/components/module/medicine/add-medicine";
import UserCard from "@/components/module/user/user-card";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string; medicineId?: string }>;
}) => {
  const { tab, medicineId } = await searchParams;

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

  // add medicine
  if (tab === "add-medicine") {
    const { data: categories } = await getAllCategoriesAction();
    return (
      <div className="p-2 mt-5">
        <AddMedicineForm categories={categories} />
      </div>
    );
  }

  // get medicine
  if (tab === "medicines") {
    const { data, success } = await getMedicinesAction();
    return (
      <div className="p-2 mt-5">
        <h3>All Medicines</h3>
        {success && data && data.length > 0 ? (
          <div className="flex flex-wrap gap-3 p-6 container mx-auto px-4">
            {data.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No medicines available.</p>
        )}
      </div>
    );
  }

  // update medicine tab
  if (tab === "update-medicine" && medicineId) {
    const { data, success } = await getMedicineByIdAction(medicineId);
    const { data: categories } = await getAllCategoriesAction();
    if (!success || !data) {
      return (
        <div className="container mx-auto py-8">
          <p className="text-center text-red-500">
            Failed to load medicine data.
          </p>
        </div>
      );
    }
    return (
      <div className="container mx-auto py-8">
        <AddMedicineForm categories={categories} medicine={data} />
      </div>
    );
  }

  // get medicine by id
  if (tab === "get-medicine-by-id") {
    return (
      <GetSingleResource
        path="/medicines"
        resourceType="medicine"
        label="ID"
        tab={tab}
      />
    );
  }

  // get all medicines of a seller
  if (tab === "get-medicines-by-seller-id") {
    return (
      <GetSingleResource
        path="/medicines/seller"
        resourceType="seller's medicines"
        label="Seller ID"
        tab={tab}
      />
    );
  }
};

export default Dashboard;
