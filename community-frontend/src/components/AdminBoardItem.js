import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import styled from "styled-components";

// const StyledButtonLink = styled(Link)`
//   border: 1px solid green;
//   padding: 10px;
//   height: 30px;
//   margin: 20px;
//   align-items: center;
// `;

const BoardItemAdmin = (props) => {
  const { id, title, author } = props.board;
  return (
    <>
      <Card
        bg={"dark"}
        style={{ width: "40rem", height: "100px" }}
        text={"white"}
      >
        <Card.Body>
          <Card.Title>
            <Link to={"/board/" + id}>{title}</Link>
          </Card.Title>
          <Card.Text>{author}</Card.Text>
        </Card.Body>
      </Card>
      <br></br>
    </>
  );
};
export default BoardItemAdmin;
