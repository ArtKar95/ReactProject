import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

class AddTask extends React.Component {
  state = {
    inputValue: "",
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  addTaskButton = () => {
    const { inputValue } = this.state;
    if (!inputValue) {
      return;
    }
    this.props.addTask(inputValue);

    this.setState({
      inputValue: "",
    });
  };

  handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      this.addTaskButton();
    }
  };

  render() {
    return (
      <InputGroup className="my-3">
        <FormControl
          placeholder="Write your task"
          aria-label="Write your task"
          aria-describedby="basic-addon2"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleOnKeyDown}
        />
        <InputGroup.Append>
          <Button onClick={this.addTaskButton} variant="success">
            Add Task
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default AddTask;
