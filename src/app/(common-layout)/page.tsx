import { getMedicinesAction } from "@/actions/medicine";
import HeroSection from "@/components/common/hero-section";
import MedicineCard from "@/components/common/medicine-card";
import Footer from "@/components/layout/footer";
import Link from "next/link";

const HomePage = async () => {
  const { data, success } = await getMedicinesAction(undefined, {
    cache: "no-store",
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Medicines Section */}
      <section
        id="medicines"
        className="flex-1 py-16 md:py-24 bg-white dark:bg-slate-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Medicines
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore our wide collection of quality medicines and healthcare
              products
            </p>
          </div>

          {success && Array.isArray(data) && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No medicines available at the moment
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg my-5 mx-auto"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
