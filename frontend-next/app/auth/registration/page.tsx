"use client";

import { logIn, registration } from "@/actions/ServerActions";
import React, { useState } from "react";

export default function page() {
    const [message, setMessage] = useState("");
    const actionForm = (formData: FormData) => {
        registration(formData).then(res => {
            if (res) {
                setMessage(res);
            }
        });
    };

    return (
        <div className="container">
            <h1 className="pt-4 pb-2">Регистрация</h1>
            {message && (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            )}

            <form action={actionForm}>
                <div className="mb-3 needs-validation">
                    <label htmlFor="exampleInputTitle1" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputTitle1"
                        aria-describedby="emailHelp"
                        name="email"
                        required
                    />
                </div>
                <div className="mb-3 needs-validation">
                    <label htmlFor="exampleInputTitle1" className="form-label">
                        Пароль
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputTitle1"
                        aria-describedby="emailHelp"
                        name="password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}
