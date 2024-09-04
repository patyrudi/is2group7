import { useState } from 'react';
import { login } from '../api/auth'; // Ajusta la ruta según tu estructura de archivos
import { NavigationRegister } from "../components/NavigationRegister";

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await login(username, password);
        window.location.href = '/MenuPrincipal';
      } catch (error) {
        setError('Error de autenticación. Por favor, verifica tus credenciales.');
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-pink-200 bg-clip-text text-transparent">4U Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium mb-2">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Iniciar sesión
            </button>
            <div className='text-center'>o</div>
            <button
              type="button"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 flex items-center justify-center"
            >
              <span>Iniciar sesión con Google</span>
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
          </form>
          <NavigationRegister />
        </div>
      </div>
    );
  }
  
