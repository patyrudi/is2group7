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
        <nav className="bg-indigo-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/MainMenu" className="text-white text-lg font-bold hover:text-indigo-200">4UTask</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/MainMenu" className="text-gray-300 hover:text-white">Home</Link>
                        <Link to="/Workspaces" className="text-gray-300 hover:text-white">My Workspaces</Link>
                        <Link to="/UserManagement" className="text-gray-300 hover:text-white">Users Management</Link>
                        <Link to="/MyProfile" className="text-gray-300 hover:text-white">My profile</Link>
                        <button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                )}
            </div>
        </nav>
    );
}
