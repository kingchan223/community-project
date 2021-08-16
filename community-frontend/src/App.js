import { Container } from "react-bootstrap";
import { Route } from "react-router";
import Header from "./components/Header";
import Home from "./pages/board/Home";
import Detail from "./pages/board/Detail";
import LoginPage from "./pages/user/LoginPage";
import JoinPage from "./pages/user/JoinPage";
import UserDetail from "./pages/user/UserDetail";

function App() {
  return (
    <div>
      <Header />
      <Container fluid>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/login" exact={true} component={LoginPage}></Route>
        <Route path="/join" exact={true} component={JoinPage}></Route>
        <Route path="/board/:id" exact={true} component={Detail}></Route>
        <Route path="/user/:id" exact={true} component={UserDetail}></Route>
      </Container>
    </div>
  );
}

export default App;