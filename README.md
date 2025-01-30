# Gerenciador de Tarefas - StaK

Este é um projeto que demonstra como criar um gerenciador de **Tarefas**, utilizando:
- **Nest.js** (Node) no Back-end
- **MongoDB** para persistência dos dados
- **Next.js** (React) no Front-end

A aplicação permite:
- **Criar**, **listar**, **editar** e **excluir** tarefas
- **Marcar tarefas como concluídos** (e destacar em cor verde)
- **Filtrar** as tarefas por **dia**, **mês**, ou **todos**
- **Filtrar** tarefas concluídos ou em aberto
- **Exibir** os resultados em **ordem crescente**

## Estrutura de Pastas

```
stack/
  ├─ backend/   (Nest.js)
  └─ frontend/  (Next.js)
```

## Pré-requisitos
- **Node.js** instalado (versão 14 ou superior)
- **NPM** ou **Yarn** para gerenciar pacotes
- **MongoDB** instalado localmente ou disponível na nuvem (ex.: [MongoDB Atlas](https://www.mongodb.com/atlas))

---

## Instalação

### Clonar o repositório
```bash
git clone https://github.com/thiagocolombo/stack.git
cd stack
```

### Back-end (Nest.js)
1. Entre na pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `app.module.ts` (ou crie variáveis de ambiente) para apontar para seu **MongoDB**:
   ```ts
   MongooseModule.forRoot('mongodb://localhost:27017/eventos');
   ```
   Ajuste a URL conforme necessário (local ou Atlas).
4. (Opcional) Ajuste o **schema** `event.schema.ts` para incluir `@Prop({ default: false }) completed: boolean;` se ainda não tiver.
5. Rode o servidor:
   ```bash
   npm run start:dev
   ```
   Por padrão, o Nest.js estará em `http://localhost:3000/`.

### Front-end (Next.js)
1. Abra um **novo terminal** na pasta `frontend`:
   ```bash
   cd ../frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. (Opcional) Se a porta `3000` estiver ocupada pelo Nest.js, altere a porta do front-end:
   - No **package.json**, adicione `"dev": "PORT=3001 next dev"` ou rode `set PORT=3001 && npm run dev` no Windows.
4. Inicie o projeto:
   ```bash
   npm run dev
   ```
   O Next.js estará em `http://localhost:3000` (ou `3001` se ajustado).

---

## Uso

1. Abra o front-end no navegador: [http://localhost:3001](http://localhost:3001) (ou [http://localhost:3000](http://localhost:3000) se for a porta padrão)
2. Você verá um formulário para **criar** nova tarefa (título, descrição, data). Ao enviar, a tarefa é salva no MongoDB.
3. Abaixo do formulário, há a **lista** de tarefas cadastradas:
   - Cada tarefa pode ser **editada**, **excluída** ou **marcado como concluída**.

4. Você também pode **filtrar**:
   - Por **dia** (tarefas do dia atual)
   - Por **mês** (tarefas do mês atual)
   - Por **todos** (mostra tudo) — **padrão**, exibindo em ordem crescente de data.

5. filtro de **status** permite **exibir somente concluídos**, somente **em aberto**, ou **todos**.

---

## Rotas do Back-end
- `POST /events` — Criar um tarefa
- `GET /events` — Listar todas os tarefas
- `GET /events/:id` — Obter um tarefa por ID
- `PUT /events/:id` — Atualizar uma tarefa (inclui marcar como concluído)
- `DELETE /events/:id` — Remover uma tarefa

### Exemplo de requisição
```bash
POST /events
Body (JSON):
{
  "title": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "date": "2025-01-31",
  "completed": false
}
```

---

## Tecnologias e Bibliotecas
- **Nest.js** + **Mongoose** (Node.js) no back-end
- **React** + **Next.js** no front-end
- **Axios** para requisições HTTP
- **Tailwind CSS** (opcional) para estilos

---

## Contribuindo
1. Faça um fork do projeto
2. Crie sua feature branch: `git checkout -b minha-nova-feature`
3. Commit suas mudanças: `git commit -m 'Add alguma feature'`
4. Faça push: `git push origin minha-nova-feature`
5. Abra um Pull Request

## Licença
Este projeto é apenas para fins educacionais. Use livremente como base para seus estudos e desenvolvimentos.
