"use server";

export default async function getSubCategories(id: string) {
  

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`, {
    method: "GET",
  });

  const payload = await res.json();

  return payload;
  
}
