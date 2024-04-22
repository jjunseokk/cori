'use client'
import { px2vw } from "@/util/px2vw";
import styled from "styled-components";

export const Input = styled.input`
  width: ${px2vw(466)};
  height: ${px2vw(30)};
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: ${px2vw(20)};
  padding-left: ${px2vw(5)};
  transition: all .5s;

  &::placeholder {
    color: #b9b9b9;
    font-size: 12px;
    font-weight: 400;
  }
  &:focus{
    outline: none;
    border-bottom: 1px solid #82B7F6;
    transition: all .5s;
  }
`;
