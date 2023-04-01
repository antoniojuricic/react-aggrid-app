import NewCompanyForm from "./NewCompanyForm";
import ListGroup from "react-bootstrap/ListGroup";
function CompaniesMaster(props) {
  return (
    <>
      {props.addNew && <NewCompanyForm setNewAdded={props.setNewAdded}/>}
      <ListGroup>
        {props.items.map((company) => (
          <ListGroup.Item
            key={company.id}
            action
            onClick={() => props.handleItemClick(company.id)}
          >
            {company.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default CompaniesMaster;
