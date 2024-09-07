import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/usuarios.api";

export function UsersList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/UserFormPage');
  };

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await getAllUsers();
      console.log("Users fetched:", res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      console.log(error.response);
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold ">Users List</h2>
        <button className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleClick}>Crear usuario</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-white">ID</th>
              <th className="px-4 py-2 text-left text-white">Nombre</th>
              <th className="px-4 py-2 text-left text-white">Apellido</th>
              <th className="px-4 py-2 text-left text-white">Correo</th>
              <th className="px-4 py-2 text-left text-white">Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.idUsuario}
                className="border-t border-gray-700 cursor-pointer hover:bg-gray-800"
                onClick={() => {
                  navigate(`/User/${user.idUsuario}/`);
                }}
              >
                <td className="px-4 py-2 text-white">{user.idUsuario}</td>
                <td className="px-4 py-2 text-white">{user.nombreUsuario}</td>
                <td className="px-4 py-2 text-white">{user.apellidoUsuario}</td>
                <td className="px-4 py-2 text-white">{user.correoUsuario}</td>
                <td className="px-4 py-2 text-white">{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
