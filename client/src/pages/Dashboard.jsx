import { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { useParams, useNavigate } from "react-router-dom";
import { getBoard } from "../api/tableros.api";
import { taskPerState, taskExpired, taskPerUser } from '../api/dashboard.api';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export function Dashboard() {
    const params = useParams();
    const idEspacio = params.idEspacio;
    const idTablero = params.idTablero;
    const navigate = useNavigate();
    
    const [board, setBoard] = useState(null);
    const [tasksByState, setTasksByState] = useState([]);
    const [tasksExpired, setTasksExpired] = useState(0);
    const [tasksByUser, setTasksByUser] = useState([]);

    useEffect(() => {
        async function fetchBoard() {
            try {
                const response = await getBoard(idTablero);
                setBoard(response.data);
            } catch (error) {
                console.error("Error al encontrar tablero:", error);
            }
        }

        async function fetchTaskData() {
            try {
                const stateResponse = await taskPerState(idTablero);
                const expiredResponse = await taskExpired(idTablero);
                const userResponse = await taskPerUser(idTablero);

                setTasksByState(stateResponse.data);
                setTasksExpired(expiredResponse.data.total_atrasadas);
                setTasksByUser(userResponse.data);
            } catch (error) {
                console.error("Error al obtener datos de tareas:", error);
            }
        }

        fetchBoard();
        fetchTaskData();
    }, [idTablero]);

    // Colores para el gráfico de pastel
    const COLORS = ['#1E90FF', '#00BFFF', '#4682B4', '#5F9EA0'];



    return (
        <div>
            <NavBar />
            <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">
                        Dashboard del tablero: {board ? board.nombreTablero : "Cargando..."}
                    </h1>
                    <button
                            className="bg-red-500 text-white p-2 rounded"
                            onClick={() => navigate(`/Workspaces/${idEspacio}/Boards/${idTablero}`)}
                        >
                            Volver
                    </button>
                </div>
            </div>
            <div className="container mx-auto my-6 p-8 bg-white shadow-lg rounded-lg"> 
                <div className="flex justify-around">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-bold text-white mt-4">Tareas por Estado</h2>
                        <PieChart width={350} height={350}>
                            <Pie 
                                data={tasksByState}
                                dataKey="total"
                                nameKey="estado"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {tasksByState.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-bold text-white mt-4">Total de Tareas Atrasadas</h2>
                        <BarChart width={350} height={350} data={[{ name: 'Atrasadas', total: tasksExpired }]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#FFBB28" />
                        </BarChart>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-bold text-white mt-4">Tareas por Usuario</h2>
                        <PieChart width={350} height={350}>
                            <Pie 
                                data={tasksByUser}
                                dataKey="total"
                                nameKey="username"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {tasksByUser.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
}
