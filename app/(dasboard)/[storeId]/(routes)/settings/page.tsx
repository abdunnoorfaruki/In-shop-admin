import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/settings-form";

interface SettingsProps {
  params: {
    storeId: string;
  };
}
const Settings: React.FC<SettingsProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) redirect("/");

  return (
    <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SettingsForm initialData={store} />
        </div>
    </div>
  );
};

export default Settings;
