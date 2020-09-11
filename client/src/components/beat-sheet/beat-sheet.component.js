import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Act from "./act.component";
import AddAct from "./add-act.component";
import { v4 as uuidv4 } from "uuid";
import CKEditor from "@ckeditor/ckeditor5-react";
import { InlineEditor, MinimumEditor } from "ckeditor5-build-custom";
import SaveButton from "../utils/save-button.component";
import Unauthorized from "../auth/unauthorized.component";

class BeatSheet extends React.Component {
  constructor(props) {
    super(props);

    // Do nothing if no props
    if (!this.props.id) return;

    const isAuthenticated = this.props.isAuthenticated;
    // Beat sheet database ID
    const id = this.props.id;

    this.state = {
      exists: null,
      authorized: null,
      beat_sheet_name: "",
      beat_sheet_description: "",
      author_username: "",
      author_id: "",
      acts: [],
      isAuthenticated: isAuthenticated,
      id: id,
    };

    this.handleAddBeat = this.handleAddBeat.bind(this);
    this.handleDeleteBeat = this.handleDeleteBeat.bind(this);
    this.handleEditBeat = this.handleEditBeat.bind(this);
    this.handleAddAct = this.handleAddAct.bind(this);
    this.handleDeleteAct = this.handleDeleteAct.bind(this);
    this.handleEditAct = this.handleEditAct.bind(this);
    this.handleEditBeatSheet = this.handleEditBeatSheet.bind(this);
    this.handleSaveBeatSheet = this.handleSaveBeatSheet.bind(this);
    this.handleGetBeatSheet = this.handleGetBeatSheet.bind(this);
  }

  componentDidMount() {
    this.handleGetBeatSheet();
  }

  // Retrieves beat sheet from the server
  handleGetBeatSheet() {
    const body = JSON.stringify({ beatSheetID: this.state.id });
    const options = {
      method: "POST",
      mode: "cors",
      body: body,
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("/beatsheets/get", options)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ exists: true, authorized: true });
          console.log("Successfully retrieved beat sheet");
          return res.json();
        } else if (res.status === 404 || res.status === 400) {
          console.error("Beat sheet not found");
          this.setState({ exists: false, authorized: false });
          return;
        } else if (res.status === 401 || res.status === 403) {
          console.error("Not authorized to access this beat sheet");
          this.setState({ exists: true, authorized: false });
        } else {
          console.error("Failure to retrieve beat sheet");
          this.setState({ exists: false, authorized: false });
          return;
        }
      })
      .then((result) => {
        if (!result) {
          return;
        }

        // Retrieve results
        const {
          beat_sheet_name,
          beat_sheet_description,
          author_username,
          author_id,
          acts,
        } = result;

        // Create new acts
        const new_acts = acts.map((act) => {
          // Add uuidv4 to acts
          const act_uuid = uuidv4();
          const new_act = {
            ...act,
            act_uuid: act_uuid,
          };

          // Create new beats
          const new_beats = act.beats.map((beat) => {
            // Add uuidv4 to beats
            const beat_uuid = uuidv4();
            const new_beat = {
              ...beat,
              beat_uuid: beat_uuid,
              act_uuid: act_uuid,
            };
            return new_beat;
          });

          // Set new beats with uuidv4 incldued
          new_act.beats = new_beats;

          return new_act;
        });

        this.setState({
          beat_sheet_name,
          beat_sheet_description,
          author_username,
          author_id,
          acts: new_acts,
        });
      });
  }

  // Adding a copy of the given beat to the act identified by act_uuid
  handleAddBeat(act_uuid, beat) {
    const new_acts = this.state.acts.map((act) => {
      // Do nothing if act uuid does not match
      if (act.act_uuid !== act_uuid) return act;

      // Clone act first, treating original state as immutable
      const new_act = JSON.parse(JSON.stringify(act));

      // Create a new default beat and add uuid to it
      const new_beat = {
        ...beat,
        beat_uuid: uuidv4(),
        act_uuid: act_uuid,
      };

      new_act.beats.push(new_beat);

      return new_act;
    });

    this.setState({
      acts: new_acts,
    });
  }

  handleDeleteBeat(act_uuid, beat_uuid) {
    const new_acts = this.state.acts.map((act) => {
      // Do nothing if act uuid does not match
      if (act.act_uuid !== act_uuid) return act;

      // Start by cloning the act
      const new_act = JSON.parse(JSON.stringify(act));

      // Filter beats to only include beats that do NOT match the given beat_uuid
      const new_beats = act.beats.filter(
        (beat) => beat.beat_uuid !== beat_uuid
      );

      // Update the new act with our new beats
      new_act.beats = new_beats;

      return new_act;
    });

    this.setState({
      acts: new_acts,
    });
  }

  // Edit the content of a beat
  handleEditBeat(act_uuid, beat_uuid, data) {
    const new_acts = this.state.acts.map((act) => {
      // Do nothing if act uuid does not match
      if (act.act_uuid !== act_uuid) return act;

      // Create a new act that matches everything except the beats
      const new_act = {
        ...act,
        beats: [],
      };

      // Create a new beats list, where only the beat we want to edit is changed
      const new_beats = act.beats.map((beat) => {
        // Do nothing if beat uuid does not match
        if (beat.beat_uuid !== beat_uuid) return beat;

        // Create a new beat that matches the old beat
        const new_beat = { ...beat };

        // Overwrite beat data if available
        if (data.beat_name) new_beat.beat_name = data.beat_name;
        if (data.beat_description)
          new_beat.beat_description = data.beat_description;

        return new_beat;
      });

      // Update the new act with our new beats
      new_act.beats = new_beats;

      return new_act;
    });

    this.setState({
      acts: new_acts,
    });
  }

  // Add a copy of the given act to the beat sheet
  handleAddAct(act) {
    // Clone the act first
    const new_act = JSON.parse(JSON.stringify(act));
    // Give the new act a new uuid
    new_act.act_uuid = uuidv4();

    this.setState({
      acts: [...this.state.acts, new_act],
    });
  }

  // Delete the act identified by the given uuid
  handleDeleteAct(act_uuid) {
    // Filter acts to only include acts that do NOT match the given act_uuid
    const new_acts = this.state.acts.filter((act) => act.act_uuid !== act_uuid);
    this.setState({
      acts: new_acts,
    });
  }

  // Edits the given act
  handleEditAct(act_uuid, data) {
    const new_acts = this.state.acts.map((act) => {
      // Do nothing if act uuid does not match
      if (act.act_uuid !== act_uuid) return act;

      // Clone the act to preserve immutability
      const new_act = {
        ...act,
      };

      // Overwrite act data if available
      if (data.act_name) new_act.act_name = data.act_name;
      if (data.act_description) new_act.act_description = data.act_description;

      return new_act;
    });
    this.setState({
      acts: new_acts,
    });
  }

  // Edits the beat sheet
  handleEditBeatSheet(data) {
    if (data.beat_sheet_name)
      this.setState({ beat_sheet_name: data.beat_sheet_name });
    if (data.beat_sheet_description)
      this.setState({ beat_sheet_description: data.beat_sheet_description });
  }

  // Saves the beat sheet to the server
  handleSaveBeatSheet() {
    // Save beat sheet to server
    const beatSheet = {
      beat_sheet_name: this.state.beat_sheet_name,
      beat_sheet_description: this.state.beat_sheet_description,
      author_username: this.state.author_username,
      author_id: this.state.author_id,
      acts: this.state.acts,
    };
    const body = JSON.stringify({
      beatSheetID: this.state.id,
      beatSheet: beatSheet,
    });
    const options = {
      method: "POST",
      mode: "cors",
      body: body,
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/beatsheets/update", options).then((res) => {
      if (res.status === 200) {
        console.log("Successfully updated beat sheet");
        // Retrieve new beat sheet from server
        this.handleGetBeatSheet();
      }
    });
  }

  renderActs(acts) {
    return acts.map((act_props) => (
      <Act
        act_props={act_props}
        key={act_props.act_uuid}
        handleAddBeat={this.handleAddBeat}
        handleDeleteBeat={this.handleDeleteBeat}
        handleEditBeat={this.handleEditBeat}
        handleDeleteAct={this.handleDeleteAct}
        handleEditAct={this.handleEditAct}
      />
    ));
  }

  render() {
    if (this.state.exists === null || this.state.authorized === null)
      return <div>Loading...</div>;

    if (this.state.exists === false) return <div>Error 404 not found</div>;

    // User is not authenticated and not allowed to access this resource
    if (!this.state.isAuthenticated || !this.state.authorized)
      return <Unauthorized />;

    // User is authenticated and allowed to access this resource
    return (
      <Container fluid>
        {/* Render basic information about the beat sheet*/}
        <Row className="m-5">
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            {/* Title Editor */}
            <div className="mx-2" style={{ marginBottom: "-10px" }}>
              <CKEditor
                editor={MinimumEditor}
                data={this.state.beat_sheet_name}
                onInit={(editor) => {
                  editor.execute("heading", { value: "heading1" });
                }}
                onChange={(event, editor) => {
                  const data = { beat_sheet_name: editor.getData() };
                  this.handleEditBeatSheet(data);
                }}
              />
            </div>
            <hr />
            {/* Description editor */}
            <div className="mx-2">
              <CKEditor
                editor={InlineEditor}
                data={this.state.beat_sheet_description}
                onChange={(event, editor) => {
                  const data = { beat_sheet_description: editor.getData() };
                  this.handleEditBeatSheet(data);
                }}
                className="m-2"
              />
            </div>
          </Col>
          {/* Save Button */}
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <SaveButton onClick={this.handleSaveBeatSheet} />
          </Col>
        </Row>
        {/* Render all acts in array, set unique key to be uuid */}
        {this.renderActs(this.state.acts)}
        {/* Render a component for adding new acts */}
        <AddAct handleAddAct={this.handleAddAct} />
      </Container>
    );
  }
}

export default BeatSheet;
