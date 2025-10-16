"use server";
import { cookies } from "next/headers";

export default async function getUserOrders() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
    }
  );

  const payload = await res.json();

  return payload;
}
