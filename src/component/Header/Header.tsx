"use client";
import React, { useState } from "react";
import "./Header.scss";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [selectHeader, setSelectHeader] = useState("");

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
        <p
          onClick={() => {
            router.push("/login");
          }}
        >
          로그인
        </p>
      </div>
    </div>
  );
};

export default Header;
