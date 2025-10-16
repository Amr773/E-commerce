import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "../../../types/product.type";
import AddBtn from "../AddBtn/AddBtn";
import AddWishlist from "../AddWishlistBtn/AddWishlistBtn";

export default function SingleProduct({ product }: { product: ProductType }) {
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5" key={product.id}>
        <div className="prod p-4">
          <Card className="gap-2 pb-0">
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle>
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-contain w-full h-auto"
                  />
                </CardTitle>
                <CardDescription className="text-emerald-500">
                  {product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="font-bold">
                <p className="line-clamp-1">{product.title}</p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <span>{product.price}</span>
                  <span className="flex items-center gap-2">
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-300"></i>
                  </span>
                </div>
              </CardFooter>
            </Link>
            <div className="flex justify-around items-center">
              <AddBtn id={product.id} />
              <AddWishlist id={product.id} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
