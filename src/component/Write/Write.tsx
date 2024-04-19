"use client";
import React, { useRef, useState, useEffect } from "react";
import "./write.scss";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import ViewerComponent from "./ViewerComponent";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "prismjs/themes/prism.css";
import Prism from "prismjs";

const Write = () => {
  const editorRef = useRef<Editor | null>(null);
  const [getContent, setGetContent] = useState<string>("");

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

  return (
    <div className="write_container">
      <h1>포트폴리오를 작성해보세요.</h1>
      <Editor
        initialValue="포트폴리오를 작성해주세요."
        ref={editorRef}
        placeholder="포트폴리오를 작성해주세요."
        previewStyle="vertical"
        hideModeSwitch={true}
        height="40rem"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={() => {
          sendContents();
        }}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
      <button onClick={sendContents}>제출</button>
      <div>
        <ViewerComponent content={getContent} />
      </div>
    </div>
  );
};

export default Write;
