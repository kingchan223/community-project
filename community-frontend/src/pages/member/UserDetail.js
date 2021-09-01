import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../css/userDetail.css"
import {Link} from "react-router-dom";

const UserDetail = (props) => {
    const { member } = useSelector((store) => store);

    return (
        <div className={"userDetail-body"}>
            <div className={"userDetail-body-div"}>
                <div className={"userDetail-body-div2"}>
                    <div className={"userDetail-container"}>
                        <p className={"heading"} style={{color:"white"}}>회원 정보</p>
                        <div className={"box"}>
                            <span>이름:</span>
                            <span>{member.name}</span>
                        </div>
                        <div className={"box"}>
                            <span>아이디:</span>
                            <span>{member.loginId}</span>
                        </div>
                        <div className={"box"}>
                            <span>이메일:</span>
                            <span>{member.email}</span>
                        </div>
                        <div className={"box"}>
                            <span>거주지:</span>
                            <span>{member.city}</span>
                        </div>
                    </div>
                </div>
                <div className={"userDetail-body-div3"}>
                    <Link to={"/userinfo/edit"}>
                        <button className={"userInfo-edit-btn"}>회원 정보 수정하기</button>
                    </Link>
                </div>
                <div className={"userDetail-body-div3"}>
                    <Link to={"/userinfo/message"}>
                        <button className={"userInfo-message-btn"}>쪽지함</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
    // <div>
    //   <LoginHeader />
    //   <h1>유저 정보 상세보기</h1>
    //   <Card border="primary" style={{ width: "18rem" }}>
    //     <Card.Body>
    //       <Card.Text>이름:{member.name}</Card.Text>
    //       <Card.Text>아이디:{member.loginId}</Card.Text>
    //       <Card.Text>이메일:{member.email}</Card.Text>
    //       <Card.Text>주소1:{member.city}</Card.Text>
    //       <Card.Text>주소2:{member.street}</Card.Text>
    //     </Card.Body>
    //   </Card>
    //   <Link to="/member/editinfo">회원 정보 수정하기</Link>
    // </div>

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
