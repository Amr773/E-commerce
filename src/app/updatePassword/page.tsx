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
import {
  updatePasswordSchema,
  updatePasswordSchemaType,
} from "../../schema/updatePassword.schema";
import UpdatePasswordUser from "../UserActions/updateUserPassword";
import { signOut } from "next-auth/react";

export default function UpdateUserPassword() {
  const form = useForm<updatePasswordSchemaType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });


  function logout() {
      signOut({
        callbackUrl: "/login",
      });
    }
  async function UpdateUserPassword(values: updatePasswordSchemaType) {
    try {
      const res = await UpdatePasswordUser(values);
      console.log(res);
      if (res.message === "success") {
        console.log(res);
        toast.success("Password Updated Successfully", {
          position: "top-center",
          duration: 2000,
        });
        logout()
      }
    } catch (err) {
      console.log(err);
      toast.success("Failed to update password", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  async function handleUpdatePassword(values: updatePasswordSchemaType) {
    console.log(values);
    UpdateUserPassword(values);
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">Update Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdatePassword)}>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Current Password:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>New Password:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Re-enter New Password:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4 w-full cursor-pointer">
              Sumbit New Password
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
