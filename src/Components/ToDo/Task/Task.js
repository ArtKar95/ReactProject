import React from "react";
import classes from "./Task.module.css";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

class Task extends React.PureComponent {
  state = {
    checked: false,
  };

  checkboxToggle = () => {
    this.setState({
      checked: !this.state.checked,
    });

    this.props.takeCheckedTasks();
  };

  render() {
    const { checked } = this.state;
    const { task, removeTask, handleEdit } = this.props;
    const headerName = task.text.slice(0, 4).toUpperCase();

    return (
      <Card className={"my-3 mx-3"}>
        <Card.Body className={`${checked ? classes.checkedTask : ""}`}>
          <input type="checkbox" onClick={this.checkboxToggle} />
          <Card.Title
            onClick={!checked ? removeTask(task.id) : undefined}
            className={!checked && classes.task}
          >
            {headerName}
          </Card.Title>
          <Card.Text>{task.text}</Card.Text>
          <Button variant="info" disabled={!!checked} onClick={handleEdit}>
            Edit <FontAwesomeIcon icon={faEdit} />
          </Button>

          <Button
            className="m-1"
            variant="danger"
            disabled={!!checked}
            onClick={removeTask(task.id)}
          >
            Delete <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
  takeCheckedTasks: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default Task;
