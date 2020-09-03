import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styleConfig from "../utils/styleConfig";

const default_beat = {
  beat_name: "Untitled Beat",
  beat_description: "Describe your beat here.",
};

// Add Beat Component
const AddBeat = (props) => {
  return (
    <Col className="my-3">
      {/* Button to add a new default beat. Modify function call to the default_beat template. */}
      <Button
        variant="light"
        className="w-100 h-100"
        style={{ minHeight: styleConfig.beatMinHeight }}
        onClick={() => {
          props.handleAddBeat(props.act_uuid, default_beat);
        }}
      >
        {/* Display icon for the button */}
        <FontAwesomeIcon icon={faPlus} />
        <div>Add beat</div>
      </Button>{" "}
    </Col>
  );
};

export default AddBeat;
