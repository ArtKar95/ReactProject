import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function Confirm(props) {
  const { count, onSubmit, onCancel } = props;
  return (
    <Modal
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={onCancel}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          You really want to delete {count} task?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onSubmit} variant="danger">
          Delete <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button onClick={onCancel} variant="secondary">
          Cancel <FontAwesomeIcon icon={faWindowClose} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

Confirm.propTypes = {
  count: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Confirm;
