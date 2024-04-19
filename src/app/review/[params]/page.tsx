"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Write from "@/component/Write/Write";

const ReviewDetail = () => {
  const useSearch = useSearchParams();

  console.log(useSearch.get("title"));
  return (
    <div className="">
      <Write />
    </div>
  );
};

export default ReviewDetail;
