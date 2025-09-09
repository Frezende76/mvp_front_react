import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard';

const Consulta = ({
  title = "Consultar Usuários",
  noUsersMessage = "Nenhum usuário encontrado",
  deleteSuccessMessage = "deletado(a) com sucesso!",
  tooltipMessage = "Digite o nome do usuário a pesquisar",
  apiUrl = "http://localhost:5000/usuarios",
  setEditUser
}) => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  // Buscar todos os usuários
  const fetchTodosUsuarios = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/todos`);
      if (!res.ok) throw new Error('Erro ao carregar usuários');
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      setFeedback(err.message);
    }
  }, [apiUrl]);

  // Buscar usuário por nome
  const fetchUsuarioPorNome = useCallback(async (nome) => {
    try {
      const res = await fetch(`${apiUrl}/consultar/${nome}`);
      if (res.status === 404) {
        setUsuarios([]); // nenhum encontrado
        return;
      }
      if (!res.ok) throw new Error('Erro ao consultar usuário');
      const data = await res.json();
      setUsuarios(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setFeedback(err.message);
    }
  }, [apiUrl]);

  // Carrega todos ao montar
  useEffect(() => {
    fetchTodosUsuarios();
  }, [fetchTodosUsuarios]);

  // Quando o campo for limpo, recarregar todos
  useEffect(() => {
    if (!filtroNome.trim()) {
      fetchTodosUsuarios();
    }
  }, [filtroNome, fetchTodosUsuarios]);

  // Excluir por nome
  const handleDelete = async (nome) => {
    try {
      const res = await fetch(`${apiUrl}/deletar/${nome}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao deletar usuário');
      fetchTodosUsuarios();
      setFeedback(deleteSuccessMessage);
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      setFeedback(err.message);
    }
  };

  // Editar por nome
  const handleEdit = (usuario) => {
    setEditUser(usuario);
    navigate(`/editar/${usuario.nome}`);
  };

  // Consultar via botão
  const handleConsultar = () => {
    if (filtroNome.trim()) {
      fetchUsuarioPorNome(filtroNome);
    } else {
      fetchTodosUsuarios();
    }
  };

  return (
    <main className="container mt-4">
      <h2 className="mb-3">{title}</h2>

      {feedback && <div className="alert alert-success">{feedback}</div>}

      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          placeholder="Digite o nome do cliente"
          data-bs-toggle="tooltip"
          title={tooltipMessage}
        />
        <button className="btn btn-primary" onClick={handleConsultar}>
          Consultar
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <UserCard
                  key={usuario.nome}
                  usuario={usuario}
                  onDelete={() => handleDelete(usuario.nome)}
                  onUpdate={() => handleEdit(usuario)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  {noUsersMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Consulta;



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     




















