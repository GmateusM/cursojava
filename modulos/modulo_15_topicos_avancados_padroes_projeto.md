# Módulo 15: Tópicos Avançados e Padrões de Projeto em JavaScript

**Carga horária estimada:** 10 horas

## Objetivo do Módulo

Este módulo visa aprofundar o conhecimento dos alunos em conceitos avançados de JavaScript e introduzir a importância dos padrões de projeto (Design Patterns) no desenvolvimento de software robusto, escalável e de fácil manutenção. Serão abordados tópicos como closures, hoisting, escopo léxico, o `this` em diferentes contextos, e padrões de projeto comuns como Module, Singleton, Factory, Observer e Promise (revisão e aprofundamento).

---

## Aula 15.1: Revisão Aprofundada de Escopo e Closures

**Objetivo de Aprendizado:** Solidificar a compreensão sobre escopo (global, função, bloco), escopo léxico e o funcionamento e utilidade das closures em JavaScript.

### 15.1.1 Escopo em JavaScript

Revisaremos os diferentes tipos de escopo:

*   **Escopo Global:** Variáveis declaradas fora de qualquer função ou bloco são globais e acessíveis de qualquer parte do código.
*   **Escopo de Função:** Variáveis declaradas com `var` dentro de uma função são acessíveis apenas dentro dessa função (e em funções aninhadas).
*   **Escopo de Bloco (ES6+):** Variáveis declaradas com `let` e `const` dentro de um bloco (`{}`) são acessíveis apenas dentro desse bloco.

```javascript
let globalVar = "Sou global";

function minhaFuncao() {
    var funcaoVar = "Sou da função";
    let blocoVarFora = "Fora do if, dentro da função";

    if (true) {
        let blocoVarDentro = "Dentro do if";
        const constanteBloco = "Constante no bloco";
        console.log(globalVar); // Acessível
        console.log(funcaoVar); // Acessível
        console.log(blocoVarFora); // Acessível
        console.log(blocoVarDentro); // Acessível
    }

    // console.log(blocoVarDentro); // Erro: blocoVarDentro is not defined
    // console.log(constanteBloco); // Erro: constanteBloco is not defined
}

minhaFuncao();
// console.log(funcaoVar); // Erro: funcaoVar is not defined
```

### 15.1.2 Escopo Léxico (Estático)

JavaScript usa escopo léxico, o que significa que o escopo de uma variável é determinado pela sua localização no código fonte no momento da compilação (ou interpretação inicial), e não por onde a função é chamada (escopo dinâmico).

Uma função aninhada tem acesso às variáveis de sua função externa (pai), mesmo após a função pai ter retornado. Isso é fundamental para o conceito de closure.

### 15.1.3 Closures

Uma closure é a combinação de uma função com as referências ao seu estado circundante (o ambiente léxico). Em outras palavras, uma closure dá acesso ao escopo de uma função externa a partir de uma função interna, mesmo após a função externa ter sido executada e retornado.

**Exemplo Clássico:**

```javascript
function criarContador() {
    let contagem = 0; // Esta variável é "fechada" (closed over) pela função interna

    return function incrementar() {
        contagem++;
        console.log(contagem);
        return contagem;
    };
}

const contador1 = criarContador(); // contador1 é a função incrementar com acesso a 'contagem' de criarContador
contador1(); // Saída: 1
contador1(); // Saída: 2

const contador2 = criarContador(); // contador2 tem sua própria 'contagem' independente
contador2(); // Saída: 1

// A variável 'contagem' não é acessível diretamente de fora:
// console.log(contagem); // Erro: contagem is not defined
```

**Utilidades das Closures:**

*   **Privacidade de Dados (Emulação de Variáveis Privadas):** Como no exemplo do contador, a variável `contagem` não pode ser acessada ou modificada diretamente de fora da função `criarContador`, apenas através da função `incrementar` que foi retornada. Isso ajuda a criar membros "privados".
*   **Funções de Fábrica (Factory Functions) e Módulos:** Usadas para criar objetos com métodos que mantêm estado privado.
*   **Callbacks e Manipuladores de Eventos:** Permitem que callbacks acessem variáveis do escopo onde foram definidos, mesmo quando executados posteriormente.
*   **Currying e Aplicação Parcial de Funções:** Facilitam a criação de funções especializadas.

**Exemplo com Callback:**

```javascript
function configurarBotao(mensagem) {
    const botao = document.getElementById("meuBotao");
    if (botao) {
        botao.addEventListener("click", function() {
            // Esta função de callback é uma closure.
            // Ela tem acesso à variável 'mensagem' do escopo de configurarBotao,
            // mesmo que configurarBotao já tenha terminado sua execução.
            alert(mensagem);
        });
    }
}

configurarBotao("Botão clicado com sucesso!");
```

---

## Aula 15.2: Hoisting e o Comportamento do `this`

**Objetivo de Aprendizado:** Entender o conceito de hoisting em JavaScript e como o valor da palavra-chave `this` é determinado em diferentes contextos de execução.

### 15.2.1 Hoisting (Içamento)

Hoisting é um comportamento do JavaScript onde as declarações de variáveis e funções são "movidas" para o topo do seu escopo contendo (global ou de função) antes da execução do código. É importante notar que apenas a declaração é içada, não a inicialização ou atribuição.

*   **Declarações de `var`:** São içadas e inicializadas com `undefined`.
    ```javascript
    console.log(minhaVar); // Saída: undefined (devido ao hoisting da declaração)
    var minhaVar = 10;
    console.log(minhaVar); // Saída: 10
    ```
*   **Declarações de `let` e `const`:** São içadas, mas não são inicializadas. Acessá-las antes da declaração resulta em um `ReferenceError`. A região entre o início do bloco e a declaração é chamada de "Temporal Dead Zone" (TDZ).
    ```javascript
    // console.log(minhaLet); // ReferenceError: Cannot access 'minhaLet' before initialization (TDZ)
    let minhaLet = 20;
    console.log(minhaLet); // Saída: 20
    ```
*   **Declarações de Função (Function Declarations):** São completamente içadas, incluindo o corpo da função. Isso significa que você pode chamar uma função declarada dessa forma antes de sua definição no código.
    ```javascript
    saudacao(); // Saída: Olá!

    function saudacao() {
        console.log("Olá!");
    }
    ```
*   **Expressões de Função (Function Expressions) e Arrow Functions:** Se atribuídas a variáveis (`var`, `let`, `const`), o comportamento de hoisting da variável se aplica. A função em si não é içada.
    ```javascript
    // minhaExpressaoDeFuncao(); // TypeError: minhaExpressaoDeFuncao is not a function (se var)
                               // ReferenceError (se let/const)

    var minhaExpressaoDeFuncao = function() {
        console.log("Sou uma expressão de função!");
    };
    minhaExpressaoDeFuncao();
    ```

**Boas Práticas:** Para evitar confusão com hoisting, declare todas as variáveis no topo de seus escopos e prefira `let` e `const` em vez de `var`.

### 15.2.2 A Palavra-chave `this`

O valor de `this` em JavaScript é determinado por como uma função é chamada (contexto de invocação). Seu comportamento pode ser uma fonte comum de confusão.

1.  **Contexto Global:**
    *   Fora de qualquer função, `this` refere-se ao objeto global (`window` em navegadores, `global` no Node.js em modo não-estrito).
    *   Em modo estrito (`"use strict";`), `this` no contexto global é `undefined`.

2.  **Funções Regulares (Invocação Direta):**
    *   Quando uma função regular é chamada diretamente (não como um método de um objeto), `this` também se refere ao objeto global (`window`) em modo não-estrito.
    *   Em modo estrito, `this` será `undefined`.
    ```javascript
    function mostrarThisGlobal() {
        console.log(this); // window (não-estrito), undefined (estrito)
    }
    mostrarThisGlobal();
    ```

3.  **Métodos de Objeto:**
    *   Quando uma função é chamada como um método de um objeto, `this` refere-se ao objeto que "possui" o método (o objeto à esquerda do ponto).
    ```javascript
    const pessoa = {
        nome: "Ana",
        saudar: function() {
            console.log(`Olá, meu nome é ${this.nome}.`); // this refere-se a 'pessoa'
        }
    };
    pessoa.saudar(); // Saída: Olá, meu nome é Ana.
    ```

4.  **Funções Construtoras (com `new`):**
    *   Quando uma função é usada como construtora (chamada com a palavra-chave `new`), `this` refere-se à nova instância do objeto que está sendo criada.
    ```javascript
    function Carro(marca) {
        this.marca = marca; // this refere-se à nova instância de Carro
        // implicitamente retorna this
    }
    const meuCarro = new Carro("Ford");
    console.log(meuCarro.marca); // Saída: Ford
    ```

5.  **Manipuladores de Eventos (DOM):**
    *   Em um manipulador de evento DOM (adicionado via `addEventListener` ou atributos HTML `on<evento>`), `this` geralmente se refere ao elemento DOM que disparou o evento.
    ```javascript
    // <button id="meuBotaoDOM">Clique Aqui</button>
    const botaoDOM = document.getElementById("meuBotaoDOM");
    if (botaoDOM) {
        botaoDOM.addEventListener("click", function() {
            console.log(this); // Referencia o elemento <button>
            this.textContent = "Clicado!";
        });
    }
    ```

6.  **Arrow Functions (`=>`):**
    *   Arrow functions **não têm seu próprio `this`**. Elas herdam o valor de `this` do escopo léxico em que foram definidas (o `this` da função ou escopo circundante).
    *   Isso as torna muito úteis para callbacks e métodos onde você quer preservar o `this` do contexto externo.
    ```javascript
    const equipe = {
        nome: "Desenvolvedores",
        membros: ["Alice", "Bob", "Carlos"],
        listarMembros: function() {
            console.log(`Equipe: ${this.nome}`); // this é 'equipe'
            this.membros.forEach(membro => {
                // Dentro da arrow function, 'this' ainda é 'equipe'
                console.log(`${membro} faz parte da equipe ${this.nome}`);
            });
        }
    };
    equipe.listarMembros();
    ```
    Se usássemos uma função regular no `forEach`, seu `this` seria `window` (ou `undefined` em modo estrito) por padrão.

7.  **Métodos `call()`, `apply()`, e `bind()`:**
    *   Esses métodos permitem que você defina explicitamente o valor de `this` ao chamar uma função.
    *   `funcao.call(objetoThis, arg1, arg2, ...)`: Chama a função com `this` definido como `objetoThis` e argumentos passados individualmente.
    *   `funcao.apply(objetoThis, [arg1, arg2, ...])`: Similar ao `call`, mas os argumentos são passados como um array.
    *   `funcao.bind(objetoThis)`: Cria uma nova função que, quando chamada, terá seu `this` permanentemente vinculado a `objetoThis`. Os argumentos podem ser pré-definidos também.

    ```javascript
    function apresentar(cidade, pais) {
        console.log(`Olá, sou ${this.nome} de ${cidade}, ${pais}.`);
    }
    const dev = { nome: "Bruno" };

    apresentar.call(dev, "São Paulo", "Brasil"); // this é 'dev'
    apresentar.apply(dev, ["Rio de Janeiro", "Brasil"]); // this é 'dev'

    const apresentarBruno = apresentar.bind(dev, "Curitiba"); // this é 'dev', cidade é 'Curitiba'
    apresentarBruno("Brasil");
    ```

Compreender `this` é crucial para escrever JavaScript eficaz, especialmente em programação orientada a objetos e ao lidar com frameworks e bibliotecas.

---

## Aula 15.3: Introdução aos Padrões de Projeto (Design Patterns)

**Objetivo de Aprendizado:** Entender o que são padrões de projeto, por que são importantes e como podem ajudar a resolver problemas comuns de design de software em JavaScript.

### 15.3.1 O que são Padrões de Projeto?

Padrões de projeto (Design Patterns) são soluções testadas e comprovadas para problemas recorrentes no design de software orientado a objetos (e também aplicáveis em outros paradigmas). Eles não são algoritmos específicos ou código pronto, mas sim descrições ou modelos de como estruturar componentes de software para resolver um problema de design geral em um contexto particular.

Eles foram popularizados pelo livro "Design Patterns: Elements of Reusable Object-Oriented Software" (1994) pelo "Gang of Four" (GoF): Erich Gamma, Richard Helm, Ralph Johnson e John Vlissides.

### 15.3.2 Por que Usar Padrões de Projeto?

*   **Soluções Comprovadas:** Oferecem soluções que foram testadas e refinadas ao longo do tempo por muitos desenvolvedores.
*   **Vocabulário Comum:** Fornecem um vocabulário compartilhado entre desenvolvedores, facilitando a comunicação sobre design de software.
*   **Reusabilidade:** Promovem a criação de código mais reutilizável e flexível.
*   **Manutenibilidade:** Ajudam a criar sistemas mais fáceis de entender, modificar e manter.
*   **Evitar Reinventar a Roda:** Permitem que você se concentre nos aspectos únicos do seu problema, em vez de gastar tempo resolvendo problemas de design já conhecidos.
*   **Melhoria da Qualidade do Código:** Conduzem a um design de software mais elegante e robusto.

### 15.3.3 Categorias de Padrões de Projeto (GoF)

Os padrões GoF são geralmente classificados em três categorias principais:

1.  **Padrões Criacionais (Creational Patterns):**
    *   Lidam com os mecanismos de criação de objetos, tentando criar objetos de uma maneira adequada à situação.
    *   Exemplos: Singleton, Factory Method, Abstract Factory, Builder, Prototype.

2.  **Padrões Estruturais (Structural Patterns):**
    *   Lidam com a composição de classes e objetos para formar estruturas maiores.
    *   Exemplos: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy.

3.  **Padrões Comportamentais (Behavioral Patterns):**
    *   Lidam com algoritmos e a atribuição de responsabilidades entre objetos, focando na comunicação entre eles.
    *   Exemplos: Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor.

### 15.3.4 Padrões de Projeto em JavaScript

Embora os padrões GoF tenham sido originalmente descritos no contexto de linguagens como C++ e Smalltalk, muitos deles são altamente relevantes e adaptáveis para JavaScript, mesmo com suas características dinâmicas e baseadas em protótipos.

JavaScript também tem seus próprios "idiomas" e padrões que surgiram devido à natureza da linguagem, como o padrão Module.

Nas próximas aulas, exploraremos alguns dos padrões mais úteis e comumente usados no desenvolvimento JavaScript.

---

## Aula 15.4: Padrão Module e IIFE

**Objetivo de Aprendizado:** Aprender sobre o Padrão Module para organizar e encapsular código, utilizando Immediately Invoked Function Expressions (IIFE) para criar escopo privado.

O Padrão Module é um dos padrões mais comuns e fundamentais em JavaScript para criar código bem organizado, encapsulado e com escopo privado. Ele ajuda a evitar a poluição do escopo global e a criar "membros" públicos e privados.

### 15.4.1 Immediately Invoked Function Expressions (IIFE)

Uma IIFE é uma função JavaScript que é executada assim que é definida. A principal razão para usar IIFEs é criar um novo escopo para evitar a poluição do escopo global e para encapsular variáveis.

Sintaxe:

```javascript
(function() {
    // Código aqui dentro tem seu próprio escopo
    var variavelLocal = "Sou local da IIFE";
    console.log(variavelLocal);
})();

// variavelLocal não é acessível aqui fora
// console.log(variavelLocal); // Erro
```

Ou com arrow function (ES6+):

```javascript
(() => {
    let variavelLocalArrow = "Sou local da IIFE com arrow";
    console.log(variavelLocalArrow);
})();
```

### 15.4.2 O Padrão Module Básico

O Padrão Module usa uma IIFE para criar um escopo privado e retorna um objeto que expõe apenas as partes que devem ser públicas.

```javascript
const meuModulo = (function() {
    // Membros privados
    let contadorPrivado = 0;
    const nomePrivado = "Módulo Secreto";

    function metodoPrivado() {
        console.log(`Executando método privado com contador: ${contadorPrivado}`);
    }

    // Interface pública (o que é retornado)
    return {
        nomePublico: nomePrivado, // Pode expor valores privados
        increme
(Content truncated due to size limit. Use line ranges to read in chunks)