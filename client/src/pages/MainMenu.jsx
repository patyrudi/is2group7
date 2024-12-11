import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export function MainMenu() {
  const navigate = useNavigate();

  const goToWorkspaces = () => {
    navigate('/workspaces/');
  };

  return (
<div className="bg-gray-50 min-h-screen">
  <NavBar />
  <main className="container mx-auto my-10 p-6 space-y-12 max-w-screen-md">
    {/* Sección de bienvenida */}
    <div className="p-8 bg-white shadow-lg rounded-lg flex flex-col items-center text-center space-y-6">
      <h1 className="text-4xl font-extrabold text-black">¡Bienvenido al menú principal!</h1>
      <p className="text-gray-700 text-lg">
        Explora tus espacios de trabajo y mantén tus tareas organizadas de manera eficiente.
      </p>
      <button
        onClick={goToWorkspaces}
        className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-400 hover:shadow-2xl transition duration-300 transform hover:scale-105"
      >
        Ir a Espacios de Trabajo
      </button>
    </div>

    {/* Sección informativa */}
    <div className="p-8 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">¿Qué es 4UTASK?</h2>
      <p className="text-gray-700 text-base leading-relaxed">
        4UTASK es una plataforma diseñada para ayudarte a organizar tus tareas y proyectos de forma sencilla y efectiva.
        Administra tus espacios de trabajo, prioriza tus pendientes y alcanza tus objetivos con facilidad.
      </p>
      <p className="text-gray-700 text-base leading-relaxed">
        ¡Comienza a optimizar tu productividad hoy mismo!
      </p>
    </div>
  </main>
</div>


  );
}
