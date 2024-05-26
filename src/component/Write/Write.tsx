"use client";
import React, { useRef, useState, useEffect } from "react";
import "./write.scss";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
// import ViewerComponent from "./ViewerComponent";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import userTokenStore from "@/stores/token";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { addPost } from "@/util/AxiosGet/AxiosPost";
import { AddPostData } from "@/type/postType";
import Image from "next/image";
import { motion } from "framer-motion";

import postDefault from "../../../public/postDefault.webp";
import close from "../../../public/close.svg";

const Write = () => {
  const router = useRouter();
  const inputClick = useRef(null);
  const editorRef = useRef<Editor | null>(null);
  const [getSelect, setGetSelect] = useState<string>("review");
  const [showSuccessModal, setShowSuccessModal] = useState<string>("");
  const [getTitle, setGetTitle] = useState<string>("");
  const [getImage, setGetImage] = useState<File>();
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const [showThumbnailModal, setShowThumbnailModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMassage, setAlertMassage] = useState<string>("");
  const { token }: any = userTokenStore();
  const Token = token?.user?.token;

  const addPostMutation = useMutation({
    mutationFn: (postData: AddPostData) => addPost(postData, Token),
    onSuccess: (res) => {
      setShowSuccessModal(res.data.message);
    },
  });

  const sendContents = () => {
    const editorIns = editorRef.current && editorRef.current.getInstance();
    if (editorIns) {
      const htmlContent = editorIns.getHTML();
      if (
        htmlContent === "<p><br></p>" ||
        htmlContent === "<p>글을 작성해주세요.</p>"
      ) {
        setShowAlert(true);
        setAlertMassage("글을 작성하지 않았어요.");
      } else if (getTitle === "") {
        setShowAlert(true);
        setAlertMassage("제목을 작성하지 않았어요.");
      } else {
        const preWrappedContent = `<pre>${htmlContent}</pre>`;
        addPostMutation.mutate({
          title: getTitle,
          content: preWrappedContent,
          selectOption: getSelect,
          thumbnail: getImage,
        });
      }
    }
  };

  const handleThumbnailUpload = () => {
    inputClick.current?.click();
  };

  const handleImageGet = (e) => {
    const file = e.target.files[0];
    setGetImage(file);
  };

  useEffect(() => {
    if (Token === undefined) {
      setCheckLogin(true);
    }
  }, [Token]);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showAlert, setShowAlert]);

  const option = [{ selectOption: "review" }, { selectOption: "portfolio" }];

  return (
    <div className="write_container">
      <div className="write_wrapper">
        {checkLogin ? (
          <div className="modal_container">
            <div>
              <p>로그인 후 이용해주세요.</p>
              <button onClick={() => router.push("/login")}>확인</button>
            </div>
          </div>
        ) : null}
        <input
          className="title"
          type="text"
          value={getTitle}
          placeholder="글 제목을 입력해주세요."
          onChange={(e) => {
            setGetTitle(e.target.value);
          }}
        />
        <select
          onChange={(e) => {
            setGetSelect(e.target.value);
          }}
        >
          {option.map((value) => {
            return (
              <option key={value.selectOption}>
                {value.selectOption === "review" ? "코드리뷰" : "포트폴리오"}
              </option>
            );
          })}
        </select>
        <Editor
          initialValue="글을 작성해주세요."
          ref={editorRef}
          placeholder="포트폴리오를 작성해주세요."
          previewStyle="vertical"
          hideModeSwitch={true}
          height="60vh"
          initialEditType="markdown"
          useCommandShortcut={true}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />

        <button
          onClick={() => {
            setShowThumbnailModal(true);
          }}
          className="submit"
        >
          다음
        </button>

        {showSuccessModal === "success" ? (
          <div className="successModal">
            <p>글 등록이 완료되었습니다.</p>
            <button
              onClick={() => {
                setShowSuccessModal("");
                router.push('/')
              }}
            >
              확인
            </button>
          </div>
        ) : null}


      </div>
      {showThumbnailModal ? (
        <div className="thumbnail-position">
          <motion.div
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="thumbnail-area"
          >
            <Image
              onClick={() => {
                setShowThumbnailModal(false);
              }}
              width={20}
              height={20}
              src={close}
              alt="close"
            />
            <h2>포스트 미리보기</h2>
            <p>썸네일을 설정해주세요.</p>
            <div className="thumbnail">
              <Image
                width={300}
                height={300}
                src={postDefault}
                alt="postDefault"
              />
            </div>
            <div>
              <p onClick={handleThumbnailUpload}>업로드</p>
              <p>제거</p>
            </div>
            <input onChange={handleImageGet} name="thumbnail" ref={inputClick} type="file" />
            <button onClick={sendContents}>제출</button>
          </motion.div>
        </div>
      ) : null}

      {showAlert ? (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="alert"
        >
          <p>{alertMassage}</p>
          <div className="loading"></div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default Write;
