import React, { useState, useRef, useEffect } from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import "./styles/secondSignature.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import UserList from "./components/UserList";
import UserEdit from "./components/UserEdit";
import UserDashboard from "./pages/UserDashboard";
import ProfileSettings from "./pages/ProfileSettings";
import AdminRoute from "./components/AdminRoute"; // Protecting admin routes
import PrivateRoute from "./components/PrivateRoute"; // Protecting user routes
import AdminDashboard from "./pages/AdminDashboard";
import CreateSignature from './components/CreateSignature'; // Adjust the path if necessary
import Register from "./components/Register";
import SignatureList from "./components/SignatureList"; // Import the component for the new route
import EditSignature from "./components/EditSignature";

// Define your routes
const router = createBrowserRouter([
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/sidebar", element: <Sidebar /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/admin-dashboard", element: <AdminRoute><AdminDashboard /></AdminRoute> },
  { path: "/edit/:id", element: <AdminRoute><Edit /></AdminRoute> },
  { path: "/admin-panel", element: <AdminRoute><AdminPanel /></AdminRoute> },
  { path: "/admin/user-list", element: <AdminRoute><UserList /></AdminRoute> },
  { path: "/user-dashboard", element: <PrivateRoute><UserDashboard /></PrivateRoute> },
  { path: "/profile-settings", element: <PrivateRoute><ProfileSettings /></PrivateRoute> },
  { path: "/edit-signature/:id", element: <PrivateRoute><EditSignature /></PrivateRoute> },
  { path: "/create-signature", element: <PrivateRoute><CreateSignature /></PrivateRoute> },
  { path: "/admin/signature-list", element: <AdminRoute><SignatureList /></AdminRoute> } // Add the new route here
]);

function App() {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    last_name: "",
    title: "",
    company: "",
    linkedin_profile: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    image: "",
    description: "",
    website: "",
    address: "",
    company_logo: null,
    company_logo1: null,
    company_logo2: null,
    meeting_link: "",
    twitter: "",
    company_linkedin: "",
    feedback: "",
    gif: null,
    croppedImage: null,
  });
  const [showEdit, setShowEdit] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);
  const [signatures, setSignatures] = useState([]);
  const [users, setUsers] = useState([]);
  const [allUserIds, setAllUserIds] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState(null);

  const renderFirstSignature = () => {
    setActiveComponent("A");
  };

  const renderSecondSignature = () => {
    setActiveComponent("B");
  };

  const cropperRef = useRef(null);


  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
