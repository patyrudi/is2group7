import { NavigationLogin } from "../components/NavigationLogin";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export function Register() {
  const toastperso = {
    style: { borderRadius: "10px", background: "#333", color: "#fff" },
  };
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error("Las contraseñas no son iguales", toastperso);
      return;
    }

    try {
      await register(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.username,
        userData.password
      );
      toast.success("Cuenta creada exitosamente!", toastperso);
      toast.success("Inicie sesión para continuar", toastperso);
      navigate("/login");
    } catch (error) {
      toast.error("Error al crear usuario", toastperso);
    }
  };

  return (
<div
  className="flex items-center justify-center min-h-screen"
  style={{
    background: "linear-gradient(to right, #E8EAF6, #C5CAE9)", // Azul claro degradado
  }}
>
  <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
    <h2 className="text-gray-700 text-2xl font-bold mb-8 text-center">
    ¡Regístrate para gestionar tus tareas y alcanzar tus metas!
    </h2>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            id="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="w-full p-2 bg-gray-100 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Apellido
          </label>
          <input
            type="text"
            id="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            placeholder="Apellido"
            className="w-full p-2 bg-gray-100 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Correo
          </label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="correo@ejemplo.com"
            className="w-full p-2 bg-gray-100 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="text-gray-800 mb-4 col-span-2 md:col-span-1">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={handleInputChange}
            placeholder="Nombre de Usuario"
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="text-gray-800 mb-6 col-span-2 md:col-span-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="********"
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="text-gray-800 mb-6 col-span-2 md:col-span-1">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Repetir Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            placeholder="********"
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg text-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 hover:scale-105 transition duration-300"
      >
        Crear Cuenta
      </button>
    </form>
    <div className="text-center mt-3">
      <NavigationLogin />
    </div>
  </div>
</div>

  );
}
