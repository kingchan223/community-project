import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const JoinPage = (props) => {
  const [member, setMember] = useState({
    name: "",
    email: "",
    loginId: "",
    password: "",
    city: "",
    street: "",
    zipcode: "",
  });

  const changeValue = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const saveMember = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/member", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(member),
    })
      .then((res) => {
        if (res.status === 201) return res.json();
        else return null;
      })
      .then((res) => {
        if (res !== null) {
          setMember(res);
          alert(member.name + "님의 회원가입이 완료되었습니다.");
          props.history.push("/");
        }
      });
  };
  return (
    <div>
      <h1>회원가입</h1>
      <Form onSubmit={saveMember}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="이름을 입력하세요"
            onChange={changeValue}
            name="name"
          />
        </Form.Group>

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
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="community@nav.com"
            onChange={changeValue}
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>패스워드</Form.Label>
          <Form.Control
            type="password"
            placeholder="5자리 이상입력"
            onChange={changeValue}
            name="password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>주소1:도시</Form.Label>
          <Form.Control
            type="text"
            placeholder="ex)안양시"
            onChange={changeValue}
            name="city"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>주소2:동,구</Form.Label>
          <Form.Control
            type="text"
            placeholder="ex)산본동"
            onChange={changeValue}
            name="street"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>주소3:우편번호</Form.Label>
          <Form.Control
            type="text"
            placeholder="5자리 우편번호 입력"
            onChange={changeValue}
            name="zipcode"
          />
        </Form.Group>

        <Button variant="success" type="submit">
          SUBMIT
        </Button>
      </Form>
    </div>
  );
};

export default JoinPage;
