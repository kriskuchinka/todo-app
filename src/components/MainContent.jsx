import { useState, useEffect } from "react";
import toDoData from "../../toDoData";
// import CheckListItem from "./CheckListItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function MainContent() {
  const [toDoState, setToDoState] = useState(toDoData);
  const [inputValue, setInputValue] = useState("");
  const [isPencilClicked, setIsPencilClicked] = useState(false);
  const [toDoId, setToDoId] = useState(null);

  const addItem = () => {
    const tempArray = [
      ...toDoState,
      {
        id: toDoState.length + 1,
        text: inputValue,
        completed: false,
      },
    ];
    console.log(tempArray);

    setToDoState(tempArray);
  };

  const updateItem = (e, id) => {
    let tempArray = [...toDoState];
    const updatedToDoList = tempArray.map((item) => {
      if (item.id === id) {
        item.text = inputValue;
      }
      return item;
    });
    console.log(updatedToDoList);
    setIsPencilClicked(!isPencilClicked);
    setToDoState(updatedToDoList);
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
    setInputValue(text);
    setIsPencilClicked(true);
    setToDoId(id);
  };

  const handleRemoveToDoItem = (id) => {
    let tempArray = [...toDoState];
    const updatedList = tempArray.filter((item) => item.id !== id);
    setToDoState(updatedList);
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
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add Item"
            value={inputValue}
          />
          <Button onClick={(e) => updateItem(e, item.id)} variant="contained">
            Update
          </Button>
          <Button onClick={() => setIsPencilClicked(false)} variant="contained">
            Cancel
          </Button>
        </>
      ) : (
        <>
          {" "}
          <FormControlLabel
            control={
              <Checkbox
                checked={item.completed}
                onChange={() => handleCheckBoxClick(item.id)}
              />
            }
            label={item.text}
          />
          <EditIcon onClick={() => handlePencilClick(item.id, item.text)} />
          <DeleteForeverIcon onClick={() => handleRemoveToDoItem(item.id)} />
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
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add Item"
        />
        <Button onClick={addItem} variant="contained">
          Add Item
        </Button>
      </section>
    </>
  );
}

export default MainContent;
