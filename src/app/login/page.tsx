"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./login.scss";
import { Input } from "@/component/Input/Input";
import { Button } from "@/component/Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import useTokenStore from "@/stores/token";
import { showLogin } from "@/util/AxiosGet/AxiosUser";
import { LoginFormData } from "@/type/userType";

// 이미지
import github from "../../../public/github.svg";
import google from "../../../public/google.svg";
import kakao from "../../../public/kakao.svg";
import Footer from "@/component/Footer/Footer";

const Login = () => {
  const { setToken } = useTokenStore() as { setToken: (token: any) => void };

  const router = useRouter();
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [getUser, setGetUser] = useState({
    message: "",
    status: "",
    statusCode: "",
  });

  const { data: session } = useSession();

  console.log("session",session);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Submitted Form Data:", loginForm);
    showLogin(loginForm).then((res) => {
      setGetUser(res.data);

      let now = new Date();
      const item = {
        value: res.data.token,
        expires: now.getTime() + 7 * 24 * 60 * 60 * 1000,
      };
      localStorage.setItem("token", JSON.stringify(item));
      window.location.reload();
    });
  };

  useEffect(() => {
    const itemStr = localStorage.getItem("token");
    const item = itemStr ? JSON.parse(itemStr) : null;
    setToken(item);
    item?.value ? router.push("/main") : null;
  }, [getUser]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <h1>로그인</h1>
        <form onSubmit={handleLogin}>
          <label>이메일</label>
          <Input
            onChange={handleInputChange}
            type="email"
            name="email"
            id="eamil"
          />
          <label>비밀번호</label>

          <Input
            onChange={handleInputChange}
            type="password"
            name="password"
            id="password"
          />
          <p>{getUser?.message}</p>
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
          <Image
            onClick={() => {
              signIn("github");
            }}
            src={github}
            alt="github"
          />
          <Image
            onClick={() => {
              signIn("google");
            }}
            src={google}
            alt="google"
          />
          <Image
            onClick={() => {
              signIn("kakao");
            }}
            src={kakao}
            alt="kakao"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
