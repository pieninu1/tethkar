import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import Event from "./pages/Event/Event"
import Category from "./pages/Category/Category"
import TicketType from "./pages/TicketType/TicketType"
import Profile from "./pages/Profile/Profile"
import Guard from "./Guards/Guard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

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