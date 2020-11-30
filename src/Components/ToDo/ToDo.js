import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "./Task/Task";
import AddTask from "./AddTask/AddTask";
import Confirm from "./Confirm";
import EditTaskModal from "./EditTaskModal";
import {
  getTasksAC,
  addTaskAC,
  removeTaskAC,
  handleSaveAC,
  removeCheckedTasksAC,
  takeCheckedTasksAC,
} from "../../store/actionCreator";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";

class ToDo extends React.Component {
  state = {
    showConfirm: false,
    editedTask: null,
    openNewTaskModal: false,
  };

  componentDidMount() {
    this.props.getTasksAC();
  }

  addTask = (data) => {
    this.props.addTaskAC(data);
    this.setState({ openNewTaskModal: false });
  };

  removeCheckedTasks = () => {
    this.props.removeCheckedTasksAC(this.props.checkedTasks);

    this.setState({ showConfirm: false });
  };

  changeShowConfirm = () => {
    this.setState({ showConfirm: !this.state.showConfirm });
  };

  handleEdit = (task) => () => {
    this.setState({ editedTask: task });
  };

  handleSave = (taskId, data) => {
    this.props.handleSaveAC(taskId, data);
    this.setState({ editedTask: null });
  };

  toggleNewTaskModal = () => {
    this.setState({
      openNewTaskModal: !this.state.openNewTaskModal,
    });
  };

  render() {
    const { showConfirm, editedTask, openNewTaskModal } = this.state;
    const { tasks, loading, checkedTasks } = this.props;
    const tasksComponents = tasks.map((task) => {
      return (
        <Col key={task._id} xl={3} lg={4} md={6} sm={12} xs={12}>
          <Task
            task={task}
            removeTask={this.props.removeTaskAC}
            takeCheckedTasks={() => {
              this.props.takeCheckedTasksAC(task._id);
            }}
            handleEdit={this.handleEdit(task)}
            disabled={checkedTasks.size}
          />
        </Col>
      );
    });
    return (
      <Container fluid>
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
        <>{!!loading ? <Loader /> : <Row> {tasksComponents}</Row>}</>
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
          <EditTaskModal
            data={editedTask}
            onSave={this.handleSave}
            onCancel={this.handleEdit(null)}
          />
        )}
        {!!openNewTaskModal && (
          <AddTask onAdd={this.addTask} onCancel={this.toggleNewTaskModal} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    loading: state.loading,
    checkedTasks: state.checkedTasks,
  };
};

const mapDispatchToProps = {
  getTasksAC,
  addTaskAC,
  removeTaskAC,
  handleSaveAC,
  takeCheckedTasksAC,
  removeCheckedTasksAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
