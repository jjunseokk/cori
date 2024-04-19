import styled from "styled-components";
import { px2vw } from "@/util/px2vw";

export const Div = styled.div`
  width: ${px2vw(298)};
  height: ${px2vw(296)};
  background: #d9d9d9;
  border-radius: 20px;
  box-shadow: 2px 4px 4px 0px #00000040;
  cursor: pointer;
  transition: all 0.5s;
  margin-bottom: ${px2vw(50)};

  &:hover {
    scale: 1.05;
    transition: all 0.5s;
  }
  .imgArea {
    width: ${px2vw(298)};
    height: ${px2vw(140)};
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    width: ${px2vw(298)};
    height: ${px2vw(156)};
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    background: #ffffff;
    padding: ${px2vw(15)};
    > p {
      font-size: 20px;
      font-weight: 500;
    }
    .middle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: ${px2vw(54)};
      > div {
        display: flex;
        > p {
          padding: ${px2vw(3)} ${px2vw(5)};
          border: 1px solid #82b7f6;
          border-radius: 15px;
          color: #82b7f6;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          align-items: center;
          color: #959595;
          font-size: 15px;
          border: none;
          img {
            margin-right: ${px2vw(5)};
          }
        }
      }
    }
    .date {
      color: #959595;
      font-size: 10px;
      font-weight: 500;
      margin-top: ${px2vw(17)};
    }
  }

  @media screen and (max-width: 1440px) {
    .content {
      > p {
        font-size: 13px;
      }
      .middle {
        margin-top: ${px2vw(40)};
        > p {
          font-size: 8px;
          &:last-of-type {
            font-size: 10px;
          }
        }
      }
      .date {
        color: #959595;
        font-size: 8px;
        font-weight: 500;
      }
    }
  }
`;
