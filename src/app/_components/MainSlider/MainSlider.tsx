"use client";
import React from "react";
import img1 from "../../../../public/images/slider-image-1.jpg";
import img2 from "../../../../public/images/slider-image-2.jpg";
import img3 from "../../../../public/images/slider-image-3.jpg";
import img4 from "../../../../public/images/slider-image-4.jpg";
import img5 from "../../../../public/images/slider-image-5.jpg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function MainSlider() {
  return (
    <div className="w-[80%] mx-auto p-4 my-4  flex">
      <div className="w-3/4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          <SwiperSlide>
            <Image
              src={img1}
              className="w-full object-cover h-[400px]"
              alt="product"
              priority
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img4}
              className="w-full object-cover h-[400px]"
              alt="product"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img5}
              className="w-full object-cover h-[400px]"
              alt="product"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/4">
        <Image
          src={img2}
          className="w-full object-cover h-[200px]"
          alt="product"
        />
        <Image
          src={img3}
          className="w-full object-cover h-[200px]"
          alt="product"
        />
      </div>
    </div>
  );
}
