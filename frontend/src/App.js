import "./App.css";
import { BrowserRouter , Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import BankInfo from "./pages/BankInfo";
import HistoryPage from "./pages/HistoryPage";
import DepositPage from "./pages/DepositPage";
import WithdrawPage from "./pages/WithdrawPage";
import ProfileDetails from "./pages/ProfileDetails";
import UpdateProfile from "./pages/UpdateProfile";
import { ProfileProvider } from "./context/profileContext";
import Layout from "./pages/Layout";
import { useState } from "react";
import AdminLayout from "./pages/AdminLayout";
import AdminHome from './pages/AdminHome';
import UserList from './pages/UserList';
import AdminViewProfile from './pages/AdminViewProfile';
import AdminViewHistory from './pages/AdminViewHistory';

function App() {
  const [updateTransactions, setUpdateTransactions] = useState(false);

  const handleTransactionUpdate = () => {
    setUpdateTransactions((prev) => !prev); // Toggle the state to trigger re-fetch
  };

  return (
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/user" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="bankinfo" element={<BankInfo />} />
            <Route path="history" element={<HistoryPage updateTrigger={updateTransactions} />} />
            <Route path="deposit" element={<DepositPage onTransactionUpdate={handleTransactionUpdate} />} />
            <Route path="withdrawal" element={<WithdrawPage onTransactionUpdate={handleTransactionUpdate} />} />
            <Route path="profileDetails" element={<ProfileDetails />} />
            <Route path="updateProfile" element={<UpdateProfile />} />
          </Route>

          <Route path="/admin" element={<AdminLayout/>}>
             <Route path="home" element={<AdminHome />} />
             <Route path="userlist" element={<UserList />} />
             <Route path="viewhistory/:username" element={<AdminViewHistory />} />
             <Route path="viewprofile/:username" element={<AdminViewProfile />} />
          </Route>
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
