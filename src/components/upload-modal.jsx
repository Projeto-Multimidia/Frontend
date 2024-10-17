import { useState } from "react";
import "../styles/Modal.css";
import api from "../api";

const UploadModal = ({ toggleModal }) => {
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nickname", user.nickname);

    try {
      await api.post("/api/files", formData);
      alert("Arquivo enviado com sucesso!");
      toggleModal();
    } catch (error) {
      console.error("Erro ao enviar arquivo", error.message);
      alert("Erro ao enviar arquivo. Por favor, tente novamente.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enviar Arquivo</h2>
        <form onSubmit={handleFileUpload}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <div className="modal-buttons">
            <button type="submit">Enviar</button>
            <button type="button" className="btn-cancel" onClick={toggleModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
