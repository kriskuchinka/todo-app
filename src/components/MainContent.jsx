import { useState, useEffect } from "react";
import toDoData from "../../toDoData";
// import CheckListItem from "./CheckListItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Stack, Input, Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function MainContent() {
  const [toDoState, setToDoState] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isPencilClicked, setIsPencilClicked] = useState(false);
  const [toDoId, setToDoId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/toDos");
      // console.log(response);
      const data = await response.json();
      setToDoState(data.toDos);
    };

    fetchData();
  }, [toDoState]);

  const addItem = async () => {
    setInputValue("");
    const newItem = {
      id: toDoState.length + 1,
      text: inputValue,
      completed: false,
    };
    const tempArray = [...toDoState, newItem];

    const response = await fetch("http://localhost:5000/newitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      console.error("Error while adding item.", response.statusText);
    }
    console.log(tempArray);

    setToDoState(tempArray);
  };

  const updateItem = async (e, id) => {
    const itemToUpdate = toDoState.find((item) => item.id === id);
    itemToUpdate.text = editInputValue;
    console.log(itemToUpdate, "item to update");
    setIsPencilClicked(!isPencilClicked);
    const response = await fetch(`http://localhost:5000/edititem/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemToUpdate),
    });
    if (!response.ok) {
      console.error("Error while updating item.", response.statusText);
    }
    let tempArray = toDoState.map((item) =>
      item.id === id ? itemToUpdate : item
    );
    setToDoState(tempArray);
  };

  const handleCheckBoxClick = (toDoKey) => {
    const newToDoList = toDoState.map((item) => {
      if (item.id === toDoKey) {
        item.completed = !item.completed;
      }
      return item;
    });
    setToDoState(newToDoList);
  };

  const handlePencilClick = (id, text) => {
    setEditInputValue(text);
    setIsPencilClicked(true);
    setToDoId(id);
  };

  const handleRemoveToDoItem = async (id) => {
    let tempArray = [...toDoState];
    const updatedList = tempArray.filter((item) => item.id !== id);
    setToDoState(updatedList);
    const response = await fetch(`http://localhost:5000/deleteitem/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Error while deleting item.", response.statusText);
    }
  };

  const mappedCheckList = toDoState.map((item) => (
    // <CheckListItem
    //   toDoKey={item.id}
    //   toDoValue={item.text}
    //   toDoItem={item.completed}
    //   handleCheckBoxClick={handleCheckBoxClick}
    // />
    <>
      {isPencilClicked && toDoId === item.id ? (
        <>
          <Stack spacing={2} direction="row">
            <Input
              onChange={(e) => setEditInputValue(e.target.value)}
              value={editInputValue}
            />
            <Button onClick={(e) => updateItem(e, item.id)} variant="contained">
              Update
            </Button>
            <Button
              onClick={() => setIsPencilClicked(false)}
              variant="contained"
            >
              Cancel
            </Button>
          </Stack>
        </>
      ) : (
        <>
          {/* <Stack spacing={2} direction="row"> */}{" "}
          <FormControlLabel
            control={
              <>
                <Checkbox
                  checked={item.completed}
                  onChange={() => handleCheckBoxClick(item.id)}
                />
                {/* <Stack spacing={0} direction="row"> */}
                <EditIcon
                  onClick={() => handlePencilClick(item.id, item.text)}
                />
                <DeleteForeverIcon
                  onClick={() => handleRemoveToDoItem(item.id)}
                />
                {/* </Stack> */}
              </>
            }
            label={item.text}
          />
          {/* </Stack> */}
        </>
      )}
      {toDoId !== item.id && <></>}
    </>
  ));

  return (
    <>
      <section className="paper">
        <h1>Things I Need To Do:</h1>

        {mappedCheckList}
        <Stack spacing={2} direction="row">
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add Item"
            value={inputValue}
          />
          <Button onClick={() => addItem()} variant="contained">
            Add Item
          </Button>
        </Stack>
      </section>
    </>
  );
}

export default MainContent;
