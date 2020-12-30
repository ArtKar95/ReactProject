import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "./Task/Task";
import AddTask from "./AddTask/AddTask";
import Confirm from "./Confirm";
import EditTaskModal from "./EditTaskModal";
import { getTasks, editTask, removeTasks } from "../../redux/actionCreator";
import { connect } from "react-redux";
import Search from "../search/Search";

class ToDo extends React.Component {
  state = {
    showConfirm: false,
    editedTask: null,
    openNewTaskModal: false,
    checkedTasks: new Set(),
  };

  componentDidMount() {
    this.props.getTasks();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.addTaskSuccess && this.props.addTaskSuccess)
      this.setState({ openNewTaskModal: false });

    if (!prevProps.removeTasksSuccess && this.props.removeTasksSuccess)
      this.setState({ showConfirm: false, checkedTasks: new Set() });

    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess)
      this.setState({ editedTask: null });
  }

  takeCheckedTasks = (taskId) => () => {
    const checkedTasks = new Set(this.state.checkedTasks);
    checkedTasks.has(taskId)
      ? checkedTasks.delete(taskId)
      : checkedTasks.add(taskId);

    this.setState({ checkedTasks });
  };

  removeCheckedTasks = () => {
    const chackedTasks = [...this.state.checkedTasks];
    this.props.removeTasks({ tasks: chackedTasks });
  };

  changeShowConfirm = () => {
    this.setState({ showConfirm: !this.state.showConfirm });
  };

  handleEdit = (task) => () => {
    this.setState({ editedTask: task });
  };

  toggleNewTaskModal = () => {
    this.setState({
      openNewTaskModal: !this.state.openNewTaskModal,
    });
  };

  render() {
    const {
      showConfirm,
      editedTask,
      openNewTaskModal,
      checkedTasks,
    } = this.state;
    const { tasks } = this.props;
    const tasksComponents = tasks.map((task) => {
      return (
        <Col key={task._id} xl={3} lg={4} md={6} sm={12} xs={12}>
          <Task
            task={task}
            takeCheckedTasks={this.takeCheckedTasks(task._id)}
            handleEdit={this.handleEdit(task)}
            disabled={checkedTasks.size}
          />
        </Col>
      );
    });
    return (
      <Container fluid>
        <Search />
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="text-center">
            <Button
              className="m-3 "
              variant="primary"
              disabled={checkedTasks.size}
              onClick={this.toggleNewTaskModal}
            >
              Add your task
            </Button>
          </Col>
        </Row>
        <Row> {tasksComponents}</Row>
        <Row className="justify-content-center">
          <Button
            variant="danger"
            disabled={!checkedTasks.size}
            onClick={this.changeShowConfirm}
          >
            Delete Selecteds
          </Button>
        </Row>
        {!!showConfirm && (
          <Confirm
            count={checkedTasks.size}
            onSubmit={() => {
              this.removeCheckedTasks(checkedTasks);
            }}
            onCancel={this.changeShowConfirm}
          />
        )}
        {!!editedTask && (
          <EditTaskModal data={editedTask} onCancel={this.handleEdit(null)} />
        )}
        {!!openNewTaskModal && <AddTask onCancel={this.toggleNewTaskModal} />}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    addTaskSuccess: state.addTaskSuccess,
    removeTasksSuccess: state.removeTasksSuccess,
    editTaskSuccess: state.editTaskSuccess,
  };
};

const mapDispatchToProps = {
  getTasks,
  editTask,
  removeTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
