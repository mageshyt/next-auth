"use client";
import React, { useTransition } from "react";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { useRouter, useSearchParams } from "next/navigation";

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
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "You already have an account. Please login with your email and password."
      : "";
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
  const router = useRouter();
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    try {
      startTransition(() => {
        login(data).then((res) => {
          console.log("res", res);
          if (res?.success) {
            setFormSuccess(res?.message || "Login in successfully");
            setFormError("");

            setTimeout(() => {
              router.push("/settings");
            }, 500);
          } else {
            setFormError(res?.error || "Something went wrong");
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
                  <Button size={"sm"} variant={"link"} className="font-normal">
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>
                  <FormMessage>{formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* form Error */}
          <FormError message={urlError || formError} />
          <FormSuccess message={formSuccess} />
          {/* submit btn */}
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
