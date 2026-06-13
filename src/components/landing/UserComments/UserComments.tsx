"use client";

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules';
import { useState } from "react";

import { isoToPersianDate } from '@/util/helper/persianFormat';

import { FakeComments } from '@/types/FakeUserComments/FakeUserComments';

interface props {
  comment:any[]
}

const UserComments = ({comment}:props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = FakeComments.length;

  const progress = (activeIndex + 1) / total;

  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - progress * circumference;

  return (
    <div className="w-full py-16">

      <h2 className="text-2xl font-bold text-right mb-12 md:text-3xl">
        نظرات کاربران پیزا
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        loop={true}
        dir="rtl"
        spaceBetween={30}
        slidesPerView={3}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >

        {comment.length > 0 ? comment.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="bg-[#4E6AF3] text-white rounded-3xl p-8 min-h-[320px] h-auto flex flex-col justify-between">
              <p className="leading-relaxed">{item.text}</p><br/>
              <p className="leading-relaxed text-[14px]">{item.caption}</p>

              <div className="flex  justify-baseline gap-5 items-center mt-6" dir=''>
                <div className="w-10 h-10 bg-white rounded-full"></div>
                <div className="text-right">
                  <p className="font-bold">{`${item.user.lastName + " " + item.user.firstName}`}</p>
                  <p className="text-sm opacity-80">{isoToPersianDate(item.created_at)}</p>
                </div>

                
              </div>
            </div>
          </SwiperSlide>
        )) : <div>کامنتی نداریم</div>}
      </Swiper>

      <div dir='ltr' className="flex items-center gap-6 mt-8">

        <svg
          width="30"
          height="30"
          className="rotate-[-90deg]"
        >
          <circle
            cx="15"
            cy="15"
            r={radius}
            fill="none"
            stroke="#d0d7ff"
            strokeWidth="3"
          />
          <circle
            cx="15"
            cy="15"
            r={radius}
            fill="none"
            stroke="#4E6AF3"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>

        <div dir='' className="flex items-center gap-4">
          <button className="prev-btn text-2xl text-gray-500 hover:text-black">←</button>
          <button className="next-btn text-2xl text-gray-500 hover:text-black">→</button>
        </div>

      </div>
    </div>
  );
}

export default UserComments