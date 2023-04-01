import OwnersMaster from "../components/OwnersMaster";
import OwnerDetail from "../components/OwnerDetail";
import { useEffect, useState } from "react";
import  dbService  from "../dbService";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function OwnersView() {
  const [items, setItems] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [newAdded, setNewAdded] = useState(false);
  async function fetchOwners() {
    try {
      const owners = await dbService.getAllDocuments('owners');
      setItems(owners);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchOwners();
  }, []);

  useEffect(() => {
    if (newAdded) {
      fetchOwners();
      setNewAdded(false);
      setAddNew(false);
    }
    
  }, [newAdded]);

  const handleItemClick = (itemId) => {
    setOwnerId(itemId);
    
  };

  const handleAddNew = () => {
    setAddNew(prevAddNew => !prevAddNew);
  }

  const handleDelete = async () => {
    await dbService.deleteDocument("owners", ownerId);
    fetchOwners();
    setOwnerId(null);
  };
  return (
    <>
      <Row>
        <Col xs={3}>
          <Row>
            <Col>
              <h1>Owners</h1>
            </Col>
            <Col className="align-self-center">
              <Button onClick={handleAddNew}>Add new</Button>
            </Col>
          </Row>
          <OwnersMaster
            items={items}
            handleItemClick={handleItemClick}
            addNew={addNew}
            setNewAdded={setNewAdded}
          />
        </Col>
        <Col>
          {ownerId && (
            <OwnerDetail
              id={ownerId}
              handleDelete={handleDelete}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default OwnersView;
