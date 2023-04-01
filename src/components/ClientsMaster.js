import NewClientForm from "./NewClientForm";
import ListGroup from "react-bootstrap/ListGroup";
function ClientsMaster(props) {
  return (
    <>
      {props.addNew && <NewClientForm setNewAdded={props.setNewAdded}/>}
      <ListGroup>
        {props.items.map((client) => (
          <ListGroup.Item
            key={client.id}
            action
            onClick={() => props.handleItemClick(client.id)}
          >
            {client.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default ClientsMaster;
