"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { signupFormSchema } from "@/validations/signup-form-schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import FormField from "../common/form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SignupForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const [passValue, setPassValue] = useState<String>("");

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
    onSubmit: ({ value }) => {
      setPassValue(value.password);
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
                return <FormField field={field} type="password" />;
              }}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => {
                const confirmPassword = field.state.value;
                const isPasswordMatch =
                  passValue === confirmPassword || confirmPassword === "";
                return (
                  <FormField
                    field={field}
                    type="password"
                    isPasswordMatch={isPasswordMatch}
                  />
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="signup-form" className="w-full">
          Create Account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
