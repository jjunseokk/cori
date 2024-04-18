"use client";
import React from "react";
import "./portfolio.scss";
import ItemBox from "@/component/ItemBox";
import bannerImg_1 from "../../../public/bannerImg_1.svg";
import Banner from "@/component/Banner";

const page = () => {
  return (
    <div className="portfolio_container">
      <div className="portfolio_wrapper">
        <Banner
          title="내 코드를 비교하며 성장하는 법"
          subTitle="코리에서 코드리뷰를 같이해요!💻"
          img={bannerImg_1}
          color="#D1ECDE47"
        />
        <ItemBox title={"Props 주는 방법이 맞나요?"} type={"review"} />
      </div>
    </div>
  );
};

export default page;
