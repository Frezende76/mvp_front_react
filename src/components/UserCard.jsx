const UserCard = ({ usuario, onDelete }) => {
  const { nome, endereco, email, telefone } = usuario;

  return (
    <tr>
      <td>{nome}</td>
      <td>{endereco}</td>
      <td>{email}</td>
      <td>{telefone}</td>
      <td className="text-center align-middle">
        <button
          className="btn border-0 btn-sm me-2"
          onClick={() => onEdit(usuario)}
          title={`Editar ${nome}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          <i className="bi bi-pencil-square"></i>
        </button>

        <button
          className="btn border-0 btn-sm"
          onClick={onDelete}
          title={`Excluir ${nome}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default UserCard;
