import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MainMenu } from "./pages/MainMenu";
import { Toaster } from "react-hot-toast";
import { UserManagement } from "./pages/UserManagement";
import { Workspaces } from "./pages/Workspaces";
import { MyProfile } from "./pages/MyProfile";
import { Boards } from "./pages/Boards";
import { UserFormPage } from "./pages/UserFormPage";
import { Board } from "./pages/Board";
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/MainMenu" />} />
        <Route path="" element={<Navigate to="/MainMenu" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/MainMenu" element={<MainMenu />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/Workspaces" element={<Workspaces />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/Workspaces/:idEspacio/Boards/" element={<Boards />} />
        <Route path="/UserFormPage" element={<UserFormPage />} />
        <Route path="/User/:idUsuario" element={<UserFormPage />} />
        <Route path="/Workspaces/:idEspacio/Boards/:idTablero" element={<Board />} />
        <Route path="/Workspaces/:idEspacio/Boards/:idTablero/Dashboard/" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
