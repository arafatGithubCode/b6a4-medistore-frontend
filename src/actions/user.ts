"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { userServices } from "@/services/user-service";
import { TResult } from "@/types";
import { User } from "@/types/session-type";

export const updateUserByIdAction = async (
  userId: string,
  updateData: Partial<User>,
): Promise<TResult<User>> => {
  try {
    const { message, success, data } = await userServices.updateUserById(
      userId,
      updateData,
    );
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
