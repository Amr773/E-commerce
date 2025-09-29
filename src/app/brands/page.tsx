"use client";
import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Image from "next/image";
import { CategoryType } from "@/types/category.type";
import getBrands from "@/api/getBrands";

export default function Categories() {
  const [brands, setbrands] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  async function getAllBrands() {
    const res = await getBrands();
    if (res) {
      console.log(res);
      setbrands(res.data);
      setisLoading(false);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto my-12">
            <div className="row  ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {brands.map((brand: CategoryType) => (
                  <>
                    <Card
                      key={brand._id}
                      className="h-[500px] cursor-pointer transition duration-300 hover:shadow-2xl hover:shadow-emerald-300"
                    >
                      <div className="h-[500px] overflow-hidden ">
                        <Image
                          src={brand.image}
                          alt={brand.name}
                          className="h-full w-full object-contain"
                          width={500}
                          height={500}
                        />
                      </div>
                      <h5 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                        {brand.name}
                      </h5>
                    </Card>
                  </>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
