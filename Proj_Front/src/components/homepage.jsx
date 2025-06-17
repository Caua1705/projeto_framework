import './homepage.css';

import underConstruction from '../assets/Website-Under-Construction.jpg';

import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="container_homepage">
      <img src={underConstruction} 
      alt="imagem não disponível" 
      onClick={() => navigate(-1)}/>
    </div>
  );
};

export default Homepage;