"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { CategoryType } from "@/types/category.type";

export default function CategorySwiper({ data }: { data: CategoryType[] }) {
  return (
    <>
      <div className="w-[77%] mx-auto">
        <h1 className="text-slate-500 font-semibold my-2">
          Shop Popular Categories
        </h1>
        <Swiper
          spaceBetween={0}
          slidesPerView={7}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          {data.map((category: CategoryType) => (
            <SwiperSlide key={category._id}>
              <Image
                src={category.image}
                className="h-[150px] w-auto object-cover"
                alt="product"
                width={150}
                height={250}
              />
              <p className="text-center font-bold">{category.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
