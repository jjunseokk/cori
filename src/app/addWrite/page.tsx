import Write from "@/component/Write/Write";
import React from "react";

const AddWrite = () => {
  if (typeof navigator !== 'undefined') {
    return (
      <div>
        <Write />
      </div>
    );
  } else {
    return null;
  }
};

export default AddWrite;
