import { getMedicinesAction } from "@/actions/medicine";
import MedicineCard from "@/components/common/medicine-card";

const ShopPage = async () => {
  const { success, data } = await getMedicinesAction();
  return (
    <div>
      <div className="bg-blue-50 dark:bg-blue-900/10 p-8 text-center shadow-xs">
        <h1 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-4">
          Shop Now
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Browse our collection of medicines and find what you need.
        </p>
      </div>
      {success && data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-6 container mx-auto px-4">
          {data.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No medicines available.</p>
      )}
    </div>
  );
};

export default ShopPage;
