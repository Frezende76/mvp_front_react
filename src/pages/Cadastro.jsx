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
  setEditUser = () => {},
  onSuccess = () => {}
}) => {
  const [formData, setFormData] = useState({ nome: '', endereco: '', email: '', telefone: '' });
  const [usuariosApi, setUsuariosApi] = useState([]);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Preenche lista de nomes via API externa
  useEffect(() => {
    const fetchUsuariosApi = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error(errorLoadingMessage);
        const data = await res.json();
        setUsuariosApi(data);
      } catch {
        setFeedback({ message: errorLoadingMessage, type: 'error' });
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

  const limparFormulario = () => {
    setFormData({ nome: '', endereco: '', email: '', telefone: '' });
    setEditUser(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm(formData)) {
      setFeedback({ message: invalidFormMessage, type: 'error' });
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
      return;
    }

    try {
      const resList = await fetch(apiUrl);
      const usuariosExistentes = await resList.json();

      // Verifica duplicidade
      const duplicado = usuariosExistentes.some(
        u =>
          u.nome === formData.nome &&
          u.email === formData.email &&
          u.telefone === formData.telefone
      );

      if (duplicado && !editUser) {
        setFeedback({ message: `${formData.nome} ${duplicateMessage}`, type: 'error' });
        setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
        limparFormulario();
        return;
      }

      const method = editUser ? 'PUT' : 'POST';
      const url = editUser ? `${apiUrl}/${formData.nome}` : apiUrl;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Erro ao salvar usuário');
      }

      // Sucesso
      setFeedback({ message: `${formData.nome} ${successMessage}`, type: 'success' });
      limparFormulario();

      if (editUser) {
        setTimeout(() => {
          setFeedback({ message: '', type: '' });
          onSuccess();
        }, 2000);
      } else {
        setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
      }
    } catch (error) {
      setFeedback({ message: error.message, type: 'error' });
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
    }
  };

  return (
    <main className="container mt-4">
      <h2>{title}</h2>
      {feedback.message && (
        <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {feedback.message}
        </div>
      )}

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
          {editUser ? 'Atualizar' : submitLabel || 'Cadastrar'}
        </button>
      </form>
    </main>
  );
};

export default Cadastro;











