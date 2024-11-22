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
        background: "linear-gradient(to right, #2a52be, #99c9f5)",
      }}
    >
      <div className="flex w-full max-w-4xl shadow-xl rounded-lg overflow-hidden bg-white bg-opacity-10 backdrop-blur-md">
        {/* Left side with image and text */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-blue-800 bg-opacity-80 p-8">
          <img src="/public/4u.png" alt="Decorative bird" className="w-48 mx-auto mb-6" />
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-wider">
            4UTask
          </h2>
          <p className="text-base text-gray-300">Simplifica, organiza, alcanza.</p>
        </div>
        {/* Right side with login form */}
        <div className="w-1/2 p-8 bg-white bg-opacity-10">
          <h2 className="text-white text-3xl font-bold mb-8 text-center">
            Bienvenido a 4UTask
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-base font-semibold text-gray-200 mb-2"
              >
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-400 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-base font-semibold text-gray-200 mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-400 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg text-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Iniciar Sesión
            </button>
            <div className="text-center text-gray-400 my-6">o</div>
            <button
              type="button"
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg text-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Iniciar sesión con Google
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
