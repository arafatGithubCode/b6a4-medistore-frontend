import { env } from "@/env";
import { getErrorMessage } from "@/helpers/get-error";
import { cookies } from "next/headers";

export const commonServices = {
  getSingleResource: async (path: string) => {
    try {
      const API_URL = `${env.BACKEND_URL}/api/v1${path}`;

      console.log("Fetching single resource from:", API_URL);

      const cookieStore = await cookies();

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
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
