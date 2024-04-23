'use client'
import { px2vw } from "@/util/px2vw";
import styled from "styled-components";
type ButtonType ={
    width? : number;
    height? : number;
}
export const Button = styled.button<ButtonType>`
    width: ${({width})=>(width? px2vw(width) :px2vw(466))};
    height: ${({height})=>(height? px2vw(height) :px2vw(45))};
    background: #82B7F6;
    border-radius: 10px;
    color: #FFFFFF;
    font-size: 25px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    margin-top: 20px;
`