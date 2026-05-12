import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from './layout/Layout'
import './App.css'
import { RolesPage } from './pages/RolesPage/RolesPage'
import { SuppliersPage } from "./pages/Suppliers/Suppliers";
import { SupplierDetails } from "./pages/Suppliers/SupplierDetails";
import { CompaniesPage } from "./pages/Companies/CompaniesPage";
import PurchaseInvoice from "./pages/Motors/PurchaseInvoice";
import { Provider } from "react-redux";
import { store } from "./app/store";
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/roles" replace />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/suppliers/:id" element={<SupplierDetails />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/motors" element={<PurchaseInvoice/> } />
        </Route>
      </Routes>
    </Provider>
  )
}

export default App
