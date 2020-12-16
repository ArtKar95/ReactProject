import React from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import classes from "./TaskPage.module.css";
import EditTaskModal from "../ToDo/EditTaskModal";
import { connect } from "react-redux";
import { getTask, removeTask } from "../../redux/actionCreator";
import NotFoundPage from "../NotFound/NotFound";
import { formatDate } from "../../Helpers/utils";

class TaskPage extends React.PureComponent {
  state = {
    isEdit: false,
  };

  componentDidMount() {
    const taskId = this.props.match.params.id;
    this.props.getTask(taskId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
      this.props.history.push("/");
    }
    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.toggleEdit();
    }
  }

  removeTask = () => {
    const taskId = this.props.task._id;
    this.props.removeTask(taskId, "task");
  };

  toggleEdit = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  render() {
    const { isEdit } = this.state;
    const { task } = this.props;

    return (
      <>
        {task ? (
          <div className={classes.taskPage}>
            <h1>&#9734;&#9734;&#9734;{task.title}</h1>
            <div className={classes.changeInfo}>
              <div className={classes.date}>
                <span> CREATED: {formatDate(task.created_at)}</span>
                <br />
                <span> LAST UPDATE: {formatDate(task.updated_at)}</span>
                <br />
                <span> DEADLINE: {formatDate(task.date)}</span>
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
                onCancel={this.toggleEdit}
                from="task"
              />
            )}
          </div>
        ) : (
          <NotFoundPage />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.task,
    removeTaskSuccess: state.removeTaskSuccess,
    editTaskSuccess: state.editTaskSuccess,
  };
};

const mapDispatchToProps = {
  getTask,
  removeTask,
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
