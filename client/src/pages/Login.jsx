import { useState } from "react";
import { login } from "../api/auth";
import { NavigationRegister } from "../components/NavigationRegister";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Login() {
  const toastperso = {
    style: {
      borderRadius: "10px",
      background: "#222",
      color: "#fff",
    },
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      toast.success("Sesión iniciada", toastperso);
      navigate("/MainMenu");
    } catch (error) {
      toast.error("Error de autenticación, credenciales incorrectas", toastperso);
    }
  };

  return (
<div
  className="flex items-center justify-center min-h-screen"
  style={{
    background: "linear-gradient(to right, #E8EAF6, #C5CAE9)", // Azul claro degradado
  }}
>
  <div className="flex w-full max-w-4xl shadow-xl rounded-lg overflow-hidden bg-white bg-opacity-10 backdrop-blur-md">
    {/* Lado izquierdo: Imagen y texto */}
    <div className="w-1/2 flex flex-col justify-center items-center bg-[#7b60b0] bg-opacity-80 p-8">
      <img src="/public/4u.png" alt="Decorative bird" className="w-48 mx-auto mb-6" />
      <h2 className="text-4xl font-extrabold text-white mb-4 tracking-wider">
        4UTask
      </h2>
      <p className="text-lg text-gray-200">Simplifica, organiza, alcanza.</p>
    </div>
    {/* Lado derecho: Formulario */}
    <div className="w-1/2 p-8 bg-white">
      <h2 className="text-gray-700 text-3xl font-bold mb-8 text-center">
        ¡Bienvenido a 4UTask!
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-base font-semibold text-gray-700 mb-2"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-base font-semibold text-gray-700 mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg text-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 hover:scale-105 transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
      <div className="mt-6">
        <NavigationRegister />
      </div>
    </div>
  </div>
</div>

  
  );
}
