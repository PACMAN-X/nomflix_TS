import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "../Routes/Home";
import Detail from "../Routes/Detail";
import Search from "../Routes/Search";
import TV from "../Routes/TV";
import Header from "./Header";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movie/:id" exact component={Detail} />
        <Route path="/show" exact component={TV} />
        <Route path="/show/:id" exact component={Detail} />
        <Route path="/search" exact component={Search} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
