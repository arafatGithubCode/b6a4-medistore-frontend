import { getCurrentUserCartAction } from "@/actions/cart";
import { ROLE } from "@/types";
import { IMedicine, MedicineStatus } from "@/types/medicine-type";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import AddToCart from "./add-to-cart";

const MedicineCard = async ({
  medicine,
  role,
}: {
  medicine: IMedicine;
  role?: string;
}) => {
  const { data } = await getCurrentUserCartAction();

  const isInCart = data?.items.some((item) => item.medicineId === medicine.id);

  const {
    id: medicineId,
    name,
    brand,
    description,
    dosageForm,
    strength,
    stock,
    unit,
    price,
    isOTCOnly,
    status,
  } = medicine;

  let isInStock = stock > 0;
  if (
    status === MedicineStatus.OUT_OF_STOCK ||
    status === MedicineStatus.DISCONTINUED
  ) {
    isInStock = false;
  }

  const stockStyle = isInStock
    ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
    : "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800";

  return (
    <div
      className="w-full max-w-sm flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 
      bg-white border border-slate-200 
      dark:bg-slate-800 dark:border-slate-700"
    >
      {/* --- Image Section --- */}
      {/* Image upload feature coming soon */}
      <div className="relative h-48 flex items-center justify-center bg-slate-50 dark:bg-slate-700/50">
        <Image
          src="/medicine.png"
          alt={name}
          fill
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
        />

        {/* OTC Badge - Cyan/Blue for clinical information */}
        {isOTCOnly && (
          <div className="absolute top-3 left-3">
            <span className="bg-cyan-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm tracking-wide uppercase border border-cyan-500">
              OTC Product
            </span>
          </div>
        )}
      </div>

      {/* --- Content Body --- */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Header: Brand & Dosage */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
            {brand}
          </span>
          {/* Dosage Tag - Teal subtle background */}
          <span
            className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border
            bg-teal-50 text-teal-700 border-teal-100 
            dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800"
          >
            {dosageForm}
          </span>
        </div>

        {/* Medicine Name */}
        <h3
          className="text-lg font-bold mb-1 leading-snug
          text-slate-800 dark:text-slate-100"
        >
          {name}
        </h3>

        {/* Strength info */}
        <p
          className="text-sm font-medium mb-3
          text-slate-500 dark:text-slate-400"
        >
          {strength} / {unit}
        </p>

        {/* Description */}
        <p
          className="text-sm line-clamp-2 grow mb-4 leading-relaxed
          text-slate-600 dark:text-slate-300"
        >
          {description}
        </p>

        {/* Divider */}
        <hr className="border-slate-100 dark:border-slate-700 my-4" />

        {/* --- Footer: Price & Action --- */}
        <div className="flex items-end justify-between mt-auto gap-4">
          {/* Price & Stock Column */}
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              ৳{price}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded border mt-1 w-fit ${stockStyle}`}
            >
              {isInStock ? `Available (${stock})` : "Out of Stock"}
            </span>
          </div>

          {/* Add to Cart Button */}
          {/* Primary Medical Color: Teal-600 */}
          {role === ROLE.SELLER ? (
            <Link
              href={`/dashboard/?tab=update-medicine&medicineId=${medicineId}`}
              className="flex gap-1 items-center"
            >
              <Button variant="link">Update Medicine</Button>
              <Edit className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </Link>
          ) : isInCart ? (
            <Link href="/cart">
              <Button variant="link">Go Cart</Button>
            </Link>
          ) : (
            <AddToCart
              isInStock={isInStock}
              item={{ medicineId, quantity: 1 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
