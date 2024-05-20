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

const Write = () => {
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);
  const [getSelect, setGetSelect] = useState<string>("review");
  const [showSuccessModal, setShowSuccessModal] = useState<string>("");
  const [getTitle, setGetTitle] = useState<string>("");
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
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
      const preWrappedContent = `<pre>${htmlContent}</pre>`;
      addPostMutation.mutate({
        title: getTitle,
        content: preWrappedContent,
        selectOption: getSelect,
      });
    }
  };

  useEffect(() => {
    if (Token === undefined) {
      setCheckLogin(true);
    }
  }, [Token]);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const option = [{ selectOption: "review" }, { selectOption: "portfolio" }];

  return (
    <div className="write_container">
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
      <button className="submit" onClick={sendContents}>
        제출
      </button>
      {showSuccessModal === "success" ? (
        <div className="successModal">
          <p>글 등록이 완료되었습니다.</p>
          <button
            onClick={() => {
              setShowSuccessModal("");
            }}
          >
            확인
          </button>
        </div>
      ) : null}

      {/* <div>
        <ViewerComponent content={getContent} />
      </div> */}
    </div>
  );
};

export default Write;
