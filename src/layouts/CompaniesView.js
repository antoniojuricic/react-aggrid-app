import CompaniesMaster from "../components/CompaniesMaster";
import CompanyDetail from "../components/CompanyDetail";
import { useEffect, useState } from "react";
import  dbService  from "../dbService";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function CompaniesView() {
  const [items, setItems] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [newAdded, setNewAdded] = useState(false);
  async function fetchCompanies() {
    try {
      const companies = await dbService.getAllDocuments('companies');
      setItems(companies);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (newAdded) {
      fetchCompanies();
      setNewAdded(false);
      setAddNew(false);
    }
    
  }, [newAdded]);

  const handleItemClick = (itemId) => {
    setCompanyId(itemId);
    
  };

  const handleAddNew = () => {
    setAddNew(prevAddNew => !prevAddNew);
  }

  const handleDelete = async () => {
    await dbService.deleteDocument("companies", companyId);
    fetchCompanies();
    setCompanyId(null);
  };
  return (
    <>
      <Row>
        <Col xs={3}>
          <Row>
            <Col>
              <h1>Companies</h1>
            </Col>
            <Col className="align-self-center">
              <Button onClick={handleAddNew}>Add new</Button>
            </Col>
          </Row>
          <CompaniesMaster
            items={items}
            handleItemClick={handleItemClick}
            addNew={addNew}
            setNewAdded={setNewAdded}
          />
        </Col>
        <Col>
          {companyId && (
            <CompanyDetail
              id={companyId}
              handleDelete={handleDelete}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default CompaniesView;
