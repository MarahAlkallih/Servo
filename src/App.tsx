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
import { DarkModeProvider } from "./context/DarkModeContext";
import { Toast } from "./components/global/Toast";
import { ManufacturesPage } from "./pages/Manufactures/Manufactures";
import { BranchesLayout } from "./pages/Branches/Layout";
import { Sub } from "./pages/Branches/Sub";
import { Main } from "./pages/Branches/Main";
import { Warehouses } from "./pages/Warehouses/Warehouses";
import { LoginPage } from "./pages/LoginPage/Loginpage";
function App() {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/roles" replace />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/suppliers/:id" element={<SupplierDetails />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/motors" element={<PurchaseInvoice />} />
            <Route path="/manufactores" element={<ManufacturesPage />} />
             <Route path="/manufactores" element={<ManufacturesPage />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/branches" element={<BranchesLayout />}>
            
              <Route index element={<Navigate to="main" replace />} />
              <Route path="main" element={<Main />} />
              <Route path="sub" element={<Sub />} />
            </Route>
          </Route>
        </Routes>
      </DarkModeProvider>
      <Toast />
    </Provider>
  )
}

export default App
