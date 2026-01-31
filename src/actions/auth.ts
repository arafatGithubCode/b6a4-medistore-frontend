"use server";

import { env } from "@/env";
import { ServerActionResult } from "@/types";

export const signupAction = async (data: {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}): Promise<ServerActionResult> => {
  try {
    // check if password and confirmPassword match
    if (data.password !== data.confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      };
    }

    const { confirmPassword, ...signupData } = data;

    const API_ENDPOINT = `${env.BACKEND_URL}/api/v1/users/sign-up/email`;
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Signup failed",
      };
    }

    return {
      success: true,
      message: "Signup successful",
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during signup",
    };
  }
};
