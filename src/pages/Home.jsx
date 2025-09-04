const Home = (props) => {
  return (
    <main className="container text-center mt-4">
      <h2 className="mb-4">{props.subtitulo || "Bem-vindo ao sistema de cadastro!"}</h2>
    </main>
  );
};

export default Home;
