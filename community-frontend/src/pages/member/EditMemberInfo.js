import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoginHeader from "../../components/LoginHeader";
import { memberLogin } from "../../Store";

const EditMemberInfo = (props) => {
  const { member } = useSelector((store) => store);
  const dispather = useDispatch();
  const [editMemberForm, setEditMemberForm] = useState({
    loginId: "",
    email: "",
    name: "",
    city: "",
    street: "",
    zipcode: "",
  });
  useEffect(() => {
    fetch("http://localhost:8080/api/member", {
      method: "GET",
      headers: {
        ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
        REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
      },
    })
      .then((res) => {
        if (res.code === 1) {
          console.log(res.msg);
          return res.json();
        } else if (res.code === 2 || res.code === 3) {
          console.log(res.msg);
          alert("세션이 만료되었습니다. 다시 로그인 해주세요");
          props.history.push("/login");
        } else {
          console.log(res.msg);
          return res.json();
        }
      })
      .then((res) => {
        console.log(res.msg);
        setEditMemberForm(res.member);
      });
  }, []);
  const changeMember = (e) => {
    e.preventDefault();

    console.log("member.id: " + member.id);
    console.log("member.loginid: " + member.loginId);
    fetch("http://localhost:8080/api/member/" + member.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json, text/plain",
        ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
        REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
      },
      body: JSON.stringify(editMemberForm),
    })
      .then((res) => {
        if (res.code === 1) return res.json();
        else if (res.code === 2) {
          let accessToken = res.headers.get("ACCESS_TOKEN");
          localStorage.setItem("ACCESS_TOKEN", accessToken);
          fetch("http://localhost:8080/api/member" + member.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Accept: "application/json, text/plain",
              ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
              REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
            },
            body: JSON.stringify(editMemberForm),
          })
            .then((res) => {
              return res.json;
            })
            .then((res) => {
              dispather(memberLogin(res.member));
              alert("회원 정보 수정에 성공하셨습니다!");
              props.history.push("/member/memberInfo");
            });
        } else if (res.code === 3) {
          alert("세션이 만료되었습니다. 다시 로그인 해주세요");
          props.history.push("/login");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        alert("회원 정보 수정에 성공하셨습니다.");
        dispather(memberLogin(res.member));
        props.history.push("/member/memberInfo");
      })
      .catch((err) => console.log(err));
  };
  const changeValue = (e) => {
    setEditMemberForm({
      ...editMemberForm,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <LoginHeader />
      <h1>회원가입</h1>
      <Form onSubmit={changeMember}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            placeholder={member.name}
            onChange={changeValue}
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder={member.loginId}
            onChange={changeValue}
            name="loginId"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder={member.email}
            onChange={changeValue}
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>주소1:도시</Form.Label>
          <Form.Control
            type="text"
            placeholder={member.city}
            onChange={changeValue}
            name="city"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>주소2:동,구</Form.Label>
          <Form.Control
            type="text"
            placeholder={member.street}
            onChange={changeValue}
            name="street"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>주소3:우편번호</Form.Label>
          <Form.Control
            type="text"
            placeholder={member.zipcode}
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

export default EditMemberInfo;
