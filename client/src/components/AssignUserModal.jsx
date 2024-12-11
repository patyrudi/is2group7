// AssignUserModal.jsx
import React, { useEffect, useState } from "react";
import { getAllAssignedUsers } from "../api/usuarios_asignados.api.js";
import { getUser } from "../api/usuarios.api.js";
import { useParams } from "react-router-dom";

export function AssignUserModal({ onClose, onAssignUser}) {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
    const [loading, setLoading] = useState(true);
    const { idEspacio } = useParams();

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            try {
                const res = await getAllAssignedUsers();
                const listaUsuarios = res.data;

                const usuariosFiltrados = listaUsuarios.filter(
                    (usuario) => usuario.idEspacio === parseInt(idEspacio)
                );

                const detallesUsuarios = await Promise.all(
                    usuariosFiltrados.map(async (usuario) => {
                        const userData = await getUser(usuario.idUser);
                        return { id: usuario.idUser, username: userData.data.username };
                    })
                );

                setUsuarios(detallesUsuarios);
            } catch (error) {
                console.error("Error fetching users:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, [idEspacio]);

    const handleAssign = async () => {
        if (usuarioSeleccionado) {
            try {
                await onAssignUser(usuarioSeleccionado);
                onClose();
            } catch (error) {
                console.error("Error al asignar el usuario:", error.message);
            }
        }
    };

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-xl text-gray-700 font-bold mb-2">Asignar Usuario</h3>
                <select
                    value={usuarioSeleccionado}
                    onChange={(e) => setUsuarioSeleccionado(e.target.value)}
                    className="bg-gray-300 text-gray-700 p-2 rounded w-full"
                >
                    <option value="">Seleccione un usuario</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.username}
                        </option>
                    ))}
                </select>
                <div className="mt-4 flex justify-end gap-4">
  <button
    onClick={handleAssign}
    className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 border-b-4 border-blue-800 shadow-md"
  >
    Asignar
  </button>
  <button
    onClick={onClose}
    aria-label="Cerrar modal"
    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md border-b-4 border-gray-700 shadow-md"
  >
    Cancelar
  </button>
</div>

            </div>
        </div>
    );
}