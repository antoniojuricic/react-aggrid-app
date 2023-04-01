import NewListingForm from "./NewListingForm";
import ListGroup from "react-bootstrap/ListGroup";
function ListingsMaster(props) {
  return (
    <>
      {props.addNew && <NewListingForm setNewAdded={props.setNewAdded}/>}
      <ListGroup>
        {props.items.map((listing) => (
          <ListGroup.Item
            key={listing.id}
            action
            onClick={() => props.handleItemClick(listing.id)}
          >
            {listing.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default ListingsMaster;
