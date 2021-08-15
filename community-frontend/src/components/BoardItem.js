import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

// const StyledButtonLink = styled(Link)`
//   border: 1px solid green;
//   padding: 10px;
//   height: 30px;
//   margin: 20px;
//   align-items: center;
// `;

const BoardItem = (props) => {
  const { id, title, author, data, content } = props.board;
  return (
    <>
      <Card>
        <Card.Body>
          <Link to={"/board/" + id}>
            <Card.Title>제목:{title}</Card.Title>
          </Link>
          <Card.Subtitle>작성자:{author}</Card.Subtitle>
        </Card.Body>
      </Card>
      <br></br>
    </>
  );
};
export default BoardItem;
