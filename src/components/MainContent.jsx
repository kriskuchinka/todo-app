import { useState } from "react";
import toDoData from "../../toDoData";
import CheckListItem from "./CheckListItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function MainContent() {
  const [toDoState, setToDoState] = useState(toDoData);

  const handleCheckBoxClick = (toDoKey) => {
    const newToDoList = toDoState.map((item) => {
      if (item.id === toDoKey) {
        item.completed = !item.completed;
      }
      return item;
    });
    setToDoState(newToDoList);
  };

  const mappedCheckList = toDoState.map((item) => (
    // <CheckListItem
    //   toDoKey={item.id}
    //   toDoValue={item.text}
    //   toDoItem={item.completed}
    //   handleCheckBoxClick={handleCheckBoxClick}
    // />
    <FormControlLabel
      control={
        <Checkbox
          checked={item.completed}
          onChange={() => handleCheckBoxClick(item.id)}
        />
      }
      label={item.text}
    />
  ));

  return (
    <>
      <section className="paper">
        <h1>Things I Need To Do:</h1>
        {mappedCheckList}
      </section>
    </>
  );
}

export default MainContent;
