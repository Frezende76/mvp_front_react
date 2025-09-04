import { useRef } from 'react';
import { Link } from 'react-router-dom';
import defaultBanner from '../assets/img/cad_users.png'; // ✅ imagem padrão

const Header = ({ bannerImg = defaultBanner }) => {
  const collapseRef = useRef();

  const handleNavClick = () => {
    const bsCollapse = window.bootstrap.Collapse.getInstance(collapseRef.current);
    if (bsCollapse) {
      bsCollapse.hide(); // Fecha o menu colapsado
    }
  };

  return (
    <header>
      <div className="container">
        <div className="banner text-center">
          <img className="banner_cadastro" src={bannerImg} alt="Banner do Sistema" />
        </div>

        <nav className="navbar navbar-expand-lg mt-3">
          <div className="container-fluid">
            {/* Botão hamburguer para telas pequenas */}
            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Menu colapsável */}
            <div
              ref={collapseRef}
              className="collapse navbar-collapse justify-content-center justify-content-lg-center justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link"
                    onClick={handleNavClick}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Página Inicial"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/cadastro"
                    className="nav-link"
                    onClick={handleNavClick}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Cadastrar Novo Usuário"
                  >
                    Cadastro
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/consulta"
                    className="nav-link"
                    onClick={handleNavClick}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Consultar Usuários"
                  >
                    Consulta
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;


