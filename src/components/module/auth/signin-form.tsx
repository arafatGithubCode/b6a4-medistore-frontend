"use client";

import SubmitButton from "@/components/common/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { getErrorMessage } from "@/helpers/get-error";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { signinFormSchema } from "@/validations/signin-form-schema";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import FormField from "../../common/form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import GoogleAuth from "./google-auth";

const SigninForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signinFormSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");
      setLoading(true);
      try {
        const { email, password } = value;
        const { error } = await authClient.signIn.email({
          email: email,
          password: password,
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Signed in successfully!", { id: toastId });
        router.push("/shop");
      } catch (error) {
        toast.error(getErrorMessage(error) || "Failed to sign in.", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signin-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className={cn("flex flex-col gap-6", className)}
          {...props}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => <FormField field={field} type="email" />}
            />
            <form.Field
              name="password"
              children={(field) => <FormField field={field} type="password" />}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <SubmitButton
          loading={loading}
          formName="signin-form"
          label="Sign In"
        />
        <GoogleAuth mode="signin" />
      </CardFooter>
    </Card>
  );
};

export default SigninForm;
