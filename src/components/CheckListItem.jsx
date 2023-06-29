import PropTypes from "prop-types";

function CheckListItem({ toDoKey, toDoValue, toDoItem, handleCheckBoxClick }) {
  return (
    <>
      <h2 key={toDoKey} className="checklist-item">
        <label className="checkbox-label" htmlFor="checkbox">
          <input
            onChange={() => handleCheckBoxClick(toDoKey)}
            type="checkbox"
            id={toDoKey}
            checked={toDoItem}
          />
          {toDoValue}
        </label>
      </h2>
    </>
  );
}

// Prop validation to remove errors
CheckListItem.propTypes = {
  toDoValue: PropTypes.string.isRequired,
  toDoItem: PropTypes.string.isRequired,
};

export default CheckListItem;
