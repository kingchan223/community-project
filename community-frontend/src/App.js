import { Container } from "react-bootstrap";
import { Route } from "react-router";
// import Header from "./components/Header";
import Home from "./pages/board/Home";
import Detail from "./pages/board/Detail";
import AddBoardForm from "./pages/board/AddBoardForm.js";
import LoginHome from "./pages/board/LoginHome.js";
import LoginPage from "./pages/member/LoginPage";
import JoinPage from "./pages/member/JoinPage";
import UserDetail from "./pages/member/UserDetail";
import EditMemberInfo from "./pages/member/EditMemberInfo";
import AdminBoard from "./pages/admin/AdminBoard";
import AdminDetail from "./pages/admin/AdminDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Container fluid>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/home" exact={true} component={LoginHome}></Route>
        {/* board */}
        <Route path="/board/:id" exact={true} component={Detail}></Route>
        <Route
          path="/board/add/board"
          exact={true}
          component={AddBoardForm}
        ></Route>
        {/* user */}
        <Route path="/join" exact={true} component={JoinPage}></Route>
        <Route
          path="/member/editinfo"
          exact={true}
          component={EditMemberInfo}
        ></Route>
        <Route path="/login" exact={true} component={LoginPage}></Route>
        <Route
          path="/member/memberInfo"
          exact={true}
          component={UserDetail}
        ></Route>
        {/* admin */}
        <Route
          path="/admin/board/manage"
          exact={true}
          component={AdminBoard}
        ></Route>
        <Route
          path="/admin/board/detail/:id"
          exact={true}
          component={AdminDetail}
        ></Route>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default App;
