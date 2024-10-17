import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Login.css";
import api from "../api";

const Login = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { nickname, password };
      const response = await api.post("/api/users/login", data);

      if (response.status === 200) {
        const userData = response.data;

        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/");
      } else {
        alert("Nickname ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro no login", error);
      alert("Erro no login. Por favor, tente novamente.");
    }
  };



  return (
    <div className="corpo">
      <div className="container">
        <div className="signup-box">
          <h2>Login</h2>
          <p>Entre, guarde e compartilhe seus documentos</p>
          <p className="or-text">Preencha</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                id="nickname"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signup-btn">
              Entrar
            </button>
          </form>
          <p className="signin-text">
            É novo por aqui?&nbsp;
            <NavLink to={"/cadastro"}>Cadastre-se</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
