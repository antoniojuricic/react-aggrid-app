import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import ListingsView from "./layouts/ListingsView";
import AgentsView from "./layouts/AgentsView";
import CompaniesView from "./layouts/CompaniesView";
import OwnersView from "./layouts/OwnersView";
import ClientsView from "./layouts/ClientsView";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListingsView />} />
          <Route path="agents" element={<AgentsView />} />
          <Route path="companies" element={<CompaniesView />} />
          <Route path="owners" element={<OwnersView />} />
          <Route path="clients" element={<ClientsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;