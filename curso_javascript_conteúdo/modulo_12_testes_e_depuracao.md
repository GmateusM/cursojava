# Módulo 12: Testes em JavaScript

## 12.1 Introdução aos Testes em JavaScript

Testar seu código é uma parte crucial do desenvolvimento de software. Testes ajudam a garantir que seu código funcione como esperado, previnem regressões (quando uma alteração quebra algo que funcionava antes) e facilitam a refatoração.

### 12.1.1 Por que Testar?

*   **Garantia de Qualidade:** Assegura que o código se comporta conforme o esperado.
*   **Prevenção de Regressões:** Ajuda a identificar problemas introduzidos por novas alterações.
*   **Facilita a Refatoração:** Com testes, você pode refatorar o código com mais confiança, sabendo que os testes verificarão se a funcionalidade principal ainda está intacta.
*   **Documentação Viva:** Testes bem escritos podem servir como uma forma de documentação, mostrando como o código deve ser usado.
*   **Melhora o Design do Código:** Escrever código testável muitas vezes leva a um design mais modular e desacoplado.

### 12.1.2 Tipos de Testes

Existem vários tipos de testes, cada um com um foco diferente:

*   **Testes Unitários:** Testam a menor parte do código que pode ser logicamente isolada em um sistema (por exemplo, uma função, um método de uma classe).
*   **Testes de Integração:** Verificam se diferentes partes do sistema funcionam bem juntas (por exemplo, a interação entre vários módulos ou serviços).
*   **Testes End-to-End (E2E):** Simulam o fluxo completo de um usuário através da aplicação, desde a interface do usuário até o banco de dados e vice-versa.
*   **Testes de Aceitação (Acceptance Tests):** Verificam se o sistema atende aos requisitos do cliente ou do usuário.

Neste módulo, focaremos principalmente em **Testes Unitários**, pois são a base para construir software robusto.

### 12.1.3 Ferramentas de Teste em JavaScript

Existem várias bibliotecas e frameworks de teste populares no ecossistema JavaScript:

*   **Jest:** Um framework de teste popular desenvolvido pelo Facebook. É conhecido por sua simplicidade, velocidade e recursos "out-of-the-box" como mocking e code coverage.
*   **Mocha:** Um framework de teste flexível que roda tanto no Node.js quanto no navegador. Ele fornece a estrutura básica para escrever testes, mas geralmente é usado com outras bibliotecas para asserções (como Chai) e mocking (como Sinon.js).
*   **Jasmine:** Um framework de teste BDD (Behavior-Driven Development) que não depende de outras bibliotecas JavaScript. Ele tem uma sintaxe clara e expressiva.
*   **Cypress:** Uma ferramenta de teste end-to-end de próxima geração construída para a web moderna. É conhecida por sua facilidade de uso e depuração visual.
*   **Playwright:** Outra ferramenta de teste end-to-end poderosa, desenvolvida pela Microsoft, que suporta vários navegadores.

Neste módulo, vamos nos concentrar no **Jest** devido à sua popularidade, facilidade de uso e conjunto abrangente de recursos.

## 12.2 Escrevendo Testes Unitários com Jest

Jest é um framework de teste JavaScript que se concentra na simplicidade. Ele funciona bem com projetos que usam Node.js, React, Angular, Vue.js e mais.

### 12.2.1 Configuração do Ambiente

Primeiro, você precisa instalar o Jest como uma dependência de desenvolvimento:

```bash
npm install --save-dev jest
# ou, se você estiver usando yarn:
yarn add --dev jest
```

Em seguida, você pode adicionar um script ao seu arquivo `package.json` para executar os testes:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Agora, você pode executar seus testes usando o comando `npm test` ou `yarn test`.

### 12.2.2 Estrutura Básica de um Teste

Os testes em Jest são tipicamente escritos em arquivos com a extensão `.test.js` ou `.spec.js`. Um arquivo de teste geralmente contém um ou mais blocos `test` ou `it` (que são sinônimos em Jest), cada um representando um caso de teste individual.

```javascript
// Exemplo: funcoesMatematicas.js
function somar(a, b) {
    return a + b;
}

module.exports = somar;

// Exemplo: funcoesMatematicas.test.js
const somar = require('./funcoesMatematicas');

test('soma 1 + 2 para ser igual a 3', () => {
    expect(somar(1, 2)).toBe(3);
});
```

Neste exemplo:

1.  Importamos a função `somar` do arquivo `funcoesMatematicas.js`.
2.  Usamos a função `test` para definir um caso de teste. O primeiro argumento é uma string descritiva, e o segundo é uma função que contém a lógica do teste.
3.  Dentro da função de teste, chamamos a função `somar` com os argumentos `1` e `2`.
4.  Usamos a função `expect` do Jest para fazer uma asserção. `expect(somar(1, 2))` retorna um objeto "expectativa".
5.  Chamamos um "matcher" no objeto expectativa. `toBe(3)` é um matcher que verifica se o valor recebido é igual a `3` usando `Object.is`.

### 12.2.3 Matchers Comuns

Jest fornece uma variedade de matchers para diferentes tipos de asserções:

*   **Igualdade Exata:**
    *   `toBe(valor)`: Verifica se o valor é exatamente igual ao valor esperado (usa `Object.is`).
    *   `toEqual(valor)`: Verifica recursivamente cada campo de um objeto ou array.

*   **Verdadeiro/Falso/Nulo/Indefinido:**
    *   `toBeTruthy()`: Verifica se o valor é verdadeiro (em um contexto booleano).
    *   `toBeFalsy()`: Verifica se o valor é falso (em um contexto booleano).
    *   `toBeNull()`: Verifica se o valor é `null`.
    *   `toBeUndefined()`: Verifica se o valor é `undefined`.
    *   `toBeDefined()`: Verifica se o valor não é `undefined`.

*   **Números:**
    *   `toBeGreaterThan(numero)`
    *   `toBeGreaterThanOrEqual(numero)`
    *   `toBeLessThan(numero)`
    *   `toBeLessThanOrEqual(numero)`
    *   `toBeCloseTo(numero, numDigitos)`: Para números de ponto flutuante.

*   **Strings:**
    *   `toMatch(regexp | string)`: Verifica se uma string corresponde a uma expressão regular ou contém uma substring.

*   **Arrays e Iteráveis:**
    *   `toContain(item)`: Verifica se um array ou iterável contém um item específico.

*   **Exceções:**
    *   `toThrow(error?)`: Verifica se uma função lança um erro quando é chamada.

### 12.2.4 Agrupando Testes com `describe`

Para organizar seus testes, especialmente quando você tem vários testes para uma única funcionalidade ou componente, você pode usar o bloco `describe`:

```javascript
// Exemplo: calculadora.js
const calculadora = {
    somar: (a, b) => a + b,
    subtrair: (a, b) => a - b,
    multiplicar: (a, b) => a * b,
    dividir: (a, b) => {
        if (b === 0) throw new Error("Divisão por zero não é permitida.");
        return a / b;
    }
};

module.exports = calculadora;

// Exemplo: calculadora.test.js
const calculadora = require('./calculadora');

describe('Calculadora', () => {
    describe('Operações de Adição', () => {
        test('deve somar dois números positivos', () => {
            expect(calculadora.somar(2, 3)).toBe(5);
        });

        test('deve somar um número positivo e um negativo', () => {
            expect(calculadora.somar(5, -3)).toBe(2);
        });
    });

    describe('Operações de Subtração', () => {
        test('deve subtrair dois números positivos', () => {
            expect(calculadora.subtrair(5, 3)).toBe(2);
        });
    });

    // ... outros testes para multiplicação e divisão
});
```

### 12.2.5 Configuração e Desmontagem (Setup e Teardown)

Às vezes, você precisa executar algum código de configuração antes dos testes serem executados, ou algum código de limpeza depois que os testes terminarem. Jest fornece funções auxiliares para lidar com isso:

*   `beforeEach(fn)`: Executa uma função antes de cada um dos testes em um arquivo.
*   `afterEach(fn)`: Executa uma função após cada um dos testes em um arquivo.
*   `beforeAll(fn)`: Executa uma função uma vez, antes de qualquer um dos testes no arquivo ser executado.
*   `afterAll(fn)`: Executa uma função uma vez, após todos os testes no arquivo terem sido executados.

**Exemplo:**

```javascript
// database.js (módulo simulado)
let db = [];

const initializeDatabase = () => {
    db = ["item1", "item2"];
    console.log("Banco de dados inicializado!");
};

const clearDatabase = () => {
    db = [];
    console.log("Banco de dados limpo!");
};

const addItem = (item) => {
    db.push(item);
};

const getItems = () => {
    return db;
};

module.exports = { initializeDatabase, clearDatabase, addItem, getItems };

// database.test.js
const { initializeDatabase, clearDatabase, addItem, getItems } = require('./database');

beforeEach(() => {
    initializeDatabase();
});

afterEach(() => {
    clearDatabase();
});

test('adicionar um item ao banco de dados', () => {
    addItem("item3");
    expect(getItems()).toContain("item3");
});

test('o banco de dados deve ter 2 itens após a inicialização', () => {
    expect(getItems().length).toBe(2);
});
```

Neste exemplo, `initializeDatabase()` é chamado antes de cada teste, e `clearDatabase()` é chamado depois de cada teste. Isso garante que cada teste comece com um estado limpo e conhecido do banco de dados.

### 12.2.6 Testando Código Assíncrono

JavaScript é frequentemente usado para operações assíncronas, como chamadas de API. Jest fornece várias maneiras de lidar com código assíncrono.

**Usando Callbacks:**

Se uma função aceita um callback, você pode testá-la passando uma função `done` para o Jest. O Jest esperará até que o callback `done` seja chamado antes de finalizar o teste.

```javascript
// fetchData.js
function fetchData(callback) {
    setTimeout(() => {
        callback("dados do servidor");
    }, 1000);
}

// fetchData.test.js
test('o callback deve ser chamado com os dados corretos', done => {
    function callback(data) {
        try {
            expect(data).toBe("dados do servidor");
            done(); // Chama done() para indicar que o teste terminou
        } catch (error) {
            done(error); // Chama done com um erro se a asserção falhar
        }
    }
    fetchData(callback);
});
```

**Usando Promises:**

Se sua função retorna uma Promise, você pode retornar essa Promise do seu teste. Jest esperará que a Promise seja resolvida. Se a Promise for rejeitada, o teste falhará automaticamente.

```javascript
// fetchDataPromise.js
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simula uma falha aleatória
            if (Math.random() > 0.5) {
                resolve("dados do servidor com promise");
            } else {
                reject("Falha ao buscar dados");
            }
        }, 1000);
    });
}

// fetchDataPromise.test.js
test('os dados devem ser "dados do servidor com promise"', () => {
    return fetchDataPromise().then(data => {
        expect(data).toBe("dados do servidor com promise");
    });
});

// Você também pode usar .resolves ou .rejects com expect
test('a promise deve resolver para "dados do servidor com promise"', () => {
    return expect(fetchDataPromise()).resolves.toBe("dados do servidor com promise");
});

test('a promise deve rejeitar com "Falha ao buscar dados"', () => {
    // Para testar rejeições, você DEVE adicionar expect.assertions
    // para garantir que um certo número de asserções seja chamado.
    // Caso contrário, uma promise resolvida não falhará no teste.
    expect.assertions(1);
    return fetchDataPromise().catch(e => expect(e).toMatch("Falha ao buscar dados"));
});
```

**Usando Async/Await:**

Você também pode usar `async` e `await` em seus testes. Escrever um teste `async` é semelhante a escrever uma função `async`.

```javascript
// fetchDataAsync.js (mesma função fetchDataPromise, mas usada com async/await)
async function fetchDataAsync() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve("dados do servidor com async/await");
            } else {
                reject("Falha ao buscar dados com async/await");
            }
        }, 1000);
    });
}

// fetchDataAsync.test.js
test('os dados devem ser "dados do servidor com async/await"', async () => {
    try {
        const data = await fetchDataAsync();
        expect(data).toBe("dados do servidor com async/await");
    } catch (e) {
        expect(e).toMatch("Falha ao buscar dados com async/await");
    }
});
```

**Importante:** Ao testar código assíncrono que usa Promises, certifique-se de retornar a Promise do seu teste. Se você esquecer de retornar a Promise, seu teste será concluído antes que a Promise seja resolvida ou rejeitada, e você não obterá o resultado esperado.

### 12.2.7 Mocks e Spies

Em testes unitários, é crucial isolar a unidade de código que está sendo testada. Muitas vezes, essa unidade depende de outras partes do sistema (outras funções, módulos, chamadas de API, etc.). Mocks e spies são ferramentas que ajudam a controlar essas dependências.

*   **Mocks:** Permitem substituir dependências por versões controladas que se comportam de maneira previsível. Isso é útil para simular cenários específicos ou para evitar que testes interajam com sistemas externos reais (como bancos de dados ou APIs).

*   **Spies:** Permitem observar o comportamento de funções, como quantas vezes foram chamadas, com quais argumentos, etc., sem necessariamente alterar seu comportamento original.

Jest oferece funcionalidades robustas para criar mocks e spies. Por exemplo, você pode usar `jest.fn()` para criar uma função mock e `jest.spyOn()` para espionar métodos de objetos existentes.

```javascript
// Exemplo de uso de jest.fn() e jest.spyOn()

// Suponha que temos um módulo chamado 'utils.js'
// utils.js
export const somar = (a, b) => a + b;
export const multiplicar = (a, b) => a * b;

// Em nosso arquivo de teste (exemplo.test.js)
const utils = require('./utils'); // Importa o módulo real

// Mock da função 'somar'
jest.mock('./utils', () => ({
    ...jest.requireActual('./utils'), // Importa e mantém as implementações originais
    somar: jest.fn((a, b) => a + b), // Substitui 'somar' por um mock
}));

test('somar usa a implementação mockada', () => {
    utils.somar(1, 2); // Chama a versão mockada de somar
    expect(utils.somar).toHaveBeenCalledWith(1, 2);
});

test('multiplicar usa a implementação original', () => {
    // Suponha que queremos espionar 'multiplicar' sem mocká-la
    const spy = jest.spyOn(utils, 'multiplicar');
    utils.multiplicar(3, 4);
    expect(spy).toHaveBeenCalledWith(3, 4);
    spy.mockRestore(); // Restaura a implementação original
});
```

Este é apenas um vislumbre do que é possível com Jest. A documentação oficial do Jest é um excelente recurso para aprender mais sobre suas capacidades avançadas.

Lembre-se, escrever bons testes é uma habilidade que se desenvolve com a prática. Comece com testes simples e, gradualmente, avance para cenários mais complexos. Testes bem escritos não apenas garantem a qualidade do seu código, mas também servem como uma forma de documentação e facilitam a manutenção e refatoração no futuro. Boa sorte!
