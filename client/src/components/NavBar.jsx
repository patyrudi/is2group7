import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        setIsAuthenticated(!!accessToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('idUsuario');
        navigate('/login');
    };

    return (
<nav style={{ backgroundColor: '#7b60b0' }} className="h-16 shadow-md py-4">
  <div className="container mx-auto flex justify-between items-center px-6">
    {/* Logo */}
    <Link
      to="/MainMenu"
      className="text-white text-lg font-bold hover:text-[#4ade80] transition duration-300"
    >
      4UTask
    </Link>

    {/* Links de navegación */}
    {isAuthenticated ? (
      <>
        <Link
          to="/MainMenu"
          className="text-white font-medium hover:text-[#4ade80] transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/Workspaces"
          className="text-white  font-medium hover:text-[#4ade80] transition duration-300"
        >
          My Workspaces
        </Link>
        <Link
          to="/UserManagement"
          className="text-white  font-medium hover:text-[#4ade80] transition duration-300"
        >
          Users Management
        </Link>
        <Link
          to="/MyProfile"
          className="text-white font-medium hover:text-[#4ade80] transition duration-300"
        >
          My Profile
        </Link>
        <button
          onClick={handleLogout}
          className="text-white  font-medium hover:text-[#4ade80] transition duration-300"
        >
          Logout
        </button>
      </>
    ) : (
      <Link
        to="/login"
        className="text-white font-medium hover:text-[#4ade80] transition duration-300"
      >
        Login
      </Link>
    )}
  </div>
</nav>


    );
}