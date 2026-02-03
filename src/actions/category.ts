"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { categoryServices } from "@/services/category-service";
import { TResult } from "@/types";
import { ICategory } from "@/types/category-type";
import { revalidateTag } from "next/cache";

export const getAllCategoriesAction = async (): Promise<
  TResult<ICategory[]>
> => {
  try {
    const { success, message, data } =
      await categoryServices.getAllCategories();
    return { success, message, data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error), data: [] };
  }
};

export const createCategoryAction = async (
  name: string,
): Promise<TResult<ICategory>> => {
  try {
    const { success, message, data } =
      await categoryServices.createCategory(name);

    revalidateTag("categories", "max");
    return { success, message, data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const updateCategoryAction = async (
  id: string,
  data: Omit<ICategory, "id" | "slug">,
): Promise<TResult<ICategory>> => {
  try {
    const {
      success,
      message,
      data: updatedCategory,
    } = await categoryServices.updateCategory(id, data);
    revalidateTag("categories", "max");
    return { success, message, data: updatedCategory };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const deleteCategoryAction = async (
  id: string,
): Promise<TResult<null>> => {
  try {
    const { success, message } = await categoryServices.deleteCategory(id);
    revalidateTag("categories", "max");
    return { success, message, data: null };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const getCategoryByIdAction = async (
  id: string,
): Promise<TResult<ICategory>> => {
  try {
    const { success, message, data } =
      await categoryServices.getCategoryById(id);
    return { success, message, data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const getCategoryBySlugAction = async (
  slug: string,
): Promise<TResult<ICategory>> => {
  try {
    const { success, message, data } =
      await categoryServices.getCategoryBySlug(slug);
    return { success, message, data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
