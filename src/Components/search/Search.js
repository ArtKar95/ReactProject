import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  InputGroup,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getTasks } from "../../redux/actionCreator";
import { shortStr } from '../../Helpers/utils';

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

const Search = (props) => {
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
        // filterTasks[key] = value.toLocaleDateString();    
      }
    }

    props.getTasks(filterTasks);
  };

  return (
    <>
      <InputGroup className="m-3 ">
        <FormControl
          placeholder="Search..."
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={search}
        />

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
            >
              {item.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        
        <InputGroup.Append>
          <Button variant="primary" className="mr-4" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {dateOptions.map((item, index) => (
        <DatePicker
          placeholderText={item.label}
          className="ml-4"
          key={index}
          selected={date[item.value]}
          onChange={(value) =>
            setDate({
              ...date,
              [item.value]: value,
            })
          }
        />
      ))}
    </>
  );
};

const mapDispatchToProps = {
  getTasks,
};

export default connect(null, mapDispatchToProps)(Search);
