import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "./Task/Task";
import AddTask from "./AddTask/AddTask";
import Confirm from "./Confirm";
import EditTaskModal from "./Modal";

class ToDo extends React.Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
    showConfirm: false,
    editedTask: null,
    openNewTaskModal: false,
  };

  componentDidMount() {
    fetch("http://localhost:3001/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((tasks) => {
        if (tasks.error) {
          throw tasks.error;
        }

        this.setState({ tasks });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  addTask = (data) => {
    fetch("http://localhost:3001/task", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((task) => {
        if (task.error) {
          throw task.error;
        }

        this.setState({
          tasks: [task, ...this.state.tasks],
          openNewTaskModal: false,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  removeTask = (taskId) => {
    return () => {
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
          const newTask = this.state.tasks.filter(
            (item) => item._id !== taskId
          );
          this.setState({
            tasks: newTask,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
  };

  takeCheckedTasks = (taskId) => () => {
    const checkedTasks = new Set(this.state.checkedTasks);
    checkedTasks.has(taskId)
      ? checkedTasks.delete(taskId)
      : checkedTasks.add(taskId);

    this.setState({ checkedTasks });
  };

  removeCheckedTasks = () => {
    const checkedTasks = new Set(this.state.checkedTasks);

    fetch(`http://localhost:3001/task/`, {
      method: "DELETE",
      body: JSON.stringify({
        tasks: [...checkedTasks],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }

        let { tasks } = this.state;

        checkedTasks.forEach(
          (taskId) => (tasks = tasks.filter((task) => task._id !== taskId))
        );
        checkedTasks.clear();
        this.setState({ tasks, checkedTasks, showConfirm: false });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  changeShowConfirm = () => {
    this.setState({ showConfirm: !this.state.showConfirm });
  };

  handleEdit = (task) => () => {
    this.setState({ editedTask: task });
  };

  handleSave = (taskId, editedText) => {
    const tasks = [...this.state.tasks];
    const taskIndex = tasks.findIndex((task) => task._id === taskId);

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: editedText,
    };
    this.setState({
      tasks: tasks,
      editedTask: null,
    });
  };

  toggleNewTaskModal = () => {
    this.setState({
      openNewTaskModal: !this.state.openNewTaskModal,
    });
  };

  render() {
    const {
      tasks,
      checkedTasks,
      showConfirm,
      editedTask,
      openNewTaskModal,
    } = this.state;
    const tasksComponents = tasks.map((task) => {
      return (
        <Col key={task._id}>
          <span>
            <Task
              task={task}
              removeTask={this.removeTask}
              takeCheckedTasks={this.takeCheckedTasks(task._id)}
              handleEdit={this.handleEdit(task)}
              disabled={!!checkedTasks.size}
            />
          </span>
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

        <Row xl={4} lg={3} md={2} sm={1} xs={1}>
          {tasksComponents}
        </Row>

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
        {!!openNewTaskModal && (
          <AddTask onAdd={this.addTask} onCancel={this.toggleNewTaskModal} />
        )}
      </Container>
    );
  }
}

export default ToDo;
