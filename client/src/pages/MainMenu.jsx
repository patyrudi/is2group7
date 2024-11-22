import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export function MainMenu() {
  const navigate = useNavigate();

  const goToWorkspaces = () => {
    navigate('/workspaces/');
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">¡Bienvenido al menú principal!</h1>
        <button 
          onClick={goToWorkspaces} 
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Ir a Espacios de Trabajo
        </button>
      </div>
      <div className="container mx-auto my-6 p-6 bg-transparent shadow-lg rounded-lg">
        <p className="mt-2">
          4UTASK es una página web para organizar tus tareas de forma eficiente. 
          Aquí podrás gestionar tus proyectos, asignar tareas y hacer seguimiento del progreso.
          ¡Comienza a optimizar tu productividad hoy mismo!
        </p>
      </div>
    </div>
  );
}
