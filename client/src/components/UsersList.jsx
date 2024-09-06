import { useState, useEffect } from 'react';
import { getAllUsers, updateUser, deleteUser } from '../api/usuarios.api';

export function UsersList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const res = await getAllUsers();
            console.log('Users fetched:', res.data);  // Log para depurar
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error.message);
            console.log(error.response);  // Verificar la respuesta del servidor
        }
    }
    
    async function handleUpdateUser() {
        try {
            console.log('Updating user:', editingUser);  // Log del usuario a editar
            await updateUser(editingUser.id, editingUser);
            console.log('User updated successfully');
            setEditingUser(null);
            loadUsers();
        } catch (error) {
            console.error('Error updating user:', error.message);
            console.log(error.response);  // Verificar la respuesta del servidor
        }
    }
    
    async function handleDeleteUser(idUsuario) {
        try {
            console.log('Deleting user with ID:', idUsuario);  // Log de usuario a eliminar
            await deleteUser(idUsuario);
            console.log('User deleted successfully');
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error.message);
            if (error.response) {
                console.log('Server response data:', error.response.data);
                console.log('Server response status:', error.response.status);
                console.log('Server response headers:', error.response.headers);
            } else if (error.request) {
                console.log('No response received:', error.request);
            } else {
                console.log('Error setting up the request:', error.message);
            }
        }
    }
    
    
    return (
        <div className="p-6 #4338ca min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-4">Users List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <div key={user.idUsuario} className="bg-gray-900 shadow-lg rounded-lg p-6">
                        {editingUser && editingUser.idUsuario === user.idUsuario ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={editingUser.nombreUsuario}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, nombreUsuario: e.target.value })
                                    }
                                    className="text-slate-900 border p-2 w-full rounded-md"
                                    placeholder="Nombre de Usuario"
                                />
                                <input
                                    type="email"
                                    value={editingUser.correoUsuario}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, correoUsuario: e.target.value })
                                    }
                                    className="text-slate-900 border p-2 w-full rounded-md"
                                    placeholder="Correo de Usuario"
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleUpdateUser}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingUser(null)}
                                        className="bg-white text-slate-950 px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-semibold">{user.nombreUsuario}</p>
                                <p className="text-white">{user.correoUsuario}</p>
                                <div className="flex space-x-2 mt-4">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.idUsuario)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
