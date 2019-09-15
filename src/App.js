import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import Home from "./components/home";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import BoardList from "./components/boardlist";
import ManagerUser from "./components/manageruser";
import ListBoard from "./components/listboard";

function App() {
  return (
    <Router>
      <div className="">
        {/* <Route path="/" exact component={Home} />
        <Route path="/users/signin" component={SignIn} />
        <Route path="/users/signup" component={SignUp} />
        <Route path="/boards" component={BoardList} />
        <Route path="/manager" component={ManagerUser} /> */}

        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/boards" component={BoardList} />
        <Route path="/manager" component={ManagerUser} />
        <Route path="/list" component={ListBoard} />
      </div>
    </Router>
  );
}

export default App;
