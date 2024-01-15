import React from "react";
import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Create an account"
      backButtonHref="/auth/register"
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
};
