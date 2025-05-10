# Módulo 18: Introdução ao Node.js e Back-end com JavaScript

**Carga horária estimada:** 10 horas

## Objetivo do Módulo

Este módulo introduz o Node.js como uma plataforma para executar JavaScript no lado do servidor, permitindo que os alunos explorem o desenvolvimento back-end. Os alunos aprenderão a configurar um ambiente Node.js, entender seu modelo de I/O não bloqueante, gerenciar pacotes com npm (revisão), criar um servidor HTTP básico e interagir com o sistema de arquivos.

---

## Aula 18.1: O que é Node.js?

**Objetivo de Aprendizado:** Compreender o que é Node.js, sua arquitetura baseada em eventos e como ele permite que JavaScript seja usado para desenvolvimento do lado do servidor.

Node.js é um ambiente de execução JavaScript de código aberto, multiplataforma, que executa código JavaScript fora de um navegador web. Ele permite que os desenvolvedores usem JavaScript para escrever ferramentas de linha de comando e para desenvolvimento do lado do servidor – executando scripts no lado do servidor para produzir conteúdo dinâmico de páginas web antes que a página seja enviada ao navegador do usuário.

### 18.1.1 Principais Características

*   **Motor V8 do Google Chrome:** Node.js usa o motor V8, o mesmo motor que alimenta o Google Chrome, para executar código JavaScript. Isso garante alta performance.
*   **I/O Não Bloqueante:** Node.js usa um modelo de I/O (Entrada/Saída) orientado a eventos e não bloqueante. Isso significa que ele pode lidar com muitas conexões simultaneamente sem ficar preso esperando por operações de I/O (como ler um arquivo ou fazer uma requisição de rede) para completar. Isso o torna muito eficiente para aplicações que precisam lidar com muitas conexões concorrentes, como servidores web.
*   **Loop de Eventos:** O coração do Node.js é o loop de eventos, que permite que o Node.js realize operações não bloqueantes. Quando uma operação assíncrona é iniciada, o Node.js não espera por ela; em vez disso, ele registra uma função de callback e continua processando outras tarefas. Quando a operação assíncrona é concluída, o callback correspondente é adicionado à fila de eventos e executado pelo loop de eventos quando a pilha de chamadas estiver vazia.
*   **npm (Node Package Manager):** Como discutido anteriormente, o npm é o gerenciador de pacotes padrão para Node.js, fornecendo acesso a um vasto ecossistema de bibliotecas e ferramentas de código aberto.
*   **Single-Threaded (com ressalvas):** O loop de eventos do Node.js roda em uma única thread principal. No entanto, para operações que podem ser demoradas (como I/O de arquivo ou rede), o Node.js usa threads de worker em segundo plano para evitar o bloqueio da thread principal. Isso proporciona os benefícios da programação single-threaded (simplicidade) enquanto ainda lida eficientemente com operações concorrentes.

### 18.1.2 Casos de Uso Comuns para Node.js

*   **Servidores Web e APIs:** Criar APIs RESTful rápidas e escaláveis.
*   **Aplicações em Tempo Real:** Como chats, jogos online, devido à sua natureza orientada a eventos.
*   **Aplicações de Página Única (SPAs):** Servir como backend para SPAs construídas com frameworks como React, Angular ou Vue.
*   **Ferramentas de Linha de Comando:** Construir utilitários e scripts para automação.
*   **Microserviços:** Desenvolver pequenos serviços independentes que compõem uma aplicação maior.
*   **Streaming de Dados:** Lidar eficientemente com fluxos de dados.

### 18.1.3 Node.js vs. JavaScript no Navegador

Embora ambos usem JavaScript, existem diferenças importantes:

*   **Ambiente de Execução:** O JavaScript do navegador roda dentro do ambiente seguro do navegador, com acesso ao DOM (Document Object Model) e APIs da web (como `fetch`, `localStorage`). O Node.js roda diretamente no sistema operacional, com acesso ao sistema de arquivos, rede e outros recursos do sistema.
*   **APIs Globais:** O navegador tem objetos globais como `window` e `document`. O Node.js tem `global`, `process`, e módulos embutidos como `fs` (file system) e `http`.
*   **Módulos:** O navegador está adotando cada vez mais os módulos ES6. O Node.js tradicionalmente usa o sistema de módulos CommonJS (`require`), mas também suporta módulos ES6 (.mjs ou configuração no `package.json`).

---

(Continua com Aula 18.2: Instalando o Node.js e npm, Aula 18.3: Criando um Servidor HTTP Básico, Aula 18.4: Trabalhando com o Sistema de Arquivos, Aula 18.5: Módulos CommonJS vs. ES6 no Node.js, Aula 18.6: Introdução ao Express.js – um framework web popular para Node.js)
