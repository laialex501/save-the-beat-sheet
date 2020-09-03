import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styleConfig from "./styleConfig";

const DeleteButton = (props) => {
  // Params for function should be passed as an ARRAY of parameters
  const params = props.params;

  return (
    <Button
      variant={styleConfig.deleteButtonVariant}
      className="float-right"
      onClick={() => {
        props.onClick(...params);
      }}
    >
      <FontAwesomeIcon icon={faTrash} size="lg" />
    </Button>
  );
};

export default DeleteButton;
