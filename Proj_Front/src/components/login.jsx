import "./login.css";

import { FaUser, FaEnvelopeSquare, FaLock } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom"

import { useState } from "react";

import { checkPassword, checkUsername, formatUsername } from "./auth";

import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  //   // consulta username no backend
  //   try {
  //     const response = await axios.get(`http://localhost:3000/user/${uname}`);
  //     const userData = response.data;

  //     // Supondo que o backend retorne { password: 'senhaDoUsuario' }
  //     if (userData.password === pword) {
  //       alert("Login efetuado como " + uname);
  //       if (uname === 'admin@admin') {
  //         navigate('/homeadmin');
  //       } else {
  //         navigate('/home');
  //       }
  //     } else {
  //       alert("Senha incorreta");
  //     }
  //   } catch (error) {
  //     alert("Usuário não encontrado");
  //     console.error('Erro:', error.message);
  //   }
  // };

  
};






  const forgetPassword = () => {
    // checar se é um username está cadastrado no bco e então dispara a mensagem de e-mail para reset da senha
    if (username.length >= 6)
      alert("Um e-mail com instruções para criação de uma nova senha será enviado para " + username);
  };

  return (
    <div className="container_login">
      <form onSubmit={handleSubmit}>
        <h1>Acesso ao Sistema</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="username"
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


// alert("Login efetuado como " + uname + "/" + pword);
// if (uname == 'admin@admin') {
//   navigate('/homeadmin');
// } else {
//   navigate('/home');
// }