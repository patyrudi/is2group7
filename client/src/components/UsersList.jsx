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
<div>
  <div className="container mx-auto my-6 p-6 bg-white shadow-lg rounded-lg flex justify-between items-center">
    <h2 className="text-2xl font-bold text-gray-700">Lista de usuarios</h2>
    <button
      className="ml-auto bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 hover:scale-105 transition duration-300"
      onClick={handleClick}
    >
      Crear usuario
    </button>
  </div>

  <div className="container mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
    <table className="min-w-full bg-gray-300 rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-gray-700">ID</th>
          <th className="px-6 py-3 text-left text-gray-700">Nombre</th>
          <th className="px-6 py-3 text-left text-gray-700">Apellido</th>
          <th className="px-6 py-3 text-left text-gray-700">Correo</th>
          <th className="px-6 py-3 text-left text-gray-700">Username</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.idUsuario}
            className="border-t border-gray-700 cursor-pointer hover:bg-gray-800 transition duration-200"
            onClick={() => {
              navigate(`/User/${user.idUsuario}/`);
            }}
          >
            <td className="px-6 py-4 text-gray-700">{user.idUsuario}</td>
            <td className="px-6 py-4 text-gray-700">{user.nombreUsuario}</td>
            <td className="px-6 py-4 text-gray-700">{user.apellidoUsuario}</td>
            <td className="px-6 py-4 text-gray-700">{user.correoUsuario}</td>
            <td className="px-6 py-4 text-gray-700">{user.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}
