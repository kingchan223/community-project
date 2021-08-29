import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader";
import styled from "styled-components";
const AdminDetail = (props) => {
  const StyledContentDiv = styled.div`
    border: 1px solid green;
  `;
  const id = props.match.params.id;
  const [board, setBoard] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/api/board/" + id, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setBoard(res);
      });
  }, [id]);

  const deleteBoard = (id) => {
    fetch("http://localhost:8080/api/admin/board/" + id, {
      method: "DELETE",
      headers: {
        ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
        REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.code === 1) {
          alert("성공적으로 삭제되었습니다.");
        } else {
          alert("에러가 발생했습니다.");
        }
        props.history.push("/admin/board/manage");
      });
  };
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
      <Button variant="danger" onClick={() => deleteBoard(id)}>
        삭제
      </Button>
    </div>
  );
};

export default AdminDetail;
