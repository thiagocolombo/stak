Gerenciador de Tarefas

Este é um projeto para criar uma Gerenciador de Tarefas, utilizando:

Nest.js (Node) no Back-end

MongoDB para persistência dos dados

Next.js (React) no Front-end

A aplicação permite:

Criar, listar, editar e excluir tarefas

Marcar tarefas como concluídas

Filtrar os eventos por dia, mês, ou todos

Filtrar eventos concluídos ou em aberto

Exibir os resultados em ordem crescente de data (mais antigos primeiro)

Estrutura de Pastas

stak/
  ├─ backend/   (Nest.js)
  └─ frontend/  (Next.js)

Pré-requisitos

Node.js instalado (versão 14 ou superior)

NPM ou Yarn para gerenciar pacotes

MongoDB instalado localmente ou disponível na nuvem (ex.: MongoDB Atlas)

Instalação

Clonar o repositório

git clone https://github.com/thiagocolombo/stak.git
cd stak

Back-end (Nest.js)

Entre na pasta backend:

cd backend

Instale as dependências:

npm install

Configure o arquivo app.module.ts (ou crie variáveis de ambiente) para apontar para seu MongoDB:

MongooseModule.forRoot('mongodb://localhost:27017/eventos');

Ajuste a URL conforme necessário (local ou Atlas).

(Opcional) Ajuste o schema event.schema.ts para incluir @Prop({ default: false }) completed: boolean; se ainda não tiver.

Rode o servidor:

npm run start:dev

Por padrão, o Nest.js estará em http://localhost:3000/.

Front-end (Next.js)

Abra um novo terminal na pasta frontend:

cd ../frontend

Instale as dependências:

npm install

(Opcional) Se a porta 3000 estiver ocupada pelo Nest.js, altere a porta do front-end:

No package.json, adicione "dev": "PORT=3001 next dev" ou rode set PORT=3001 && npm run dev no Windows.

Inicie o projeto:

npm run dev

O Next.js estará em http://localhost:3000 (ou 3001 se ajustado).

Uso

Abra o front-end no navegador: http://localhost:3001 (ou http://localhost:3000 se for a porta padrão)

Você verá um formulário para criar novas tarefas (título, descrição, data). Ao enviar, a tarefa é salva no MongoDB.

Abaixo do formulário, há a lista de tarefas cadastradas:

Cada tarefa pode ser editada, excluída ou marcado como concluída.

Se uma tarefa for concluída, seu card fica verde.

Você também pode filtrar:

Por dia (tarefa do dia atual)

Por mês (tarefa do mês atual)

Por todos (mostra tudo) — padrão, exibindo em ordem crescente de data.

Outro filtro permite exibir somente concluídos, somente em aberto, ou todos.

Rotas do Back-end

POST /events — Criar um evento

GET /events — Listar todos os eventos

GET /events/:id — Obter um evento por ID

PUT /events/:id — Atualizar um evento (inclui marcar como concluído)

DELETE /events/:id — Remover um evento

Exemplo de requisição

POST /events
Body (JSON):
{
  "title": "Nova tarefa",
  "description": "Descrição da tarefa",
  "date": "2025-01-31",
  "completed": false
}

Tecnologias e Bibliotecas

Nest.js + Mongoose (Node.js) no back-end

React + Next.js no front-end

Axios para requisições HTTP

Tailwind CSS (opcional) para estilos

Contribuindo

Faça um fork do projeto

Crie sua feature branch: git checkout -b minha-nova-feature

Commit suas mudanças: git commit -m 'Add alguma feature'

Faça push: git push origin minha-nova-feature

Abra um Pull Request

Licença

Este projeto é apenas para fins educacionais. Use livremente como base para seus estudos e desenvolvimentos.
