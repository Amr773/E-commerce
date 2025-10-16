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
import { loginSchema, loginSchemaType } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginSchemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    console.log(response);

    if (response?.ok) {
      toast.success("Logined in Successfully", {
        position: "top-center",
        duration: 2000,
      });
      window.location.href = "/"
    } else {
      toast.error(response?.error, { position: "top-center", duration: 2000 });
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">
          Login To Your Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4 w-full cursor-pointer">Login</Button>
          </form>
        </Form>
        <div className="my-5">
          <Link href="/forget">
            <span>Forget Password ?</span>
          </Link>
        </div>
      </div>
    </>
  );
}
