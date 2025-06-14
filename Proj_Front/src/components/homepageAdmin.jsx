import './homepageAdmin.css';

import { useNavigate } from 'react-router-dom';


const HomepageAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="container_homepageAdmin">
      <h1>Em Construção</h1>
      <div>
        <a href="/login">Seguir para a tela de login</a>
      </div>
    </div>
  );
};

export default HomepageAdmin;