"use client";
import { logOut } from "@/actions/ServerActions";
import React from "react";

export default function LogOutButton() {
    const logout = () => logOut();
    return (
        <button onClick={logout} className="btn btn-outline-danger">
            Выйти
        </button>
    );
}
