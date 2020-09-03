import React from "react";
import Button from "react-bootstrap/Button";
import styleConfig from "./styleConfig";

const SaveButton = (props) => {
  return (
    <Button
      variant={styleConfig.saveButtonVariant}
      className="float-right"
      onClick={() => {
        props.onClick();
      }}
    >
      Save
    </Button>
  );
};

export default SaveButton;
