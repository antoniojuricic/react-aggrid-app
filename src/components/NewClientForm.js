import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import dbService from '../dbService';

const NewclientForm = ({ setNewAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    timestamp: 0,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await dbService.createDocument('clients', formData);
      console.log('Document written with ID: ', docRef.id);
      setNewAdded(true);
      // Clear the form data
      setFormData({
        name: '',
        email: '',
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
      <h2>Add a New client</h2>
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
        <br></br>
        <Button type="submit">Add client</Button>
      </Form>
      <br />
    </div>
  );
};

export default NewclientForm;
