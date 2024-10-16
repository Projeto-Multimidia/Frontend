// src/components/UploadModal.js

import { useState } from "react";
import "../styles/Modal.css"; // CSS para estilizar o modal
import api from "../api";

const UploadModal = ({ toggleModal }) => {
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(`/api/files?userNickname=${user.nickname}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Arquivo enviado com sucesso!");
      toggleModal(); // Fecha o modal após o envio
    } catch (error) {
      console.error("Erro ao enviar arquivo", error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enviar Arquivo</h2>
        <form onSubmit={handleFileUpload}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Enviar</button>
          <button type="button" onClick={toggleModal}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
