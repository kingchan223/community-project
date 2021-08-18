import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import LoginHeader from "../../components/LoginHeader";

const UserDetail = () => {
  const [member, setMember] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
    city: "",
    street: "",
  });
  useEffect(() => {
    fetch("http://localhost:8080/api/member", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMember(res.data);
      });
  }, []);
  return (
    <div>
      <LoginHeader />
      <h1>유저 정보 상세보기</h1>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>이름:{member.name}</Card.Title>
          <Card.Text>아이디:{member.loginId}</Card.Text>
          <Card.Text>이메일:{member.email}</Card.Text>
          <Card.Text>주소1:{member.city}</Card.Text>
          <Card.Text>주소2:{member.street}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserDetail;
