import { env } from "@/env";
import { TResult } from "@/types";
import { IMedicine } from "@/types/medicine-type";

export const medicineService = {
  getMedicines: async (): Promise<TResult<IMedicine[]>> => {
    const API_URL = `${env.BACKEND_URL}/api/v1/medicines/`;
    const response = await fetch(API_URL);
    const result = await response.json();

    return {
      success: result.success,
      message: result.message,
      data: result.data as IMedicine[],
      pagination: result.pagination,
    };
  },
};
