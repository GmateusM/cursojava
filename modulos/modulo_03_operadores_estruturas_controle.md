# Módulo 03: Operadores e Estruturas de Controle

**Carga horária estimada:** 8 horas

## Objetivo do Módulo

Ensinar os diferentes tipos de operadores em JavaScript e como utilizar estruturas de controle de fluxo (condicionais e loops) para tomar decisões e repetir tarefas. Ao final deste módulo, você será capaz de realizar cálculos, comparações, combinar condições lógicas e controlar o fluxo de execução do seu código de forma eficaz.

---

## Aula 3.1: Operadores Aritméticos

**Objetivo de Aprendizado:** Utilizar operadores aritméticos para realizar cálculos matemáticos básicos e entender a ordem de precedência.

Operadores aritméticos são usados para realizar cálculos com números.

*   **Adição (`+`):** Soma dois números.
    ```javascript
    let soma = 10 + 5; // soma é 15
    console.log("10 + 5 = " + soma);
    ```
*   **Subtração (`-`):** Subtrai o segundo número do primeiro.
    ```javascript
    let diferenca = 10 - 5; // diferenca é 5
    console.log("10 - 5 = " + diferenca);
    ```
*   **Multiplicação (`*`):** Multiplica dois números.
    ```javascript
    let produto = 10 * 5; // produto é 50
    console.log("10 * 5 = " + produto);
    ```
*   **Divisão (`/`):** Divide o primeiro número pelo segundo.
    ```javascript
    let quociente = 10 / 5; // quociente é 2
    console.log("10 / 5 = " + quociente);
    let resultadoDivisaoPorZero = 10 / 0;
    console.log("10 / 0 = " + resultadoDivisaoPorZero); // Infinity
    ```
*   **Módulo (`%`) (Resto da Divisão):** Retorna o resto da divisão inteira do primeiro número pelo segundo.
    ```javascript
    let resto = 10 % 3; // resto é 1 (10 dividido por 3 é 3 com resto 1)
    console.log("10 % 3 = " + resto);
    console.log("12 % 2 = " + (12 % 2)); // 0 (12 é par)
    console.log("13 % 2 = " + (13 % 2)); // 1 (13 é ímpar)
    ```
*   **Incremento (`++`):** Aumenta o valor de uma variável numérica em 1. Pode ser pré-fixado (`++variavel`) ou pós-fixado (`variavel++`).
    *   **Pós-fixado (`variavel++`):** Retorna o valor original da variável *antes* de incrementá-la.
    *   **Pré-fixado (`++variavel`):** Incrementa a variável *antes* de retornar seu valor.
    ```javascript
    let contadorA = 5;
    console.log("Contador A (pós-incremento na expressão): " + contadorA++); // Exibe 5, depois contadorA vira 6
    console.log("Contador A (após expressão): " + contadorA); // Exibe 6

    let contadorB = 5;
    console.log("Contador B (pré-incremento na expressão): " + ++contadorB); // contadorB vira 6, depois exibe 6
    console.log("Contador B (após expressão): " + contadorB); // Exibe 6
    ```
*   **Decremento (`--`):** Diminui o valor de uma variável numérica em 1. Também pode ser pré-fixado ou pós-fixado, com comportamento similar ao incremento.
    ```javascript
    let contadorC = 5;
    console.log("Contador C (pós-decremento): " + contadorC--); // Exibe 5, depois contadorC vira 4
    console.log("Contador C (após): " + contadorC); // Exibe 4

    let contadorD = 5;
    console.log("Contador D (pré-decremento): " + --contadorD); // contadorD vira 4, depois exibe 4
    console.log("Contador D (após): " + contadorD); // Exibe 4
    ```
*   **Exponenciação (`**`) (ES7/2016):** Eleva o primeiro operando à potência do segundo operando. Equivalente a `Math.pow()`.
    ```javascript
    let potencia = 2 ** 3; // 2 elevado a 3, que é 8
    console.log("2 ** 3 = " + potencia);
    console.log("3 ** 2 = " + (3 ** 2)); // 9
    ```

**Ordem de Precedência dos Operadores Aritméticos:**

JavaScript segue uma ordem de precedência para avaliar expressões aritméticas, similar à matemática tradicional:

1.  Parênteses `()` (maior precedência, avaliados primeiro)
2.  Exponenciação `**`
3.  Multiplicação `*`, Divisão `/`, Módulo `%` (avaliados da esquerda para a direita)
4.  Adição `+`, Subtração `-` (avaliados da esquerda para a direita)

```javascript
let resultadoPrecedencia = 10 + 5 * 2; // Multiplicação primeiro: 5 * 2 = 10, depois 10 + 10 = 20
console.log("10 + 5 * 2 = " + resultadoPrecedencia); // 20

let resultadoComParenteses = (10 + 5) * 2; // Parênteses primeiro: 10 + 5 = 15, depois 15 * 2 = 30
console.log("(10 + 5) * 2 = " + resultadoComParenteses); // 30

console.log(2 ** 3 * 2); // Exponenciação primeiro (8), depois 8 * 2 = 16
console.log(2 ** (3 * 2)); // Parênteses primeiro (6), depois 2 ** 6 = 64
```

É uma boa prática usar parênteses para tornar a ordem de avaliação explícita e seu código mais legível, mesmo quando a precedência padrão faria o que você espera.

**Exemplo Prático: Calcular Média**

```javascript
let nota1 = 7.5;
let nota2 = 8.0;
let nota3 = 6.5;

let media = (nota1 + nota2 + nota3) / 3;
console.log("A média das notas é: " + media.toFixed(2)); // toFixed(2) para formatar com 2 casas decimais
```

---

## Aula 3.2: Operadores de Atribuição

**Objetivo de Aprendizado:** Simplificar a escrita de código com operadores de atribuição composta.

Operadores de atribuição são usados para atribuir valores a variáveis. O operador de atribuição básico é o sinal de igual (`=`).

```javascript
let x = 10;
let nome = "JavaScript";
```

Além da atribuição simples, JavaScript oferece **operadores de atribuição composta**, que são uma forma abreviada de realizar uma operação e atribuir o resultado de volta à variável original.

*   **Atribuição de Adição (`+=`):** `x += y` é equivalente a `x = x + y`
    ```javascript
    let saldo = 100;
    let deposito = 50;
    saldo += deposito; // saldo agora é 150 (100 + 50)
    console.log("Saldo após depósito: " + saldo);
    ```

*   **Atribuição de Subtração (`-=`):** `x -= y` é equivalente a `x = x - y`
    ```javascript
    let precoTotal = 200;
    let desconto = 20;
    precoTotal -= desconto; // precoTotal agora é 180 (200 - 20)
    console.log("Preço com desconto: " + precoTotal);
    ```

*   **Atribuição de Multiplicação (`*=`):** `x *= y` é equivalente a `x = x * y`
    ```javascript
    let quantidade = 5;
    let fator = 3;
    quantidade *= fator; // quantidade agora é 15 (5 * 3)
    console.log("Quantidade multiplicada: " + quantidade);
    ```

*   **Atribuição de Divisão (`/=`):** `x /= y` é equivalente a `x = x / y`
    ```javascript
    let valor = 100;
    let divisor = 4;
    valor /= divisor; // valor agora é 25 (100 / 4)
    console.log("Valor dividido: " + valor);
    ```

*   **Atribuição de Módulo (`%=`):** `x %= y` é equivalente a `x = x % y`
    ```javascript
    let numero = 17;
    numero %= 5; // numero agora é 2 (17 % 5)
    console.log("Resto após atribuição de módulo: " + numero);
    ```

*   **Atribuição de Exponenciação (`**=`):** `x **= y` é equivalente a `x = x ** y`
    ```javascript
    let base = 2;
    base **= 4; // base agora é 16 (2 ** 4)
    console.log("Base elevada: " + base);
    ```

Esses operadores tornam o código mais conciso e, em alguns casos, podem ser ligeiramente mais eficientes. Eles são comumente usados para atualizar contadores ou acumuladores.

**Exemplo Prático: Acumulando Valores**

```javascript
let totalVendas = 0;

totalVendas += 150.75; // Primeira venda
totalVendas += 89.90;  // Segunda venda
totalVendas += 210.50; // Terceira venda

console.log("Total de vendas acumulado: R$ " + totalVendas.toFixed(2));
```

---

(O restante do Módulo 03, cobrindo Operadores de Comparação, Lógicos, Estruturas Condicionais `if/else if/else`, `switch`, Loops `while`, `do...while`, `for`, e controle de loops com `break/continue`, será adicionado nas próximas etapas, seguindo a mesma estrutura detalhada com objetivos, explicações, exemplos e exercícios.)




## Aula 3.3: Operadores de Comparação

**Objetivo de Aprendizado:** Realizar comparações entre valores e entender a importância da igualdade estrita (`===`) em detrimento da igualdade fraca (`==`).

Operadores de comparação são usados para comparar dois valores e retornam um valor booleano (`true` ou `false`) com base no resultado da comparação.

*   **Igualdade (`==`) (Igualdade Fraca ou Abstrata):**
    *   Compara dois valores para igualdade *após* realizar coerção de tipos, se necessário.
    *   **Geralmente não recomendado** devido a comportamentos inesperados causados pela coerção.
    ```javascript
    console.log("5 == 5: " + (5 == 5));         // true
    console.log("5 == '5': " + (5 == '5'));     // true (a string '5' é convertida para o número 5)
    console.log("0 == false: " + (0 == false));   // true (false é convertido para 0)
    console.log("null == undefined: " + (null == undefined)); // true
    console.log("'' == false: " + ('' == false)); // true (string vazia é convertida para 0, false para 0)
    ```

*   **Igualdade Estrita (`===`) (Igualdade de Identidade):**
    *   Compara dois valores para igualdade *sem* realizar coerção de tipos. Os valores devem ser do mesmo tipo e ter o mesmo valor para serem considerados iguais.
    *   **Altamente recomendado** para a maioria das comparações de igualdade para evitar surpresas.
    ```javascript
    console.log("5 === 5: " + (5 === 5));       // true
    console.log("5 === '5': " + (5 === '5'));   // false (tipos diferentes: number vs string)
    console.log("0 === false: " + (0 === false)); // false (tipos diferentes: number vs boolean)
    console.log("null === undefined: " + (null === undefined)); // false
    ```

*   **Diferença (`!=`) (Diferença Fraca):**
    *   Retorna `true` se os operandos não são iguais *após* coerção de tipos.
    *   Também **geralmente não recomendado**.
    ```javascript
    console.log("5 != 8: " + (5 != 8));         // true
    console.log("5 != '5': " + (5 != '5'));     // false (após coerção, são iguais)
    ```

*   **Diferença Estrita (`!==`):**
    *   Retorna `true` se os operandos não são iguais ou não são do mesmo tipo, *sem* coerção.
    *   **Altamente recomendado** para comparações de diferença.
    ```javascript
    console.log("5 !== 8: " + (5 !== 8));       // true
    console.log("5 !== '5': " + (5 !== '5'));   // true (tipos diferentes)
    console.log("5 !== 5: " + (5 !== 5));       // false
    ```

*   **Maior que (`>`):**
    *   Retorna `true` se o operando da esquerda for maior que o da direita.
    ```javascript
    console.log("10 > 5: " + (10 > 5));       // true
    console.log("5 > 10: " + (5 > 10));       // false
    console.log("'10' > 5: " + ('10' > 5));   // true (string '10' é convertida para número)
    ```

*   **Menor que (`<`):**
    *   Retorna `true` se o operando da esquerda for menor que o da direita.
    ```javascript
    console.log("5 < 10: " + (5 < 10));       // true
    console.log("10 < 5: " + (10 < 5));       // false
    ```

*   **Maior ou igual (`>=`):**
    *   Retorna `true` se o operando da esquerda for maior ou igual ao da direita.
    ```javascript
    console.log("10 >= 5: " + (10 >= 5));       // true
    console.log("5 >= 5: " + (5 >= 5));         // true
    ```

*   **Menor ou igual (`<=`):**
    *   Retorna `true` se o operando da esquerda for menor ou igual ao da direita.
    ```javascript
    console.log("5 <= 10: " + (5 <= 10));      // true
    console.log("5 <= 5: " + (5 <= 5));        // true
    ```

**Comparando Strings:**
Strings são comparadas lexicograficamente (como em um dicionário), com base em seus valores Unicode. Letras maiúsculas vêm antes das minúsculas.

```javascript
console.log("'banana' > 'abacaxi': " + ('banana' > 'abacaxi')); // true ('b' vem depois de 'a')
console.log("'Gato' < 'gato': " + ('Gato' < 'gato'));         // true (maiúsculas vêm antes)
console.log("'20' > '100': " + ('20' > '100'));             // true (comparação de string: '2' vem depois de '1')
// Para comparar números como strings, converta-os para números primeiro se a comparação numérica for desejada.
console.log("Number('20') > Number('100'): " + (Number('20') > Number('100'))); // false
```

**Regra de Ouro:** Sempre prefira `===` e `!==` para comparações de igualdade e diferença para evitar os efeitos colaterais da coerção de tipos.

---

## Aula 3.4: Operadores Lógicos

**Objetivo de Aprendizado:** Combinar múltiplas condições usando operadores lógicos (`&&`, `||`, `!`) e entender o operador ternário e a avaliação de curto-circuito.

Operadores lógicos são usados para combinar ou inverter expressões booleanas.

*   **E Lógico (`&&` - AND):**
    *   Retorna `true` se *ambos* os operandos forem `true` (ou truthy).
    *   Se o primeiro operando for `false` (ou falsy), ele retorna o primeiro operando sem avaliar o segundo (avaliação de curto-circuito).
    *   Se o primeiro operando for `true` (ou truthy), ele retorna o segundo operando.
    ```javascript
    console.log("true && true: " + (true && true));     // true
    console.log("true && false: " + (true && false));    // false
    console.log("false && true: " + (false && true));    // false (retorna false, não avalia o segundo true)
    console.log("false && false: " + (false && false));   // false

    let idade = 25;
    let temCNH = true;
    if (idade >= 18 && temCNH) {
        console.log("Pode dirigir."); // Pode dirigir.
    }

    console.log("0 && 'Olá': " + (0 && 'Olá')); // 0 (0 é falsy, curto-circuito)
    console.log("'Mundo' && 'Olá': " + ('Mundo' && 'Olá')); // 'Olá' (ambos truthy, retorna o último)
    ```

*   **OU Lógico (`||` - OR):**
    *   Retorna `true` se *pelo menos um* dos operandos for `true` (ou truthy).
    *   Se o primeiro operando for `true` (ou truthy), ele retorna o primeiro operando sem avaliar o segundo (avaliação de curto-circuito).
    *   Se o primeiro operando for `false` (ou falsy), ele retorna o segundo operando.
    ```javascript
    console.log("true || true: " + (true || true));     // true
    console.log("true || false: " + (true || false));    // true (retorna true, não avalia o false)
    console.log("false || true: " + (false || true));    // true
    console.log("false || false: " + (false || false));   // false

    let temIngresso = false;
    let eConvidado = true;
    if (temIngresso || eConvidado) {
        console.log("Pode entrar na festa."); // Pode entrar na festa.
    }

    console.log("'Olá' || 0: " + ('Olá' || 0)); // 'Olá' ('Olá' é truthy, curto-circuito)
    console.log("null || 'Mundo': " + (null || 'Mundo')); // 'Mundo' (null é falsy, retorna o segundo)
    console.log("null || undefined: " + (null || undefined)); // undefined
    ```
    O operador `||` é frequentemente usado para fornecer valores padrão:
    ```javascript
    let nomeUsuario = null;
    let nomeParaExibir = nomeUsuario || "Visitante";
    console.log("Bem-vindo, " + nomeParaExibir); // Bem-vindo, Visitante
    ```

*   **NÃO Lógico (`!` - NOT):**
    *   Inverte o valor booleano de seu operando. Se o operando for `true` (ou truthy), retorna `false`. Se for `false` (ou falsy), retorna `true`.
    ```javascript
    console.log("!true: " + (!true));   // false
    console.log("!false: " + (!false));  // true
    console.log("!0: " + (!0));       // true (0 é falsy, !falsy é true)
    console.log("!'Olá': " + (!'Olá')); // false ('Olá' é truthy, !truthy é false)

    let estaLogado = false;
    if (!estaLogado) {
        console.log("Por favor, faça login."); // Por favor, faça login.
    }
    ```

**Avaliação de Curto-Circuito:**
Como mencionado, `&&` e `||` usam avaliação de curto-circuito. Isso significa que o segundo operando só é avaliado se necessário. Isso pode ser usado para evitar erros ou para executar código condicionalmente de forma concisa:

```javascript
let usuario = { nome: "Ana", getDetalhes: function() { return "Detalhes de Ana"; } };
// let usuario = null;

// Se usuario for null, usuario.getDetalhes() causaria um erro.
// Com curto-circuito, se usuario for null (falsy), a segunda parte não é executada.
let detalhes = usuario && usuario.getDetalhes();
console.log(detalhes); // Se usuario for o objeto, exibe "Detalhes de Ana". Se for null, exibe null.
```

**Operador Ternário (Condicional Ternário):**

O operador ternário é uma forma concisa de escrever uma instrução `if...else` simples. Ele recebe três operandos:
`condição
(Content truncated due to size limit. Use line ranges to read in chunks)