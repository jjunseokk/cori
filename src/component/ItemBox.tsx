import { px2vw } from "@/util/px2vw";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

import eyes from "../../public/eyes.svg";

const Div = styled.div`
  width: ${px2vw(298)};
  height: ${px2vw(296)};
  background: #d9d9d9;
  border-radius: 20px;
  box-shadow: 2px 4px 4px 0px #00000040;
  .imgArea {
    width: ${px2vw(298)};
    height: ${px2vw(140)};
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    width: ${px2vw(298)};
    height: ${px2vw(156)};
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    background: #ffffff;
    padding: ${px2vw(15)};
    > p {
      font-size: 20px;
      font-weight: 500;
    }
    .middle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: ${px2vw(40)};
      > p {
        padding: ${px2vw(3)} ${px2vw(10)};
        border: 1px solid #82b7f6;
        border-radius: 15px;
        color: #82b7f6;
        font-size: 10px;
        font-weight: 500;
        &:last-of-type {
          display: flex;
          align-items: center;
          color: #959595;
          font-size: 15px;
          border: none;
          img {
            margin-right: ${px2vw(5)};
          }
        }
      }
    }
    .date {
      color: #959595;
      font-size: 10px;
      font-weight: 500;
      margin-top:  17px;
    }
  }
`;

type ItemBoxType = {
  title: string;
  type: string;
};

const ItemBox = ({ title, type }: ItemBoxType) => {
  return (
    <Div>
      <div className="imgArea">
        <Image width={500} height={500} src="/test.png" alt="test" />
      </div>
      <div className="content">
        <p>{title}</p>
        <div className="middle">
          {type === "review" ? <p>코드리뷰⚙️</p> : <p>포트폴리오🎨</p>}
          <p>
            <Image src={eyes} alt="eyes" /> 112
          </p>
        </div>
        <p className="date">등록일 2024.04.04</p>
      </div>
    </Div>
  );
};

export default ItemBox;
