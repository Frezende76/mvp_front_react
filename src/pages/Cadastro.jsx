import { useState, useEffect } from 'react';
import { validateForm } from '../utils/validateForm';
import InputField from '../components/InputField';

const Cadastro = ({
  title = "Cadastro de Usuários",
  submitLabel = "Cadastrar",
  successMessage = "salvo(a) com sucesso!",
  errorLoadingMessage = "Erro ao carregar dados da API.",
  invalidFormMessage = "Por favor, preencha todos os campos corretamente.",
  duplicateMessage = "já cadastrado(a) no sistema.",
  apiUrl = 'http://localhost:5000/usuarios',
  editUser = null,
  setEditUser = () => {}
}) => {
  const [formData, setFormData] = useState({ id: null, nome: '', endereco: '', email: '', telefone: '' });
  const [usuariosApi, setUsuariosApi] = useState([]);
  const [feedback, setFeedback] = useState('');

  // Preenchimento da lista de nomes via API externa
  useEffect(() => {
    const fetchUsuariosApi = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error(errorLoadingMessage);
        const data = await res.json();
        setUsuariosApi(data);
      } catch {
        setFeedback(errorLoadingMessage);
      }
    };
    fetchUsuariosApi();
  }, [errorLoadingMessage]);

  // Carregar usuário para edição
  useEffect(() => {
    if (editUser) setFormData(editUser);
  }, [editUser]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelect = e => {
    const selecionado = usuariosApi.find(u => u.name === e.target.value);
    if (selecionado) {
      setFormData({
        nome: selecionado.name,
        endereco: `${selecionado.address.street}, ${selecionado.address.city}`,
        email: selecionado.email,
        telefone: selecionado.phone
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm(formData)) {
      setFeedback(invalidFormMessage);
      return;
    }

    try {
      // Verificar duplicado localmente
      const resList = await fetch(apiUrl);
      const usuariosExistentes = await resList.json();
      const duplicado = usuariosExistentes.some(
        u => u.nome === formData.nome && u.email === formData.email && u.telefone === formData.telefone
      );

      if (duplicado && !formData.id) {
        setFeedback(`${formData.nome} ${duplicateMessage}`);
        return;
      }

      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `${apiUrl}/${formData.id}` : apiUrl;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Erro ao salvar usuário');

      setFeedback(`${formData.nome} ${successMessage}`);
      setFormData({ id: null, nome: '', endereco: '', email: '', telefone: '' });
      setEditUser(null);

      setTimeout(() => setFeedback(''), 3000);
    } catch (error) {
      setFeedback(error.message);
    }
  };

  return (
    <main className="container mt-4">
      <h2>{title}</h2>
      {feedback && <div className="alert alert-success">{feedback}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <select
            className="form-select"
            value={formData.nome}
            onChange={handleSelect}
            data-bs-toggle="tooltip"
            title="Selecione um nome da lista"
          >
            <option value=""></option>
            {usuariosApi.map(u => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>

        <InputField label="Endereço:" name="endereco" value={formData.endereco} onChange={handleChange} />
        <InputField label="Email:" name="email" type="email" value={formData.email} onChange={handleChange} />
        <InputField label="Telefone:" name="telefone" value={formData.telefone} onChange={handleChange} />

        <button className="btn btn-primary" type="submit">
          {submitLabel || (formData.id ? 'Atualizar' : 'Cadastrar')}
        </button>
      </form>
    </main>
  );
};

export default Cadastro;







