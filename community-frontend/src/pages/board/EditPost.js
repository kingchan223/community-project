import React, {useEffect, useState} from "react";
import { Button, Form } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader";

const EditPost = (props) => {
  const id = props.match.params.id;
  const [board, setBoard] = useState({
    id: {id},
    title: "",
    content: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/board/" + id, {
      method: "GET",
      headers: {
        ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
        REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
      },
    })
        .then((res) => res.json())
        .then((res) => {
          setBoard(res);
        });
  }, [id]);

  const submitEdit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/board/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain",
        ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
        REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
      },
      body: JSON.stringify(board),
    })
        .then((res) => res.json())
        .then((res) => {
          setBoard(res);
          alert("글 수정에 성공하셨습니다.");
          props.history.push("/home");
        });
  }

  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <LoginHeader />
      <h1>글쓰기</h1>
      <Form onSubmit={submitEdit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>글 제목</Form.Label>
          <Form.Control
            type="text"
            // placeholder={board.title}
            name="title"
            onChange={changeValue}
            value={board.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>글 내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={20}
            placeholder={board.content}
            name="content"
            onChange={changeValue}
            value={board.content}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          SUBMIT
        </Button>
      </Form>
    </div>
  );
};

export default EditPost;
