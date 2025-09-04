import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import banner from './assets/img/cad_users.png';

function App() {
  const [editUser, setEditUser] = useState(null); // usuário selecionado para editar

  return (
    <>
      <BrowserRouter>
        <Header bannerImg={banner} />
        <Menu
          editUser={editUser}
          setEditUser={setEditUser}
          homeSubtitulo="Bem-vindo ao sistema de cadastro!"
          cadastroTitle="Cadastrar Novo Usuário"
          submitLabel="Cadastrar"
          successMessage="cadastrado(a) com sucesso!"
          duplicateMessage="já cadastrado(a) no sistema."
          errorLoadingMessage="Erro ao carregar dados da API."
          invalidFormMessage="Por favor, preencha todos os campos corretamente."
          consultaTitle="Consultar Usuários"
          noUsersMessage="Nenhum usuário encontrado"
          deleteSuccessMessage="deletado(a) com sucesso!"
          tooltipMessage="Digite o nome do usuário a pesquisar"
          apiUrl="http://localhost:5000/usuarios"
        />
      </BrowserRouter>
      <Footer autor="Fabricio Rezende" ano={new Date().getFullYear()} />
    </>
  );
}

export default App;




