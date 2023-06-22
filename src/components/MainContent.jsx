import CheckListItem from './CheckListItem'

function MainContent() {
    const checkListItem= [{toDoValue: "Groceries", toDoItem: "Buy Groceries"}, {toDoValue: "Dishes", toDoItem: "Clean"}, {toDoValue: "Code", toDoItem: "Code"}, {toDoValue: "Bowl", toDoItem: "Go Bowling"}];

    const mappedCheckList = checkListItem.map(item=><CheckListItem key={item.id} toDoValue={item.toDoValue} toDoItem={item.toDoItem} />);

    return (
      <>
        <section className="paper">
            <h1>Things I Need To Do:</h1>
            {mappedCheckList}
        </section>  

      </>
    )
  }
  
export default MainContent
  