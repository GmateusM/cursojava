## Aula 6.1: Funções de Ordem Superior (Higher-Order Functions - HOFs)

Nesta aula, vamos explorar um conceito fundamental em JavaScript e em muitas outras linguagens de programação: **Funções de Ordem Superior (Higher-Order Functions - HOFs)**. Uma HOF é uma função que opera em outras funções, seja recebendo-as como argumentos ou retornando-as como resultado.

### O que são Funções de Ordem Superior?

Em JavaScript, as funções são consideradas "cidadãos de primeira classe". Isso significa que elas podem ser tratadas como qualquer outro valor, como números, strings ou objetos. Elas podem ser:

*   **Atribuídas a variáveis:**
    ```javascript
    const saudacao = function() {
        console.log("Olá!");
    };
    saudacao(); // Saída: Olá!
    ```

*   **Passadas como argumentos para outras funções:**
    ```javascript
    function executarFuncao(fn) {
        fn();
    }
    executarFuncao(saudacao); // Saída: Olá!
    ```

*   **Retornadas como resultado de outras funções:**
    ```javascript
    function criarSaudacao(tipo) {
        if (tipo === "formal") {
            return function(nome) {
                console.log(`Prezado(a) ${nome},`);
            };
        } else {
            return function(nome) {
                console.log(`E aí, ${nome}!`);
            };
        }
    }

    const saudacaoFormal = criarSaudacao("formal");
    const saudacaoInformal = criarSaudacao("informal");

    saudacaoFormal("Dr. Silva"); // Saída: Prezado(a) Dr. Silva,
    saudacaoInformal("Bia");    // Saída: E aí, Bia!
    ```

**Uma função de ordem superior é simplesmente uma função que faz pelo menos uma das seguintes coisas:**

1.  **Recebe uma ou mais funções como argumentos.**
2.  **Retorna uma função como seu resultado.**

### Exemplos de HOFs em JavaScript

Muitas funções embutidas em JavaScript são HOFs, especialmente aquelas que operam em arrays. Vamos explorar alguns exemplos comuns:

#### 1. `Array.prototype.forEach()`

O método `forEach()` executa uma função de callback fornecida uma vez para cada elemento em um array.

```javascript
const numeros = [1, 2, 3, 4, 5];

// Usando uma função nomeada como callback
function imprimirElemento(elemento) {
    console.log(elemento);
}
numeros.forEach(imprimirElemento);

// Usando uma função anônima como callback
numeros.forEach(function(elemento) {
    console.log(elemento * 2); // Imprime o dobro de cada elemento
});

// Usando uma arrow function como callback (mais comum hoje em dia)
numeros.forEach(elemento => {
    console.log(elemento * elemento); // Imprime o quadrado de cada elemento
});
```

#### 2. `Array.prototype.map()`

O método `map()` cria um **novo array** populado com os resultados da chamada de uma função de callback fornecida em cada elemento do array original.

```javascript
const numerosOriginais = [1, 2, 3, 4, 5];

// Usando uma função nomeada
function dobrar(numero) {
    return numero * 2;
}
const numerosDobrados = numerosOriginais.map(dobrar);
console.log(numerosDobrados); // Saída: [2, 4, 6, 8, 10]

// Usando uma arrow function anônima
const numerosTriplicados = numerosOriginais.map(numero => numero * 3);
console.log(numerosTriplicados); // Saída: [3, 6, 9, 12, 15]
```

#### 3. `Array.prototype.filter()`

O método `filter()` cria um **novo array** com todos os elementos que passam no teste implementado pela função de callback fornecida. A função de callback deve retornar `true` para manter o elemento ou `false` para descartá-lo.

```javascript
const idades = [15, 22, 18, 30, 12, 45];

// Usando uma função nomeada
function eMaiorDeIdade(idade) {
    return idade >= 18;
}
const adultos = idades.filter(eMaiorDeIdade);
console.log(adultos); // Saída: [22, 18, 30, 45]

// Usando uma arrow function anônima
const criancas = idades.filter(idade => idade < 18);
console.log(criancas); // Saída: [15, 12]
```

#### 4. `Array.prototype.reduce()`

O método `reduce()` executa uma função "redutora" (callback) em cada elemento do array, resultando em um único valor de saída. A função redutora recebe quatro argumentos:

1.  `acumulador` (ou `previousValue`): O valor retornado pela última invocação da callback, ou o `valorInicial`, se fornecido.
2.  `valorAtual` (ou `currentValue`): O valor do elemento atual do array sendo processado.
3.  `indiceAtual` (opcional): O índice do elemento atual sendo processado no array.
4.  `arrayOriginal` (opcional): O array ao qual `reduce()` foi chamado.

**Sintaxe:**
`array.reduce(callbackFn(acumulador, valorAtual, indiceAtual, arrayOriginal), valorInicial)`

**Exemplo: Somar todos os números de um array**

```javascript
const numerosParaSoma = [1, 2, 3, 4, 5];

// Usando uma função nomeada como callback
function somar(acumulador, valorAtual) {
    return acumulador + valorAtual;
}
const somaTotal = numerosParaSoma.reduce(somar, 0); // 0 é o valorInicial do acumulador
console.log(somaTotal); // Saída: 15

// Usando uma arrow function anônima como callback
const produtoTotal = numerosParaSoma.reduce((acumulador, valorAtual) => acumulador * valorAtual, 1);
console.log(produtoTotal); // Saída: 120 (1 * 2 * 3 * 4 * 5)
```

### Por que usar Funções de Ordem Superior?

*   **Abstração:** Elas permitem que você escreva código mais abstrato e genérico. Em vez de escrever loops `for` repetidamente, você pode usar métodos como `map`, `filter`, e `reduce` que encapsulam a lógica de iteração.
*   **Reusabilidade:** Funções que aceitam outras funções como argumentos podem ser reutilizadas em muitos contextos diferentes com diferentes comportamentos.
*   **Composição:** HOFs podem ser combinadas para criar funcionalidades complexas de forma elegante e concisa.
*   **Legibilidade:** Quando usadas corretamente, HOFs podem tornar o código mais fácil de ler e entender, pois expressam a intenção de forma mais clara (ex: "mapear esta coleção para uma nova coleção" em vez de "iterar sobre esta coleção e fazer algo em cada item para construir uma nova coleção").

### Criando suas Próprias Funções de Ordem Superior

Você não está limitado a usar apenas as HOFs embutidas. Você pode criar suas próprias funções que aceitam ou retornam outras funções. Isso é uma técnica poderosa para criar código modular e flexível.

**Exemplo: Uma função `maiorQue` que retorna uma função de teste:**

```javascript
function maiorQue(n) {
    return function(m) {
        return m > n;
    };
}

const maiorQue10 = maiorQue(10);
const maiorQue20 = maiorQue(20);

console.log(maiorQue10(12)); // Saída: true
console.log(maiorQue10(8));  // Saída: false
console.log(maiorQue20(12)); // Saída: false
console.log(maiorQue20(22)); // Saída: true
```

Neste exemplo, `maiorQue` é uma HOF porque retorna uma função. A função retornada "lembra" do valor de `n` através de uma closure.

### Conclusão

Funções de ordem superior são um conceito fundamental em JavaScript e em muitas outras linguagens de programação. Elas permitem escrever código mais abstrato, reutilizável e expressivo. Dominar o uso de HOFs, juntamente com o entendimento de como `this` funciona em diferentes contextos, é crucial para se tornar um desenvolvedor JavaScript mais eficaz e versátil.
