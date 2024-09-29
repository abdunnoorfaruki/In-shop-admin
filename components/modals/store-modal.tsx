"use client";

import React, { useState } from "react";

// form's libraries
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"

// hooks
import { useStoreModal } from "@/hooks/use-store-modal";

// components
import Modal from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

// form schema
const formSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Atleast type four charecter to create new store" }),
});

const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState<boolean>(false)


  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const response = await axios.post("/api/stores", values)

      if(response.status === 201) {
        // write your logic here
        console.log(response.data.data)
        window.location.assign(`/${response.data.data.id}`)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  };
  return (
    <Modal
      title="Create Store"
      description="Add new store to manage product and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E-commerce" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" pt-6 space-x-4 flex justify-end items-center">
                <Button variant="outline" onClick={storeModal.onClose} disabled={loading} >
                  {" "}
                  Cancle
                </Button>
                <Button variant="default" type="submit" disabled={loading}>
                  {" "}
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
