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

const Write = () => {
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);
  const [getContent, setGetContent] = useState<string>("");
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const { token }: any = userTokenStore();
  const Token = token?.user?.token;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const sendContents = () => {
    const editorIns = editorRef.current && editorRef.current.getInstance();
    if (editorIns) {
      const htmlContent = editorIns.getHTML();
      const preWrappedContent = `<pre>${htmlContent}</pre>`;
      setGetContent(preWrappedContent);
    }
  };

  useEffect(() => {
    if (Token === undefined) {
      setCheckLogin(true);
    }
  }, [Token]);

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
      <button onClick={sendContents}>제출</button>
      {/* <div>
        <ViewerComponent content={getContent} />
      </div> */}
    </div>
  );
};

export default Write;
