import NewOwnerForm from "./NewOwnerForm";
import ListGroup from "react-bootstrap/ListGroup";
function OwnersMaster(props) {
  return (
    <>
      {props.addNew && <NewOwnerForm setNewAdded={props.setNewAdded}/>}
      <ListGroup>
        {props.items.map((owner) => (
          <ListGroup.Item
            key={owner.id}
            action
            onClick={() => props.handleItemClick(owner.id)}
          >
            {owner.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default OwnersMaster;
