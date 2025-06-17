import "./login.css";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom"

import { FaEnvelopeSquare, FaLock } from "react-icons/fa";

import { checkPassword, checkUsername, formatUsername } from "./auth";

import { notify } from "./notify";

import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
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
      const response = await axios.get(`${URL}${uname}`);

      // armazena em userData os dados do usuario retornado pela API
      const userData = response.data.usuario;

      if (userData.password === pword) {
        if (uname === 'admin@admin') {
          navigate('/homeadmin');
        } else {
          navigate('/home');
        };
      } else {
        notify.warning("Senha incorreta");
      };
    } catch (error) {
      // se usuario não existe, o backend gera um status de erro 404 e o axios manda o fluxo para o catch
      if (error.response.data.sucesso === false) {
        notify.warning("Usuário não cadastrado");
      } else {
        notify.error("Erro inesperado: " + error.message);
      };
    };
  };


  const forgetPassword = async (e) => {
    e.preventDefault();

    // realiza checagens básicas para validar o username
    const uname = formatUsername(username); // formata username sem espaços em branco e em minúsculas
    if (!checkUsername(uname)) // verifica se username é válido (mais de 6 caracteres e tem @)
      return;

    try {
      // consulta username na API
      const response = await axios.get(`${URL}${uname}`);

      // simula um envio de e-mail para o usuário (-> implementar no futuro)
      notify.info(`Um e-mail com uma nova senha será enviado para ${uname}`);

    } catch (error) {
      // se usuario não existe, o backend gera um status de erro 404 e o axios joga no catch
      if (error.response && error.response.data.sucesso === false) {
        notify.warning("Usuário não cadastrado");
      } else {
        notify.error("Erro inesperado: " + error.message);
      };
    };
  }

  return (
    <div className="container_login">
      <form onSubmit={handleSubmit}>
        <h1>Acesso ao Sistema</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="e-mail"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <FaUser className="icon" /> */}
          <FaEnvelopeSquare className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a onClick={forgetPassword}>Esqueceu a senha?</a>
        </div>
        <button type="submit">Entrar</button>
        <div className="signup-account">
          <Link to={"/register/" + username}>
            Não tem uma conta?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
