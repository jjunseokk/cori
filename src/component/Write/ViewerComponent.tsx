import React, { useEffect, useRef } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import styled from "styled-components";

const Div = styled.div`
  .toastui-editor-contents {
    > div {
      > pre {
        background: #ffffff;
        > div {
          > pre {
            background: beige;
          }
        }
      }
    }
    img {
      display: block;
      margin: 0 auto;
    }
  }
`;

type ViewType = {
  content: string;
};

const ViewerComponent = ({ content }: ViewType) => {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (viewerRef.current && viewerRef.current.getInstance) {
      viewerRef.current.getInstance().setMarkdown(content);
    }
  }, [content]);

  return (
    <Div>
      <Viewer initialValue={content} ref={viewerRef} />
    </Div>
  );
};

export default ViewerComponent;
