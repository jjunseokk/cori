'use client'
import React from "react";
import "./Header.scss";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div className="header_container">
      <h1 className="title">코리</h1>
      <div className="right_menu">
        <p
          onClick={() => {
            router.push("/portfolio");
          }}
        >
          포트폴리오
        </p>
        <p
          onClick={() => {
            router.push("/review");
          }}
        >
          코드리뷰
        </p>
        <p
          onClick={() => {
            router.push("/portfolio");
          }}
        >
          로그인
        </p>
      </div>
    </div>
  );
};

export default Header;
