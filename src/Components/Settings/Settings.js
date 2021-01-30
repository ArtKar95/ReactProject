import React, { useEffect, useState } from "react";
import classes from "./Settings.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  updateUserInfo,
  updateUserPassword,
} from "../../redux/authActionCreator";

const Settings = ({
  updateUserInfo,
  updateUserPassword,
  updateUserInfoSuccess,
}) => {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    surname: null,
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  });

  useEffect(() => {
    if (updateUserInfoSuccess) {
      setValues((values) => {
        return {
          ...values,
          name: "",
          surname: "",
        };
      });
    }
  }, [updateUserInfoSuccess]);

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

  const handleUpdateUserInfo = () => {
    const { name, surname } = values;

    setErrors({
      ...errors,
      name: name.trim() ? null : "Name is required",
      surname: surname.trim() ? null : "Surname is required",
    });

    if (name.trim() && surname.trim()) {
      updateUserInfo({ name, surname });
    }
  };

  const handleUpdateUserPassword = () => {
    const { oldPassword, newPassword, confirmNewPassword } = values;

    let valid = true;
    let newPasswordMessage = null;
    let confirmNewPasswordMessage = null;

    if (!newPassword) {
      newPasswordMessage = "Password is required";
      valid = false;
    } else if (newPassword.length < 6) {
      newPasswordMessage = "Password can't be shorter than 6 simbol";
      valid = false;
    }

    if (!confirmNewPassword) {
      confirmNewPasswordMessage = "Please confirm new password";
      valid = false;
    } else if (newPassword !== confirmNewPassword) {
      confirmNewPasswordMessage = "Passwords didn't match";
      valid = false;
    }

    setErrors({
      ...errors,
      oldPassword: oldPassword ? null : "Old password is required",
      newPassword: newPasswordMessage,
      confirmNewPassword: confirmNewPasswordMessage,
    });

    if (oldPassword && valid) {
      updateUserPassword({ oldPassword, newPassword, confirmNewPassword });
      setValues({
        ...values,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3 text-center">
        <Col xs={12} sm={12} md={8} lg={6}>
          <Form>
            <h2>Change name and surname</h2>
            <Form.Group>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Your new name"
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
                placeholder="Your new surname"
                className={!!errors.surname ? classes.invalid : ""}
              />
              <Form.Text className="text-danger">{errors.surname}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Button
                variant="success"
                onClick={handleUpdateUserInfo}
                className="px-5 mb-2"
              >
                Change
              </Button>
            </Form.Group>
          </Form>

          <Form>
            <h2>Change password</h2>
            <Form.Group>
              <Form.Control
                type="password"
                name="oldPassword"
                value={values.oldPassword}
                onChange={handleChange}
                placeholder="Old password"
                className={!!errors.oldPassword ? classes.invalid : ""}
              />
              <Form.Text className="text-danger">
                {errors.oldPassword}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                placeholder="New password"
                className={!!errors.newPassword ? classes.invalid : ""}
              />
              <Form.Text className="text-danger">
                {errors.newPassword}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                name="confirmNewPassword"
                value={values.confirmNewPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={!!errors.confirmNewPassword ? classes.invalid : ""}
              />
              <Form.Text className="text-danger">
                {errors.confirmNewPassword}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Button
                variant="success"
                onClick={handleUpdateUserPassword}
                className="px-5 mb-2"
              >
                Change
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    updateUserInfoSuccess: state.authReduser.updateUserInfoSuccess,
  };
};

const mapDispatchToProps = { updateUserInfo, updateUserPassword };

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
