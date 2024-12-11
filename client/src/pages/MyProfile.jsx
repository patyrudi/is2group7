import { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { getUser } from '../api/usuarios.api';
import { FaUser, FaEnvelope, FaIdCard, FaUserAlt } from 'react-icons/fa'; // Asegúrate de que la ruta sea correcta

export function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const idUsuario = localStorage.getItem('idUsuario'); // Accede al idUsuario en localStorage

      if (idUsuario) {
        try {
          const data = await getUser(idUsuario); // Llama a getUser con el idUsuario
          setUserData(data.data); // Almacena los datos del usuario
        } catch (err) {
          console.error('Error al obtener los datos del usuario:', err);
          setError('Error al obtener los datos del usuario.'); // Manejo de errores
        } finally {
          setLoading(false); // Asegúrate de cambiar loading al final
        }
      } else {
        setLoading(false); // Si no hay idUsuario, se detiene el loading
        setError('No se encontró el id de usuario en localStorage.'); // Manejo de error
      }
    };

    fetchUserData(); // Llama a la función para obtener datos
  }, []); // Solo se ejecuta una vez al montar el componente

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra el error si lo hay
  }

    return (
      <div>
        <NavBar />
        <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
          <h1 className="text-2xl text-gray-700 font-bold">Perfil de Usuario</h1>
        </div>
        <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
          {userData ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <FaIdCard className="text-gray-600 mr-3" />
                <div>
                  <span className="text-gray-600 font-medium">ID:</span>
                  <span className="text-gray-800 ml-2">{userData.idUsuario}</span>
                </div>
              </div>
              <div className="flex items-center">
                <FaUserAlt className="text-gray-600 mr-3" />
                <div>
                  <span className="text-gray-600 font-medium">Nombre:</span>
                  <span className="text-gray-800 ml-2">{userData.nombreUsuario}</span>
                </div>
              </div>
              <div className="flex items-center">
                <FaUser className="text-gray-600 mr-3" />
                <div>
                  <span className="text-gray-600 font-medium">Apellido:</span>
                  <span className="text-gray-800 ml-2">{userData.apellidoUsuario}</span>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-gray-600 mr-3" />
                <div>
                  <span className="text-gray-600 font-medium">Email:</span>
                  <span className="text-gray-800 ml-2">{userData.correoUsuario}</span>
                </div>
              </div>
              <div className="flex items-center">
                <FaUser className="text-gray-600 mr-3" />
                <div>
                  <span className="text-gray-600 font-medium">Username:</span>
                  <span className="text-gray-800 ml-2">{userData.username}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No se encontraron datos de usuario.</p>
          )}
        </div>
      </div>
    );
  }
