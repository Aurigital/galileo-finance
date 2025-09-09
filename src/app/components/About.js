"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CTAnim from "../../../public/assets/lottie/CTA-anim.json";
import Lottie from "react-lottie";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 9000 });
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: CTAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      id="about-us"
      className="section pt-[8%] gap-[2%] bg-[#09002a] px-[10%] py-[50px] md:py-[5%]"
    >
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        className="grid py-8 md:py-0 md:grid-cols-2 items-center gap-[12%]"
      >
        <img alt="" src="/assets/fonts/What people are saying about us.svg" />
        <p className="text-[18px] leading-[32px] text-white/70">
          Everything you need to liquidate your crypto assets reliably.
        </p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="4000"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-[4%] py-[12%]"
      >
        <div className="px-8 py-14 rounded-[20px] hover-gradient">
          <img alt="" src="/assets/quotes.png" />
          <p className="pt-4 text-[15px] leading-[27px]">
            Since we started using Galileo Capital, our operations are
            much more efficient and safe. The integration was quick and the
            Support team is always available to help us. I highly recommend
            your services.
          </p>
        </div>

        <div className="px-8 py-14 rounded-[20px] hover-gradient">
          <img alt="" src="/assets/quotes.png" />
          <p className="pt-4 text-[15px] leading-[27px]">
            Galileo Capital has provided us with a complete solution to
            our cryptocurrency settlement needs. Your rates and
            competitive solutions and personalized customer service have made a
            big difference for our company.
          </p>
        </div>

        <div className="px-8 py-14 rounded-[20px] hover-gradient">
          <img alt="" src="/assets/quotes.png" />
          <p className="pt-4 text-[15px] leading-[27px]">
            Galileo Capital's advanced technology and focus on
            security have allowed us to handle large volumes of
            transactions with confidence. Regulatory compliance in the US is a big plus.
          </p>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="bg-cover bg-center py-[4%] my-[8%] md:my-0 flex flex-col md:flex-row items-center gap-[5%] p-4 rounded-[20px] mt-16"
        style={{
          backgroundImage: "url('/assets/bg-cta.avif')",
        }}
      >
        <div className="md:w-[30%]">
          <Lottie
            options={defaultOptions}
            className="h-[20px] md:h-[280px] w-auto"
          />
        </div>
        <div>
          <h3 className="text-[30px] lg:text-[48px] text-center md:text-start leading-[45px] lg:leading-[67px] font-[600]">
            Galileo Capital is fully regulated in the US
          </h3>
          <div className="flex items-center justify-center md:justify-start md:items-start relative">
            <button
              onClick={toggleDropdown}
              className="mt-6 bg-[#FCF0F8] text-black py-4 px-9 rounded-full text-[17px] font-[500] hover:bg-[#28C0F5] duration-300 hover:text-white"
            >
              Get Started
            </button>
            {dropdownOpen && (
              <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg z-10">
                <a
                  href="https://form.jotform.com/242172184154452"
                  className="block px-4 py-2 text-black hover:bg-[#28C0F5] hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  For Individuals
                </a>
                <a
                  href="https://form.jotform.com/242172269063455"
                  className="block px-4 py-2 text-black hover:bg-[#28C0F5] hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  For Business
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
