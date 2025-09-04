import { Routes, Route } from 'react-router-dom';
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
  tooltipMessage
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home subtitulo={homeSubtitulo} />}
        />

        <Route
          path="/cadastro"
          element={
            <Cadastro
              title={cadastroTitle}
              submitLabel={submitLabel}
              successMessage={successMessage}
              duplicateMessage={duplicateMessage}
              errorLoadingMessage={errorLoadingMessage}
              invalidFormMessage={invalidFormMessage}
            />
          }
        />

        <Route
          path="/consulta"
          element={
            <Consulta
              title={consultaTitle}
              placeholder=""
              noUsersMessage={noUsersMessage}
              deleteSuccessMessage={deleteSuccessMessage}
              tooltipMessage={tooltipMessage}
            />
          }
        />
        
        <Route
          path="*"
          element={<NotFound mensagem="Página não encontrada" voltarPara="/" />}
        />
      </Routes>
    </>
  );
};

export default Menu;
