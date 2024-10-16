// src/pages/Home.js

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../api";
import "../styles/Home.css";
import document from "../assets/image.jpg"; // Você pode ajustar para exibir a imagem correta
import userImage from "../assets/userimage.jpg";
import UploadModal from "../components/upload-modal";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/files");
        setPosts(response.data); // Atualiza o estado com os dados da API
      } catch (error) {
        console.error("Erro ao buscar arquivos", error.message);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (fileId) => {
    try {
      await api.post(`/api/files/${fileId}/like`);
      // Atualiza o estado local para refletir o novo número de curtidas
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === fileId ? { ...post, likes: (post.likes || 0) + 1 } : post
        )
      );
    } catch (error) {
      console.error("Erro ao curtir o arquivo", error.message);
    }
  };

  // Função para abrir e fechar o modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="corpoHome">
      <div className="dashboard-container">
        <aside className="left-sidebar">
          <div className="profile-card">
            <img className="profile-pic" src={userImage} alt="User" />
            <h3>{user.nickname}</h3>
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
              <button className="btn-upload" onClick={toggleModal}>
                Upload de arquivo
              </button>
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
                <p>{post.user ? post.user.nickname : "Usuário desconhecido"}</p>
              </div>
              <div>
                <p className="post-description">{post.fileName}</p>
              </div>
              <img
                className="post-image"
                src={`data:${post.type};base64,${post.data}`}
                alt="Post"
              />
              <p>
                <strong>Tipo de Arquivo:</strong> {post.type}
              </p>
              <p>
                <strong>Tamanho:</strong>{" "}
                {(post.size / 1024).toFixed(2)} KB
              </p>
              <div className="post-interactions">
              <span onClick={() => handleLike(post.id)}>❤️ {post.likes || 0}</span>
                <span>💬 {post.comments ? post.comments.length : 0}</span>
                <span>🔁 0</span>
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

      {/* Modal de upload */}
      {isModalOpen && <UploadModal toggleModal={toggleModal} />} 
    </div>
  );
};

export default Home;
