# Módulo 20: Boas Práticas, Performance e Segurança em JavaScript

**Carga horária estimada:** 8 horas

## Objetivo do Módulo

Este módulo foca em equipar os alunos com o conhecimento sobre boas práticas de codificação em JavaScript, técnicas para otimizar a performance de suas aplicações e princípios fundamentais de segurança para o desenvolvimento web front-end e back-end com JavaScript. O objetivo é formar desenvolvedores conscientes da qualidade, eficiência e segurança do código que produzem.

---

## Aula 20.1: Boas Práticas de Codificação em JavaScript

**Objetivo de Aprendizado:** Aprender e aplicar boas práticas para escrever código JavaScript limpo, legível, de fácil manutenção e menos propenso a erros.

Escrever código de alta qualidade vai além de apenas fazê-lo funcionar. Boas práticas tornam o código compreensível para outros desenvolvedores (e para você mesmo no futuro), facilitam a depuração e a manutenção, e contribuem para a robustez geral da aplicação.

### 20.1.1 Legibilidade e Clareza

*   **Nomes Significativos:** Use nomes de variáveis, funções e classes que descrevam claramente seu propósito. Evite abreviações excessivas ou nomes genéricos como `x`, `data`, `func`.
    ```javascript
    // Ruim
    let a = 10;
    function proc(d) { /* ... */ }

    // Bom
    let idadeDoUsuario = 10;
    function processarDadosDoFormulario(dadosFormulario) { /* ... */ }
    ```
*   **Comentários Judiciosos:** Comente apenas o necessário. Explique o "porquê" de algo complexo ou não óbvio, não o "o quê" de código autoexplicativo. Mantenha os comentários atualizados.
*   **Consistência de Estilo:** Siga um guia de estilo consistente (ex: Airbnb, Standard, Google, ou o definido pela equipe). Use ferramentas como ESLint e Prettier para automatizar isso.
*   **Indentação e Espaçamento:** Use indentação consistente (geralmente 2 ou 4 espaços) e espaçamento adequado para melhorar a estrutura visual do código.
*   **Funções Pequenas e Coesas:** Funções devem fazer uma coisa bem feita. Se uma função está ficando muito longa ou fazendo muitas coisas, divida-a em funções menores e mais especializadas.
*   **Evite Números Mágicos e Strings Mágicas:** Use constantes nomeadas em vez de valores literais diretamente no código.
    ```javascript
    // Ruim
    if (status === 2) { /* ... */ }
    const taxa = valor * 0.05;

    // Bom
    const STATUS_APROVADO = 2;
    const TAXA_DE_JUROS_MENSAL = 0.05;
    if (status === STATUS_APROVADO) { /* ... */ }
    const juros = valor * TAXA_DE_JUROS_MENSAL;
    ```

### 20.1.2 Uso de `let` e `const` (ES6+)

*   Prefira `const` por padrão para variáveis que não serão reatribuídas. Isso ajuda a prevenir reatribuições acidentais e torna o código mais previsível.
*   Use `let` para variáveis que precisam ser reatribuídas.
*   Evite `var` devido ao seu comportamento de hoisting e escopo de função, que podem levar a bugs sutis.

### 20.1.3 Modo Estrito (`"use strict";`)

*   Use o modo estrito no topo dos seus scripts ou funções. Ele ativa uma variante mais restrita do JavaScript, que elimina alguns "erros silenciosos" do JavaScript, transformando-os em erros explícitos, e proíbe certas sintaxes problemáticas.
    ```javascript
    "use strict";
    // seu código aqui
    ```

### 20.1.4 Tratamento de Erros

*   Use blocos `try...catch...finally` para lidar com operações que podem falhar (ex: parsing de JSON, requisições de API).
*   Lance erros significativos (`throw new Error("Mensagem descritiva")`) quando algo inesperado acontecer em suas funções.

### 20.1.5 Evitar Poluição do Escopo Global

*   Minimize o número de variáveis e funções declaradas no escopo global. Use módulos (ES6 Modules ou o Padrão Module com IIFEs) para encapsular seu código.

### 20.1.6 Código DRY (Don\u2019t Repeat Yourself)

*   Evite duplicação de código. Se você tem blocos de código idênticos ou muito similares em vários lugares, abstraia-os em funções reutilizáveis.

### 20.1.7 Princípio da Responsabilidade Única (SRP)

*   Cada módulo, classe ou função deve ter uma única responsabilidade ou propósito bem definido dentro do sistema.

### 20.1.8 Testes

*   Escreva testes (unitários, de integração) para seu código. Testes ajudam a garantir que seu código funciona como esperado e previnem regressões quando você faz alterações.

---

## Aula 20.2: Otimização de Performance em JavaScript

**Objetivo de Aprendizado:** Aprender técnicas e estratégias para identificar gargalos de performance e otimizar a execução de código JavaScript tanto no front-end quanto no back-end.

A performance é crucial para a experiência do usuário e a eficiência de aplicações.

### 20.2.1 Minimização e Bundling de Código

*   **Minificação:** Remove caracteres desnecessários (espaços em branco, comentários, quebras de linha) e encurta nomes de variáveis do código JavaScript (e CSS, HTML) para reduzir o tamanho do arquivo, resultando em downloads mais rápidos.
*   **Bundling (Agrupamento):** Combina múltiplos arquivos JavaScript (e CSS) em um único arquivo (ou poucos arquivos). Isso reduz o número de requisições HTTP que o navegador precisa fazer, o que pode melhorar significativamente o tempo de carregamento da página.
*   **Ferramentas:** Webpack, Parcel, Rollup são bundlers populares que também realizam minificação.

### 20.2.2 Otimização do DOM

*   **Minimize Manipulações Diretas do DOM:** Acessar e modificar o DOM é uma operação custosa. Agrupe as alterações ou use DocumentFragments para fazer múltiplas mudanças offline antes de anexá-las ao DOM de uma vez.
*   **Evite Layout Thrashing:** Ocorre quando você lê uma propriedade de layout (como `offsetHeight` ou `getComputedStyle()`) e depois escreve (modifica o DOM) repetidamente em um loop, forçando o navegador a recalcular o layout várias vezes. Tente agrupar leituras e depois agrupar escritas.
*   **Use Seletores CSS Eficientes:** Seletores muito complexos ou ineficientes podem tornar a busca por elementos mais lenta.
*   **Virtual DOM (em Frameworks):** Frameworks como React e Vue usam um Virtual DOM para otimizar as atualizações do DOM real, aplicando apenas as diferenças (diffing).

### 20.2.3 Otimização de Loops e Algoritmos

*   **Escolha o Loop Certo:** `for` tradicional, `for...of` (para iteráveis), `forEach` (para arrays). Considere a performance para grandes volumes de dados (loops `for` tradicionais costumam ser mais rápidos em micro-benchmarks, mas a diferença pode ser insignificante para a maioria dos casos de uso em comparação com a legibilidade).
*   **Evite Trabalho Desnecessário em Loops:** Não recalcule valores ou faça operações custosas dentro de um loop se elas podem ser feitas fora dele.
*   **Complexidade Algorítmica:** Esteja ciente da complexidade (Big O notation) dos seus algoritmos, especialmente ao lidar com grandes conjuntos de dados.

### 20.2.4 Carregamento Assíncrono e Lazy Loading

*   **Scripts Assíncronos (`async`, `defer`):** Use os atributos `async` ou `defer` nas tags `<script>` para evitar que o carregamento de scripts JavaScript bloqueie a renderização da página.
    *   `defer`: Baixa o script em paralelo e o executa após o HTML ser parseado, na ordem em que aparecem.
    *   `async`: Baixa o script em paralelo e o executa assim que estiver disponível, o que pode ser antes do HTML ser completamente parseado e a ordem não é garantida.
*   **Lazy Loading (Carregamento Preguiçoso):** Carregue recursos (imagens, componentes, módulos JavaScript) apenas quando eles são necessários (ex: quando o usuário rola até eles ou clica em um botão). Isso melhora o tempo de carregamento inicial.
    *   **Imagens:** Use o atributo `loading="lazy"`.
    *   **Módulos JavaScript:** Use importações dinâmicas (`import("./meuModulo.js")`).

### 20.2.5 Debouncing e Throttling

*   **Debouncing:** Agrupa uma sequência de chamadas de função que ocorrem em rápida sucessão em uma única chamada após um certo período de inatividade. Útil para eventos como `resize`, `scroll`, ou digitação em campos de busca (para evitar fazer uma requisição de API a cada tecla pressionada).
*   **Throttling:** Garante que uma função seja chamada no máximo uma vez dentro de um intervalo de tempo especificado, mesmo que o evento que a dispara ocorra múltiplas vezes. Útil para controlar a taxa de execução de funções em eventos frequentes (ex: animações baseadas em scroll).

### 20.2.6 Memoização

*   Uma técnica de otimização onde você armazena (cache) os resultados de chamadas de função custosas e retorna o resultado em cache para as mesmas entradas subsequentes, em vez de recalcular.

### 20.2.7 Web Workers

*   Permitem executar scripts JavaScript em threads de segundo plano, separadas da thread principal da UI. Isso é útil para tarefas computacionalmente intensivas que, de outra forma, congelariam a interface do usuário.

### 20.2.8 Ferramentas de Profiling

*   Use o painel **Performance** nas Ferramentas de Desenvolvedor do Navegador para gravar e analisar a execução do seu código, identificar gargalos e ver onde o tempo está sendo gasto.

---

## Aula 20.3: Princípios de Segurança em JavaScript (Front-end)

**Objetivo de Aprendizado:** Compreender as vulnerabilidades de segurança comuns em aplicações JavaScript do lado do cliente e como mitigá-las.

A segurança no front-end é crucial para proteger os usuários e os dados da aplicação.

### 20.3.1 Cross-Site Scripting (XSS)

*   **O que é:** Uma vulnerabilidade que permite que atacantes injetem scripts maliciosos em páginas web visualizadas por outros usuários. O script malicioso é então executado no navegador da vítima, no contexto da página vulnerável, podendo roubar cookies de sessão, tokens, ou realizar ações em nome do usuário.
*   **Tipos Comuns:**
    *   **Reflected XSS:** O script injetado é refletido de uma requisição web (ex: parâmetro de URL) para a resposta.
    *   **Stored XSS (Persistent XSS):** O script injetado é armazenado permanentemente no servidor alvo (ex: em um comentário de blog, perfil de usuário) e executado sempre que outros usuários visualizam a página contaminada.
    *   **DOM-based XSS:** A vulnerabilidade reside no código JavaScript do lado do cliente que manipula o DOM de forma insegura com dados controlados pelo usuário.
*   **Mitigação:**
    *   **Sanitização de Entradas:** Trate todas as entradas do usuário (de URLs, formulários, APIs) como não confiáveis. Antes de renderizar dados no HTML, escape caracteres especiais que têm significado em HTML (ex: `<`, `>`, `&`, `"`, `
Título da Tarefa: ${data.title}`;
    })
    .catch(error => {
        // Trata erros de rede ou erros lançados no .then() anterior
        console.error("Falha ao buscar dados:", error);
        // document.getElementById("output").textContent = `Erro: ${error.message}`;
    });

console.log("Requisição enviada...");
```

**Explicação:**

1.  **`fetch(apiUrl)`:** Inicia a requisição HTTP GET para a `apiUrl`. Retorna uma Promise.
2.  **Primeiro `.then(response => ...)`:** Quando a Promise do `fetch` resolve, esta função é chamada com o objeto `Response`.
    *   **`response.ok`:** Uma propriedade booleana que é `true` se o status HTTP da resposta estiver na faixa de sucesso (200-299).
    *   **`response.status`:** O código de status HTTP da resposta (ex: 200, 404, 500).
    *   **`response.statusText`:** A mensagem de status HTTP (ex: "OK", "Not Found").
    *   **`response.json()`:** Este método lê o corpo da resposta até o fim e o interpreta como JSON. Ele também retorna uma Promise, que resolve com o objeto JavaScript resultante do parse do JSON.
3.  **Segundo `.then(data => ...)`:** Quando a Promise de `response.json()` resolve, esta função é chamada com os dados parseados.
4.  **`.catch(error => ...)`:** Se qualquer uma das Promises na cadeia for rejeitada (por exemplo, erro de rede, `response.ok` for falso e lançarmos um erro, ou `response.json()` falhar ao parsear), o bloco `.catch()` será executado.

### 13.2.2 Usando Async/Await com Fetch

Como a Fetch API é baseada em Promises, podemos usar `async/await` para um código mais síncrono na aparência:

```javascript
async function buscarTarefa() {
    const apiUrl = "https://jsonplaceholder.typicode.com/todos/2";
    console.log("Enviando requisição com async/await...");
    try {
        const response = await fetch(apiUrl);
        console.log("Resposta recebida (async/await):", response);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Dados recebidos (async/await):", data);
        // document.getElementById("output-async").textContent = `Tarefa (async): ${data.title}`;
    } catch (error) {
        console.error("Falha ao buscar dados (async/await):", error);
        // document.getElementById("output-async").textContent = `Erro (async): ${error.message}`;
    }
}

buscarTarefa();
```

Esta abordagem com `async/await` é frequentemente preferida por sua legibilidade.

---

(Continua com Aula 13.3: Configurando Requisições Fetch (Métodos, Headers, Body), Aula 13.4: Lidando com Diferentes Tipos de Respostas, Aula 13.5: Tratamento de Erros em Requisições Fetch, Aula 13.6: Exemplo Prático - Consumindo uma API de Terceiros)

