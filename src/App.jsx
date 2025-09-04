import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import banner from './assets/img/cad_users.png';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header bannerImg={banner} />
        <Menu
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
        />
      </BrowserRouter>
      <Footer autor="Fabricio Rezende" ano={new Date().getFullYear()} />
    </>
  );
}

export default App;




