"use client";
import React, { useEffect, useState } from "react";
import "./Header.scss";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/util/AxiosGet/AxiosUser";
import Image from "next/image";

import default_img from "../../../public/defaultIcon.svg";
import userTokenStore from "@/stores/token";

const Header = () => {
  const router = useRouter();
  const path = usePathname();
  const [showMyPage, setShowMyPage] = useState<boolean>(false);

  const { token, setToken }: any = userTokenStore();
  const Token = token?.user?.token;

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(Token),
    enabled: !!Token,
  });

  useEffect(() => {
    const loginToken = JSON.parse(window.localStorage.getItem("token"));
    setToken(loginToken);
  }, []);

  return (
    <div className="header_container">
      <h1
        className="title"
        onClick={() => {
          router.push("/main");
        }}
      >
        코리
      </h1>
      <div className="right_menu">
        <p
          className={path === "/review" ? "active" : ""}
          onClick={() => {
            router.push("/review");
          }}
        >
          코드리뷰
        </p>
        <p
          className={path === "/portfolio" ? "active" : ""}
          onClick={() => {
            router.push("/portfolio");
          }}
        >
          포트폴리오
        </p>
        <p
          className={path === "/addWrite" ? "active" : ""}
          onClick={() => {
            router.push("/addWrite");
          }}
        >
          새글 작성
        </p>
        {token?.user ? (
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
                {data?.data.User[0].profileImg === null ? (
                  <Image src={default_img} alt="default_img" />
                ) : (
                  data?.data.User[0].profileImg && (
                    <Image
                      src={data?.data.User[0].profileImg}
                      alt="profileImg"
                      width={100}
                      height={100}
                    />
                  )
                )}
              </div>
            </div>

            <div className={showMyPage === true ? "my_page active" : "my_page"}>
              <p>내 작성글</p>
              <p
                onClick={() => {
                  router.push("/profile");
                }}
              >
                설정
              </p>
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
