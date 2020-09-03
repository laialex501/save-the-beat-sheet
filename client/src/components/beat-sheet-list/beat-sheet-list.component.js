import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { v4 as uuidv4 } from "uuid";
import BeatSheetCard from "./beat-sheet-card.component";
import CreateBeatSheetDropdown from "./create-beat-sheet-dropdown.component";

class BeatSheetList extends React.Component {
  constructor(props) {
    super(props);

    // Do nothing if there are no props
    if (!this.props.beat_sheet_list || !this.props.user) return;

    // Receive props
    const { author_username, author_id } = this.props.user;

    const beat_sheets = this.props.beat_sheet_list;

    // Create new beat sheets
    const new_beat_sheets = beat_sheets.map((beat_sheet) => {
      // Clone only necessary parts of beat sheets
      const new_beat_sheet = Object.assign({}, beat_sheet, { acts: undefined });
      delete new_beat_sheet["acts"];
      // Add uuidv4 to beat sheets
      new_beat_sheet.beat_sheet_uuid = uuidv4();
      return new_beat_sheet;
    });

    this.state = {
      beat_sheets: new_beat_sheets,
      author_username,
      author_id,
    };

    this.handleDeleteBeatSheet = this.handleDeleteBeatSheet.bind(this);
    this.handleCreateBeatSheet = this.handleCreateBeatSheet.bind(this);
  }

  // Deleting a beat sheet
  handleDeleteBeatSheet(beat_sheet_uuid) {
    /* TODO: Delete from server first */

    // Filter for all beat sheets whose uuid does NOT match the given uuid
    const new_beat_sheets = this.state.beat_sheets.filter(
      (beat_sheet) => beat_sheet.beat_sheet_uuid !== beat_sheet_uuid
    );
    this.setState({ beat_sheets: new_beat_sheets });
  }

  // Creating a beat sheet
  handleCreateBeatSheet(beat_sheet) {
    /* TODO: Save to server first, then retrieve beat sheet from server */

    // Clone our current beat sheets first
    const new_beat_sheets = [...this.state.beat_sheets];
    // Clone only necessary parts of beat sheet
    const new_beat_sheet = Object.assign({}, beat_sheet, { acts: undefined });
    delete new_beat_sheet["acts"];
    // Add uuidv4 to beat sheet
    new_beat_sheet.beat_sheet_uuid = uuidv4();
    // Add new beat sheet to our list
    new_beat_sheets.push(new_beat_sheet);

    this.setState({ beat_sheets: new_beat_sheets });
  }

  render() {
    if (!this.state) return null;
    return (
      <Container fluid>
        <Row className="p-5 m-5 rounded-lg bg-dark">
          {/* Create Beat Sheets Dropdown */}
          <Col xl={12} className="mb-2">
            <CreateBeatSheetDropdown onClick={this.handleCreateBeatSheet} />
          </Col>
          {/* Render all beat sheets in array, set unique key to be uuid */}
          {this.state.beat_sheets.map((beat_sheet) => {
            return (
              <BeatSheetCard
                beat_sheet_props={beat_sheet}
                key={beat_sheet.beat_sheet_uuid}
                handleDeleteBeatSheet={this.handleDeleteBeatSheet}
              />
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default BeatSheetList;
