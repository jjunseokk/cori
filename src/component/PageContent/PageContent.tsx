"use client";
import React, { useState } from "react";
import "./PageContent.scss";

import Banner from "../Banner/Banner";
import Image from "next/image";
import ItemBox from "../ItemBox/ItemBox";

import right_btn from "../../../public/rightBtn.svg";
import left_btn from "../../../public/leftBtn.svg";
import bannerImg_1 from "../../../public/bannerImg_1.svg";
import bannerImg_2 from "../../../public/bannerImg_2.svg";

type PageContent = {
  page: string;
};

const PageContent = ({ page }: PageContent) => {
  const [position, setPosition] = useState(0);

  // 왼쪽으로 스와이프하는 함수
  const swipeLeft = () => {
    if (position < 0) {
      setPosition((prevPosition) => prevPosition + 25);
    }
  };

  // 오른쪽으로 스와이프하는 함수
  const swipeRight = () => {
    const contentWidth = -25 * (6 - 4);
    if (position > contentWidth) {
      setPosition((prevPosition) => prevPosition - 25);
    }
  };
  return (
    <div>
      <div className="review_wrapper">
        <Banner
          title={
            page === "review"
              ? "내 코드를 비교하며 성장하는 법"
              : "내 포트폴리오를 피드백 받고싶어?"
          }
          subTitle={
            page === "review"
              ? "코리에서 코드리뷰를 같이해요! 💻"
              : "코리가 도와줄게❤️"
          }
          img={page === "review" ? bannerImg_1 : bannerImg_2}
          color={page === "review" ? "#D1ECDE47" : "#FEC1FF47"}
        />
        <div className="hot_view">
          <div className="title">
            <h1>HOT🔥 {page === "review" ? "조회수" : "포트폴리오"}</h1>
            <div>
              <Image src={left_btn} alt="left" onClick={swipeLeft} />{" "}
              <Image src={right_btn} alt="right" onClick={swipeRight} />{" "}
            </div>
          </div>
          <div
            className="content_item"
            style={{ transform: `translateX(${position}%)` }}
          >
            <ItemBox
              path={`/review/${1}`}
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              path={`/review/${1}`}
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              path={`/review/${1}`}
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              path={`/review/${1}`}
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              path={`/review/${1}`}
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              path={`/review/${1}`}
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
          </div>
        </div>
        <div className="review_item">
          <h1>전체글</h1>
          <div>
            <ItemBox
              path={`/review/${1}`}
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
            <ItemBox
              title={"Props 주는 방법이 맞나요?"}
              type={page === "review" ? "review" : "portfolio"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
