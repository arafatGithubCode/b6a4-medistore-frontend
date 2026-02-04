import { env } from "@/env";
import { getErrorMessage } from "@/helpers/get-error";
import { FilterOptions, ICacheOptions, TResult } from "@/types";
import { IMedicine } from "@/types/medicine-type";
import { cookies } from "next/headers";

export const medicineService = {
  getMedicines: async (
    filter?: FilterOptions,
    cacheOptions?: ICacheOptions,
  ): Promise<TResult<IMedicine[]>> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/medicines/`;
      const url = new URL(API_URL);

      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {
        cache: "default",
        next: { revalidate: 1 * 60 * 60 * 24, tags: ["medicines"] },
      };

      if (cacheOptions?.cache) {
        config.cache = cacheOptions.cache;
      }

      if (cacheOptions?.revalidate) {
        config.next = {
          revalidate: cacheOptions.revalidate,
          tags: ["medicines"],
        };
      }

      const response = await fetch(url.toString(), config);
      const result = await response.json();

      return {
        success: result.success,
        message: result.message,
        data: result.data as IMedicine[],
        pagination: result.pagination,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    }
  },
  createMedicine: async (
    medicineData: Omit<
      IMedicine,
      "id" | "slug" | "createdAt" | "updatedAt" | "sellerId"
    >,
  ): Promise<TResult<IMedicine>> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/medicines/`;
      const cookieStore = await cookies();

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });
      const result = await response.json();
      return {
        success: result.success,
        message: result.message,
        data: result.data as IMedicine,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    }
  },
  getMedicineBySellerId: async (sellerId: string) => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/medicines/seller/${sellerId}`;
      const response = await fetch(API_URL, {
        cache: "no-store",
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message,
        };
      }
      return {
        success: result.success,
        message: result.message,
        data: result.data as IMedicine[],
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    }
  },

  getMedicineById: async (medicineId: string) => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/medicines/${medicineId}`;
      const response = await fetch(API_URL, {
        cache: "no-store",
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message,
        };
      }
      return {
        success: result.success,
        message: result.message,
        data: result.data as IMedicine,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    }
  },

  updateMedicineById: async (
    medicineId: string,
    medicineData: Partial<
      Omit<IMedicine, "id" | "slug" | "createdAt" | "updatedAt" | "sellerId">
    >,
  ): Promise<TResult<IMedicine>> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/medicines/${medicineId}`;
      const cookieStore = await cookies();

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      const result = await response.json();

      if (result.success === false) {
        return {
          success: false,
          message: result.message,
        };
      }

      return {
        success: result.success,
        message: result.message,
        data: result.data as IMedicine,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    }
  },

  deleteMedicineById: async (medicineId: string): Promise<TResult<null>> => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1/medicines/${medicineId}`;
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await response.json();
      if (result.success === false) {
        return {
          success: false,
          message: result.message,
        };
      }
      return {
        success: result.success,
        message: result.message,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    }
  },
};
