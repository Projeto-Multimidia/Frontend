import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../api";
import "../styles/Home.css";

import document from "../assets/image.jpg";
import userImage from "../assets/userimage.jpg";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token"); // Pega o token do localStorage
        const response = await api.get("/api/arquivos/all", {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
          },
        });
        setPosts(response.data); // Atualiza o estado com os dados da API
      } catch (error) {
        console.error("Erro ao buscar arquivos", error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="corpoHome">
      <div className="dashboard-container">
        <aside className="left-sidebar">
          <div className="profile-card">
            <img className="profile-pic" src={userImage} alt="User" />
            <h3> {user.nome}</h3>
            <NavLink className="btn-profile" to={"/profile"}>
              Meu Perfil
            </NavLink>
          </div>
          <div className="shortcuts">
            <ul>
              <li>
                <NavLink className="btn" to={"/"}>
                  Sair
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
        <main className="feed-area">
          <div className="new-post-container">
            <div className="new-post">
              <img className="post-user-pic" src={userImage} alt="User" />
              <input
                type="text"
                className="new-post-input"
                placeholder="Compartilhe algo..."
              />
              <NavLink className="btn-upload" to={"/upload"}>
                Upload de arquivo
              </NavLink>
            </div>
            <div className="new-post-options">
              <span>📷 Imagem</span>
              <span>🎥 Vídeo</span>
              <span>📊 Enquete</span>
              <span>🔒 Público</span>
            </div>
          </div>
          {posts.map((post, index) => (
            <div key={index} className="post">
              <div className="post-header">
                <img className="post-user-pic" src={userImage} alt="User" />
                <p>
                  {post.usuario ? post.usuario.name : "Usuário desconhecido"}
                </p>
              </div>
              <div>
                <p className="post-description">{post.descricaoArquivo}</p>
              </div>
              <img className="post-image" src={document} alt="Post" />
              <p>
                <strong>Tipo de Arquivo:</strong> {post.tipoArquivo}
              </p>
              <p>
                <strong>Tamanho:</strong>{" "}
                {(post.tamanhoArquivo / 1024).toFixed(2)} KB
              </p>{" "}
              <div className="post-interactions">
                <span>❤️ 32</span>
                <span>💬 120</span>
                <span>🔁 148</span>
              </div>
            </div>
          ))}
        </main>
        <aside className="right-sidebar">
          <div className="activity">
            <h4>Atividade</h4>
            <p>Derga começou a seguir você.</p>
            <p>Edivp curtiu sua foto.</p>
            <p>Praha curtiu sua foto.</p>
          </div>
          <div className="suggestions">
            <h4>Sugeridos para você</h4>
            <p>Najad</p>
            <p>Sheila Dara</p>
            <p>Divouaur</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
