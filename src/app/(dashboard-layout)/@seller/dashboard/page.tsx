import { getAllCategoriesAction } from "@/actions/category";
import {
  getMedicineByIdAction,
  getMedicineBySellerIdAction,
} from "@/actions/medicine";
import MedicineCard from "@/components/common/medicine-card";
import AddMedicineForm from "@/components/module/medicine/add-medicine";
import { ProfileDisplay } from "@/components/module/profile/profile-display";
import { userServices } from "@/services/user-service";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string; medicineId?: string }>;
}) => {
  const { tab, medicineId } = await searchParams;
  const { data: categories } = await getAllCategoriesAction();

  const { data: session } = await userServices.getUserSession();
  const user = session?.user;

  // add medicine tab
  if (tab === "add-medicine") {
    return (
      <div className="container mx-auto py-8">
        <AddMedicineForm categories={categories} />
      </div>
    );
  }

  // medicines list tab
  if (tab === "medicines") {
    const { data, success } = await getMedicineBySellerIdAction(user?.id || "");
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">My Medicines</h1>
        {success && data && data.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {data.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                role={user?.role}
              />
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

  return (
    <div className="container mx-auto py-8 px-4">
      {user ? <ProfileDisplay user={user} /> : null}
    </div>
  );
};

export default Dashboard;
