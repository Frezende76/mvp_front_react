import { useEffect, useState } from 'react';
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
  const [feedback, setFeedback] = useState({ message: '', type: '', visible: false });
  const navigate = useNavigate();

  // Buscar todos os usuários inicialmente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(`${apiUrl}/todos`);
        if (!res.ok) throw new Error('Erro ao carregar usuários');
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        showFeedback(error.message, 'error');
      }
    };
    fetchUsuarios();
  }, [apiUrl]);

  const showFeedback = (message, type = 'success', duration = 3000) => {
    setFeedback({ message, type, visible: true });
    setTimeout(() => setFeedback(prev => ({ ...prev, visible: false })), duration);
  };

  // Função para buscar usuário específico ou todos
  const buscarUsuario = async () => {
    if (!filtroNome) {
      const res = await fetch(`${apiUrl}/todos`);
      const data = await res.json();
      setUsuarios(data);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/consultar/${filtroNome}`);
      if (res.status === 404) {
        setUsuarios([]);
        showFeedback('Usuário não encontrado', 'error');
        return;
      }
      const data = await res.json();
      setUsuarios([data]);
    } catch (error) {
      setUsuarios([]);
      showFeedback(error.message || 'Erro ao buscar usuário', 'error');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      buscarUsuario();
    }
  };

  const handleDelete = async (nome) => {
    try {
      const res = await fetch(`${apiUrl}/deletar/${nome}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao deletar usuário');
      setUsuarios(prev => prev.filter(u => u.nome !== nome));
      showFeedback(deleteSuccessMessage, 'success');
    } catch (error) {
      showFeedback(error.message, 'error');
    }
  };

  const handleEdit = (usuario) => {
    setEditUser(usuario);
    navigate(`/editar/${usuario.nome}`);
  };

  return (
    <main className="container mt-4">
      <h2 className="mb-3">{title}</h2>

      {feedback.visible && (
        <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'} fade show`} role="alert">
          {feedback.message}
        </div>
      )}

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={filtroNome}
          onChange={e => setFiltroNome(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite o nome do usuário"
          data-bs-toggle="tooltip"
          title={tooltipMessage}
        />
        <button className="btn btn-primary" type="button" onClick={buscarUsuario}>
          Buscar
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
              usuarios.map(usuario => (
                <UserCard
                  key={usuario.nome}
                  usuario={usuario}
                  onDelete={() => handleDelete(usuario.nome)}
                  onUpdate={() => handleEdit(usuario)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">{noUsersMessage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Consulta;










