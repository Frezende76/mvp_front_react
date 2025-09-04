import { useState } from 'react';
import InputField from './InputField';

const UserCard = ({ usuario, onDelete, onUpdate }) => {
  const { id, nome, endereco, email, telefone } = usuario;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nome, endereco, email, telefone });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    onUpdate(id, formData);
    setShowModal(false);
  };

  return (
    <>
      <tr>
        <td>{nome}</td>
        <td>{endereco}</td>
        <td>{email}</td>
        <td>{telefone}</td>
        <td className="text-center align-middle">
          <button
            className="btn border-0 btn-sm me-2"
            onClick={() => setShowModal(true)}
            title={`Editar ${nome}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          <button
            className="btn border-0 btn-sm"
            onClick={() => onDelete(id)}
            title={`Excluir ${nome}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <i className="bi bi-trash"></i>
          </button>
        </td>
      </tr>

      {/* Modal de edição */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Usuário</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <InputField label="Nome:" name="nome" value={formData.nome} onChange={handleChange} />
                <InputField label="Endereço:" name="endereco" value={formData.endereco} onChange={handleChange} />
                <InputField label="Email:" name="email" type="email" value={formData.email} onChange={handleChange} />
                <InputField label="Telefone:" name="telefone" value={formData.telefone} onChange={handleChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fundo do modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default UserCard;

