import React from "react";
import classes from "./Task.module.css";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class Task extends React.PureComponent {
  state = {
    checked: false,
  };

  checkboxToggle = () => {
    this.setState({
      checked: !this.state.checked,
    });

    this.props.takeCheckedTasks()
  };

  render() {
    const { checked } = this.state;
    const { task, removeTask } = this.props;
    const headerName = task.text.slice(0, 4).toUpperCase();

    return (
      <Card className={"my-3 mx-3"}>
        <Card.Body className={`${checked ? classes.checkedTask : ""}`}>
          <input type="checkbox" onClick={this.checkboxToggle} />
          <Card.Title onClick={removeTask(task.id)} className={classes.task}>
            {headerName}
          </Card.Title>
          <Card.Text>{task.text}</Card.Text>
          <Button variant="danger"
          disabled={!!checked}
           onClick={removeTask(task.id)}>
            Delete <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Task;
