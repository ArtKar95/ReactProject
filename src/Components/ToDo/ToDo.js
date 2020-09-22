import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import idGenerator from "../../Helpers/idGenerator";
import Task from "./Task/Task";
import AddTask from "./AddTask";
import Confirm from "./Confirm";
import EditTaskModal from "./Modal";

class ToDo extends React.Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
    showConfirm: false,
    editedTask: null,
  };

  addTask = (inputValue) => {
    const { tasks } = this.state;

    const newTask = {
      id: idGenerator(),
      text: inputValue,
    };

    this.setState({
      tasks: [newTask, ...tasks],
    });
  };

  removeTask = (taskId) => {
    return () => {
      const newTask = this.state.tasks.filter((item) => item.id !== taskId);
      this.setState({
        tasks: newTask,
      });
    };
  };

  takeCheckedTasks = (taskId) => () => {
    const checkedTasks = new Set(this.state.checkedTasks);
    checkedTasks.has(taskId)
      ? checkedTasks.delete(taskId)
      : checkedTasks.add(taskId);

    // if (checkedTasks.has(taskId)) {
    //   checkedTasks.delete(taskId);
    // } else {
    //   checkedTasks.add(taskId);
    // }
    this.setState({ checkedTasks });
  };

  removeCheckedTasks = () => {
    const checkedTasks = new Set(this.state.checkedTasks);
    let { tasks } = this.state;

    checkedTasks.forEach(
      (taskId) => (tasks = tasks.filter((task) => task.id !== taskId))
    );
    checkedTasks.clear();
    this.setState({ tasks, checkedTasks, showConfirm: false });
  };

  changeShowConfirm = () => {
    this.setState({ showConfirm: !this.state.showConfirm });
  };

  handleEdit = (task) => () => {
    this.setState({ editedTask: task });
  };

  handleSave = (taskId, editedText) => {
    const tasks = [...this.state.tasks];
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      text: editedText,
    };
    this.setState({
      tasks: tasks,
      editedTask: null,
    });
  };
  

  render() {
    const { tasks, checkedTasks, showConfirm, editedTask } = this.state;
    const tasksComponents = tasks.map((task) => {
      return (
        <Col key={task.id}>
          <span>
            <Task
              task={task}
              removeTask={this.removeTask}
              takeCheckedTasks={this.takeCheckedTasks(task.id)}
              handleEdit={this.handleEdit(task)}
            />
          </span>
        </Col>
      );
    });

    return (
      <Container fluid>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <AddTask addTask={this.addTask} />
          </Col>
        </Row>

        <Row xl={4} lg={3} md={2} sm={1} xs={1}>
          {tasksComponents}
        </Row>

        <Row className="justify-content-center">
          <Button
            variant="danger"
            disabled={checkedTasks.size ? false : true}
            // disabled={!checkedTasks.size}
            onClick={this.changeShowConfirm}
          >
            Delete Selecteds
          </Button>
        </Row>
        {showConfirm && (
          <Confirm
            count={checkedTasks.size}
            onSubmit={this.removeCheckedTasks}
            onCancel={this.changeShowConfirm}
          />
        )}
        {!!editedTask && (
          <EditTaskModal
            editedTask={editedTask}
            onSave={this.handleSave}
            onCancel={this.handleEdit(null)}
          />
        )}
      </Container>
    );
  }
}

export default ToDo;
