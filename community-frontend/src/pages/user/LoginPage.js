import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { memberLogin } from "../../Store";

const LoginPage = (props) => {
  const dispatcher = useDispatch();
  const { member } = useSelector((store) => store);
  const [tryMember, setTryMember] = useState({
    loginId: "",
    password: "",
  });
  const submitLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tryMember),
    })
      .then((res) => {
        let jwtToken = res.headers.get("Authorization");
        localStorage.setItem("Authorization", jwtToken);
        return res.json();
      })
      .then((res) => {
        if (res.code === 1) {
          dispatcher(memberLogin(res.data));
          setTryMember(res.data);
          console.log("member.role:" + member.role);
          alert(res.data.name + "님 환영합니다! 로그인에 성공하셨습니다.");
          // props.history.push("/");
        } else {
          alert("로그인에 실패하였습니다.");
        }
      });
  };

  const changeValue = (e) => {
    setTryMember({
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
