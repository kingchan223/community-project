import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BoardItem = (props) => {
  const { id, title, author } = props.board;
  return (
    <>
      <Card
        bg={"dark"}
        style={{
          width: "40rem",
          height: "72px",
          marginLeft: "50px",
          marginBottom: "1px",
        }}
        text={"white"}
      >
        <Card.Body>
          <Card.Title>
            <Link to={"/board/" + id}>{title}</Link>
          </Card.Title>
          <Card.Text>작성자:{author}</Card.Text>
        </Card.Body>
      </Card>
      <br></br>
    </>
  );
};
export default BoardItem;
