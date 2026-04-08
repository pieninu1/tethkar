import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#1A1A1A", color: "#fff", padding: "20px" }}>
        <h2>Event App</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Dashboard</li>
          <li>Events</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>

        <button onClick={handleLogout} style={{ marginTop: "20px" }}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        
        {/* Header */}
        <div style={{ padding: "15px", background: "#2B2A2A", color: "#fff" }}>
          <input placeholder="Search..." />
        </div>

        {/* Page Content */}
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;