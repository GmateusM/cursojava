## Aula 5.1: Objetos em JavaScript (Continuação)

### Métodos de Objetos

Além de propriedades, objetos podem ter métodos. Métodos são ações que podem ser realizadas em objetos. Métodos são armazenados em propriedades como definições de função.

```javascript
const pessoa = {
    nome: "Carlos",
    sobrenome: "Alberto",
    idade: 30,
    saudacao: function() {
        console.log("Olá, meu nome é " + this.nome + " " + this.sobrenome + ".");
    }
};

pessoa.saudacao(); // Saída: Olá, meu nome é Carlos Alberto.
```

No exemplo acima, `saudacao` é um método do objeto `pessoa`. Dentro do método, `this` refere-se ao objeto `pessoa`.

### Palavra-chave `this`

A palavra-chave `this` em JavaScript se refere ao objeto ao qual uma função pertence. Seu valor é determinado por como a função é chamada (contexto de invocação).

*   **Em um método de objeto:** `this` refere-se ao objeto que "possui" o método.
*   **Sozinho (fora de qualquer função):** `this` refere-se ao objeto global ( `window` em navegadores, `global` em Node.js).
*   **Em uma função regular (não método de objeto):** `this` também se refere ao objeto global em modo não estrito. Em modo estrito (`'use strict'`), `this` é `undefined`.
*   **Em um evento:** `this` refere-se ao elemento HTML que recebeu o evento.
*   **Em funções de seta (`=>`):** Arrow functions não têm seu próprio `this`. Elas herdam o `this` do escopo léxico em que foram definidas. Isso é particularmente útil em callbacks e funções aninhadas onde você quer manter o contexto do `this` da função externa.

**Exemplo de `this` em uma função de seta:**

```javascript
const meuObjeto = {
    valor: 10,
    mostrarValor: function() {
        // 'this' aqui se refere a 'meuObjeto'
        console.log("Valor no método regular:", this.valor);

        setTimeout(() => {
            // 'this' aqui AINDA se refere a 'meuObjeto' porque arrow functions
            // herdam o 'this' do escopo em que foram definidas.
            console.log("Valor dentro do setTimeout com arrow function:", this.valor);
        }, 100);

        setTimeout(function() {
            // 'this' aqui se refere ao objeto 'window' (ou 'global' em Node.js)
            // porque a função regular define seu próprio 'this' quando chamada.
            console.log("Valor dentro do setTimeout com função regular:", this.valor); // undefined (ou erro em modo estrito)
        }, 200);
    }
};

meuObjeto.mostrarValor();
```

### Construtores e Protótipos

JavaScript é uma linguagem baseada em protótipos. Cada objeto pode ter um objeto protótipo, do qual ele herda propriedades e métodos.

*   **Funções Construtoras:** Como vimos anteriormente, funções construtoras são usadas para criar objetos. A palavra-chave `new` é usada para invocar uma função construtora.

*   **Protótipos:** Cada função em JavaScript tem uma propriedade especial chamada `prototype`. Quando você cria um objeto usando uma função construtora, o objeto herda as propriedades e métodos do `prototype` da função construtora.

```javascript
function Cachorro(nome, raca) {
    this.nome = nome;
    this.raca = raca;
}

// Adicionando um método ao protótipo de Cachorro
Cachorro.prototype.latir = function() {
    console.log(`O ${this.nome} (${this.raca}) está latindo: Au au!`);
};

const rex = new Cachorro("Rex", "Labrador");
const max = new Cachorro("Max", "Pastor Alemão");

rex.latir(); // Saída: O Rex (Labrador) está latindo: Au au!
max.latir(); // Saída: O Max (Pastor Alemão) está latindo: Au au!

// 'latir' não é uma propriedade direta de 'rex' ou 'max', mas sim do seu protótipo.
console.log(rex.hasOwnProperty('latir')); // Saída: false
console.log(Cachorro.prototype.hasOwnProperty('latir')); // Saída: true
```

### Classes (ES6+)

Classes em JavaScript, introduzidas no ES6, são uma forma mais moderna e sintaticamente mais clara de criar objetos e lidar com herança. Elas são, em essência, "açúcar sintático" sobre o sistema de protótipos existente em JavaScript.

```javascript
class Animal {
    constructor(nome) {
        this.nome = nome;
    }

    fazerBarulho() {
        console.log("Som genérico de animal");
    }
}

class Cachorro extends Animal {
    constructor(nome, raca) {
        super(nome); // Chama o construtor da classe pai (Animal)
        this.raca = raca;
    }

    fazerBarulho() {
        console.log("Au au!");
    }

    buscar() {
        console.log(`${this.nome} está buscando a bolinha!`);
    }
}

const animalGenerico = new Animal("Animal");
animalGenerico.fazerBarulho(); // Saída: Som genérico de animal

const meuCachorro = new Cachorro("Rex", "Labrador");
meuCachorro.fazerBarulho(); // Saída: Au au!
meuCachorro.buscar();    // Saída: Rex está buscando a bolinha!
console.log(meuCachorro.nome); // Saída: Rex
console.log(meuCachorro.raca); // Saída: Labrador
```

**Pontos Chave:**

*   **`class`:** Palavra-chave para definir uma classe.
*   **`constructor`:** Método especial para criar e inicializar um objeto criado com uma classe.
*   **`extends`:** Usado para criar uma classe filha (subclasse) que herda de uma classe pai (superclasse).
*   **`super`:** Usado para chamar o construtor da classe pai.

Compreender objetos e protótipos (ou classes, que são uma abstração sobre protótipos) é fundamental para escrever código JavaScript eficiente, organizado e reutilizável. Eles são a base da programação orientada a objetos em JavaScript e são amplamente utilizados em bibliotecas e frameworks modernos.
