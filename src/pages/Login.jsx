import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Login.css";
import { FcGoogle } from "react-icons/fc";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { email, senha };
      const response = await api.post("/api/users/login", data);
      const userData = {
        id: response.data.usuario.id,
        nome: response.data.usuario.nome,
        email: response.data.usuario.email,
        dataNascimento: response.data.usuario.dataNascimento,
      };

      // Salvando o token no localStorage
      localStorage.setItem("token", response.data.token);

      // Salvando os dados do usuário no localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/home");
    } catch (error) {
      console.error("Erro no login", error);
    }
  };

  return (
    <div className="corpo">
      <div className="container">
        <div className="signup-box">
          <h2>Login</h2>
          <p>Entre, guarde e compartilher seus documentos</p>
          <button className="google-signup">
            <FcGoogle className="imagem" />
            Use Google account
          </button>
          <p className="or-text">or</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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
