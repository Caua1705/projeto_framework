import { FaUser, FaEnvelopeSquare, FaLock } from "react-icons/fa";

import { useNavigate, useParams } from 'react-router-dom';

import { useState } from "react";

import { checkPassword, checkUsername, formatUsername } from "./auth";

import axios from "axios";

import "./register.css";


const Register = () => {
  const navigate = useNavigate();
  const { nome } = useParams();
  const [username, setUsername] = useState(nome);
  const [password, setPassword] = useState("");

  const handleOk = async (e) => {
    e.preventDefault();
    // realiza checagens básicas para validar o username e password
    let uname = username;
    let pword = password;

    // formata username
    uname = formatUsername(uname);

    // verifica se username é válido
    if (!checkUsername(uname))
      return;

    // verifica se password é válida 
    if (!checkPassword(pword))
      return;

    // envia dados de login para backend
    try {
      await axios.post("http://localhost:3000/usuarios", {
      nome_usuario: username,
      senha: password
    });

    alert("Usuário cadastrado com sucesso!");
    navigate("/"); // ou onde quiser redirecionar
  } catch (error) {
    alert("Erro ao cadastrar: " + error.response?.data?.error);
    console.error(error);
  }



    // alert("Usuário criado corretamente como: " + uname + "/" + pword);
    // if (uname == 'admin@admin') {
    //   navigate('/homeadmin');
    // } else {
    //   navigate('/home');
    // }
    // return;
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
    return;
  };

  return (
    <div className="container_register">
      <form>
        <h1>Formulário de Registro</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="username"
            // required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <FaUser className="icon" /> */}
          <FaEnvelopeSquare className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="senha"
            // required
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="ok_cancel">
          <button type="button" onClick={handleCancel}>Cancelar</button>
          <button type="submit" onClick={handleOk}>Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
