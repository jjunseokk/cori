"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./join.scss";
import { Input } from "@/component/Input/Input";
import { Button } from "@/component/Button/Button";
import axios, { AxiosError } from "axios";
import { emailCertification, showJoin } from "@/util/AxiosGet/AxiosUser";
import { JoinFormData } from "@/type/userType";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface ModalData {
  error: string | null;
  type: string | null;
}

const Join = () => {
  const router = useRouter();
  const [joinFrom, setJoinFrom] = useState<JoinFormData>({
    name: "",
    loginId: "",
    email: "",
    emailCertification: null,
    password: "",
    checkPassword: "",
  });
  const [checkPw, setCheckPw] = useState<boolean>(false);
  const [checkId, setCheckId] = useState<string>(null);
  const [checkCertification, setCheckCertification] = useState<string>();
  const [successCertification, setSuccessCertification] =
    useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalData>();
  const [certificationNumber, setCertificationNumber] = useState<number>();

  const showJoinMutation = useMutation({
    mutationFn: (joinData: JoinFormData) => showJoin(joinData),
    onSuccess: (res) => {
      setModalContent(res.data);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        setCheckId(error.response.data.message);
      }
    },
  });

  const emailCertificationMutation = useMutation({
    mutationFn: (email: string) => emailCertification(email),
    onSuccess: (res) => {
      setCheckCertification(res.data.message);
      setCertificationNumber(res.data.authNum);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        setCheckCertification(error.response.data.message);
      }
    },
  });

  const handleChangeJoin = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setJoinFrom({ ...joinFrom, [name]: value });
  };

  const handleJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const guardPw = joinFrom.password === joinFrom.checkPassword;
    const passwordRegex = /^(?=.*[^A-Za-z0-9])[^\s(){}\[\]'"]{8,20}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (joinFrom.name === "") {
      alert("이름을 입력해주세요.");
    } else if (!passwordRegex.test(joinFrom.password)) {
      alert("8~20자 사이, 괄호, 따옴표를 제외한 특수문자를 포함해야합니다.");
    } else if (!guardPw) {
      setCheckPw(true);
    } else if (!emailRegex.test(joinFrom.email)) {
      alert("이메일을 올바르게 작성해주세요.");
    } else if (!successCertification) {
      alert("이메일 인증을 완료해주세요.");
    } else {
      setCheckPw(false);
      const { checkPassword, ...joinData } = joinFrom;

      showJoinMutation.mutate(joinData);
    }
  };

  const handleEmailCertification = () => {
    emailCertificationMutation.mutate(joinFrom.email);
  };

  const handleCertificationCheck = () => {
    if (joinFrom.emailCertification == certificationNumber) {
      setSuccessCertification(true);
    } else {
      setSuccessCertification(false);
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
          <label>아이디</label>
          <Input
            onChange={handleChangeJoin}
            placeholder="아이디를 입력해주세요."
            type="text"
            name="loginId"
          />
          {checkId ? <p>{checkId}</p> : null}
          <label>이메일</label>
          <div>
            <Input
              onChange={handleChangeJoin}
              placeholder="이메일을 입력해주세요."
              type="email"
              name="email"
            />
            <button type="button" onClick={handleEmailCertification}>
              인증
            </button>
          </div>
          {checkCertification ? <p>{checkCertification}</p> : null}

          <label>인증번호</label>
          <div>
            <Input
              onChange={handleChangeJoin}
              placeholder="인증번호를 입력해주세요."
              type="text"
              name="emailCertification"
            />
            <button type="button" onClick={handleCertificationCheck}>
              확인
            </button>
          </div>

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
