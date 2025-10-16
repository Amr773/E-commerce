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
import { addressSchema, addressSchemaType } from "@/schema/address.schema";
import Addaddress from "../Addressactions/addAddress";
import UserAddress from '../_components/UserAddress/UserAddress';

export default function Address() {

  const form = useForm<addressSchemaType>({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(addressSchema),
  });

  async function addUserAddress(values: addressSchemaType) {
    try {
          const res = await Addaddress(values);
          if (res.status === "success") {
            console.log(res);
            toast.success("Address added successfully", {
                    position: "top-center",
                    duration: 2000,
                  });
            
          }
        } catch (err) {
          console.log(err);
          toast.success("Failed to add address", {
                  position: "top-center",
                  duration: 2000,
                });
        }
  }

  async function handleAddress(values: addressSchemaType) {
    console.log(values);
    addUserAddress(values)
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">
          Add Address
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddress)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Address Details:</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Phone Number:</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4 w-full cursor-pointer">Register</Button>
          </form>
        </Form>
        <UserAddress />
      </div>
    </>
  );
}
