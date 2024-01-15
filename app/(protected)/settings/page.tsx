import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();

  return <div>{session?.user.name}</div>;
};

export default page;
