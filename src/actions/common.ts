"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { commonServices } from "@/services/common";

export const getSingleResourceAction = async (path: string) => {
  try {
    const { success, message, data } =
      await commonServices.getSingleResource(path);
    console.log("getSingleResourceAction data:", data);
    console.log("getSingleResourceAction success:", success);
    console.log("getSingleResourceAction message:", message);
    return { success, message, data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
