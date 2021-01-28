import React, { useState } from "react";
import classes from "./Contact.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { sendMessage } from "../../redux/authActionCreator";

const Contact = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    message: null,
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
    const { name, email, message } = values;

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let valid = true;
    let emailMessage = null;

    if (!email) {
      emailMessage = "Email is required";
      valid = false;
    } else if (re.test(email) === false) {
      emailMessage = `${email} isn't valid email`;
      valid = false;
    }

    setErrors({
      name: name.trim() ? null : "Name is required",
      email: emailMessage,
      message: message.trim() ? null : "Empty message...",
    });

    if (name.trim() && valid && message.trim()) {
      props.sendMessage(values);
      setValues({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className={classes.main}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} sm={11} md={7}>
            <div className={classes.form}>
              <Form>
                <h2>Contact us here</h2>
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
                    as="textarea"
                    rows={3}
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Message..."
                    className={!!errors.message ? classes.invalid : ""}
                  />
                  <Form.Text className="text-danger">
                    {errors.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="text-center">
                  <Button
                    variant="success"
                    onClick={handleSend}
                    className="px-5 mb-2"
                  >
                    Send
                  </Button>{" "}
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
  sendMessage,
};

export default connect(null, mapDispatchToProps)(Contact);
