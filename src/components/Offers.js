import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import dbService from "../dbService";

const Offers = ({ clientId, handleDelete }) => {
  const [offers, setOffers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    offeredPrice: 0,
    listingRef: "",
    timestamp: new Date(),
    clientRef: clientId,
  });
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const listingsData = await dbService.getAllDocuments("listings");
      setListings(listingsData);
    };
    fetchListings();
  }, []);

  const fetchOffers = async () => {
    const offersData = await dbService.getDocumentsByQuery(
      "offers",
      "clientRef",
      "==",
      clientId
    );
    setOffers(offersData);
  };

  useEffect(() => {
    fetchOffers();
  }, [clientId]);

  const handleEdit = (offer) => {
    setFormData(offer);
    setEditing(true);
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
    formData.timestamp = Date.now();
    await dbService.updateDocument("offers", formData.id, formData);
    const updatedOffers = [...offers];
    const index = updatedOffers.findIndex((o) => o.id === formData.id);
    updatedOffers[index] = formData;
    setOffers(updatedOffers);
    setFormData({
      message: "",
      offeredPrice: 0,
      listingRef: "",
      timestamp: new Date(),
      clientRef: clientId,
    });
    setEditing(false);
  };

  const handleNewFormSubmit = async (event) => {
    event.preventDefault();
    try {
      formData.timestamp = Date.now();
      const docRef = await dbService.createDocument("offers", formData);
      console.log("Document written with ID: ", docRef.id);
      setFormData({
        message: "",
        offeredPrice: 0,
        listingRef: "",
        timestamp: new Date(),
        clientRef: clientId,
      });
      setAddNew(false);
      fetchOffers();
      setEditing(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    await dbService.deleteDocument("offers", offerId);
    const updatedOffers = offers.filter((o) => o.id !== offerId);
    setOffers(updatedOffers);
  };

  return (
    <div>
      <br></br>
      <h2>Client Offers</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Message</th>
            <th>Offered Price</th>
            <th>Listing</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.message}</td>
              <td>{offer.offeredPrice} €</td>
              <td>
                {
                  listings.filter(
                    (listing) => offer.listingRef === listing.id
                  )[0].name
                }
              </td>
              <td>{new Date(offer.timestamp).toLocaleString()}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(offer)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteOffer(offer.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {editing ? (
        <div>
          <h2>Edit Offer</h2>
          <Form onSubmit={addNew ? handleNewFormSubmit : handleFormSubmit}>
            <Form.Group controlId="formMessage">
              <Form.Label>Message:</Form.Label>
              <Form.Control
                type="text"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formOfferedPrice">
              <Form.Label>Offered Price:</Form.Label>
              <Form.Control
                type="number"
                name="offeredPrice"
                value={formData.offeredPrice}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formListingRef">
              <Form.Label>Listing Ref:</Form.Label>
              <Form.Control
                as="select"
                name="listingRef"
                value={formData.listingRef}
                onChange={handleFormChange}
                required
              >
                <option value="">Select a listing</option>
                {listings.map((listing) => (
                  <option key={listing.id} value={listing.id}>
                    {listing.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
              Save
            </Button>{" "}
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Form>
        </div>
      ) : (
        <Button
          onClick={() => {
            setEditing(true);
            setAddNew(true);
          }}
        >
          Add Offer
        </Button>
      )}
    </div>
  );
};

export default Offers;
