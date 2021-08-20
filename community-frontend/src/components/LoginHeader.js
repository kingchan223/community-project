import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { memberLogout } from "../Store";
import { withRouter } from "react-router";

const Header = (props) => {
  // const { member } = useSelector((store) => store);
  const dispatcher = useDispatch();
  const logout = (e) => {
    dispatcher(memberLogout());
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    alert("로그아웃 되었습니다.");
    props.history.push("/");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/home/{member.loginId}" className="navbar-brand">
            HOME
          </Link>
          <Nav className="me-auto">
            <Button className="nav-link" onClick={logout}>
              LOGOUT
            </Button>
            <Link to="/member/memberInfo" className="nav-link">
              My Page
            </Link>
            <Link to="/board/add/board" className="nav-link">
              ADD WRITE
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};
export default withRouter(Header);
