import React from "react";
import Login from "./auth/login.component";
import LogoutButton from "./auth/logout-button.component";

class Welcome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <p>Welcome to Save the Beat Sheet!</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Welcome;
