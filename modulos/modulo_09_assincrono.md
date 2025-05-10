# Módulo 09: JavaScript Assíncrono - Promises e Async/Await

## 9.1 Introdução ao JavaScript Assíncrono

JavaScript é uma linguagem de programação de thread única, o que significa que apenas uma tarefa pode ser executada por vez. No entanto, muitas operações, como buscar dados de um servidor, ler arquivos ou esperar por uma entrada do usuário, podem levar tempo. Se essas operações fossem síncronas, elas bloqueariam a thread principal, tornando a interface do usuário (UI) não responsiva.

O JavaScript assíncrono permite que essas operações demoradas sejam executadas em segundo plano, sem bloquear a thread principal. Quando a operação é concluída, uma função de callback é executada para lidar com o resultado.

### 9.1.1 Callbacks

Callbacks são a forma mais fundamental de lidar com operações assíncronas em JavaScript. Uma função de callback é uma função que é passada como argumento para outra função e é executada após a conclusão de alguma operação.

**Exemplo:**

```javascript
function buscarDados(callback) {
    // Simula uma chamada de API que leva algum tempo
    setTimeout(() => {
        const dados = { nome: "Usuário Exemplo", idade: 30 };
        callback(dados); // Chama a função de callback com os dados
    }, 2000); // Simula um atraso de 2 segundos
}

function processarDados(dados) {
    console.log("Dados recebidos:", dados);
}

buscarDados(processarDados); // Passa processarDados como callback
console.log("Solicitação de dados enviada...");
```

Neste exemplo, `buscarDados` simula uma operação assíncrona. A função `processarDados` é passada como um callback e só será executada após o `setTimeout` de 2 segundos, quando os "dados" estiverem disponíveis.

**Problema com Callbacks: Callback Hell (Pirâmide da Perdição)**

Quando você tem múltiplas operações assíncronas que dependem umas das outras, o uso excessivo de callbacks aninhados pode levar a um código difícil de ler e manter, conhecido como "Callback Hell" ou "Pyramid of Doom".

```javascript
// Exemplo de Callback Hell (não recomendado)
operacao1(function(resultado1) {
    operacao2(resultado1, function(resultado2) {
        operacao3(resultado2, function(resultado3) {
            // E assim por diante...
        });
    });
});
```

## 9.2 Promises

Promises foram introduzidas no ES6 (ECMAScript 2015) como uma forma de lidar com operações assíncronas de maneira mais organizada e legível, ajudando a evitar o "Callback Hell".

Uma `Promise` é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona e seu valor resultante.

Uma `Promise` pode estar em um destes três estados:

*   **Pending (Pendente):** Estado inicial, nem cumprida nem rejeitada.
*   **Fulfilled (Cumprida/Resolvida):** Significa que a operação foi concluída com sucesso. A promise tem um valor resultante.
*   **Rejected (Rejeitada):** Significa que a operação falhou. A promise tem um motivo (um erro).

**Criando uma Promise:**

```javascript
const minhaPrimeiraPromise = new Promise((resolve, reject) => {
    // Lógica assíncrona aqui (ex: setTimeout, chamada de API)
    const sucesso = true; // Simula o resultado da operação

    if (sucesso) {
        resolve("Operação bem-sucedida!"); // Resolve a promise com um valor
    } else {
        reject("Algo deu errado!"); // Rejeita a promise com um erro
    }
});
```

**Consumindo uma Promise:**

Usamos os métodos `.then()` e `.catch()` para lidar com o resultado de uma promise.

*   `.then(onFulfilled, onRejected)`: Aceita duas funções de callback opcionais. A primeira (`onFulfilled`) é chamada se a promise for resolvida, e a segunda (`onRejected`) se for rejeitada.
*   `.catch(onRejected)`: É um atalho para `.then(null, onRejected)`. Usado para tratar erros.
*   `.finally(onFinally)`: Executa uma função quando a promise é finalizada (resolvida ou rejeitada). Útil para limpeza.

```javascript
minhaPrimeiraPromise
    .then((mensagemDeSucesso) => {
        console.log("Sucesso: " + mensagemDeSucesso);
    })
    .catch((mensagemDeErro) => {
        console.error("Erro: " + mensagemDeErro);
    })
    .finally(() => {
        console.log("Tentativa de operação finalizada.");
    });
```

**Encadeamento de Promises (Chaining):**

Uma das grandes vantagens das promises é a capacidade de encadear operações assíncronas de forma mais legível.

```javascript
function primeiraOperacao() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Primeira operação concluída.");
            resolve(10);
        }, 1000);
    });
}

function segundaOperacao(valor) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Segunda operação concluída com valor:", valor);
            resolve(valor * 2);
        }, 1000);
    });
}

primeiraOperacao()
    .then(resultado1 => {
        return segundaOperacao(resultado1); // Retorna a próxima promise
    })
    .then(resultado2 => {
        console.log("Resultado final:", resultado2); // Saída: Resultado final: 20
    })
    .catch(erro => {
        console.error("Ocorreu um erro:", erro);
    });
```

## 9.3 Async/Await

Introduzido no ES2017 (ES8), `async/await` é uma sintaxe mais elegante e concisa para trabalhar com promises. Ele permite escrever código assíncrono que se parece e se comporta um pouco mais como código síncrono, tornando-o mais fácil de ler e entender.

*   **`async function`:** A palavra-chave `async` antes de uma função significa que a função sempre retornará uma promise. Se a função retornar um valor, a promise será resolvida com esse valor. Se a função lançar uma exceção, a promise será rejeitada com essa exceção.
*   **`await`:** A palavra-chave `await` só pode ser usada dentro de uma `async function`. Ela pausa a execução da função `async` até que a promise à direita da palavra-chave `await` seja resolvida ou rejeitada. O valor resolvido da promise é então retornado.

```javascript
async function buscarDadosDoUsuario(userId) {
    try {
        const resposta = await fetch(`https://api.example.com/users/${userId}`);
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json(); // Outra operação assíncrona
        return dados;
    } catch (erro) {
        console.error("Falha ao buscar dados do usuário:", erro);
        throw erro; // Re-lança o erro para ser tratado por quem chamou a função
    }
}

// Usando a função async
async function exibirNomeDoUsuario(userId) {
    try {
        const usuario = await buscarDadosDoUsuario(userId);
        console.log(usuario.nome);
    } catch (erro) {
        console.error("Não foi possível exibir o nome do usuário.");
    }
}

exibirNomeDoUsuario(123);
```

**Tratamento de Erros com `try...catch`:**

Ao usar `async/await`, você pode usar blocos `try...catch` para tratar erros de promises rejeitadas, de forma semelhante ao tratamento de exceções em código síncrono.

**Vantagens do `async/await`:**

*   **Legibilidade:** O código se assemelha mais ao código síncrono, tornando-o mais fácil de entender.
*   **Menos Aninhamento:** Evita o "Callback Hell" e o encadeamento excessivo de `.then()`.
*   **Tratamento de Erros Mais Simples:** O uso de `try...catch` é mais intuitivo para muitos desenvolvedores.

**Importante:** Lembre-se que `async/await` é apenas "açúcar sintático" sobre as Promises. Por baixo dos panos, as Promises ainda estão sendo usadas.

## 9.4 Exemplo Prático: Buscando Dados de uma API

Vamos ver um exemplo prático de como usar `async/await` para buscar dados de uma API pública (usaremos a JSONPlaceholder para este exemplo).

```javascript
async function buscarPostagens() {
    try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const postagens = await resposta.json();
        console.log("Postagens Recebidas:", postagens.slice(0, 5)); // Exibe as 5 primeiras postagens
    } catch (erro) {
        console.error("Falha ao buscar postagens:", erro);
    }
}

buscarPostagens();
```

Neste exemplo:

1.  A função `buscarPostagens` é declarada com `async`, então ela retorna uma Promise.
2.  `await fetch(...)` pausa a execução até que a requisição HTTP seja completada e a resposta seja recebida.
3.  `await resposta.json()` pausa a execução até que o corpo da resposta seja lido e convertido para JSON.
4.  Se ocorrer algum erro durante as operações `await` (por exemplo, a rede está offline ou o servidor retorna um erro), a execução salta para o bloco `catch`.

Este é um padrão muito comum ao interagir com APIs ou qualquer outra operação que retorne Promises.

## Conclusão do Módulo

As Promises e a sintaxe `async/await` são ferramentas essenciais no JavaScript moderno para lidar com operações assíncronas de forma eficaz e legível. Elas ajudam a evitar os problemas do "Callback Hell" e tornam o código assíncrono mais fácil de escrever, entender e manter. Dominar esses conceitos é crucial para construir aplicações web interativas e responsivas.
