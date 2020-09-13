import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
const debug = require("debug")("logout-button.component");

const Logout = (props) => {
  const history = useHistory();
  return (
    <Button
      onClick={() => {
        const options = {
          method: "POST",
          mode: "cors",
          cache: "default",
          headers: {
            "Content-Type": "application/json",
          },
        };

        fetch("api/auth/logout", options).then((res) => {
          if (res.status === 200) {
            debug("Successfully logged out");
          }
        });

        props.onLogout();
        history.push("/login");
      }}
    >
      Log out
    </Button>
  );
};

export default Logout;
