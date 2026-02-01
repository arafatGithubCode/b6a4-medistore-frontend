import { env } from "@/env";
import { FilterOptions, TResult } from "@/types";
import { IMedicine } from "@/types/medicine-type";

interface ICacheOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const medicineService = {
  getMedicines: async (
    filter?: FilterOptions,
    cacheOptions?: ICacheOptions,
  ): Promise<TResult<IMedicine[]>> => {
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
      next: { revalidate: 1 * 60 * 60 * 24 },
    };

    if (cacheOptions?.cache) {
      config.cache = cacheOptions.cache;
    }

    if (cacheOptions?.revalidate) {
      config.next = { revalidate: cacheOptions.revalidate };
    }

    const response = await fetch(url.toString(), config);
    const result = await response.json();

    return {
      success: result.success,
      message: result.message,
      data: result.data as IMedicine[],
      pagination: result.pagination,
    };
  },
};
