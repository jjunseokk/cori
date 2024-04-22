"use client";
import React, { ChangeEvent, FormEvent, useState } from "react"; 
import "./join.scss";
import { Input } from "@/component/Input/Input";
import { Button } from "@/component/Button/Button";

const Join = () => {
  const [joinFrom, setJoinFrom] = useState<string[]>([]);

  const handleChangeJoin = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setJoinFrom({ ...joinFrom, [name]: value });
  };

  const handleJoin = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log("Submitted Form Data:", joinFrom);
  }

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
          <label>닉네임</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="닉네임을 입력해주세요."
            type="text"
            name="nickname"
          />
          <label>아이디</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="아이디를 입력해주세요."
            type="text"
            name="id"
          />
          <label>비밀번호</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="비밀번호를 입력해주세요."
            type="password"
            name="password"
          />
          <label>비밀번호</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="비밀번호를 입력해주세요."
            type="password"
            name="checkPassword"
          />
          <label>전화번호</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="전화번호를 입력해주세요."
            type="tel"
            name="phone"
          />

          <Button>회원가입</Button>
        </form>
      </div>
    </div>
  );
};

export default Join;
