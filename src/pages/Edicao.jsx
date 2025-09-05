import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cadastro from './Cadastro';

const Edicao = ({ editUser, setEditUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuarioAtual, setUsuarioAtual] = useState(null);

  useEffect(() => {
    // Se já veio o editUser via state, usamos ele
    if (editUser && editUser.id === Number(id)) {
      setUsuarioAtual(editUser);
    } else {
      // Se não veio, buscamos do backend
      const fetchUser = async () => {
        try {
          const res = await fetch(`http://localhost:5000/usuarios/${id}`);
          if (!res.ok) throw new Error('Erro ao carregar usuário');
          const data = await res.json();
          setUsuarioAtual(data);
          setEditUser(data); // atualiza estado global
        } catch (err) {
          console.error(err.message);
        }
      };
      fetchUser();
    }
  }, [id, editUser, setEditUser]);

  const handleSuccess = () => {
    setEditUser(null); // limpa estado de edição
    navigate('/consulta'); // redireciona para a tabela
  };

  return (
    usuarioAtual && (
      <Cadastro
        title="Editar Usuário"
        submitLabel="Atualizar"
        successMessage="atualizado(a) com sucesso!"
        editUser={usuarioAtual}
        setEditUser={setEditUser}
        onSuccess={handleSuccess} // prop que vai disparar após atualização
      />
    )
  );
};

export default Edicao;

