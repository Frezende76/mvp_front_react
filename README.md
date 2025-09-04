# FrontEnd React Cadastro de usuários

Esta é uma aplicação React para cadastro, edição, consulta e exclusão de usuários. Os dados são salvos em um banco de dados SQLite através de uma API backend, e o formulário pode ser preenchido automaticamente via API externa (JSONPlaceholder).

## 🔧 Funcionalidades

- Cadastro de usuários com validação de campos
- Consulta de usuários cadastrados
- Edição de usuários via modal
- Exclusão de usuários
- Dropdown de nomes carregado via API externa
- Interface responsiva com Bootstrap 5
- Menu de navegação com ícones, tooltips e menu hambúrguer em dispositivos móveis
- Atualização automática da tabela após cadastro, edição ou exclusão

## 🚀 Tecnologias

- React 19
- Vite
- React Router DOM
- Bootstrap 5
- API externa: JSONPlaceholder
- Backend: API REST com SQLite
- Docker para containerização

## 📌 Clonando o Repositório
Se você deseja baixar o projeto diretamente do GitHub, use o comando abaixo:

```bash
git clone https://github.com/Frezende76/mvp_front_react.git

```

Caso contrário, você pode baixar o código compactado (.zip) e extraí-lo manualmente.

Entre no diretório do projeto:

```bash
cd mvp_front_react
```

---

## ▶️ Como executar

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`.

## 🐳 Como executar via Docker

   1.  Build da imagem Docker:

    ```bash

    docker build -t meu-frontend-react .

    ```
   2. Rodar o container:

    ```bash

    docker run -p 3000:80 meu-frontend-react

    ```

   3. Acesse em http://localhost:3000.

## 📂 Estrutura

```
├── src/
│   ├── assets/img/
│   │   └── cad_users.png
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── InputField.jsx
│   │   ├── Menu.jsx
│   │   ├── UserCard.jsx
│   ├── pages/
│   │   ├── Cadastro.jsx
│   │   ├── Consulta.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   ├── utils/
│   │   ├── validateForm.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── nginx.conf
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
└── vite.config.js
```

## 📄 Licença

MIT © Fabricio Rezende
