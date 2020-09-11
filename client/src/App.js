import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
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

const example_beat_sheet = beatSheetTemplates.example_beat_sheet;

const example_beat_sheet_list = beatSheetTemplates.example_beat_sheet_list;

const dev_user = beatSheetTemplates.dev_user;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: null,
    };

    this.onLogout = this.onLogout.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  // On login, set current user
  onLogin = (user) => {
    this.setState({
      isAuthenticated: true,
      user: user,
    });
  };

  // On logout, clear current user
  onLogout = () => {
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
        <Nav.Link href="/beatsheets/example">Example Beat Sheet</Nav.Link>
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
            <Nav className="mr-auto">
              <Nav.Link href="/beatsheets">View Beat Sheets</Nav.Link>
              <Nav.Link href="/beatsheets/example">Example Beat Sheet</Nav.Link>
            </Nav>
            {this.state.isAuthenticated ? (
              <LogoutButton onLogout={this.onLogout} />
            ) : (
              <Button href="/login">Login</Button>
            )}
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Welcome
                onLogin={this.onLogin}
                onLogout={this.onLogout}
                isAuthenticated={this.state.isAuthenticated}
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
              />
            )}
          />
          <Route
            path="/beatsheets/example"
            exact
            render={(props) => (
              <BeatSheet
                beat_sheet_props={example_beat_sheet}
                isAuthenticated={this.state.isAuthenticated}
              ></BeatSheet>
            )}
          />
          <Route
            path="/beatsheets/:id"
            render={(props) => (
              <BeatSheet
                beat_sheet_props={example_beat_sheet}
                id={props.match.params.id}
                isAuthenticated={this.state.isAuthenticated}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
