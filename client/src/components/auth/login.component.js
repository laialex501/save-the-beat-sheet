import React from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { Container, Row, Col } from "react-bootstrap";
import keys from "../../config/keys";
const debug = require("debug")("login.component");

const Login = (props) => {
  const history = useHistory();
  return (
    <Container fluid className="d-flex" style={{ height: "100vh" }}>
      <Row className="align-self-center w-100" style={{}}>
        <Col
          xs={7}
          sm={6}
          md={5}
          lg={4}
          xl={3}
          className="mx-auto d-flex flex-column bg-dark"
          style={{ height: "60vh" }}
        >
          <div
            className="mx-auto text-light my-3 "
            style={{ fontSize: "2rem" }}
          >
            Log in to your account
          </div>
          <div className="mx-auto my-3 align-self-center">
            <GoogleLogin
              clientId={keys.googleClientID}
              buttonText="Login with Google"
              onSuccess={(response) => {
                const id_token = response.tokenId;
                const bearer = "Bearer " + id_token;
                const options = {
                  method: "POST",
                  mode: "cors",
                  cache: "default",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: bearer,
                  },
                };

                fetch("/auth/google", options).then((res) => {
                  res.json().then((user) => {
                    debug(`User is: ${user}`);
                    props.onLogin(user);
                    history.push("/beatsheets");
                  });
                });
              }}
              onFailure={(error) => {
                debug(error);
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
