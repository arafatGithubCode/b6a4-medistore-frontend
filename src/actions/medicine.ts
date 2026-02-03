"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { medicineService } from "@/services/medicine-service";
import { FilterOptions, ICacheOptions, TResult } from "@/types";
import { IMedicine } from "@/types/medicine-type";

export const createMedicineAction = async (
  medicineData: Omit<
    IMedicine,
    "id" | "slug" | "createdAt" | "updatedAt" | "sellerId"
  >,
): Promise<TResult<IMedicine>> => {
  try {
    const { message, success, data } =
      await medicineService.createMedicine(medicineData);
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const getMedicinesAction = async (
  filter?: FilterOptions,
  cacheOptions?: ICacheOptions,
): Promise<TResult<IMedicine[]>> => {
  try {
    const { message, success, data } = await medicineService.getMedicines(
      filter,
      cacheOptions,
    );
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
