import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Bootstrap components
import { Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// Bootstrap styling
import "bootstrap/dist/css/bootstrap.min.css";
// Custom components
import Welcome from "./components/welcome.component";
import BeatSheetList from "./components/beat-sheet-list/beat-sheet-list.component";
import BeatSheet from "./components/beat-sheet/beat-sheet.component";
import Login from "./components/auth/login.component";
import LogoutButton from "./components/auth/logout-button.component";
// Development templates
import beatSheetTemplates from "./components/utils/beatSheetTemplates";

const debug = require("debug")("App");

// Dev templates
const example_beat_sheet = beatSheetTemplates.example_beat_sheet;
const example_beat_sheet_list = beatSheetTemplates.example_beat_sheet_list;
const dev_user = beatSheetTemplates.dev_user;

class App extends React.Component {
  constructor() {
    super();

    var isAuthenticated = false;
    var user = null;

    // isAuthenticated is a string in local storage or does not exist yet
    isAuthenticated =
      (localStorage.getItem("isAuthenticated") || "false") === "true";
    // user is a stringified JSON object in local storage, a null string, or does not exist yet
    user =
      (localStorage.getItem("user") || "null") === "null"
        ? null
        : JSON.parse(localStorage.getItem("user"));

    this.state = {
      isAuthenticated: isAuthenticated,
      user: user,
    };

    this.verifyLogin = this.verifyLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    // Verify whether or not user is logged in
    this.verifyLogin();
  }

  verifyLogin = () => {
    // Make request to server to check if jwt token is present as a cookie in our browser
    const options = {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("api/auth/verifylogin", options)
      .then((res) => {
        if (res.status === 200) {
          debug("JWT cookie is present");
          return res.json();
        } else {
          debug("JWT cookie is not present");
          return;
        }
      })
      .then((user) => {
        if (!user) {
          this.onLogout();
        } else {
          this.onLogin(user);
        }
      });
  };

  // On login, set current user
  onLogin = (user) => {
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({
      isAuthenticated: true,
      user: user,
    });
  };

  // On logout, clear current user
  onLogout = () => {
    localStorage.setItem("isAuthenticated", false);
    localStorage.setItem("user", null);
    this.setState({
      isAuthenticated: false,
      user: null,
    });
  };

  render() {
    var loginOrLogoutButton = this.state.isAuthenticated ? (
      <LogoutButton onLogout={this.onLogout} />
    ) : (
      <Button href="/login">Login</Button>
    );

    var navbar = this.state.isAuthenticated ? (
      <Nav className="mr-auto">
        <Nav.Link href="/beatsheets">View Beat Sheets</Nav.Link>
        {/*<Nav.Link href="/beatsheets/example">Example Beat Sheet</Nav.Link>*/}
      </Nav>
    ) : (
      <Nav className="mr-auto"></Nav>
    );

    return (
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Save the Beat Sheet!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {navbar}
            {loginOrLogoutButton}
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Welcome
                isAuthenticated={this.state.isAuthenticated}
                key={this.state.isAuthenticated}
              />
            )}
          />
          <Route
            path="/login"
            exact
            render={(props) => (
              <Login
                onLogin={this.onLogin}
                isAuthenticated={this.state.isAuthenticated}
                key={this.state.isAuthenticated}
              />
            )}
          />
          <Route
            path="/beatsheets/"
            exact
            render={(props) => (
              <BeatSheetList
                beat_sheet_list={example_beat_sheet_list}
                user={dev_user}
                isAuthenticated={this.state.isAuthenticated}
                key={this.state.isAuthenticated}
              />
            )}
          />
          {/*<Route
            path="/beatsheets/example"
            exact
            render={(props) => (
              <BeatSheet
                beat_sheet_props={example_beat_sheet}
                isAuthenticated={this.state.isAuthenticated}
                key={this.state.isAuthenticated}
              ></BeatSheet>
            )}
            />*/}
          <Route
            path="/beatsheets/:id"
            render={(props) => (
              <BeatSheet
                beat_sheet_props={example_beat_sheet}
                id={props.match.params.id}
                isAuthenticated={this.state.isAuthenticated}
                key={this.state.isAuthenticated}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
