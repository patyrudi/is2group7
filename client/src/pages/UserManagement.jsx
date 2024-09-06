import { NavBar } from "../components/NavBar";
import {useEffect, useState} from "react";
import {getAllUsers} from "../api/usuarios.api";
import { UsersList } from "../components/UsersList";

export function UserManagement() {
  return (
    <div>
      <NavBar/>
      User Management
      <UsersList/>
    </div>
  );
}
