import React from 'react'
import  getProducts  from '@/api/products.api';
import SingleProduct from '../SingleProduct/SingleProduct';
import { ProductType } from '@/types/product.type';


export default async function AllProducts() {

    const data = await getProducts()

  return (
    <>
    <div className="container mx-auto w-[80%] my-12">
        <div className="flex flex-wrap">
          {data.map((currentProduct: ProductType) => (
            <SingleProduct key = {currentProduct.id} product={currentProduct} />
          ))}
        </div>
      </div>
    </>
  )
}
