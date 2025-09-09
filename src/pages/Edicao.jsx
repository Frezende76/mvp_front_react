import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cadastro from './Cadastro';

const Edicao = ({ editUser, setEditUser }) => {
  const { nome } = useParams();
  const navigate = useNavigate();
  const [usuarioAtual, setUsuarioAtual] = useState(null);

  useEffect(() => {
    if (editUser && editUser.nome === nome) {
      setUsuarioAtual(editUser);
    } else {
      const fetchUser = async () => {
        try {
          const res = await fetch(`http://localhost:5000/usuarios/consultar/${nome}`);
          if (!res.ok) throw new Error('Erro ao carregar usuário');
          const data = await res.json();
          setUsuarioAtual(data);
          setEditUser(data);
        } catch (err) {
          console.error(err.message);
        }
      };
      fetchUser();
    }
  }, [nome, editUser, setEditUser]);

  const handleSuccess = () => {
    setEditUser(null);
    navigate('/consulta');
  };

  return (
    usuarioAtual && (
      <Cadastro
        title="Editar Usuário"
        submitLabel="Atualizar"
        successMessage="atualizado(a) com sucesso!"
        editUser={usuarioAtual}
        setEditUser={setEditUser}
        onSuccess={handleSuccess}
      />
    )
  );
};

export default Edicao;

