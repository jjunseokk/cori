"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./join.scss";
import { Input } from "@/component/Input/Input";
import { Button } from "@/component/Button/Button";
import axios from "axios";
import { showJoin } from "@/util/AxiosGet/AxiosUser";
import { JoinFormData } from "@/type/userType";
import { useRouter } from "next/navigation";

interface ModalData {
  error: string | null;
  type: string | null;
}

const Join = () => {
  const router = useRouter();
  const [joinFrom, setJoinFrom] = useState<JoinFormData>({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [checkPw, setCheckPw] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalData>();

  const handleChangeJoin = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setJoinFrom({ ...joinFrom, [name]: value });
  };

  const handleJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const guardPw = joinFrom.password === joinFrom.checkPassword;
    const passwordRegex = /^(?=.*[^A-Za-z0-9])[^\s(){}\[\]'"]{8,20}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // console.log(joinFrom);

    if (joinFrom.name === "") {
      alert("이름을 입력해주세요.");
    } else if (!passwordRegex.test(joinFrom.password)) {
      alert("8~20자 사이, 괄호, 따옴표를 제외한 특수문자를 포함해야합니다.");
    } else if (!guardPw) {
      setCheckPw(true);
    } else if (!emailRegex.test(joinFrom.email)) {
      alert("이메일을 올바르게 작성해주세요.");
    } else {
      setCheckPw(false);
      const { checkPassword, ...joinData } = joinFrom;

      showJoin(joinData).then((res) => {
        setModalContent(res.data);
      });
      // axios.post("http://localhost:8000/users", joinData).then((res) => {
      //   setModalContent(res.data);
      // });
    }
  };

  return (
    <div className="join_container">
      <div className="join_wrapper">
        <h1>회원가입</h1>
        <form onSubmit={handleJoin}>
          <label>이름</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="이름을 입력해주세요."
            type="text"
            name="name"
          />
          <label>이메일</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="이메일을 입력해주세요."
            type="email"
            name="email"
          />
          <label>비밀번호</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="비밀번호를 입력해주세요."
            type="password"
            name="password"
          />
          <label>비밀번호 확인</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="비밀번호를 입력해주세요."
            type="password"
            name="checkPassword"
          />
          {checkPw === true ? <p>비밀번호가 일치하지 않습니다.</p> : null}

          <Button>회원가입</Button>
        </form>
        {modalContent === undefined ? null : modalContent?.type === "error" ? (
          <div className="join_modal">
            <p>{modalContent?.error}</p>
            <Button
              onClick={() => {
                setModalContent(undefined);
              }}
              width={248}
              height={54}
            >
              확인
            </Button>
          </div>
        ) : (
          <div className="join_modal">
            <p>회원가입을 축하드립니다.</p>
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              로그인하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;
