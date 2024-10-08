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
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-pink-200 bg-clip-text text-transparent">
          Crear Cuenta
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-2"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                placeholder="Apellido"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 col-span-2 md:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Correo
              </label>
              <input
                type="email"
                id="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="correo@ejemplo.com"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 col-span-2 md:col-span-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                value={userData.username}
                onChange={handleInputChange}
                placeholder="Nombre de Usuario"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6 col-span-2 md:col-span-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="********"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6 col-span-2 md:col-span-1">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Repetir Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                placeholder="********"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
          >
            Crear Cuenta
          </button>
        </form>
        <div className="text-center my-4">o</div>
        <button
          type="button"
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
        >
          <span>Registrarse con Google</span>
          <span className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-google"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
            </svg>
          </span>
        </button>
        <div className="text-center mt-3">
          <NavigationLogin />
        </div>
      </div>
    </div>
  );
}
