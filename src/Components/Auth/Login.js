import React, { useState } from "react";
import classes from "./Auth.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/authActionCreator";

const Login = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const handleSend = () => {
    const { email, password } = values;

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let valid = true;
    let emailMessage = null;
    let passwordMessage = null;

    if (!email) {
      emailMessage = "Email is required";
      valid = false;
    } else if (re.test(email) === false) {
      emailMessage = `${email} isn't valid email`;
      valid = false;
    }

    if (!password) {
      passwordMessage = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      passwordMessage = "Password can't be shorter than 6 simbol";
      valid = false;
    }

    setErrors({
      email: emailMessage,
      password: passwordMessage,
    });

    if (valid) {
      props.login(values);
    }
  };

  return (
    <div className={classes.main}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={7}>
            <div className={classes.form}>
              <Form>
                <h2>Login page</h2>

                <Form.Group>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={!!errors.email ? classes.invalid : ""}
                  />
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={!!errors.password ? classes.invalid : ""}
                  />
                  <Form.Text className="text-danger">
                    {errors.password}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="text-center">
                  <Button
                    variant="success"
                    onClick={handleSend}
                    className="px-5 mb-2"
                  >
                    Login
                  </Button>
                  <br />
                  <Link to="/register">Dont have account? Register now</Link>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    registerSuccess: state.authReduser.registerSuccess,
  };
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
