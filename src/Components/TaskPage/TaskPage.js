import React from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";
import classes from "./TaskPage.module.css";
import EditTaskModal from "../ToDo/EditTaskModal";

class TaskPage extends React.PureComponent {
  state = {
    task: null,
    isEdit: false,
  };

  componentDidMount() {
    const taskId = this.props.match.params.id;

    fetch(`http://localhost:3001/task/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((task) => {
        if (task.error) {
          throw task.error;
        }

        this.setState({ task });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  removeTask = () => {
    const taskId = this.state.task._id;

    fetch(`http://localhost:3001/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  toggleEdit = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  editTask = (taskId, data) => {
    fetch(`http://localhost:3001/task/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((editTask) => {
        if (editTask.error) {
          throw editTask.error;
        }
        this.setState({ task: editTask, isEdit: false });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  render() {
    const { task, isEdit } = this.state;
    return (
      <>
        {task ? (
          <div className={classes.taskPage}>
            <h1>&#9734;&#9734;&#9734;{task.title}</h1>
            <div className={classes.changeInfo}>
              <div className={classes.date}>
                <span> CREATED: {task.created_at.slice(0, 10)}</span>
                <br />
                <span> LAST UPDATE: {task.updated_at.slice(0, 10)}</span>
                <br />
                <span> DEADLINE: {task.date.slice(0, 10)}</span>
              </div>
              <div className={classes.taskButtons}>
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip>
                      <strong>Edit</strong>
                    </Tooltip>
                  }
                >
                  <Button
                    variant="info"
                    onClick={() => {
                      this.toggleEdit(task._id, task);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      <strong>Delete</strong>.
                    </Tooltip>
                  }
                >
                  <Button
                    className="m-2"
                    variant="danger"
                    onClick={this.removeTask}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
            <p>{task.description}</p>
            {!!isEdit && (
              <EditTaskModal
                data={task}
                onSave={this.editTask}
                onCancel={this.toggleEdit}
              />
            )}
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default TaskPage;
