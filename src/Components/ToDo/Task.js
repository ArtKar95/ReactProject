import React from "react";
import classes from "./ToDo.module.css";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Task = ({ task, removeTask }) => {
  let headerName = task.text.slice(0, 4).toUpperCase();
  return (
    <>
      <Card className={"my-3 mx-3"}>
        <Card.Body>
          <Card.Title onClick={removeTask(task.id)} className={classes.task}>{headerName}</Card.Title>
          <Card.Text>{task.text}</Card.Text>
          <Button variant="danger" onClick={removeTask(task.id)}>
            Delete <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
export default Task;
