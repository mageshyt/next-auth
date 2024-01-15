"use client";
import React, { useTransition } from "react";
import { z } from "zod";
import { LoginSchema } from "@/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/action/login";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   -------------State For Form Error and Success ----------------
  const [formError, setFormError] = React.useState<string>("");
  const [formSuccess, setFormSuccess] = React.useState<string>("");

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    try {
      startTransition(() => {
        const response = login(data).then((res) => {
          console.log(res);
          if (res.success) {
            setFormSuccess("Login Success");
            setFormError("");
          } else {
            const { error } = res;
            setFormError(error);
            setFormSuccess("");
          }
        });
      });
    } catch (error) {
      console.log(error);

      setFormError("Something went wrong");
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Create an account"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="email"
                      placeholder="exile.@gmail.com"
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="********"
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* form Error */}
          <FormError message={formError} />
          <FormSuccess message={formSuccess} />
          {/* submit btn */}
          <Button disabled={isPending} type="submit" className="w-full">
            Login in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
