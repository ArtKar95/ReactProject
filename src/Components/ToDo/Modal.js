import React from "react";
import { Modal, Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

class EditTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.editedTask.text,
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handelSave();
    }
  };

  handelSave = () => {
    const { inputValue } = this.state;
    if (inputValue) {
      const taskId = this.props.editedTask.id;
      this.props.onSave(taskId, inputValue);
    }
  };

  render() {
    const { onCancel } = this.props;
    const { inputValue } = this.state;

    return (
      <Modal
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change your task!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Write your task"
            aria-label="Write your task"
            aria-describedby="basic-addon2"
            value={inputValue}
            onChange={this.handleInputChange}
            onKeyDown={this.handleOnKeyDown}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handelSave} variant="success">
            Save <FontAwesomeIcon icon={faSave} />
          </Button>
          <Button onClick={onCancel} variant="secondary">
            Cancel <FontAwesomeIcon icon={faWindowClose} />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditTaskModal.propTypes = {
  editedTask: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTaskModal;
