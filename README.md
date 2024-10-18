# Documentação do Aplicativo To-Do List

## Introdução

Este aplicativo é uma lista de tarefas (To-Do List) que permite aos usuários adicionar, editar, marcar como concluída e excluir tarefas. O aplicativo é composto por uma interface front-end e um back-end que se comunicam através de uma API RESTful.

## Funcionalidades

- **Autenticação de Usuário**: Registro, login, recuperação de senha e validação de token.
- **Gerenciamento de Tarefas**: Adicionar, editar, marcar como concluída e excluir tarefas.

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js e npm instalados.
- MongoDB Atlas configurado.

### Passos para Configurar o Ambiente

1. **Instalar Dependências**

   ```bash
   npm install
   ```

2. **Iniciar o Servidor**
   ```bash
   npm run start
   ```

## Estrutura do Projeto

### Front-end

- **HTML**: Estrutura da página.
- **CSS**: Estilização da página.
- **JavaScript**: Lógica de interação com a API e manipulação do DOM.

### Back-end

- **index.js**: Ponto de entrada do servidor.
- **routes**: Definição das rotas da API.
- **controllers**: Controladores que lidam com a lógica de negócios.
- **models**: Modelos de dados do MongoDB.
- **database**: Conexão com o MongoDB.

## Como Executar o Aplicativo

1. **Iniciar o Servidor Back-end**

   ```bash
   npm run start
   ```

2. **Abrir o Arquivo HTML no Navegador**
   - Abra o arquivo `login.html` no navegador para interagir com o aplicativo.

## Como Interagir com o Aplicativo

### Autenticação

1. **Registro de Usuário**

   - Acesse a página de registro.
   - Preencha os campos de nome, email, senha e confirmação de senha.
   - Clique em "Confirmar".

2. **Login**

   - Acesse a página de login.
   - Preencha os campos de email e senha.
   - Clique em "Login".

3. **Recuperação de Senha**
   - Acesse a página de login.
   - Clique em "Esqueceu a senha?".
   - Preencha o campo de email e clique em "Confirmar".
   - Siga as instruções para alterar a senha.

### Gerenciamento de Tarefas

1. **Adicionar Tarefa**

   - Acesse a página principal após o login.
   - Preencha o campo de descrição da tarefa.
   - Clique no botão de adicionar.

2. **Editar Tarefa**

   - Clique no ícone de edição ao lado da tarefa.
   - Edite a descrição da tarefa.
   - Clique no botão de confirmar.

3. **Marcar Tarefa como Concluída**

   - Clique no botão de conclusão ao lado da tarefa.

4. **Excluir Tarefa**
   - Clique no ícone de exclusão ao lado da tarefa.

## Conclusão

Este aplicativo fornece uma interface simples e eficiente para gerenciar tarefas, com autenticação de usuário e interação com uma API RESTful. Siga as instruções acima para configurar o ambiente de desenvolvimento, executar o aplicativo e interagir com ele.
