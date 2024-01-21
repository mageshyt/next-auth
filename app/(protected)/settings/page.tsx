"use client";
import { auth, signOut } from "@/auth";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import React from "react";

const page = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <div className=" h-screen flex items-center justify-center">
      <Card className="w-[450px]  h-fit   shadow-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">
            🔐 Authenticated {user?.name}
          </h1>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-black text-lg font-semibold">Session</p>
              <pre className="text-black text-lg">name: {user?.name}</pre>
              <pre className="text-black text-lg">email: {user?.email}</pre>
              <pre className="text-black text-lg">phone: {user?.phone}</pre>
            </div>
            <Button
              onClick={() =>
                signOut({
                  redirectTo: "/auth/login",
                })
              }
              className="w-full m-4"
              size="lg"
            >
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
