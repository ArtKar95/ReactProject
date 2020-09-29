import React from "react";
import { FormControl, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

class AddTask extends React.PureComponent {
  state = {
    title: "",
    description: "",
    date: "",
  };

  handleInputChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handelSave();
    }
  };

  handelSave = () => {
    const { title } = this.state;
    if (title) {
      this.props.onAdd(title);
    }
  };

  render() {
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
          <FormControl
            placeholder="Write your task"
            aria-label="Write your task"
            aria-describedby="basic-addon2"
            value={this.state.title}
            onChange={this.handleInputChange}
            onKeyDown={this.handleOnKeyDown}
          />
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

AddTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddTask;
