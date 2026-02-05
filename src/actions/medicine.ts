"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { medicineService } from "@/services/medicine-service";
import { FilterOptions, ICacheOptions, TResult } from "@/types";
import { IMedicine } from "@/types/medicine-type";
import { revalidateTag } from "next/cache";

export const createMedicineAction = async (
  medicineData: Omit<
    IMedicine,
    "id" | "slug" | "createdAt" | "updatedAt" | "sellerId"
  >,
): Promise<TResult<IMedicine>> => {
  try {
    const { message, success, data } =
      await medicineService.createMedicine(medicineData);
    revalidateTag("medicines", "max");
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

export const getMedicineBySellerIdAction = async (
  sellerId: string,
): Promise<TResult<IMedicine[]>> => {
  try {
    const { message, success, data } =
      await medicineService.getMedicineBySellerId(sellerId);
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const getMedicineByIdAction = async (
  medicineId: string,
): Promise<TResult<IMedicine>> => {
  try {
    const { message, success, data } =
      await medicineService.getMedicineById(medicineId);
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const updateMedicineByIdAction = async (
  medicineId: string,
  medicineData: Partial<
    Omit<IMedicine, "id" | "slug" | "createdAt" | "updatedAt" | "sellerId">
  >,
): Promise<TResult<IMedicine>> => {
  try {
    const { message, success, data } = await medicineService.updateMedicineById(
      medicineId,
      medicineData,
    );

    revalidateTag("medicines", "max");
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const deleteMedicineByIdAction = async (
  medicineId: string,
): Promise<TResult<null>> => {
  try {
    const { message, success, data } =
      await medicineService.deleteMedicineById(medicineId);
    revalidateTag("medicines", "max");
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
