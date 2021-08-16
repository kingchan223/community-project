import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const LoginPage = (props) => {
  const [member, setMember] = useState({});
  const submitLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(member),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          res.data.setMember(res);
          alert(member.name + "님 환영합니다! 로그인에 성공하셨습니다.");
          props.history.push("/");
        } else {
          alert("로그인에 실패하였습니다.");
        }
      });
  };

  const changeValue = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>로그인</h1>
      <Form onSubmit={submitLogin}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디를 입력하세요"
            onChange={changeValue}
            name="loginId"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="*******"
            onChange={changeValue}
            name="password"
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
