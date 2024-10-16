import { useEffect, useState } from "react";
import api from "../api";

import { NavLink } from "react-router-dom";

import document from "../assets/image.jpg";
import userImage from "../assets/userimage.jpg";
import "../styles/Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-background"></div>
        <div className="profile-details">
          <img className="profile-image" src={userImage} alt={user.name} />
          <div className="profile-info">
            <h2>{user.nome}</h2>
            <p className="role">{user.email}</p>
            <p className="location">{user.dataNascimento}</p>
          </div>
          <div className="profile-actions">
            <NavLink className="btn-edit" to={"/home"}>
              Voltar ao principal
            </NavLink>
            <NavLink className="btn-settings" to={"/"}>
              Sair
            </NavLink>
          </div>
        </div>
      </div>
      <div className="profile-extras">
        <div className="extra-info">
          Guardar seus documentos no AcademicHub permite compartilhar
          conhecimento de forma segura e interativa, promovendo discussões e
          facilitando o acesso ao seu material acadêmico.
        </div>
        <div className="skills">
          <p className="label">Seus uploads: </p>
        </div>
        <div className="extra-options">
          <div className="option">
            <p>Ready for work</p>
            <span>Show recruiters that you’re ready for work.</span>
          </div>
          <div className="option">
            <p>Share posts</p>
            <span>Share latest news to get connected with others.</span>
          </div>
          <div className="option">
            <p>Update</p>
            <span>
              Keep your profile updated so recruiters know you better.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
