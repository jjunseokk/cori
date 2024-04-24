import React from "react";
import dynamic from "next/dynamic";
const NoSsrWysiwyg = dynamic(() => import('@/component/Write/Write'), { ssr: false })


const AddWrite = () => {
  return <NoSsrWysiwyg />;
};

export default AddWrite;
