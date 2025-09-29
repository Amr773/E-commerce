"use server";
import { checkoutSchemaType } from "@/schema/checkout.schema";
import getMyToken from "@/utilities/getMyToken";

export default async function onlinePayment(
  cartId: string,
  url = process.env.NEXT_URL,
  formValues: checkoutSchemaType,
  paymentType: string
) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please Login To Add Items To Your Cart");
  }

  if (paymentType === "card") {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress: formValues }),
      }
    );

    const payload = await res.json();
    return payload;
  } else if (paymentType === "cash") {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress: formValues }),
      }
    );

    const payload = await res.json();
    return payload;
  }
}
