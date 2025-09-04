import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Consulta from '../pages/Consulta';
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
  apiUrl = 'http://localhost:5000/usuarios'
}) => {
  // Estado para controlar usuário em edição
  const [editUser, setEditUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Home subtitulo={homeSubtitulo} />} />

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

      <Route
        path="/consulta"
        element={
          <Consulta
            title={consultaTitle}
            noUsersMessage={noUsersMessage}
            deleteSuccessMessage={deleteSuccessMessage}
            tooltipMessage={tooltipMessage}
            apiUrl={apiUrl}
            setEditUser={setEditUser} // passa função para iniciar edição
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



