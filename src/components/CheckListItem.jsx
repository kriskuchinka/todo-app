import PropTypes from 'prop-types';

function CheckListItem({toDoValue, toDoItem}) {
  return (
    <>
      <h2>   
        <label htmlFor="checkbox"><input type="checkbox" id={toDoValue} name={toDoValue} value={toDoValue} />{toDoItem}</label>
      </h2>
    </>
  )
}

// Prop validation to remove errors
CheckListItem.propTypes = {
  toDoValue: PropTypes.string.isRequired,
  toDoItem: PropTypes.string.isRequired,
};  

  export default CheckListItem