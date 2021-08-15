import React from "react";
import { Button, Form } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div>
      <h1>로그인</h1>
      <Form onSubmit={""}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디를 입력하세요"
            onChange={""}
            name="title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="****"
            onChange={""}
            name="author"
          />
        </Form.Group>
        <Button variant="success" type="submit">
          LOGIN
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
