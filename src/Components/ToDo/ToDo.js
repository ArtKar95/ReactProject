import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import idGenerator from "../../Helpers/idGenerator";
import Task from "./Task";
import AddTask from "./AddTask";

class ToDo extends React.Component {
  state = {
    tasks: [],
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

  render() {
    let { tasks } = this.state;
    let tasksComponents = tasks.map((task) => {
      return (
        <Col key={task.id}>
          <span>
            <Task task={task} removeTask={this.removeTask} />
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
      </Container>
    );
  }
}

export default ToDo;
