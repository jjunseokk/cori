import Image from "next/image";
import React from "react";
import { Div } from "./ItemBoxStyle";
import { useRouter } from "next/navigation";

import heart_off from "../../../public/heart_off.png";
import heart_on from "../../../public/heart_on.png";
import eyes from "../../../public/eyes.svg";

type ItemBoxType = {
  title: string;
  type: string;
  path?: string;
};

const ItemBox = ({ title, type, path }: ItemBoxType) => {
  const router = useRouter();

  return (
    <Div
      onClick={() => {
        router.push(String(`${path}/?title=${title}`));
      }}
    >
      <div className="imgArea">
        <Image width={500} height={500} src="/test.png" alt="test" />
      </div>
      <div className="content">
        <p>{title}</p>
        <div className="middle">
          {type === "review" ? <p>코드리뷰⚙️</p> : <p>포트폴리오🎨</p>}
          <div>
            {type === "portfolio" ? (
              <p>
                <Image src={heart_off} alt="heart" /> 112
              </p>
            ) : null}
            <p>
              <Image src={eyes} alt="eyes" /> 112
            </p>
          </div>
        </div>
        <p className="date">등록일 2024.04.04</p>
      </div>
    </Div>
  );
};

export default ItemBox;
