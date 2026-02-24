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
          spaceBetween={20}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 3,
              allowTouchMove: true,
            },
            768: {
              slidesPerView: 4,
              allowTouchMove: true,
            },
            1024: {
              slidesPerView: 5,
              allowTouchMove: true,
            },
            1280: {
              slidesPerView: 7,
              allowTouchMove: true,
            },
          }}
        >
          {data.map((category: CategoryType) => (
            <SwiperSlide key={category._id}>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={category.image}
                  className="h-[150px] w-auto object-cover"
                  alt="product"
                  width={100}
                  height={250}
                />
                <p className="text-center font-bold">{category.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
