# 🏆 API de Rankings — Node.js + Express

Esta é uma API RESTful construída com Node.js e Express, que gerencia rankings (pontuações) de usuários. Todos os dados são armazenados localmente em um arquivo `rankings.json`, sem necessidade de banco de dados. A API permite registrar novos rankings, listar os rankings existentes e apagar todos os dados.

---

## 📌 Objetivo do Projeto

O objetivo é oferecer uma API simples e funcional para gerenciar uma **lista de melhores pontuações**. Os rankings são armazenados em disco usando o sistema de arquivos do Node.js (módulo `fs`). A cada nova pontuação, a API atualiza a lista e mantém apenas os **10 melhores** jogadores com maior pontuação.

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- File System (fs) do Node.js
- JSON como armazenamento local (sem banco de dados)

---

## 📁 Estrutura de Arquivos

```
.
├── controllers/
│   └── rankingsController.js       # Controla as requisições e regras de negócio
├── routes/
│   └── rankingsRoutes.js           # Define as rotas da API
├── services/
│   └── rankingsService.js          # Lê e escreve no arquivo rankings.json
├── rankings.json                   # Arquivo local onde os dados são armazenados
```

---

## 🔄 Fluxo de Funcionamento

### 1. Requisição recebida pela rota (routes)
As rotas definidas no Express recebem chamadas HTTP (`GET`, `POST`, `DELETE`).

### 2. Chamada do controller
A rota redireciona a requisição para o controller correspondente, que aplica as regras de negócio (ex: validação, ordenação, limite de registros).

### 3. Uso do service
O controller utiliza funções do service (`getRankings` e `saveRankings`) para ler ou atualizar o arquivo `rankings.json`.

---

## 📄 Explicação dos Arquivos

### `services/rankingsService.js`
Este arquivo é responsável por acessar diretamente o sistema de arquivos.

- Verifica se o arquivo `rankings.json` existe. Se não, ele é criado com estrutura inicial `{ rankings: [] }`.
- `getRankings()`: lê o conteúdo do arquivo e converte em objeto JavaScript.
- `saveRankings(rankings)`: salva os dados atualizados no arquivo, formatado com indentação.

### `controllers/rankingsController.js`
Aqui está a lógica principal da aplicação:

- **`getAllRankings`**: busca todos os rankings do arquivo e os retorna.
- **`addRanking`**: 
  - Valida o corpo da requisição (`nome`, `instituicao`, `pontos`).
  - Converte `pontos` para número se vier como string.
  - Adiciona o novo registro.
  - Ordena do maior para o menor.
  - Mantém apenas os 10 primeiros.
  - Salva os rankings no arquivo.
- **`deleteAllRankings`**: limpa a lista de rankings, salvando uma lista vazia.

### `routes/rankingsRoutes.js`
Define as rotas da API e conecta cada uma com os métodos do controller:

- `GET /rankings` — Lista os rankings.
- `POST /rankings` — Adiciona um novo ranking.
- `DELETE /rankings` — Remove todos os rankings.

---

## 📑 Exemplo de Dados (`rankings.json`)

```json
{
  "rankings": [
    {
      "nome": "Maria",
      "instituicao": "Colégio A",
      "pontos": 95,
      "data": "2025-05-04T14:00:00.000Z"
    },
    {
      "nome": "Carlos",
      "instituicao": "Escola B",
      "pontos": 90,
      "data": "2025-05-04T13:45:00.000Z"
    }
  ]
}
```

---

## 📬 Endpoints da API

### ✅ `GET /rankings`
Retorna a lista atual de rankings (máximo de 10).

**Exemplo de resposta:**
```json
{
  "rankings": [
    {
      "nome": "João",
      "instituicao": "Colégio Z",
      "pontos": 87,
      "data": "2025-05-04T14:30:00.000Z"
    }
  ]
}
```

---

### ➕ `POST /rankings`
Adiciona um novo jogador com sua pontuação.

**Body esperado:**
```json
{
  "data": {
    "nome": "Joana",
    "instituicao": "Escola X",
    "pontos": 88
  }
}
```

**Regras:**
- Campos obrigatórios: `nome`, `instituicao`, `pontos`.
- `pontos` pode ser número ou string numérica.
- Lista é ordenada automaticamente.
- Apenas os 10 melhores são mantidos.

**Resposta:**
```json
{
  "message": "Pontuação adicionada com sucesso",
  "rankings": [ /* nova lista */ ]
}
```

---

### ❌ `DELETE /rankings`
Apaga todos os registros do ranking.

**Resposta:**
```json
{
  "message": "Todos os rankings foram removidos"
}
```

---

## ⚠️ Observações Importantes

- Os dados são salvos em `rankings.json`. Se o arquivo for deletado, ele será recriado automaticamente.
- Apenas os 10 jogadores com **maior pontuação** são mantidos.
- Não há autenticação ou persistência em banco — ideal para projetos educativos ou MVPs.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir uma issue ou enviar um pull request com sugestões, correções ou melhorias.

---