"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import "./login.scss";
import { Input } from "@/component/Input/Input";
import { Button } from "@/component/Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import github from "../../../public/github.svg";
import google from "../../../public/google.svg";
import kakao from "../../../public/kakao.svg";
import Footer from "@/component/Footer/Footer";

const page = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState<string[]>([]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Form Data:", loginForm);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <h1>로그인</h1>
        <form onSubmit={handleLogin}>
          <label>아이디</label>
          <Input onChange={handleInputChange} type="text" name="id" id="id" />
          <label>비밀번호</label>
          <Input
            onChange={handleInputChange}
            type="password"
            name="password"
            id="password"
          />

          <Button>로그인</Button>
        </form>
        <div>
          <p>ID/PW 찾기</p>
          <p
            onClick={() => {
              router.push("/join");
            }}
          >
            회원 가입
          </p>
        </div>
        <h1>소셜</h1>
        <div className="social">
          <Image src={github} alt="github" />
          <Image src={google} alt="google" />
          <Image src={kakao} alt="kakao" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
