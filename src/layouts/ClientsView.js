import ClientsMaster from "../components/ClientsMaster";
import ClientDetail from "../components/ClientDetail";
import { useEffect, useState } from "react";
import  dbService  from "../dbService";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function ClientsView() {
  const [items, setItems] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [newAdded, setNewAdded] = useState(false);
  async function fetchClients() {
    try {
      const clients = await dbService.getAllDocuments('clients');
      setItems(clients);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (newAdded) {
      fetchClients();
      setNewAdded(false);
      setAddNew(false);
    }
    
  }, [newAdded]);

  const handleItemClick = (itemId) => {
    setClientId(itemId);
    
  };

  const handleAddNew = () => {
    setAddNew(prevAddNew => !prevAddNew);
  }

  const handleDelete = async () => {
    await dbService.deleteDocument("clients", clientId);
    fetchClients();
    setClientId(null);
  };
  return (
    <>
      <Row>
        <Col xs={3}>
          <Row>
            <Col>
              <h1>Clients</h1>
            </Col>
            <Col className="align-self-center">
              <Button onClick={handleAddNew}>Add new</Button>
            </Col>
          </Row>
          <ClientsMaster
            items={items}
            handleItemClick={handleItemClick}
            addNew={addNew}
            setNewAdded={setNewAdded}
          />
        </Col>
        <Col>
          {clientId && (
            <ClientDetail
              id={clientId}
              handleDelete={handleDelete}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default ClientsView;
