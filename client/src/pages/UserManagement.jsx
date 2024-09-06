import { NavBar } from "../components/NavBar";
import {useEffect, useState} from "react";
import {getAll} from "../api/usuarios.api";

export function UserManagement() {
  return (
    <div>
      <NavBar/>
      User Management
    </div>
  )
}
