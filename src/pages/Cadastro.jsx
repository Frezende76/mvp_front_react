import { useState, useEffect } from 'react';
import { validateForm } from '../utils/validateForm';
import InputField from '../components/InputField';

const Cadastro = ({ title, submitLabel, successMessage, errorLoadingMessage, invalidFormMessage, apiUrl, editUser, setEditUser }) => {
  const [formData, setFormData] = useState({ id: null, nome: '', endereco: '', email: '', telefone: '' });
  const [usuariosApi, setUsuariosApi] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // define a função dentro do useEffect para não gerar warning
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setUsuariosApi(data);
      } catch {
        setFeedback(errorLoadingMessage || 'Erro ao carregar dados da API.');
      }
    };
    fetchUsuarios();
  }, [apiUrl, errorLoadingMessage]); // adiciona apiUrl como dependência

  useEffect(() => {
    if (editUser) setFormData(editUser);
  }, [editUser]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelect = e => {
    const selecionado = usuariosApi.find(u => u.nome === e.target.value);
    if (selecionado) setFormData(selecionado);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm(formData)) {
      setFeedback(invalidFormMessage || 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `${apiUrl}/${formData.id}` : apiUrl;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Erro ao salvar usuário');

      setFeedback(`${formData.nome} ${successMessage || 'salvo(a) com sucesso!'}`);
      setFormData({ id: null, nome: '', endereco: '', email: '', telefone: '' });
      setEditUser(null); // limpa edição
      // atualizar lista localmente
      const updatedRes = await fetch(apiUrl);
      setUsuariosApi(await updatedRes.json());

      setTimeout(() => setFeedback(''), 3000);
    } catch (error) {
      setFeedback(error.message);
    }
  };

  return (
    <main className="container mt-4">
      <h2>{title || 'Cadastro de Usuários'}</h2>
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
            {usuariosApi.map((u, i) => (
              <option key={i} value={u.nome}>{u.nome}</option>
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



