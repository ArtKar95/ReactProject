import React, { useState } from "react";
import classes from "./Auth.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/authActionCreator";

const Register = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
    surname: null,
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
    const { name, surname, email, password, confirmPassword } = values;

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let valid = true;
    let confirmPasswordMessage = null;
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

    if (!confirmPassword) {
      confirmPasswordMessage = "Please confirm password";
      valid = false;
    } else if (password !== confirmPassword) {
      confirmPasswordMessage = "Passwords didn't match";
      valid = false;
    }

    setErrors({
      name: name ? null : "Name is required",
      surname: surname ? null : "Surname is required",
      email: emailMessage,
      password: passwordMessage,
      confirmPassword: confirmPasswordMessage,
    });

    if (name && surname && valid) {
      props.register(values);
    }
  };

  return (
    <div className={classes.main}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={7}>
            <div className={classes.form}>
              <Form>
                <h2>Register page</h2>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={!!errors.name ? classes.invalid : ""}
                  />
                  <Form.Text className="text-danger">{errors.name}</Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="surname"
                    value={values.surname}
                    onChange={handleChange}
                    placeholder="Enter your surname"
                    className={!!errors.surname ? classes.invalid : ""}
                  />
                  <Form.Text className="text-danger">
                    {errors.surname}
                  </Form.Text>
                </Form.Group>
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
                <Form.Group>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={!!errors.confirmPassword ? classes.invalid : ""}
                  />
                  <Form.Text className="text-danger">
                    {errors.confirmPassword}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="text-center">
                  <Button
                    variant="success"
                    onClick={handleSend}
                    className="px-5 mb-2"
                  >
                    Register
                  </Button>
                  <br />
                  <Link to="/login">Already registered? try to login!</Link>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapDispatchToProps = {
  register,
};

export default connect(null, mapDispatchToProps)(Register);
