"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useOrigin } from "@/hooks/use-origin";

import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import axios from "axios";


import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import { Input } from "@/components/ui/input";
import ApiAlert from "@/components/ui/api-alert";

import { Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Please type atleast 3 character" }),
});
type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params  = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/stores/${params.storeId}`, values)
      router.refresh()
      toast.success("Store new updated successfully🥳")

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")

    } finally {
      setLoading(false)
    }
  };

  const onDelete = async () =>{
    try {
      setLoading(true)
      await axios.delete( `/api/stores/${params.storeId}`)
      router.refresh()
      router.push("/")
      toast.success("Store deleted successfully🥳")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <AlertModal isOpen={open} onClose={() =>setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex justify-between items-center">
        <Heading title="Settings" description="Manage store preferance" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label="Delete the store"
          role="alert"
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E-commerce"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} >Save Changes</Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public" />
    </>
  );
};

export default SettingsForm;
