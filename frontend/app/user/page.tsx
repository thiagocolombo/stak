"use client";

import React, { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:3000/users", {
        email,
        password,
      });
      setMsg("Usuário criado com sucesso!");
    } catch (error: any) {
      setMsg("Erro ao criar usuário: " + error.response?.data?.message);
    } 
  }; 

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl mb-4">Registro de Usuário</h1>
      {msg && <p className="mb-2 text-red-600">{msg}</p>}
      <div className="bg-white p-4 rounded-md shadow w-full max-w-sm">
        <input
          type="email"
          className="border p-2 w-full mb-2 rounded"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-2 rounded"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Criar Usuário
        </button>
      </div>
    </div>
  );
}
