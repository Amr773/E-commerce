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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { checkoutSchema, checkoutSchemaType } from "@/schema/checkout.schema";
import onlinePayment from "@/checkoutActions/onlineCheckout.action";
import { useUser } from "@/context/OrdersContext";

export default function Checkout() {
  const { id }: { id: string } = useParams();
  const [paymentType, setpaymentType] = useState("");

  const { setuserId } = useUser();



  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleCheckout(values: checkoutSchemaType) {
    const res = await onlinePayment(id, "", values, paymentType);
    console.log(res);
    if (res.status === "success" && paymentType === "card") {
      setuserId(res.data.user);
      document.cookie = `userId=${res.data.user}; path=/; max-age=86400`;
      window.location.href = res.session.url;
    } else if (res.status === "success" && paymentType === "cash") {
      setuserId(res.data.user);
      document.cookie = `userId=${res.data.user}; path=/; max-age=86400`;
      // window.location.href = "/allorders";
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">
          Procced Checkout
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCheckout)}>
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Details:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>City:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-4 w-full cursor-pointer"
              onClick={() => {
                setpaymentType("card");
              }}
            >
              Pay With Card
            </Button>
            <Button
              className="mt-4 w-full cursor-pointer bg-emerald-600"
              onClick={() => {
                setpaymentType("cash");
              }}
            >
              Pay With Cash
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
