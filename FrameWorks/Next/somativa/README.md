# Projeto: Sistema de Reserva de Salas (Connect Coworking)

Este projeto é um sistema full-stack de gerenciamento e reserva de salas, construído com o framework Next.js (App Router).

O objetivo foi criar uma aplicação que substituísse um sistema antigo de reservas por e-mail, resolvendo problemas de conflito de agendamento e permitindo o gerenciamento das salas.

---

## O que foi feito (Funcionalidades Principais)

Para atender aos requisitos, o projeto foi dividido em duas áreas principais, controladas por um sistema de autenticação baseado em papéis (Roles).

### 1. Autenticação e Papéis (Roles)

* **Login e Cadastro:** Usuários podem se cadastrar e fazer login. As senhas são criptografadas com `bcrypt`.
* **Autorização com JWT:** O acesso às páginas e APIs é protegido usando JSON Web Tokens.
* **Middleware de Rota:** Um `middleware.ts` centralizado protege as rotas. Ele redireciona usuários não logados e bloqueia o acesso a rotas de "Admin" por "Usuários Comuns".
* **Dois Papéis:**
    * `user` (Usuário Comum): Pode ver e reservar.
    * `admin` (Administrador): Pode gerenciar tudo.

### 2. Painel do Administrador (`/dashboard` para Admins)

O admin tem controle total sobre o sistema:

* **Gerenciamento de Salas (CRUD):**
    * **Criar:** Adicionar novas salas (nome, capacidade, recursos).
    * **Ler:** Ver a lista de salas existentes.
    * **Atualizar:** Editar os dados de uma sala.
    * **Deletar:** Remover uma sala do sistema.
* **Gerenciamento de Reservas:**
    * O admin pode ver **todas** as reservas de **todos** os usuários.
    * O admin pode cancelar (deletar) qualquer reserva no sistema.

### 3. Painel do Usuário Comum (`/dashboard` para Usuários)

O usuário comum tem uma interface focada na reserva:

* **Listagem de Salas:** O usuário vê um formulário de reserva com a lista de salas disponíveis (criadas pelo admin).
* **Ver Disponibilidade:** Ao selecionar uma data, o sistema busca e mostra (em uma lista) todos os horários **já ocupados** para aquele dia.
* **Criar Reserva (com Anti-Conflito):**
    * O usuário seleciona a sala, data e horários.
    * A API `POST /api/reservas` verifica se aquele horário já está ocupado.
    * Se houver conflito, o sistema retorna um erro (`409 Conflict`) e avisa o usuário.
    * Se estiver livre, a reserva é criada.
* **Ver Minhas Reservas:**
    * O usuário vê uma lista de suas **próprias** reservas futuras (a partir do dia de hoje).
    * **Sincronização de Estado:** A lista de "Minhas Reservas" e a lista de "Disponibilidade" são atualizadas automaticamente (sem precisar de F5) quando o usuário cria ou cancela uma reserva.
* **Cancelar Reserva:** O usuário pode cancelar suas próprias reservas.

---

## Tecnologias Utilizadas

* **Framework:** Next.js 14+ (App Router)
* **Linguagem:** TypeScript
* **Banco de Dados:** MongoDB
* **ORM / Modelagem:** Mongoose
* **API:** Next.js Route Handlers (API RESTful)
* **Autenticação:** JWT (com `jose`) e `bcrypt`
* **Estilização:** CSS Modules

## Colocando o Link da Prototipagem

## https://www.figma.com/design/GJggMGL1B8lIfrtbR0CzpB/Untitled?node-id=0-1&t=pGdZkthnBvbKWnHA-1