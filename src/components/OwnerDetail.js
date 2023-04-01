import { Table, Form, Button, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import dbService from "../dbService";

const OwnerDetails = ({ id, handleDelete }) => {
  const [owner, setOwner] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(owner);

  useEffect(() => {
    const fetchOwner = async () => {
      const ownerData = await dbService.getDocument("owners", id);
      setOwner(ownerData);
      setFormData(ownerData);
    };
    fetchOwner();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData(owner);
    setEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.timestamp = Date.now();
    await dbService.updateDocument("owners", owner.id, formData);
    setOwner(formData);
    setEditing(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  let timestamp = owner && new Date(owner.timestamp).toLocaleDateString("hr");

  if (!owner) {
    return <div>Loading...</div>;
  }

  if (editing) {
    return (
      <div>
        <br></br>
        <h2>Edit Owner Details</h2>
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
      <h2>Owner Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{owner.name}</td>
            <td>{owner.email}</td>
            <td>{timestamp}</td>
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

export default OwnerDetails;
