"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function RemoveAddress(id: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please Login To Remove Address");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();

  return payload;
}
