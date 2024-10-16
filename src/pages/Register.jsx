import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../api";
import "../styles/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(dataNascimento);
      const response = await api.post("http://localhost:3000/api/users", {
        name,
        email,
        senha,
        dataNascimento,
      });
      setUser(response.data);

      navigate("/");
    } catch (error) {
      console.error("Erro no login", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Cadastre-se</h2>
        <p>Venha fazer parte da nossa comunidade</p>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Data de Nascimento:</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
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
