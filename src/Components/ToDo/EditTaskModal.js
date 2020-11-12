import React from "react";
import { FormControl, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./AddTask/AddTask.module.css";

class EditTaskModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      date: new Date(props.data.date),
      valid: true,
      validationType: null,
    };
  }

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
    let { title, description, date, _id } = this.state;
    title = title.trim();

    if (!title) {
      this.setState({ valid: false, validationType: "requiredError" });
      return;
    }

    if (title.length > 30) {
      this.setState({ valid: false, validationType: "lengthError" });
      return;
    }

    const data = {
      title,
      description,
      date: date.toISOString().slice(0, 10),
    };
    this.props.onSave(_id, data);
  };

  render() {
    const { title, description, date, valid, validationType } = this.state;
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
            Edit your task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

          <Form.Control
            as="textarea"
            rows={3}
            value={description}
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
            Save <FontAwesomeIcon icon={faSave} />
          </Button>
          <Button onClick={this.props.onCancel} variant="secondary">
            Cancel <FontAwesomeIcon icon={faWindowClose} />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditTaskModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTaskModal;
