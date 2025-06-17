import './homepageAdmin.css';

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { notify } from "./notify";

import axios from "axios";


const HomepageAdmin = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${URL}`);
        setUserData(response.data.usuarios);
      } catch (error) {
        notify.error("Erro inesperado: " + error.message);
      }
    };
    fetchUsers();
  }, []);

  const deletarUser = () => {


  }
  
  // const userData = [
  //   {
  //     "id": 1,
  //     "username": "admin@admin",
  //     "password": "adm123"
  //   },
  //   {
  //     "id": 8,
  //     "username": "luis@eduardo",
  //     "password": "luis1234"
  //   },
  //   {
  //     "id": 9,
  //     "username": "cristiano@florencio",
  //     "password": "778899"
  //   },
  //   {
  //     "id": 10,
  //     "username": "caua@carvalho",
  //     "password": "987654321"
  //   },
  //   {
  //     "id": 11,
  //     "username": "mauricio@moreira",
  //     "password": "9999"
  //   }
  // ];

  return (<div className="container_homepageAdmin">
    <h2>Lista de Usuários</h2>

    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Senha</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.username}</td>
              <td>{usuario.password}</td>
              <td>
                <button onClick={deletarUser}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="button-group">
      <button onClick={() => navigate(-1)}>Voltar para o login</button>
    </div>
  </div >
  );
};

export default HomepageAdmin;