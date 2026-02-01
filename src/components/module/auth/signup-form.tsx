"use client";

import { signupAction } from "@/actions/auth";
import SubmitButton from "@/components/common/submit-button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { getErrorMessage } from "@/helpers/get-error";
import { signupFormSchema } from "@/validations/signup-form-schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const SignupForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signupFormSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Creating your account...");

      try {
        const { message, success } = await signupAction(value);
        if (!success) {
          toast.error(message, {
            id: toastId,
          });
          return;
        }
        toast.success("Account created successfully!", {
          id: toastId,
        });
        router.push("/signin");
      } catch (error) {
        toast.error(getErrorMessage(error), {
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
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          {...props}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                return <FormField field={field} />;
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                return <FormField field={field} type="email" />;
              }}
            />
            <form.Field
              name="role"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="role">Role</FieldLabel>
                    <Select
                      onValueChange={field.handleChange}
                      value={field.state.value}
                      name="role"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                        <SelectItem value="SELLER">SELLER</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>What's your role?</FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                return (
                  <FormField
                    field={field}
                    type="password"
                    hasPasswordField={true}
                  />
                );
              }}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => {
                return (
                  <FormField
                    field={field}
                    type="password"
                    hasPasswordField={true}
                  />
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <SubmitButton
          formName="signup-form"
          label="Create Account"
          loading={loading}
        />
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
