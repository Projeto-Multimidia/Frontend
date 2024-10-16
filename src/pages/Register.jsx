// src/pages/Register.js

import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../api";
import "../styles/Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        nickname,
        password,
      };
      const response = await api.post("/api/users", userData);
      if (response.status === 200 || response.status === 201) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro no cadastro", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Cadastre-se</h2>
        <p>Venha fazer parte da nossa comunidade</p>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="nickname">Nickname</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-btn">
            Sign up
          </button>
        </form>
        <p className="signin-redirect">
          Já possui uma conta?&nbsp;
          <NavLink to={"/"}>Conecte-se</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
