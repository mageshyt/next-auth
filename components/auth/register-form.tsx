"use client";
import React, { useTransition } from "react";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";

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

import { register } from "@/action/register";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),

    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  //   -------------State For Form Error and Success ----------------
  const [formError, setFormError] = React.useState<string>("");
  const [formSuccess, setFormSuccess] = React.useState<string>("");

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    try {
      startTransition(() => {
        register(data).then((res) => {
          console.log(res);
          if (res.success) {
            setFormSuccess("Registration Success");
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
      headerLabel="Create  an account"
      backButtonLabel="Already have an account? Login"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="text"
                      placeholder="John"
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* phone */}

            <FormField
              name="phone"
              control={form.control}
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Phone No</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="text"
                      placeholder="+911234567890"
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
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
            create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
