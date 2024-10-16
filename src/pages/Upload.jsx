import { useState } from "react";
import api from "../api";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("arquivo", file);
    formData.append("descricao", description);

    try {
      const token = localStorage.getItem("token"); // Pega o token do localStorage
      await api.post("/api/arquivos", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
        },
      });
      alert("Arquivo enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar arquivo", error.message);
    }
  };

  return (
    <div>
      <h2>Enviar Arquivo</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Upload;
