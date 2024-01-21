"use client";
import { logout } from "@/action/logout";
import React, { FC } from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}
const LogoutButton: FC<LogoutButtonProps> = ({ children }) => {
  const onClick = () => {
    logout();
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

export default LogoutButton;
