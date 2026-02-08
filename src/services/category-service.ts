import { getErrorMessage } from "@/helpers/get-error";
import { API_ENDPOINTS } from "@/services/api-config";
import { TResult } from "@/types";
import { ICategory } from "@/types/category-type";
import { cookies } from "next/headers";

export const categoryServices = {
  getAllCategories: async (): Promise<TResult<ICategory[]>> => {
    try {
      const API_URL = API_ENDPOINTS.CATEGORIES;
      const response = await fetch(API_URL, {
        next: { tags: ["categories"] },
      });
      const result = await response.json();

      if (result.success === false) {
        return { success: false, message: result.message };
      }
      return { success: true, message: result.message, data: result.data };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  },

  createCategory: async (name: string): Promise<TResult<ICategory>> => {
    try {
      const API_URL = API_ENDPOINTS.CATEGORIES;
      const cookieStore = await cookies();

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();
      if (result.success === false) {
        return { success: false, message: result.message };
      }
      return { success: true, message: result.message, data: result.data };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  },

  updateCategory: async (
    id: string,
    data: Omit<ICategory, "id" | "slug">,
  ): Promise<TResult<ICategory>> => {
    try {
      const API_URL = API_ENDPOINTS.CATEGORY_UPDATE(id);
      const cookieStore = await cookies();
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success === false) {
        return { success: false, message: result.message };
      }
      return { success: true, message: result.message, data: result.data };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  },

  deleteCategory: async (id: string): Promise<TResult<null>> => {
    try {
      const API_URL = API_ENDPOINTS.CATEGORY_DELETE(id);
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
        return { success: false, message: result.message };
      }
      return { success: true, message: result.message };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  },

  getCategoryById: async (id: string): Promise<TResult<ICategory>> => {
    try {
      const API_URL = API_ENDPOINTS.CATEGORY_BY_ID(id);
      const response = await fetch(API_URL, {
        next: { tags: ["categories"] },
      });
      const result = await response.json();

      if (result.success === false) {
        return { success: false, message: result.message };
      }
      return { success: true, message: result.message, data: result.data };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  },

  getCategoryBySlug: async (slug: string): Promise<TResult<ICategory>> => {
    try {
      const API_URL = API_ENDPOINTS.CATEGORY_BY_SLUG(slug);
      const response = await fetch(API_URL, {
        next: { tags: ["categories"] },
      });
      const result = await response.json();
      if (result.success === false) {
        return { success: false, message: result.message };
      }
      return { success: true, message: result.message, data: result.data };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  },
};
