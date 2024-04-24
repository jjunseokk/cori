"use client";
import { px2vw } from "@/util/px2vw";
import styled from "styled-components";
type ButtonType = {
  width?: number;
  height?: number;
};
export const Button = styled.button<ButtonType>`
  width: ${({ width }) => (width ? width : 466)}px;
  height: ${({ height }) => (height ? height : 45)}px;
  background: #82b7f6;
  border-radius: 10px;
  color: #ffffff;
  font-size: 25px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;
