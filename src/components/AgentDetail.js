import { Table, Form, Button, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import dbService from "../dbService";

const AgentDetails = ({ id, handleDelete }) => {
  const [agent, setAgent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(agent);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesData = await dbService.getAllDocuments('companies');
      setCompanies(companiesData);
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchAgent = async () => {
      const agentData = await dbService.getDocument("agents", id);
      setAgent(agentData);
      setFormData(agentData);
    };
    fetchAgent();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData(agent);
    setEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.timestamp = Date.now();
    await dbService.updateDocument("agents", agent.id, formData);
    setAgent(formData);
    setEditing(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  let timestamp = agent && new Date(agent.timestamp).toLocaleDateString("hr");

  if (!agent) {
    return <div>Loading...</div>;
  }

  if (editing) {
    return (
      <div>
        <br></br>
        <h2>Edit Agent Details</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="companyName">
          <Form.Label>Company:</Form.Label>
          <Form.Control
            as="select"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.name}>
                {company.name}
              </option>
            ))}
          </Form.Control>
          <br></br>
        </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>{' '}
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </div>
    );
  }
  return (
    <div>
      <br></br>
      <h2>Agent Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{agent.name}</td>
            <td>{agent.email}</td>
            <td>{timestamp}</td>
            <td>{agent.companyName}</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="secondary" onClick={handleEdit}>
        Edit
      </Button>{' '}
      <Button onClick={handleDelete} variant="danger">
        Delete
      </Button>
    </div>
  );
};

export default AgentDetails;
