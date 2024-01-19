"use client";
import { Input } from "@/components/ui/input";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "../ui/button";

export const NewPasswordForm = () => {
  return (
    <CardWrapper
      headerLabel="Reset Password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
        
      <Button size="lg" className="w-full">
        Reset Password
      </Button>
    </CardWrapper>
  );
};
