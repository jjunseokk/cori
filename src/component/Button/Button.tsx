'use client'
import { px2vw } from "@/util/px2vw";
import styled from "styled-components";

export const Button = styled.button`
    width: ${px2vw(466)};
    height: ${px2vw(45)};
    background: #82B7F6;
    border-radius: 10px;
    color: #FFFFFF;
    font-size: 25px;
    font-weight: 700;
    border: none;
    cursor: pointer;
`