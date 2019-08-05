import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Books from "./components/Books";
import BookPage from "./components/BookPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={Books} />
        <Route exact path="/book/:id" component={BookPage} />
      </Fragment>
    </Router>
  );
}

export default App;
