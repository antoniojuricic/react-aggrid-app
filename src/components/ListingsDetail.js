import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import dbService from "../dbService";

const ListingsDetail = ({ id, handleDelete }) => {
  const [listing, setListing] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [listingAgent, setListingAgent] = useState(null);
  const [owners, setOwners] = useState([]);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      const ownersData = await dbService.getAllDocuments("owners");
      setOwners(ownersData);
    };
    fetchOwners();
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      const listingData = await dbService.getDocument("listings", id);
      setListing(listingData);
      setFormData(listingData);
    };
    fetchListing();
  }, [id]);

  useEffect(() => {
    const fetchAgents = async () => {
      const agentsData = await dbService.getAllDocuments("agents");
      setAgents(agentsData);
    };
    fetchAgents();
  }, []);

  useEffect(() => {
    setListingAgent(agents.filter((agent) => agent.id === listing.agentRef)[0]);
    setOwner(owners.filter((owner) => owner.id === listing.ownerRef)[0]);
  }, [agents, listing, owner]);

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await dbService.updateDocument("listings", id, formData);
    setListing(formData);
    setEditing(false);
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br></br>
      <h2>Listing Details</h2>
      {editing ? (
        <div>
          <h2>Edit Listing</h2>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type:</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                required
              >
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBedrooms">
              <Form.Label>Bedrooms:</Form.Label>
              <Form.Control
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBathrooms">
              <Form.Label>Bathrooms:</Form.Label>
              <Form.Control
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="FormParking">
              <Form.Label>Parking:</Form.Label>
              <Form.Check
                type="checkbox"
                name="parking"
                label="Parking"
                checked={formData.parking}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formFurnished">
              <Form.Label>Furnished:</Form.Label>
              <Form.Check
                type="checkbox"
                name="furnished"
                label="Furnished"
                checked={formData.furnished}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRegularPrice">
              <Form.Label>Regular Price:</Form.Label>
              <Form.Control
                type="number"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDiscountedPriceCheck">
              <Form.Label>Discounted price:</Form.Label>
              <Form.Check
                type="checkbox"
                name="discount"
                label="Discounted price"
                checked={formData.offer}
                onChange={handleFormChange}
              />
            </Form.Group>
            {formData.offer && (
              <Form.Group controlId="formDiscountedPrice">
                <Form.Label>Discounted Price:</Form.Label>
                <Form.Control
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
            )}
            <Form.Group controlId="formLatitude">
              <Form.Label>Latitude:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLongitude">
              <Form.Label>Longitude:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAgent">
              <Form.Label>Agent:</Form.Label>
              <Form.Control
                as="select"
                name="agentRef"
                value={formData.agentRef}
                onChange={handleFormChange}
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
                onChange={handleFormChange}
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
            <Button variant="primary" type="submit">
              Save
            </Button>{" "}
            <Button variant="secondary" onClick={handleEdit}>
              Cancel
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Parking</th>
                <th>Furnished</th>
                <th>Address</th>
                <th>Description</th>
                <th>Regular Price</th>
                <th>Discounted Price</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Agent</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{listing.name}</td>
                <td>{listing.type}</td>
                <td>{listing.bedrooms}</td>
                <td>{listing.bathrooms}</td>
                <td>{listing.parking ? "Yes" : "No"}</td>
                <td>{listing.furnished ? "Yes" : "No"}</td>
                <td>{listing.address}</td>
                <td>{listing.description}</td>
                <td>{listing.regularPrice} €</td>
                <td>{listing.offer ? listing.discountedPrice + "€" : "-"}</td>
                <td>{listing.latitude}</td>
                <td>{listing.longitude}</td>
                <td>{listingAgent && listingAgent.name}</td>
                <td>{owner && owner.name}</td>
              </tr>
            </tbody>
          </Table>
          <Button onClick={handleEdit}>Edit</Button>{" "}
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
export default ListingsDetail;
