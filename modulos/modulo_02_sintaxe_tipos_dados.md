# Módulo 02: Sintaxe Básica e Tipos de Dados

**Carga horária estimada:** 6 horas

## Objetivo do Módulo

Introduzir os fundamentos da sintaxe do JavaScript, incluindo variáveis, constantes, tipos de dados primitivos, a diferença entre `null` e `undefined`, e a natureza da tipagem dinâmica da linguagem. Ao final deste módulo, você será capaz de declarar variáveis, entender os diferentes tipos de dados básicos e como o JavaScript lida com eles.

---

## Aula 2.1: Variáveis e Constantes

**Objetivo de Aprendizado:** Aprender a declarar e utilizar variáveis e constantes corretamente, compreendendo as diferenças entre `var`, `let` e `const` e as boas práticas de nomeação.

Em programação, uma **variável** é um contêiner nomeado que armazena um valor. Esse valor pode mudar durante a execução do programa. Uma **constante**, por outro lado, também é um contêiner nomeado, mas seu valor, uma vez atribuído, não pode ser alterado.

### 2.1.1 Declaração de Variáveis: `var`, `let` e `const`

JavaScript oferece três palavras-chave para declarar variáveis e constantes:

*   **`var` (Variável - legada):** Era a única forma de declarar variáveis nas versões mais antigas do JavaScript (antes do ES6/2015). Embora ainda funcione, seu uso é geralmente desencorajado em código moderno devido a algumas particularidades de escopo (function scope) e hoisting que podem levar a comportamentos inesperados. Falaremos mais sobre escopo e hoisting em breve.
    ```javascript
    var idade = 30;
    var nome = "Maria";
    console.log(nome + " tem " + idade + " anos."); // Saída: Maria tem 30 anos.
    idade = 31; // O valor de 'idade' pode ser alterado
    console.log(nome + " agora tem " + idade + " anos."); // Saída: Maria agora tem 31 anos.
    ```

*   **`let` (Variável - moderna):** Introduzida no ES6, `let` permite declarar variáveis cujo valor pode ser reatribuído. `let` tem escopo de bloco (`{}`), o que significa que a variável só é acessível dentro do bloco de código onde foi declarada. Isso ajuda a evitar muitos dos problemas associados ao `var`.
    ```javascript
    let pontuacao = 100;
    console.log("Pontuação inicial: " + pontuacao); // Saída: Pontuação inicial: 100
    pontuacao = 150; // O valor pode ser alterado
    console.log("Nova pontuação: " + pontuacao); // Saída: Nova pontuação: 150

    if (true) {
        let bonus = 50;
        console.log("Bônus dentro do bloco: " + bonus); // Saída: Bônus dentro do bloco: 50
    }
    // console.log(bonus); // Erro! 'bonus' não está definido fora do bloco if
    ```

*   **`const` (Constante - moderna):** Também introduzida no ES6, `const` é usada para declarar "constantes", ou seja, variáveis cujo valor não pode ser reatribuído após a inicialização. Assim como `let`, `const` também tem escopo de bloco. É uma boa prática usar `const` sempre que você souber que o valor de uma variável não deve mudar, pois isso torna seu código mais seguro e fácil de entender.
    ```javascript
    const PI = 3.14159;
    console.log("O valor de PI é: " + PI); // Saída: O valor de PI é: 3.14159

    // PI = 3.14; // Erro! TypeError: Assignment to constant variable.

    const configuracoes = { tema: "escuro", fonte: "Arial" };
    console.log(configuracoes.tema); // Saída: escuro

    // Importante: para objetos e arrays declarados com const,
    // o conteúdo do objeto/array PODE ser modificado, mas a variável
    // não pode ser reatribuída para apontar para um novo objeto/array.
    configuracoes.tema = "claro"; // Isso é permitido!
    console.log(configuracoes.tema); // Saída: claro

    // configuracoes = { novoTema: "azul" }; // Erro! Não pode reatribuir a constante 'configuracoes'.
    ```
    No caso de objetos e arrays declarados com `const`, a referência àquele objeto ou array é constante, mas as propriedades do objeto ou os elementos do array podem ser alterados.

### 2.1.2 Diferenças Chave: `var` vs. `let`/`const`

1.  **Escopo:**
    *   `var`: Tem escopo de função (ou escopo global se declarado fora de qualquer função). Isso significa que uma variável `var` é acessível em qualquer lugar dentro da função onde foi declarada, independentemente dos blocos (`{}`) internos.
    *   `let` e `const`: Têm escopo de bloco. São acessíveis apenas dentro do bloco de código (delimitado por `{}`) onde foram declaradas.

    ```javascript
    function testeEscopoVar() {
        if (true) {
            var x = 10;
        }
        console.log(x); // 10 (x é acessível aqui devido ao escopo de função do var)
    }
    testeEscopoVar();

    function testeEscopoLet() {
        if (true) {
            let y = 20;
        }
        // console.log(y); // Erro! y não está definido fora do bloco if
    }
    // testeEscopoLet();
    ```

2.  **Hoisting (Içamento):**
    *   `var`: Declarações de variáveis com `var` são "içadas" (hoisted) para o topo de seu escopo (função ou global) durante a fase de compilação. Isso significa que você pode usar uma variável `var` antes de sua declaração no código, e ela terá o valor `undefined`. Apenas a declaração é içada, não a atribuição.
    *   `let` e `const`: Também são içadas, mas não são inicializadas. Acessá-las antes da declaração resulta em um `ReferenceError`. Essa janela entre o início do bloco e a declaração da variável é chamada de "Temporal Dead Zone" (TDZ).

    ```javascript
    console.log(minhaVar); // undefined (devido ao hoisting da declaração de var)
    var minhaVar = "Olá";
    console.log(minhaVar); // Olá

    // console.log(minhaLet); // ReferenceError: Cannot access 'minhaLet' before initialization (TDZ)
    let minhaLet = "Mundo";
    console.log(minhaLet); // Mundo
    ```

3.  **Redeclaração:**
    *   `var`: Permite redeclarar a mesma variável no mesmo escopo sem erros.
    *   `let` e `const`: Não permitem redeclarar a mesma variável no mesmo escopo. Isso ajuda a evitar erros acidentais.

    ```javascript
    var a = 1;
    var a = 2; // Permitido, 'a' agora é 2
    console.log(a); // 2

    let b = 3;
    // let b = 4; // Erro! SyntaxError: Identifier 'b' has already been declared
    ```

4.  **Criação de Propriedade no Objeto Global:**
    *   `var`: Quando `var` é usado no escopo global (fora de qualquer função), ele cria uma propriedade no objeto global (`window` em navegadores, `global` em Node.js).
    *   `let` e `const`: Não criam propriedades no objeto global quando declaradas no escopo global.

    ```javascript
    // No navegador:
    var globalVar = "Sou global com var";
    let globalLet = "Sou global com let";

    console.log(window.globalVar); // "Sou global com var"
    console.log(window.globalLet); // undefined
    ```

**Recomendação:** Em código JavaScript moderno, prefira `let` e `const` em vez de `var`. Use `const` por padrão, a menos que você saiba que a variável precisará ser reatribuída; nesse caso, use `let`.

### 2.1.3 Boas Práticas para Nomeação de Variáveis

Escolher nomes significativos para suas variáveis é crucial para escrever código legível e fácil de manter.

*   **Use Nomes Descritivos:** O nome da variável deve indicar claramente o que ela representa.
    ```javascript
    // Ruim
    let x = "João Silva";
    let d = new Date();

    // Bom
    let nomeCompleto = "João Silva";
    let dataAtual = new Date();
    ```

*   **Use camelCase:** Esta é a convenção mais comum em JavaScript para nomes de variáveis e funções. Comece com uma letra minúscula e capitalize a primeira letra de cada palavra subsequente.
    ```javascript
    let nomeDeUsuario;       // Bom
    let idadeDoCliente;      // Bom
    let taxRate;             // Bom (para abreviações comuns como Taxa de Imposto)
    // let nomedeusuario;    // Ruim (difícil de ler)
    // let NomeDeUsuario;    // Ruim (geralmente usado para nomes de Classes/Construtores)
    ```

*   **Evite Nomes Muito Curtos ou Genéricos (a menos que o contexto seja óbvio):** Nomes como `a`, `b`, `x`, `temp` geralmente não são descritivos, a menos que sejam usados em contextos muito pequenos e claros (como contadores em loops curtos: `for (let i = 0; ...)`).

*   **Seja Consistente:** Use o mesmo estilo de nomeação em todo o seu projeto.

*   **Nomes de Constantes:** Para constantes que representam valores fixos e imutáveis (como PI, ou uma URL base), é comum usar letras maiúsculas com palavras separadas por underscores (SNAKE_CASE).
    ```javascript
    const PI = 3.14159;
    const MAX_USUARIOS = 100;
    const URL_API = "https://api.example.com";
    ```

*   **Palavras Reservadas:** Você não pode usar palavras reservadas do JavaScript (como `let`, `const`, `var`, `function`, `if`, `else`, `for`, `while`, `class`, etc.) como nomes de variáveis.

Seguir essas diretrizes ajudará a tornar seu código mais profissional e colaborativo.

---

## Aula 2.2: Tipos de Dados Primitivos

**Objetivo de Aprendizado:** Conhecer e manipular os tipos de dados primitivos do JavaScript: `String`, `Number` e `Boolean`.

JavaScript possui vários tipos de dados. Eles são geralmente divididos em **tipos primitivos** e **tipos de objeto** (ou tipos de referência). Nesta aula, focaremos nos três tipos primitivos mais comuns.

Um **tipo de dado primitivo** é um dado que não é um objeto e não possui métodos. Todos os primitivos são **imutáveis**, o que significa que seus valores não podem ser alterados diretamente uma vez criados. Quando você "muda" o valor de uma variável primitiva, você está, na verdade, atribuindo um novo valor primitivo a ela.

### 2.2.1 `String` (Texto)

O tipo `String` é usado para representar dados textuais. Strings são sequências de caracteres.

*   **Criação:** Strings podem ser criadas usando aspas simples (`'...'`), aspas duplas (`"..."`) ou crases (`` `...` `` - também chamadas de template literals).
    ```javascript
    let nome = "Alice";
    let saudacao = 'Olá, mundo!';
    let frase = `JavaScript é divertido.`;

    console.log(nome);      // Saída: Alice
    console.log(saudacao);  // Saída: Olá, mundo!
    console.log(frase);     // Saída: JavaScript é divertido.
    ```
    A escolha entre aspas simples e duplas é geralmente uma questão de preferência ou convenção de equipe. Crases oferecem funcionalidades adicionais.

*   **Caracteres Especiais:** Você pode incluir caracteres especiais em strings usando uma barra invertida (`\`) como caractere de escape:
    *   `\'` para aspa simples dentro de uma string delimitada por aspas simples.
    *   `\"` para aspa dupla dentro de uma string delimitada por aspas duplas.
    *   `\\` para uma barra invertida literal.
    *   `\n` para nova linha.
    *   `\t` para tabulação.
    ```javascript
    let citacao1 = 'Ele disse: "Olá!".';
    let citacao2 = "Ela respondeu: 'Oi!'.";
    let caminho = "C:\\Program Files\\MeuApp";
    let multilinha = "Linha 1\nLinha 2";
    console.log(citacao1);    // Saída: Ele disse: 

Olá!".
    console.log(citacao2);    // Saída: Ela respondeu: 'Oi!'.
    console.log(caminho);     // Saída: C:\Program Files\MeuApp
    console.log(multilinha);  // Saída:
                              // Linha 1
                              // Linha 2
    ```

*   **Template Literals (Template Strings):** Introduzidas no ES6, as template literals usam crases (`` ` ``) e oferecem duas vantagens principais:
    *   **Interpolação de Expressões:** Você pode embutir expressões JavaScript diretamente dentro da string usando `${expression}`.
    *   **Strings Multilinha:** Permitem criar strings que abrangem várias linhas sem a necessidade de `\n`.
    ```javascript
    let nomeDoUsuario = "Alice";
    let idadeDoUsuario = 30;
    let mensagemDeBoasVindas = `Olá, ${nomeDoUsuario}! Você tem ${idadeDoUsuario} anos.`;
    console.log(mensagemDeBoasVindas); // Saída: Olá, Alice! Você tem 30 anos.

    let poema = `Esta é a primeira linha.
    E esta é a segunda linha.
        Com um pouco de indentação.`;
    console.log(poema);
    ```

*   **Propriedades e Métodos Comuns de String:** Strings em JavaScript, embora primitivas, se comportam como objetos quando você tenta acessar propriedades ou chamar métodos nelas (graças ao boxing do JavaScript). Alguns exemplos comuns incluem:
    *   `length`: Retorna o número de caracteres na string.
    *   `toUpperCase()`, `toLowerCase()`: Convertem a string para maiúsculas ou minúsculas.
    *   `indexOf()`, `lastIndexOf()`: Encontram a primeira ou última ocorrência de uma substring.
    *   `slice()`: Extrai uma parte da string.
    *   `replace()`: Substitui uma substring por outra.
    *   `split()`: Divide a string em um array de substrings.
    ```javascript
    let texto = "JavaScript é poderoso";
    console.log(texto.length);         // Saída: 20
    console.log(texto.toUpperCase());  // Saída: JAVASCRIPT É PODEROSO
    console.log(texto.indexOf("poderoso")); // Saída: 13
    console.log(texto.slice(0, 10));   // Saída: JavaScript
    ```

### 2.2.2 `Number` (Número)

O tipo `Number` em JavaScript é usado para representar tanto números inteiros quanto números de ponto flutuante (decimais). JavaScript usa o padrão IEEE 754 para números de ponto flutuante de precisão dupla.

*   **Inteiros e Decimais:**
    ```javascript
    let quantidade = 10;          // Inteiro
    let preco = 19.99;          // Ponto flutuante
    let temperatura = -5.5;     // Negativo
    ```

*   **Valores Numéricos Especiais:**
    *   `Infinity`: Representa o infinito matemático (positivo ou negativo).
    *   `NaN` (Not a Number): Representa um valor que não é um número legal. Geralmente resulta de operações matemáticas inválidas, como dividir por zero ou tentar converter uma string não numérica para um número.
    ```javascript
    console.log(1 / 0);          // Saída: Infinity
    console.log("abc" / 2);      // Saída: NaN
    console.log(typeof NaN);     // Saída: "number" (surpreendentemente!)
    ```
    É importante notar que `NaN` é o único valor em JavaScript que não é igual a si mesmo (`NaN === NaN` é `false`). Para verificar se um valor é `NaN`, use a função `isNaN()`.

*   **Operações Aritméticas:** JavaScript suporta as operações aritméticas padrão: adição (`+`), subtração (`-`), multiplicação (`*`), divisão (`/`), e módulo (`%`).

*   **Objeto `Math`:** Para operações matemáticas mais avançadas, JavaScript fornece o objeto `Math` embutido, que possui muitas propriedades e métodos úteis:
    *   `Math.PI`: O valor de Pi (π).
    *   `Math.round()`: Arredonda para o inteiro mais próximo.
    *   `Math.floor()`: Arredonda para baixo.
    *   `Math.ceil()`: Arredonda para cima.
    *   `Math.random()`: Gera um número pseudoaleatório entre 0 (inclusivo) e 1 (exclusivo).
    *   `Math.max()`, `Math.min()`: Encontram o maior ou menor valor de uma lista de números.
    ```javascript
    console.log(Math.PI);          // Saída: 3.141592653589793
    console.log(Math.round(4.7));  // Saída: 5
    console.log(Math.floor(4.7));  // Saída: 4
    console.log(Math.ceil(4.2));   // Saída: 5
    console.log(Math.random());    // Saída: um número aleatório como 0.123456789
    ```

### 2.2.3 `Boolean` (Booleano)

O tipo `Boolean` representa um valor lógico e pode ter apenas dois valores: `true` (verdadeiro) ou `false` (falso).

*   **Uso em Condicionais:** Booleanos são fundamentais para estruturas de controle como `if` e loops `while`.
    ```javascript
    let isAtivo = true;
    let temPermissao = false;

    if (isAtivo) {
        console.log("Usuário está ativo.");
    } else {
        console.log("Usuário está inativo.");
    }
    ```

*   **Valores Truthy e Falsy:** Em JavaScript, valores que não são explicitamente `true` ou `false` podem ser avaliados em um contexto booleano. Alguns valores são considerados "falsy" (avaliam como `false`), enquanto todos os outros são "truthy" (avaliam como `true`).
    *   **Valores Falsy:**
        *   `false`
        *   `0` (zero)
        *   `-0` (zero negativo)
        *   `0n` (BigInt zero)
        *   `""` (string vazia)
        *   `null`
        *   `undefined`
        *   `NaN`
    *   **Exemplos de Valores Truthy:*
(Content truncated due to size limit. Use line ranges to read in chunks)