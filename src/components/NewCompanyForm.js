import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import dbService from '../dbService';

const NewCompanyForm = ({ setNewAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    oib: '',
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
      const docRef = await dbService.createDocument('companies', formData);
      console.log('Document written with ID: ', docRef.id);
      setNewAdded(true);
      // Clear the form data
      setFormData({
        name: '',
        oib: '',
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
      <h2>Add a New Company</h2>
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
        <Form.Group controlId="oib">
          <Form.Label>OIB:</Form.Label>
          <Form.Control
            type="text"
            name="oib"
            value={formData.oib}
            onChange={handleInputChange}
          />
        </Form.Group>
        <br></br>
        <Button type="submit">Add Company</Button>
      </Form>
      <br />
    </div>
  );
};

export default NewCompanyForm;
