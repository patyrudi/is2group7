import { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { getUser } from '../api/usuarios.api'; // Asegúrate de que la ruta sea correcta

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
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg flex justify-between items-center">
      <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
      </div>
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg flex justify-between items-center">
      {userData ? (
        <div>
          <p>ID: {userData.idUsuario}</p>
          <p>Nombre: {userData.nombreUsuario}</p>
          <p>Apellido: {userData.apellidoUsuario}</p>
          <p>Email: {userData.correoUsuario}</p>
          <p>Username: {userData.username}</p>
          {/* Agrega más campos según lo que devuelva getUser */}
        </div>
      ) : (
        <p>No se encontraron datos de usuario.</p>
      )}
      </div>
    </div>
  );
}
