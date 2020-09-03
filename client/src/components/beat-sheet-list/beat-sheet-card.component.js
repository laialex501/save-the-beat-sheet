import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/Button";
import DeleteButton from "../utils/delete-button.component";
import stripHTML from "../utils/utils";

const BeatSheetCard = (props) => {
  const beat_sheet = props.beat_sheet_props;
  const date = new Date(beat_sheet.updatedAt);

  return (
    <Col xl={4} lg={6} md={12} sm={12} className="my-3">
      <Card bg="light" style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title className="d-flex align-items-center">
            {/* Title */}
            <div style={{ width: "80%" }}>
              {/* Strip HTML from input before displaying */}
              {stripHTML(beat_sheet.beat_sheet_name)}
            </div>

            {/* Delete Button */}
            <div style={{ width: "20%" }}>
              <DeleteButton
                onClick={props.handleDeleteBeatSheet}
                params={[beat_sheet.beat_sheet_uuid]}
              />
            </div>
          </Card.Title>
          <Card.Subtitle className="text-muted">
            Created by {beat_sheet.author_username}
          </Card.Subtitle>
          <hr />
          <Card.Text>
            {/* Strip HTML from input before displaying */}
            {stripHTML(beat_sheet.beat_sheet_description)}
          </Card.Text>
        </Card.Body>
        <Button
          variant="primary"
          href={`beatsheets/${beat_sheet._id}`}
          className="mx-4 mb-4"
        >
          View
        </Button>
        <Card.Footer>
          <small className="text-muted">
            Last updated {date.toTimeString()}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default BeatSheetCard;
