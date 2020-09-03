import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import Welcome from "./components/welcome.component";
import BeatSheetList from "./components/beat-sheet-list/beat-sheet-list.component";
import BeatSheet from "./components/beat-sheet/beat-sheet.component";

import beatSheetTemplates from "./components/utils/beatSheetTemplates";

const example_beat_sheet = beatSheetTemplates.example_beat_sheet;

const example_beat_sheet_list = beatSheetTemplates.example_beat_sheet_list;

const dev_user = beatSheetTemplates.dev_user;

class App extends React.Component {
  render() {
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
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route
            path="/beatsheets/"
            exact
            render={(props) => (
              <BeatSheetList
                beat_sheet_list={example_beat_sheet_list}
                user={dev_user}
              />
            )}
          />
          <Route
            path="/beatsheets/example"
            exact
            render={(props) => (
              <BeatSheet beat_sheet_props={example_beat_sheet}></BeatSheet>
            )}
          />
          <Route
            path="/beatsheets/:id"
            render={(props) => (
              <BeatSheet
                beat_sheet_props={example_beat_sheet}
                id={props.match.params.id}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
