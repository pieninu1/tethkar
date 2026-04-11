import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import Home from "./pages/User/Home/Home";
import Profile from "./pages/User/Profile/Profile";
import UserTickets from "./pages/User/UserTickets/UserTickets";
import UserFavorites from "./pages/User/UserFavorites/UserFavorites";
import Event from "./pages/Organizer/Event/Event";
import TicketType from "./pages/Organizer/TicketType/TicketType";
import Dashboard from "./pages/Organizer/Dashboard/Dashboard";
import Category from "./pages/Admin/Category/Category";
import City from "./pages/Admin/City/City";
import OrganizerLayout from "./layout/OrganizerLayout";
import AdminLayout from "./layout/AdminLayout";
import Guard from "./Guard/Guard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* USER */}
        <Route element={<Guard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tickets" element={<UserTickets />} />
          <Route path="/favorites" element={<UserFavorites />} />
        </Route>

        {/* ORGANIZER */}
        <Route element={<Guard />}>
          <Route element={<OrganizerLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Event />} />
            <Route path="/ticket-types" element={<TicketType />} />
          </Route>
        </Route>

        {/* ADMIN */}
        <Route element={<Guard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="cities" element={<City />} />
            <Route path="categories" element={<Category />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;