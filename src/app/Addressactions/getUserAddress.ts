"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function getLoggedUserAddress() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please Login To View Your Addresses");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json()

  return payload

}

