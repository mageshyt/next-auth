import { auth } from "@/auth";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const page = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 h-screen flex items-center justify-center">
      <Card className="w-[450px] py-10   shadow-md">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
