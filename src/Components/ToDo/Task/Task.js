import React from "react";
import classes from "./Task.module.css";
import { Button, Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
    const { task, removeTask, handleEdit, disabled } = this.props;
    return (
      <Card className={"my-3 mx-3"}>
        <Card.Body className={`${checked ? classes.checkedTask : ""}`}>
          <input type="checkbox" onClick={this.checkboxToggle} />

          {disabled ? (
            <Card.Title>{task.title.slice(0, 12)}</Card.Title>
          ) : (
            <OverlayTrigger
              placement="top-start"
              overlay={
                <Tooltip>
                  <strong>Go Task</strong>.
                </Tooltip>
              }
            >
              {disabled ? (
                <Card.Title>{task.title.slice(0, 12)}</Card.Title>
              ) : (
                <Link to={`/task/${task._id}`}>
                  <Card.Title>{task.title.slice(0, 12)}</Card.Title>
                </Link>
              )}
            </OverlayTrigger>
          )}

          <Card.Text className={classes.descriptionLine}>
            Description: {task.description.slice(0, 7) + "..."}
          </Card.Text>

          <Card.Text className={classes.dateLine}>
            Date: {task.date ? task.date.slice(0, 10) : "None"}
          </Card.Text>

          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Edit</strong>.
              </Tooltip>
            }
          >
            <Button variant="info" disabled={disabled} onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <strong>Delete</strong>.
              </Tooltip>
            }
          >
            <Button
              className="m-2"
              variant="danger"
              disabled={disabled}
              onClick={() => { removeTask(task._id) }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </OverlayTrigger>
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
