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
import { forgetSchema, forgetSchemaType } from "@/schema/forgetpassword.schema";

export default function Forget() {
  const router = useRouter();

  const form = useForm<forgetSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetSchema),
  });

  async function handleForget(values: forgetSchemaType) {
    console.log(values);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      console.log(res);
      if (res.data.statusMsg === "success") {
        toast.success("Rest code was sent to your email", {
          position: "top-center",
          duration: 2000,
        });
        router.push("/reset");
      }
    } catch (err) {
      console.log(err);
      toast.error("No account linked to your email", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">Reset Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleForget)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-4 w-full cursor-pointer">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
