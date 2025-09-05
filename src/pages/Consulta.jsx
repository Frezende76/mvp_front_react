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
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  // Busca todos os usuários do backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Erro ao carregar usuários');
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        setFeedback(error.message);
      }
    };
    fetchUsuarios();
  }, [apiUrl]);

  // Excluir usuário
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao deletar usuário');
      setUsuarios(prev => prev.filter(u => u.id !== id));
      setFeedback(deleteSuccessMessage);
      setTimeout(() => setFeedback(''), 3000);
    } catch (error) {
      setFeedback(error.message);
    }
  };

  // Iniciar edição: envia usuário para o formulário de edição
  const handleEdit = (usuario) => {
    setEditUser(usuario);
    navigate(`/editar/${usuario.id}`);
  };

  const usuariosFiltrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <main className="container mt-4">
      <h2 className="mb-3">{title}</h2>

      {feedback && <div className="alert alert-success">{feedback}</div>}

      <input
        type="text"
        className="form-control mb-3"
        value={filtroNome}
        onChange={e => setFiltroNome(e.target.value)}
        placeholder=""
        data-bs-toggle="tooltip"
        title={tooltipMessage}
      />

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
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map(usuario => (
                <UserCard
                  key={usuario.id}
                  usuario={usuario}
                  onDelete={handleDelete}
                  onUpdate={handleEdit} // agora inicia edição corretamente
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








