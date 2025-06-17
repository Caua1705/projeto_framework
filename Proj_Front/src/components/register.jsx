import { FaEnvelopeSquare, FaLock } from "react-icons/fa";

import { useNavigate, useParams } from 'react-router-dom';

import { useState } from "react";

import { checkPassword, checkUsername, formatUsername } from "./auth";

import { notify } from "./notify";

import axios from "axios";

import "./register.css";


const Register = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const { nome } = useParams();
  const [username, setUsername] = useState(nome);
  const [password, setPassword] = useState("");

  const handleOk = async (e) => {
    e.preventDefault();

    // realiza checagens básicas para validar o username e password
    const uname = formatUsername(username); // formata username sem espaços em branco e em minúsculas
    const pword = password;
    if (!checkUsername(uname)) // verifica se username é válido (mais de 6 caracteres e tem @)
      return;
    if (!checkPassword(pword)) // verifica se password é válida (mais de 4 caracteres)
      return;

    try {
      // consulta username na API
      await axios.get(`${URL}${uname}`);

      // se a consulta retornou sem erros, é pq usuário já existe
      notify.warning(`O usuário ${uname} já existe! Use um e-mail diferente ou tente recuperar sua senha`);
      return;
    } catch (error1) {
      if (error1.response?.status !== 404) {
        notify.error("Erro inesperado ao verificar usuário.");
        return;
      }
      // usuario não existe, enviar dados para backend
      try {
        await axios.post(`${URL}register/`, {
          username: uname,
          password: pword
        });
        notify.info("Usuário cadastrado com sucesso!");
        navigate(-1);
      } catch (error2) {
        notify.error("Erro inesperado: " + error2.message);
      };
    };
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
    return;
  };

  return (
    <div className="container_register">
      <form>
        <h1>Formulário de Registro</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="e-mail"
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
