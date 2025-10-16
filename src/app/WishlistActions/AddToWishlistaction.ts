"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function AddToWishlist(id: string) {
  try{
    const token = await getMyToken();

  if (!token) {
    throw new Error("Please Login To Add Items To Your Wishlist");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const payload = await res.json();

  return payload;
  } catch(err){
    return err
  }
}
