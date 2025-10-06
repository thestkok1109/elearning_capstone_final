import React from "react";
import { ButtonStyled } from "../ButtonStyled/ButtonStyled";
import { Carousel } from "antd";

export default function SliderHome() {
  return (
    <div className="homePage__slider grid grid-cols-3">
      <div className="slider__left col-span-2 lg:col-span-3">
        <div className="h-full w-auto">
          <img src="../../img/slider.png" className="h-full w-auto" />
        </div>
      </div>

      <div className="slider__right col-span-1 lg:col-span-3 flex items-center lg:justify-center">
        <div className="slider__content lg:text-center">
          <h1
            className="text-6xl xl:text-4xl font-bold uppercase leading-tight xl:leading-tight"
            style={{ color: "#1d7a85" }}
          >
            Khởi đầu <br /> sự nghiệp của bạn
          </h1>
          <p
            className="text-3xl xl:text-xl leading-tight my-5"
            style={{ color: "#191919" }}
          >
            Trở thành lập trình chuyên nghiệp
            <br />
            tại
            <span className="font-bold uppercase" style={{ color: "#1d7a85" }}>
              {" "}
              E-Academy
            </span>
          </p>
          <a href="#courseList">
            <ButtonStyled className="mr-5 mt-5 text-lg xl:text-base">
              Xem khoá học
            </ButtonStyled>
          </a>
        </div>
      </div>
    </div>
  );
}
