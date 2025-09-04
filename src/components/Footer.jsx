const Footer = ({ autor, ano }) => {
  return (
    <footer>
      <div className="container">
        <h3>Desenvolvido por {autor} &copy; {ano}</h3>
      </div>
    </footer>
  );
};

export default Footer;
