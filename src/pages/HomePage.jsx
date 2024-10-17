import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../api";
import "../styles/Home.css";
import userImage from "../assets/userimage.jpg";
import UploadModal from "../components/upload-modal";
import CommentsModal from "../components/comments-modal";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    try {
      const response = await api.get("/api/files");
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar arquivos", error.message);
    }
  };

  useEffect(() => {
    fetchPosts();

    const intervalId = setInterval(() => {
      fetchPosts();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [updateTrigger]);

  const handleLike = async (fileId) => {
    try {
      await api.put(`/api/files/like/${fileId}`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === fileId ? { ...post, likes: (post.likes || 0) + 1 } : post
        )
      );
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao curtir o arquivo", error.message);
    }
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await api.get(`/api/files/download/${fileId}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      if (typeof window !== "undefined" && typeof window.document !== "undefined") {
        const link = window.document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        window.document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      console.error("Erro ao fazer download do arquivo", error.message);
    }
  };

  const toggleUploadModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleCommentsModal = (post) => {
    setSelectedPost(post);
    setIsCommentsModalOpen(!isCommentsModalOpen);
    setUpdateTrigger((prev) => prev + 1);
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
              <button className="btn-upload" onClick={toggleUploadModal}>
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
              <p><strong>Tipo de Arquivo:</strong> {post.type}</p>
              <p><strong>Tamanho:</strong> {(post.size / 1024).toFixed(2)} KB</p>
              <div className="post-interactions">
                <span onClick={() => handleLike(post.id)}>
                  ❤️ {post.likes || 0}
                </span>
                <span onClick={() => toggleCommentsModal(post)}>
                  💬 {post.comments ? post.comments.length : 0}
                </span>
                <button
                  className="btn-download"
                  onClick={() => handleDownload(post.id, post.fileName)}
                >
                  📥 Download
                </button>
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

      {isModalOpen && <UploadModal toggleModal={toggleUploadModal} />}

      {isCommentsModalOpen && <CommentsModal post={selectedPost} toggleModal={toggleCommentsModal} />}
    </div>
  );
};

export default Home;
