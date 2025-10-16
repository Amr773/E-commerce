import React from 'react'
import { ProductType } from '../../../types/product.type';
import Image from 'next/image';
import AddBtn from '../AddBtn/AddBtn';

export default function Details({data }: {data : ProductType}) {
  return (
    <>
    <div className="flex justify-center p-12">
        <div className="container w-full lg:w-[80%] mx-auto p-4 flex justify-center">
          <div className="w-1/4">
            <div className="p-4">
              <Image src={data.imageCover} className="w-full" width={100} height={100} priority alt="" />
            </div>
          </div>
          <div className="w-3/4">
            <div className="p-4">
              <h1 className="text-2xl font-bold my-4">{data.title}</h1>
              <p>{data.description}</p>
              <p className="text-emerald-600 my-2">{data.category.name}</p>
              <div className="flex justify-between w-full my-5">
                <span className='font-bold'>{data.price} EGP</span>
                <span>
                  {data.ratingsAverage}
                  <i className="fas fa-star text-yellow-300"></i>
                </span>
              </div>
              <AddBtn id={data.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
