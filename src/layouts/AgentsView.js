import AgentsMaster from "../components/AgentsMaster";
import AgentDetail from "../components/AgentDetail";
import { useEffect, useState } from "react";
import  dbService  from "../dbService";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function AgentsView() {
  const [items, setItems] = useState([]);
  const [agentId, setAgentId] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [newAdded, setNewAdded] = useState(false);
  async function fetchAgents() {
    try {
      const agents = await dbService.getAllDocuments('agents');
      setItems(agents);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    if (newAdded) {
      fetchAgents();
      setNewAdded(false);
      setAddNew(false);
    }
    
  }, [newAdded]);

  const handleItemClick = (itemId) => {
    setAgentId(itemId);
    
  };

  const handleAddNew = () => {
    setAddNew(prevAddNew => !prevAddNew);
  }

  const handleDelete = async () => {
    await dbService.deleteDocument("agents", agentId);
    fetchAgents();
    setAgentId(null);
  };
  return (
    <>
      <Row>
        <Col xs={3}>
          <Row>
            <Col>
              <h1>Agents</h1>
            </Col>
            <Col className="align-self-center">
              <Button onClick={handleAddNew}>Add new</Button>
            </Col>
          </Row>
          <AgentsMaster
            items={items}
            handleItemClick={handleItemClick}
            addNew={addNew}
            setNewAdded={setNewAdded}
          />
        </Col>
        <Col>
          {agentId && (
            <AgentDetail
              id={agentId}
              handleDelete={handleDelete}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default AgentsView;
