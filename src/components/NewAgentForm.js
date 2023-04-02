import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import dbService from '../dbService';

const NewAgentForm = ({ setNewAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyRef: '',
    timestamp: 0,
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesData = await dbService.getAllDocuments('companies');
      setCompanies(companiesData);
    };
    fetchCompanies();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      formData.timestamp = Date.now();
      const docRef = await dbService.createDocument('agents', formData);
      console.log('Document written with ID: ', docRef.id);
      setNewAdded(true);
      // Clear the form data
      setFormData({
        name: '',
        email: '',
        companyRef: '',
        timestamp: 0,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Add a New Agent</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="companyRef">
          <Form.Label>Company:</Form.Label>
          <Form.Control
            as="select"
            name="companyRef"
            value={formData.companyRef}
            onChange={handleInputChange}
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.name}>
                {company.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <br></br>
        <Button type="submit">Add Agent</Button>
      </Form>
      <br />
    </div>
  );
};

export default NewAgentForm;
