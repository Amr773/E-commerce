"use server"
export default async function getBrands() {

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    method: "GET",
  });

  const payload = await res.json()

  return payload

}

