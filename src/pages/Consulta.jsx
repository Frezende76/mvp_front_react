import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';

const Consulta = ({ title, noUsersMessage, deleteSuccessMessage, tooltipMessage, apiUrl }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // função definida dentro do useEffect para não gerar warning
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setUsuarios(data);
      } catch {
        setFeedback('Erro ao carregar usuários');
      }
    };
    fetchUsuarios();
  }, [apiUrl]);

  const handleDelete = async id => {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      setUsuarios(prev => prev.filter(u => u.id !== id));
      setFeedback(deleteSuccessMessage || 'deletado(a) com sucesso!');
      setTimeout(() => setFeedback(''), 3000);
    } catch {
      setFeedback('Erro ao deletar usuário');
    }
  };

  const handleUpdate = async (id, updatedUser) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });

      if (!res.ok) throw new Error('Erro ao atualizar usuário');

      setUsuarios(prev => prev.map(u => u.id === id ? { id, ...updatedUser } : u));
      setFeedback('Usuário atualizado com sucesso!');
      setTimeout(() => setFeedback(''), 3000);
    } catch {
      setFeedback('Erro ao atualizar usuário');
    }
  };

  const usuariosFiltrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <main className="container mt-4">
      <h2 className="mb-3">{title || "Consultar Usuários"}</h2>
      {feedback && <div className="alert alert-success">{feedback}</div>}

      <input
        type="text"
        className="form-control mb-3"
        value={filtroNome}
        onChange={e => setFiltroNome(e.target.value)}
        placeholder=""
        data-bs-toggle="tooltip"
        title={tooltipMessage || 'Digite o nome do usuário a pesquisar'}
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
                  onUpdate={handleUpdate}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">{noUsersMessage || "Nenhum usuário encontrado"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Consulta;





