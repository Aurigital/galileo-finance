"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Solution = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      id="solution"
      className="flex flex-col lg:flex-row gap-[2%] bg-[#09002a] px-[10%] py-[50px] md:py-[5%] justify-center"
    >
      <div data-aos="fade-up" className="md:w-[80%] lg:w-[65%] mx-auto">
        <div className="grid pb-[15%] grid-cols-3 gap-[4%] justify-between">
          <div className="flex flex-col text-center items-center gap-[20px]">
            <img
              alt=""
              src="/assets/Icons/icon4.png"
              className="h-14 w-auto md:h-auto"
            />
            <p className="text-[15px] md:text-[20px] lg:text-[23px] leading-[23px] md:leading-[38px]">
              Advanced Blockchain Technology
            </p>
          </div>
          <div className="flex flex-col text-center items-center gap-[20px]">
            <img
              alt=""
              src="/assets/Icons/icon5.png"
              className="h-14 w-auto md:h-auto"
            />
            <p className="text-[15px] md:text-[20px] lg:text-[23px] leading-[23px] md:leading-[38px]">
              Secure Trading Algorithms
            </p>
          </div>
          <div className="flex flex-col text-center items-center gap-[20px]">
            <img
              alt=""
              src="/assets/Icons/icon6.png"
              className="h-14 w-auto md:h-auto"
            />
            <p className="text-[15px] md:text-[20px] lg:text-[23px] leading-[23px] md:leading-[38px]">
              Robust Custody Agreements
            </p>
          </div>
        </div>
        <img alt="" src="/assets/fonts/Partner with Galileo Capital and experience the future of cryptocurrency liquidation..svg" />
      </div>
      <div
        data-aos="fade-up"
        className="lg:ml-0 w-[90%] pt-[8%] lg:pt-0 lg:w-[35%] mx-auto lg:mx-0"
      >
        <img alt="" src="/assets/img1.avif" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Solution;
