# React User Cadastro App

Esta é uma aplicação React para cadastro e consulta de usuários. Utiliza localStorage para persistência local e consome uma API externa para preenchimento automático do formulário.

## 🔧 Funcionalidades

- Cadastro de usuários com validação de campos
- Consulta e exclusão de usuários cadastrados
- Dropdown de nomes carregado via API externa
- Interface responsiva com Bootstrap
- Menu de navegação com ícones e tooltips
- Layout adaptável com menu hamburguer em dispositivos móveis

## 🚀 Tecnologias

- React 19
- Vite
- React Router DOM
- Bootstrap 5
- API externa: JSONPlaceholder

## 📌 Clonando o Repositório
Se você deseja baixar o projeto diretamente do GitHub, use o comando abaixo:

```bash
git clone https://github.com/Frezende76/mvp_react_user_cadastro.git

```

Caso contrário, você pode baixar o código compactado (.zip) e extraí-lo manualmente.

Entre no diretório do projeto:

```bash
cd mvp_react_user_cadastro
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
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
└── vite.config.js
```

## 📄 Licença

MIT © Fabricio Rezende
