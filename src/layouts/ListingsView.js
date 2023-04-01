import ListingsMaster from "../components/ListingsMaster";
import ListingsDetail from "../components/ListingsDetail";
import { useEffect, useState } from "react";
import  dbService  from "../dbService";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function ListingsView() {
  const [items, setItems] = useState([]);
  const [listingId, setListingId] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [newAdded, setNewAdded] = useState(false);
  async function fetchListings() {
    try {
      const listings = await dbService.getAllDocuments('listings');
      setItems(listings);
      console.log(listings)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    if (newAdded) {
      fetchListings();
      setNewAdded(false);
      setAddNew(false);
    }
    
  }, [newAdded]);

  const handleItemClick = (itemId) => {
    setListingId(itemId);
  };

  const handleAddNew = () => {
    setAddNew(prevAddNew => !prevAddNew);
  }

  const handleDelete = async () => {
    await dbService.deleteDocument("listings", listingId);
    fetchListings();
    setListingId(null);
  };
  return (
    <>
      <Row>
        <Col xs={3}>
          <Row>
            <Col>
              <h1>Listings</h1>
            </Col>
            <Col className="align-self-center">
              <Button onClick={handleAddNew}>Add new</Button>
            </Col>
          </Row>
          <ListingsMaster
            items={items}
            handleItemClick={handleItemClick}
            addNew={addNew}
            setNewAdded={setNewAdded}
          />
        </Col>
        <Col>
          {listingId && (
            <ListingsDetail
              id={listingId}
              handleDelete={handleDelete}

            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default ListingsView;
