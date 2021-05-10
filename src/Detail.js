import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const Detail = (props) => {
  const date = props.match.params.index.split('-')
  console.log(date);
  return <>
    <GlobalStyles />
    <h1>{date[0]}년 {date[1]}월 {date[2]}일</h1>
    <Input>
      <p>123<span></span></p>
    </Input>
  </>
}

const GlobalStyles = createGlobalStyle`
      body {
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
        font-family: 'Nanum Gothic', sans-serif !important;
      }
    `;

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & p {
    font-weight: 100;
    font-size: 1.5em;
  }
`;

export default Detail;