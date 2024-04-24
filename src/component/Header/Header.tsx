"use client";
import React, { useEffect, useState } from "react";
import "./Header.scss";
import { useRouter } from "next/navigation";
import useTokenStore from "@/stores/token";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/util/AxiosGet/AxiosUser";
import Image from "next/image";

import default_img from '../../../public/defaultIcon.svg';

interface TokenType {
  value: string;
  expires: number;
}

const Header = () => {
  const router = useRouter();
  const [selectHeader, setSelectHeader] = useState("");
  const [showMyPage, setShowMyPage] = useState<boolean>(false);
  const { token }: { token: string } = useTokenStore() as { token: string };

  const { data, status } = useQuery({
    queryKey: ["popularList"],
    queryFn: () => getUser(item?.value),
  });

  console.log(data?.data.User);

  const loginToken = localStorage.getItem("token");
  const item: TokenType = JSON.parse(loginToken as string);

  return (
    <div className="header_container">
      <h1 className="title" onClick={() => setSelectHeader("")}>
        코리
      </h1>
      <div className="right_menu">
        <p
          className={selectHeader === "review" ? "active" : ""}
          onClick={() => {
            router.push("/review");
            setSelectHeader("review");
          }}
        >
          코드리뷰
        </p>
        <p
          className={selectHeader === "portfolio" ? "active" : ""}
          onClick={() => {
            router.push("/portfolio");
            setSelectHeader("portfolio");
          }}
        >
          포트폴리오
        </p>
        <p
          className={selectHeader === "addWrite" ? "active" : ""}
          onClick={() => {
            router.push("/addWrite");
            setSelectHeader("addWrite");
          }}
        >
          새글 작성
        </p>
        {item?.value ? (
          <div>
            <div>
              <p
                onClick={() => {
                  setShowMyPage(!showMyPage);
                }}
              >
                마이페이지
              </p>
              <div className="profile_img">
                {data?.data?.User[0].profileImg === null ? (
                  <Image src={default_img} alt="default_img" />
                ) : (
                  <Image src={data?.data.User[0].profileImg} alt="profileImg" />
                )}
              </div>
            </div>

            <div className={showMyPage === true ? "my_page active" : "my_page"}>
              <p>내 작성글</p>
              <p>설정</p>
              <p
                onClick={() => {
                  localStorage.removeItem("token");
                  location.reload();
                }}
              >
                로그아웃
              </p>
            </div>
          </div>
        ) : (
          <p
            onClick={() => {
              router.push("/login");
            }}
          >
            로그인
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
