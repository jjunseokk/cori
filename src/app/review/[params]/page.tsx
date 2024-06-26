"use client";
import React, { useState } from "react";
import "./reviewDetail.scss";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import backBtn from "../../../../public/backBtn.svg";
import heart_off from "../../../../public/detail_heart_off.svg";
import heart_on from "../../../../public/detail_heart_on.svg";
import defaultIcon from "../../../../public/defaultIcon.svg";
import ii from "../../../../public/ii.png";
import styled from "styled-components";
import { px2vw } from "@/util/px2vw";

const TextArea = styled.textarea`
  width: ${px2vw(1171)};
  height: ${px2vw(186)};
  border: 2px solid #d9d9d9;
  border-radius: 20px;
  padding: ${px2vw(30)};
  resize: none;
  font-size: 20px;

  &::placeholder {
    font-size: 20px;
    font-weight: 500;
    color: #d9d9d9;
  }
`;

type UserIconType = {
  width?: number;
};

const UserIcon = styled.div<UserIconType>`
  width: ${({ width }) => (width === 70 ? px2vw(70) : px2vw(50))};
  height: ${({ width }) => (width === 70 ? px2vw(70) : px2vw(50))};
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Button = styled.button`
  width: ${px2vw(188)};
  height: ${px2vw(52)};
  border-radius: 15px;
  background: #82b7f633;
  font-size: 20px;
  font-weight: 700;
  color: #82b7f6;
  border: none;
  cursor: pointer;
  margin-top: ${px2vw(35)};
  position: absolute;
  right: 0;
`;

const ReviewDetail = () => {
  const [selectedHeart, setSelectedHeart] = useState<boolean>(false);
  const [getComment, setGetComment] = useState<string>("");
  const [getCommentList, setGetCommentList] = useState<string[]>([]);
  const useSearch = useSearchParams();
  const title = useSearch.get("title");

  const CommentList = () => {
    setGetCommentList((prev) => [...prev, getComment]);
    setGetComment("");
  };
  
  return (
    <div className="review_detail_container">
      <div className="review_detail_wrapper">
        <div className="review_detail_title">
          <div>
            <Image
              onClick={() => {
                history.back();
              }}
              src={backBtn}
              alt="backBtn"
            />
            <h1>{title}</h1>
          </div>
          <Image
            onClick={() => {
              setSelectedHeart(!selectedHeart);
            }}
            src={selectedHeart ? heart_on : heart_off}
            alt="heart_off"
          />
        </div>
        <div className="userArea">
          <UserIcon>
            <Image src={defaultIcon} alt="defaultIcon" />
          </UserIcon>
          <p>userID</p>
          <p>2024.04.04</p>
        </div>
        <div></div>

        <div className="commentArea">
          <h1>댓글</h1>
          {getCommentList?.map((value) => {
            return (
              <div className="comment" key={Math.random()}>
                <UserIcon>
                  <Image src={defaultIcon} alt="defaultIcon" />
                </UserIcon>
                <div>
                  <p className="user">userID</p>
                  {value.split("\n").map((comment) => (
                    <p>{comment}</p>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="comment_write">
            <UserIcon width={70}>
              <Image src={ii} alt="defaultIcon" />
            </UserIcon>
            <TextArea
              onChange={(e) => {
                setGetComment(e.target.value);
              }}
              value={getComment}
              placeholder="댓글을 입력하세요."
            />
          </div>
          <Button onClick={CommentList}>댓글등록</Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
