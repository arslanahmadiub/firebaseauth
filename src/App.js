import React from "react";
import Login from "./Components/Login/Login";
import Otp from "./Components/OTP/Otp";
import { Route, Switch, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/firebaseauth">
          <Login />
        </Route>
        <Route exact path="/firebaseauth/otp">
          <Otp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
