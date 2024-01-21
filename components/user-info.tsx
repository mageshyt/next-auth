import { ExtendedUser } from "@/next-auth";
import React, { FC } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface userInfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo: FC<userInfoProps> = ({ user, label }) => {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl text-center ">
          <strong>{label}</strong>
        </p>

        <p className="text-center text-gray-500">
          This page is <strong>SSR</strong> and <strong>SSG</strong> rendered
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ID */}
        <div className="flex  items-center justify-between rounded-lg border p-3">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        {/* Name */}
        <div className="flex  items-center justify-between rounded-lg border p-3">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        {/* email */}
        <div className="flex  items-center justify-between rounded-lg border p-3">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        {/* role */}
        <div className="flex  items-center justify-between rounded-lg border p-3">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        {/* is Two Factor enable */}
        <div className="flex  items-center justify-between rounded-lg border p-3">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
