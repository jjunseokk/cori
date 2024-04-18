import { px2vw } from "@/util/px2vw";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Div = styled.div`
  width: ${px2vw(1280)};
  height: ${px2vw(400)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px ${px2vw(60)};
  background: ${({ color }) => color};
  border-radius: 20px;
  margin-top: ${px2vw(34)};
  margin-bottom: ${px2vw(150)};
  > div {
    .title {
      font-size: 50px;
      font-weight: 600;
    }
    .subTitle {
      font-size: 25px;
      font-weight: 500;
      margin-top: ${px2vw(12)};
    }
  }
`;

type BannerType = {
  title: string;
  subTitle: string;
  img: string;
  color: string;
};

const Banner = ({ title, subTitle, img, color }: BannerType) => {
  return (
    <Div color={color}>
      <div>
        <p className="title">{title}</p>
        <p className="subTitle">{subTitle}</p>
      </div>
      <Image src={img} alt="img" />
    </Div>
  );
};

export default Banner;
