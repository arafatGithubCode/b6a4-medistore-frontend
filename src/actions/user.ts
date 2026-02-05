"use server";

import { getErrorMessage } from "@/helpers/get-error";
import { userServices } from "@/services/user-service";
import { TResult } from "@/types";
import { User } from "@/types/session-type";
import { revalidateTag } from "next/cache";

export const updateUserByIdAction = async (
  userId: string,
  updateData: Partial<User>,
): Promise<TResult<User>> => {
  try {
    const { message, success, data } = await userServices.updateUserById(
      userId,
      updateData,
    );
    revalidateTag("users", "max");
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const getAllUsersAction = async (): Promise<TResult<User[]>> => {
  try {
    const { message, success, data } = await userServices.getAllUsers();
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const deleteUserByIdAction = async (
  userId: string,
): Promise<TResult<null>> => {
  try {
    const { message, success, data } =
      await userServices.deleteUserById(userId);
    revalidateTag("users", "max");
    return { message, success, data };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
