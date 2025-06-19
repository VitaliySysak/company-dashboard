import { Route, Routes } from 'react-router-dom';
import { Home } from './components/shared/home';
import { SignIn } from './components/shared/auth/sign-in';
import { SignUp } from './components/shared/auth/sign-up';
import { CompanyPage } from './components/shared/companies/company-page';
import { CreateCompany } from './components/shared/companies/create-company';
import { UserPage } from './components/shared/users/user-page';
import { ForgotPassword } from './components/shared/auth/forgot-password';
import { AdminDashboard } from './components/shared/admin-dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>

      <Route path="/new-company" element={<CreateCompany />}></Route>
      <Route path="/company/:id" element={<CompanyPage />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>

      <Route path="/admin-dashboard/user/:id" element={<UserPage />} />
    </Routes>
  );
}

export default App;
