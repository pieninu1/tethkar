import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Auth/Login/Login"
import Register from "./pages/Auth/Register/Register"
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword"
import Home from "./pages/User/Home/Home"
import Event from "./pages/Organizer/Event/Event"
import Category from "./pages/Organizer/Category/Category"
import TicketType from "./pages/Organizer/TicketType/TicketType"
import Profile from "./pages/User/Profile/Profile"
import Guard from "./components/Guard/Guard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route element={<Guard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Event />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/ticket-types" element={<TicketType />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App