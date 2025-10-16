"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import {
  updateUserSchema,
  updateUserSchemaType,
} from "@/schema/updateUser.schema";
import UpdateData from "../UserActions/updateUserData";

export default function UpdateUserPassword() {
  const form = useForm<updateUserSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(updateUserSchema),
  });

  function logout() {
    signOut({
      callbackUrl: "/login",
    });
  }
  async function UpdateUserData(values: updateUserSchemaType) {
    try {
      const res = await UpdateData(values);
      console.log(res);
      if (res.message === "success") {
        console.log(res);
        toast.success("Data Updated Successfully", {
          position: "top-center",
          duration: 2000,
        });
        logout()
      }
    } catch (err) {
      console.log(err);
      toast.success("Failed to update data", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  async function handleUpdatePassword(values: updateUserSchemaType) {
    console.log(values);
    UpdateUserData(values);
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">Update My Data</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdatePassword)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>New Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>New Email:</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>New Phone:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4 w-full cursor-pointer">
              Sumbit New Data
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
