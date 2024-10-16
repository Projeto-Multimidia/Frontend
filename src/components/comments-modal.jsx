import { useState } from "react";
import "../styles/Modal.css";
import api from "../api";

const CommentsModal = ({ post, toggleModal }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const commentData = {
        nickname: JSON.parse(localStorage.getItem("user")).nickname,
        content: newComment,
      };

      const response = await api.put(
        `/api/files/${post.id}/comments`,
        commentData
      );
      if (response.status === 200) {
        setComments((prev) => [...prev, commentData]);
        setNewComment("");
      } else {
        console.error("Erro ao adicionar comentário");
      }
    } catch (error) {
      console.error("Erro ao adicionar comentário", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={toggleModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Comentários</h2>
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>
                  <strong>{comment.nickname}</strong>: {comment.content}
                </p>
              </div>
            ))
          ) : (
            <p>Sem comentários ainda.</p>
          )}
        </div>
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicionar comentário"
            required
          />
          <div className="modal-buttons">
            <button type="submit">Comentar</button>
            <button type="button" className="btn-cancel" onClick={toggleModal}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsModal;
