import React from "react";
import { FormControl, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./AddTask.module.css";
import { TitleAlert } from "../../Alerts/Alerts";
import { showAlert, addTask } from "../../../redux/actionCreator";
import { connect } from "react-redux";

class AddTask extends React.PureComponent {
  state = {
    title: "",
    description: "",
    date: new Date(),
    valid: true,
    validationType: null,
  };

  validationErrors = {
    requiredError: "The field is required!",
    lengthError: "The length of the title should be less than 30 characters.",
  };

  handleInputChange = (type, value) => {
    if (type === "title" && !this.state.valid) {
      this.setState({ [type]: value, valid: true });
      return;
    }
    this.setState({ [type]: value });
  };

  handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handelSave();
    }
  };

  handelSave = () => {
    let { title, description, date } = this.state;
    title = title.trim();

    if (!title) {
      this.setState({ valid: false, validationType: "requiredError" });
      return this.props.showAlert("The title cannot be empty");
    }

    if (title.length > 30) {
      this.setState({ valid: false, validationType: "lengthError" });
      return this.props.showAlertAC(
        "The title cannot be more than 30 characters "
      );
    }

    const data = {
      title,
      description,
      date: date.toISOString().slice(0, 10),
    };
    this.props.addTask(data);
  };

  render() {
    const { title, date, valid, validationType } = this.state;
    let errorMessage = "";
    if (!valid) {
      errorMessage = this.validationErrors[validationType];
    }

    return (
      <Modal
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={this.props.onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add your task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.alert ? (
            <TitleAlert text={this.props.alert} />
          ) : (
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label className={"text-danger"}>{errorMessage}</Form.Label>
              <FormControl
                className={!valid ? classes.invalid : null}
                placeholder="Title"
                aria-label="Title"
                aria-describedby="basic-addon2"
                value={title}
                onChange={(event) =>
                  this.handleInputChange("title", event.target.value)
                }
                onKeyDown={this.handleOnKeyDown}
              />
            </Form.Group>
          )}

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            className="my-3"
            onChange={(event) =>
              this.handleInputChange("description", event.target.value)
            }
          />

          <div className={classes.datePicker}>
            <DatePicker
              selected={date}
              minDate={new Date()}
              onChange={(value) => this.handleInputChange("date", value)}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handelSave} variant="success">
            Add <FontAwesomeIcon icon={faSave} />
          </Button>
          <Button onClick={this.props.onCancel} variant="secondary">
            Cancel <FontAwesomeIcon icon={faWindowClose} />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

const mapDispatchToProps = {
  showAlert,
  addTask,
};

AddTask.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
