import React from "react";
import Task from "./Task";

class ToDo extends React.Component {
  state = {
    inputValue: "",
    tasks: [],
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  addTaskButton = () => {
    let { inputValue, tasks } = this.state;

    this.setState({
      inputValue: "",
      tasks: [...tasks, inputValue],
    });
  };

  render() {
    let { tasks, inputValue } = this.state;
    return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.addTaskButton}>Add</button>
        <div>
          {tasks.map((item, index) => {
            return <Task key={index} item={item} />;
          })}
        </div>
      </div>
    );
  }
}

export default ToDo;
