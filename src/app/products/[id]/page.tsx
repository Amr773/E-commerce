import React from "react";
import selectedProduct from "@/api/SelectedProduct";
import Details from "@/app/_components/Details/Details";
import getRelatedProducts from "@/ProductCategoryActions/ProductCategoryActions";
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";

export default async function ProductDetals({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await selectedProduct(id);

  if (!data) return <h1>No Products Here</h1>;

  const RelatedProducts = await getRelatedProducts(data.category._id);
  console.log(RelatedProducts.data);

  return (
    <>
      <Details data={data} />
      <div className="container mx-auto w-[80%] my-12">
        <h2 className="text-2xl font-bold text-slate-800">
          You Might Also Like
        </h2>
        <div className="flex flex-wrap">
          {RelatedProducts.data.map((currentProduct: ProductType) => (
            <SingleProduct key={currentProduct.id} product={currentProduct} />
          ))}
        </div>
        <h1></h1>
      </div>
    </>
  );
}
