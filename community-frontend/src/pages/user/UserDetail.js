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
        console.log("안녕");
        console.log(res);
        setMember(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <LoginHeader />
      <h1>유저 정보 상세보기</h1>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Header>번호 : {member.id}</Card.Header>
        <Card.Body>
          <Card.Title>{member.name}</Card.Title>
          <Card.Text>{member.loginId}</Card.Text>
          <Card.Text>{member.email}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserDetail;
