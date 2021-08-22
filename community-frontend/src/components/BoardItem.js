import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BoardItem = (props) => {
  const { id, title, author, date } = props.board;
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
export default BoardItem;
