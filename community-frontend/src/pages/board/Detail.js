import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginHeader from "../../components/LoginHeader";

const StyledContentDiv = styled.div`
  border: 1px solid green;
`;

const Detail = (props) => {
  const id = props.match.params.id;
  const [board, setBoard] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/api/board/" + id, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setBoard(res);
      });
  }, [id]);
  return (
    <div>
      <LoginHeader />
      <h1>글 상세보기</h1>
      <br></br>
      <h2>제목:{board.title}</h2>
      <h3>작성자:{board.author}</h3>
      <h4>작성일:{board.date}</h4>
      <label>글 내용:</label>
      <StyledContentDiv name="content">{board.content}</StyledContentDiv>
    </div>
  );
};

export default Detail;
