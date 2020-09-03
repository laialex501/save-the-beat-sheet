import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styleConfig from "../utils/styleConfig";

const default_act = {
  act_name: "Untitled Act",
  act_description: "Describe your act here",
  beats: [],
};

// Add Act Component
const AddAct = (props) => {
  return (
    <Row className="m-5 rounded-lg bg-dark">
      <Col>
        {/* Button to add a new default act */}
        <Button
          variant="dark"
          className="w-100 h-100"
          style={{ minHeight: styleConfig.addActMinHeight }}
          onClick={() => props.handleAddAct(default_act)}
        >
          {/* Display icon for the button */}
          <FontAwesomeIcon icon={faPlus} />
          <div>Add act</div>
        </Button>{" "}
      </Col>
    </Row>
  );
};

export default AddAct;
