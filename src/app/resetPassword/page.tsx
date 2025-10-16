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
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  resetPasswordSchema,
  resetPasswordSchemaType,
} from "@/schema/resetpassword.schema";

export default function ResetPassword() {
  const router = useRouter();

  const form = useForm<resetPasswordSchemaType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function handleForget(values: resetPasswordSchemaType) {
    console.log(values);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      console.log(res);
      if (res.data.statusMsg === "success") {
        toast.success("Password Reset Successfully", {
          position: "top-center",
          duration: 2000,
        });
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Falied To Reset Password", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">
          Enter Reset Code
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleForget)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>New Password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
