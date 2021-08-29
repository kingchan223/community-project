import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader";

const UserDetail = (props) => {
  const { member } = useSelector((store) => store);

  return (
    <div>
      <LoginHeader />
      <h1>유저 정보 상세보기</h1>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>이름:{member.name}</Card.Text>
          <Card.Text>아이디:{member.loginId}</Card.Text>
          <Card.Text>이메일:{member.email}</Card.Text>
          <Card.Text>주소1:{member.city}</Card.Text>
          <Card.Text>주소2:{member.street}</Card.Text>
        </Card.Body>
      </Card>
      <Link to="/member/editinfo">회원 정보 수정하기</Link>
    </div>
  );
};

export default UserDetail;

// useEffect(() => {
//   fetch("http://localhost:8080/api/member", {
//     method: "GET",
//     headers: {
//       ACCESS_TOKEN: localStorage.getItem("ACCESS_TOKEN"),
//       REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
//     },
//   })
//     .then((res) => {
//       if (res.code === 1) {
//         console.log(res.msg);
//         return res.json();
//       } else if (res.code === 2 || res.code === 3) {
//         console.log(res.msg);
//         alert("세션이 만료되었습니다. 다시 로그인 해주세요");
//         props.history.push("/login");
//       } else {
//         console.log(res.msg);
//         return res.json();
//       }
//     })
//     .then((res) => {
//       console.log(res.msg);
//       setMember(res.member);
//     });
// }, []);
