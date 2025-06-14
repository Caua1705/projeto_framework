import './homepage.css';

import underConstruction from '../assets/Website-Under-Construction.jpg';

import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="container_homepage">
      <img src={underConstruction} alt="imagem não disponível"/>
      <a href="/login">Voltar para a tela de login</a>
    </div>
  );
};

export default Homepage;