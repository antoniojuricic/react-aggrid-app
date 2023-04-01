import NewAgentForm from "./NewAgentForm";
import ListGroup from "react-bootstrap/ListGroup";
function AgentsMaster(props) {
  return (
    <>
      {props.addNew && <NewAgentForm setNewAdded={props.setNewAdded}/>}
      <ListGroup>
        {props.items.map((agent) => (
          <ListGroup.Item
            key={agent.id}
            action
            onClick={() => props.handleItemClick(agent.id)}
          >
            {agent.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default AgentsMaster;
