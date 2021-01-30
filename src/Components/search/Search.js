import React, { useEffect, useRef, useState } from "react";
import classes from "./../ToDo/AddTask/AddTask.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  InputGroup,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTasks } from "../../redux/taskActionCreator";
import { shortStr } from "../../Helpers/utils";

const statusOptions = [
  {
    label: "UnSet",
    value: "",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Done",
    value: "done",
  },
];

const sortOptions = [
  {
    label: "UnSet",
    value: "",
  },

  {
    label: "A-Z",
    value: "a-z",
  },

  {
    label: "Z-A",
    value: "z-a",
  },

  {
    label: "Creation_date_oldest",
    value: "creation_date_oldest",
  },
  {
    label: "Creation_date_newest",
    value: "creation_date_newest",
  },
  {
    label: "Completion_date_oldest",
    value: "completion_date_oldest",
  },
  {
    label: "Completion_date_newest",
    value: "completion_date_newest",
  },
];

const dateOptions = [
  {
    label: "Create lte",
    value: "create_lte",
  },
  {
    label: "Create gte",
    value: "create_gte",
  },
  {
    label: "Complete lte",
    value: "complete_lte",
  },
  {
    label: "Complete gte",
    value: "complete_gte",
  },
];

const Search = ({ filterSuccess, getTasks, disabled }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputRef = useRef();
  const filterRef = useRef();

  useEffect(() => {
    filterRef.current = filterSuccess;
  });
  const prevFilterSuccess = filterRef.current;

  useEffect(() => {
    if (!prevFilterSuccess && filterSuccess) {
      handleClose();
    }
    if (show) {
      inputRef.current.focus();
    }
  }, [show, prevFilterSuccess, filterSuccess]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState({
    label: "",
    value: "",
  });

  const [sort, setSort] = useState({
    label: "",
    value: "",
  });

  const [date, setDate] = useState({
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
  });

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    let filterTasks = {
      search,
      status: status.value,
      sort: sort.value,
    };

    for (let key in date) {
      let value = date[key];
      if (value) {
        filterTasks[key] = value.toISOString().slice(0, 10);
      }
    }

    getTasks(filterTasks);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} disabled={disabled}>
        Filter tasks
      </Button>

      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <InputGroup>
              <FormControl
                placeholder="Search..."
                aria-describedby="basic-addon2"
                onChange={handleChange}
                value={search}
                ref={inputRef}
              />
            </InputGroup>

            <InputGroup
              className="my-3 justify-content-center"
              style={{ zIndex: 1 }}
            >
              <DropdownButton
                as={InputGroup.Append}
                variant="primary"
                title={status.value ? status.label : "Status"}
              >
                {statusOptions.map((item, index) => (
                  <Dropdown.Item
                    onClick={() => setStatus(item)}
                    key={index}
                    active={status.value === item.value}
                    style={{ fontSize: 14 }}
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <DropdownButton
                as={InputGroup.Append}
                variant="info"
                title={sort.value ? shortStr(sort.label, 3) : "Sort"}
              >
                {sortOptions.map((item, index) => (
                  <Dropdown.Item
                    onClick={() => setSort(item)}
                    key={index}
                    active={sort.value === item.value}
                    style={{ fontSize: 14 }}
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>

            {dateOptions.map((item, index) => (
              <div className={classes.datePicker} key={index}>
                <DatePicker
                  className="mt-1"
                  placeholderText={item.label}
                  selected={date[item.value]}
                  onChange={(value) =>
                    setDate({
                      ...date,
                      [item.value]: value,
                    })
                  }
                />
              </div>
            ))}
          </>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="success" className="px-3" onClick={handleSearch}>
            <FontAwesomeIcon icon={faFilter} /> Filter
          </Button>
          <Button variant="secondary" onClick={handleClose} className="px-3">
            <FontAwesomeIcon icon={faWindowClose} /> Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    filterSuccess: state.toDoReduser.filterSuccess,
  };
};

const mapDispatchToProps = {
  getTasks,
};

Search.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
