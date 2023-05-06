import React, { useState, useEffect } from "react";
import dbService from "../dbService";
import { Form, Button } from "react-bootstrap";

const NewListingForm = ({ setNewAdded }) => {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    agentRef: "",
    offer: 0
  });
  const [agents, setAgents] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const agentsData = await dbService.getAllDocuments("agents");
      setAgents(agentsData);
    };
    fetchAgents();
  }, []);


  useEffect(() => {
    const fetchOwners = async () => {
      const ownersData = await dbService.getAllDocuments("owners");
      setOwners(ownersData);
    };
    fetchOwners();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await dbService.createDocument("listings", formData);
      console.log("Document written with ID: ", docRef.id);
      setNewAdded(true);
      // Clear the form data
      setFormData({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        regularPrice: 0,
        discountedPrice: 0,
        latitude: 0,
        longitude: 0,
        agentRef: "",
        offer: 0
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Add a New Listing</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="type">
          <Form.Label>Type:</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="bedrooms">
          <Form.Label>Bedrooms:</Form.Label>
          <Form.Control
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="bathrooms">
          <Form.Label>Bathrooms:</Form.Label>
          <Form.Control
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="parking">
          <Form.Check
            type="checkbox"
            name="parking"
            checked={formData.parking}
            onChange={handleInputChange}
            label="Parking"
          />
        </Form.Group>
        <Form.Group controlId="furnished">
          <Form.Check
            type="checkbox"
            name="furnished"
            checked={formData.furnished}
            onChange={handleInputChange}
            label="Furnished"
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="regularPrice">
          <Form.Label>Regular Price:</Form.Label>
          <Form.Control
            type="number"
            name="regularPrice"
            value={formData.regularPrice}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDiscountedPriceCheck">
              <Form.Label>Discounted price:</Form.Label>
              <Form.Check
                type="checkbox"
                name="offer"
                label="Discounted price"
                checked={formData.offer}
                onChange={handleInputChange}
              />
          </Form.Group>
          {formData.offer && (
              <Form.Group controlId="formDiscountedPrice">
                <Form.Label>Discounted Price:</Form.Label>
                <Form.Control
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            )}
        <Form.Group controlId="latitude">
          <Form.Label>Latitude:</Form.Label>
          <Form.Control
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="longitude">
          <Form.Label>Longitude:</Form.Label>
          <Form.Control
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formAgent">
              <Form.Label>Agent:</Form.Label>
              <Form.Control
                as="select"
                name="agentRef"
                value={formData.agent}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an agent</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formOwner">
              <Form.Label>Owner:</Form.Label>
              <Form.Control
                as="select"
                name="ownerRef"
                value={formData.ownerRef}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an owner</option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
        <br></br>
        <Button type="submit">Add Listing</Button>
      </Form>
      <br></br>
    </div>
  );
};
export default NewListingForm;
