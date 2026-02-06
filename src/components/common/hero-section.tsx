import { Pill } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-20 md:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <Pill className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Your Trusted Pharmacy
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Quality Medicines,{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Delivered Fast
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300">
              Access a wide range of genuine medicines, healthcare products, and
              wellness solutions. Shop from home with fast delivery and expert
              pharmacist support.
            </p>

            <div className="flex gap-4 pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                href="#medicines"
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition duration-200"
              >
                Browse Medicines
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  5000+
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Medicines
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  24/7
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Support
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  Fast
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Delivery
                </p>
              </div>
            </div>
          </div>

          {/* Right Image/Icon */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-full h-96">
              <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-indigo-600 rounded-3xl opacity-10"></div>
              <div className="absolute top-10 right-10 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg transform rotate-3">
                <Pill className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute bottom-20 left-10 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg transform -rotate-3">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Free Delivery <br /> On Orders Above $50
                </div>
              </div>
              <div className="absolute bottom-10 right-20 bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center font-bold text-center text-sm transform rotate-12">
                100% <br /> Genuine
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
