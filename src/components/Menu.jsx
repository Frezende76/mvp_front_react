import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Consulta from '../pages/Consulta';
import NotFound from '../pages/NotFound';

const Menu = ({ editUser, setEditUser, ...props }) => {
  return (
    <Routes>
      <Route path="/" element={<Home subtitulo={props.homeSubtitulo} />} />

      <Route
        path="/cadastro"
        element={
          <Cadastro
            title={props.cadastroTitle}
            submitLabel={props.submitLabel}
            successMessage={props.successMessage}
            errorLoadingMessage={props.errorLoadingMessage}
            invalidFormMessage={props.invalidFormMessage}
            apiUrl={props.apiUrl}
            editUser={editUser}
            setEditUser={setEditUser}
          />
        }
      />

      <Route
        path="/consulta"
        element={
          <Consulta
            title={props.consultaTitle}
            noUsersMessage={props.noUsersMessage}
            deleteSuccessMessage={props.deleteSuccessMessage}
            tooltipMessage={props.tooltipMessage}
            apiUrl={props.apiUrl}
            setEditUser={setEditUser} // passa função para setar usuário a editar
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

