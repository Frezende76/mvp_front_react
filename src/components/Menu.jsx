import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Consulta from '../pages/Consulta';
import Edicao from '../pages/Edicao';
import NotFound from '../pages/NotFound';

const Menu = ({
  homeSubtitulo,
  cadastroTitle,
  submitLabel,
  successMessage,
  duplicateMessage,
  errorLoadingMessage,
  invalidFormMessage,
  consultaTitle,
  noUsersMessage,
  deleteSuccessMessage,
  tooltipMessage,
  apiUrl = 'http://localhost:5000/usuarios',
  editUser,
  setEditUser
}) => {
  return (
    <Routes>
      <Route path="/" element={<Home subtitulo={homeSubtitulo} />} />

      {/* Rota de cadastro */}
      <Route
        path="/cadastro"
        element={
          <Cadastro
            title={cadastroTitle}
            submitLabel={submitLabel}
            successMessage={successMessage}
            errorLoadingMessage={errorLoadingMessage}
            invalidFormMessage={invalidFormMessage}
            duplicateMessage={duplicateMessage}
            apiUrl={apiUrl}
            editUser={editUser}
            setEditUser={setEditUser}
          />
        }
      />

      {/* Rota de edição */}
      <Route
        path="/editar/:nome"
        element={
          <Edicao
            editUser={editUser}
            setEditUser={setEditUser}
          />
        }
      />

      {/* Rota de consulta */}
      <Route
        path="/consulta"
        element={
          <Consulta
            title={consultaTitle}
            noUsersMessage={noUsersMessage}
            deleteSuccessMessage={deleteSuccessMessage}
            tooltipMessage={tooltipMessage}
            apiUrl={apiUrl}
            setEditUser={setEditUser}
          />
        }
      />

      <Route
        path="*"
        element={<NotFound mensagem="Página não encontrada" voltarPara="/" />}
      />
    </Routes>
  );
};

export default Menu;




