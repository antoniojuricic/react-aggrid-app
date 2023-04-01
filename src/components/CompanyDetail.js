import { Table, Form, Button, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import dbService from "../dbService";

const CompanyDetails = ({ id, handleDelete }) => {
  const [company, setCompany] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(company);

  useEffect(() => {
    const fetchCompany = async () => {
      const companyData = await dbService.getDocument("companies", id);
      setCompany(companyData);
      setFormData(companyData);
    };
    fetchCompany();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData(company);
    setEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.timestamp = Date.now();
    await dbService.updateDocument("companies", company.id, formData);
    setCompany(formData);
    setEditing(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  let timestamp = company && new Date(company.timestamp).toLocaleDateString("hr");

  if (!company) {
    return <div>Loading...</div>;
  }

  if (editing) {
    return (
      <div>
        <br></br>
        <h2>Edit Company Details</h2>
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
            <Form.Label>OIB</Form.Label>
            <Form.Control
              type="text"
              name="oib"
              value={formData.oib}
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
      <h2>Company Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>OIB</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{company.name}</td>
            <td>{company.oib}</td>
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

export default CompanyDetails;
