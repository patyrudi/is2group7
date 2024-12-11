import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { register } from "../api/auth";
import { NavBar } from "../components/NavBar";
import { deleteUser, updateUser, getUser } from "../api/usuarios.api";

export function UserFormPage() {
  const toastperso = {
    style: { borderRadius: "10px", background: "#333", color: "#fff" },
  };
  const navigate = useNavigate();
  const params = useParams();
  const { idUsuario } = params;

  const [userData, setUserData] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    correoUsuario: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (idUsuario) {
      const fetchUserData = async () => {
        try {
          const { data } = await getUser(idUsuario);
          setUserData({
            nombreUsuario: data.nombreUsuario || "",
            apellidoUsuario: data.apellidoUsuario || "",
            correoUsuario: data.correoUsuario || "",
            username: data.username || "",
            password: "", // Mantén la contraseña en blanco para seguridad
            confirm_password: "", // Mantén la confirmación de la contraseña en blanco
          });
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          toast.error("Error al cargar los datos del usuario", toastperso);
        }
      };

      fetchUserData();
    }
  }, [idUsuario]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirm_password) {
      toast.error("Las contraseñas no coinciden", toastperso);
      return;
    }

    try {
      if (idUsuario) {
        // Enviar contraseña si está presente
        const updateData = {
          ...userData,
          password: userData.password || undefined, // Enviar la contraseña solo si no está vacía
        };
        await updateUser(idUsuario, updateData);
        toast.success("Usuario actualizado exitosamente!", toastperso);
      } else {
        // Llamada a la API de registro
        await register(
          userData.nombreUsuario,
          userData.apellidoUsuario,
          userData.correoUsuario,
          userData.username,
          userData.password
        );
        toast.success("Cuenta creada exitosamente!", toastperso);
      }
      navigate("/UserManagement");
    } catch (error) {
      toast.error("Error al procesar solicitud", toastperso);
    }
  };

  async function handleDeleteUser() {
    try {
      if (idUsuario) {
        await deleteUser(idUsuario);
        toast.success("Usuario eliminado exitosamente!", toastperso);
        navigate("/UserManagement");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      toast.error("Error al eliminar usuario", toastperso);
    }
  }

  return (
<div>
  <NavBar />
  <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 bg-white">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
      {idUsuario ? "Editar Usuario" : "Crear Cuenta"}
    </h2>
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label htmlFor="nombreUsuario" className="block text-sm font-medium mb-2 text-gray-600">Nombre</label>
          <input
            type="text"
            id="nombreUsuario"
            value={userData.nombreUsuario}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b60b0]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellidoUsuario" className="block text-sm font-medium mb-2 text-gray-600">Apellido</label>
          <input
            type="text"
            id="apellidoUsuario"
            value={userData.apellidoUsuario}
            onChange={handleInputChange}
            placeholder="Apellido"
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b60b0]"
          />
        </div>
        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="correoUsuario" className="block text-sm font-medium mb-2 text-gray-600">Correo</label>
          <input
            type="email"
            id="correoUsuario"
            value={userData.correoUsuario}
            onChange={handleInputChange}
            placeholder="correo@ejemplo.com"
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b60b0]"
          />
        </div>
        <div className="mb-4 col-span-2 md:col-span-1">
          <label htmlFor="username" className="block text-sm font-medium mb-2 text-gray-600">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={handleInputChange}
            placeholder="Nombre de Usuario"
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b60b0]"
          />
        </div>
        {!idUsuario && (
          <>
            <div className="mb-6 col-span-2 md:col-span-1">
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-600">Contraseña</label>
              <input
                type="password"
                id="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="********"
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b60b0]"
              />
            </div>
            <div className="mb-6 col-span-2 md:col-span-1">
              <label htmlFor="confirm_password" className="block text-sm font-medium mb-2 text-gray-600">Repetir Contraseña</label>
              <input
                type="password"
                id="confirm_password"
                value={userData.confirm_password}
                onChange={handleInputChange}
                placeholder="********"
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b60b0]"
              />
            </div>
          </>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-[#7b60b0] hover:bg-[#9a7bc4] text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-[#7b60b0] mt-6"
      >
        {idUsuario ? "Guardar" : "Crear Cuenta"}
      </button>
      
    </form>

    {idUsuario && (
      <div className="w-full max-w-md mt-4">
        <button
          type="button"
          onClick={handleDeleteUser}
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-red-500 mt-6"
        >
          Eliminar
        </button>
      </div>
    )}
  </div>
</div>

  );
}