// AssignUserModal.jsx
import React, { useEffect, useState } from "react";
import { getAllAssignedUsers } from "../api/usuarios_asignados.api.js";
import { getUser } from "../api/usuarios.api.js";
import { useParams } from "react-router-dom";
import cerrarSvg from "../images/cerrar.svg"; // Importar el SVG

export function AssignUserModal({ onClose, onAssignUser, onUpdateCard }) {
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
                // Aquí podrías mostrar un mensaje al usuario sobre el error
            }
        }
    };

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
            <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-2">Asignar Usuario</h3>
                <select
                    value={usuarioSeleccionado}
                    onChange={(e) => setUsuarioSeleccionado(e.target.value)}
                    className="bg-gray-700 text-white p-2 rounded w-full"
                >
                    <option value="">Seleccione un usuario</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.username}
                        </option>
                    ))}
                </select>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} aria-label="Cerrar modal" className="bg-red-600 text-white rounded px-4 py-2 mr-2">Cerrar</button>
                    <button onClick={handleAssign} className="bg-blue-600 text-white rounded px-4 py-2">Asignar</button>
                </div>
            </div>
        </div>
    );
}

