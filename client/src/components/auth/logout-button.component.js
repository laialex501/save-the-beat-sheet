import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

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

        fetch("/auth/logout", options).then((res) => {
          console.log(res);
          if (res.status === 200) {
            props.onLogout();
            history.push("/login");
          }
        });
      }}
    >
      Log out
    </Button>
  );
};

export default Logout;
