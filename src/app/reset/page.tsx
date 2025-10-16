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
import { resetSchema, resetSchemaType } from "@/schema/resetcode.schema";

export default function Reset() {
  const router = useRouter();

  const form = useForm<resetSchemaType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(resetSchema),
  });

  async function handleForget(values: resetSchemaType) {
    console.log(values);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      console.log(res);
      if (res.data.statusMsg === "success") {
        toast.success("Rest code was sent to your email", {
          position: "top-center",
          duration: 2000,
        });
        router.push("/resetPassword");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid Code", {
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
              name="resetCode"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Reset Code:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-4 w-full cursor-pointer">Sumbit Code</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
