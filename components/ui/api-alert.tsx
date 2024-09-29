"use client"
import React from "react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const varientMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast.success("Api route copied to the clipboard successfully🥳")
  }
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={varientMap[variant]}> {textMap[variant]} </Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between mt-4">
        <code className="relative rounded font-mono bg-muted px-[0.3rem] py-[0.2rem] text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size={"icon"} onClick={onCopy}><Copy className="h-4 w-4" /> </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
