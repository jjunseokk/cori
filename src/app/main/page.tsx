"use client";
import React from "react";
import "./main.scss";
import Image from "next/image";
import mainData from "./data/main.json";
import Footer from "@/component/Footer/Footer";

const Main = () => {
  function replaceSpan(text: string) {
    return text.replace(/<0>/g, "<span>").replace(/<\/0>/g, "</span>");
  }

  return (
    <div className="main_container">
      <div className="main_wrapper">
        {mainData?.map((value) => (
          <React.Fragment key={value.id}>
            <Image
              width={205}
              height={238}
              src={value.img}
              alt="main_1"
              priority
            />
            {value.text.split("\n").map((text) => (
              <p
                key={text}
                dangerouslySetInnerHTML={{ __html: replaceSpan(text) }}
              />
            ))}
          </React.Fragment>
        ))}
        <div className="cori_area">
          <Image width={347} height={428} src="/cori.png" alt="cori" />
          <div className="text">
            <p>
              <span>'코리'</span>와 함께 하면 좋은 점!
            </p>
            <br />
            <ol>
              <li>
                내가 짠 코드를 리뷰하고 더 멋진
                <br /> 개발자로 성장할 수 있습니다!
              </li>
              <br />
              <li>
                개발한 작업물을 공유하며 다양한
                <br /> 작업물을 볼 수 있습니다.
              </li>
              <br />
              <li>
                개발자들과 함께 다양한 정보를
                <br />
                주고받을 수 있습니다.
              </li>
              <br />
            </ol>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Main;
