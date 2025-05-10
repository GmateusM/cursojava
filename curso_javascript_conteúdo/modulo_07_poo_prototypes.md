# Módulo 07: Programação Orientada a Objetos (POO) em JavaScript - Parte 1: Prototypes

**Carga horária estimada:** 10 horas

## Objetivo do Módulo

Este módulo introduz os conceitos fundamentais da Programação Orientada a Objetos (POO) em JavaScript, com um foco especial no seu mecanismo de herança baseado em protótipos. Ao final deste módulo, você compreenderá como os protótipos funcionam, como criar objetos e estabelecer relações de herança entre eles, e como o `prototype chain` permite o compartilhamento de propriedades e métodos. Este conhecimento é crucial para entender profundamente como JavaScript lida com objetos e herança, mesmo antes da introdução da sintaxe de classes no ES6.

---

## Aula 7.1: Entendendo Prototypes e a Cadeia de Protótipos (Prototype Chain)

**Objetivo de Aprendizado:** Compreender o conceito de protótipo em JavaScript, como cada objeto possui um link para um objeto protótipo, e como a cadeia de protótipos (prototype chain) é usada para herança e busca de propriedades.

JavaScript é frequentemente descrita como uma linguagem baseada em protótipos. Isso significa que a herança de comportamento e propriedades entre objetos é realizada através de um mecanismo de "protótipos", em vez de um sistema de classes tradicional como em Java ou C++. Embora o ES6 tenha introduzido a sintaxe de `class`, ela é, em grande parte, um "açúcar sintático" sobre o sistema de protótipos subjacente.

### 7.1.1 O que é um Protótipo?

Em JavaScript, quase todos os objetos têm uma propriedade interna especial, muitas vezes referenciada como `[[Prototype]]` (ou acessível via `__proto__` em muitos ambientes, embora o uso de `Object.getPrototypeOf()` seja preferido). Essa propriedade é um link para outro objeto, chamado de **protótipo** do objeto original.

Quando você tenta acessar uma propriedade ou método em um objeto, e essa propriedade/método não é encontrada diretamente no próprio objeto, o JavaScript automaticamente segue o link `[[Prototype]]` para o objeto protótipo e procura a propriedade/método lá. Se não for encontrada no protótipo, ele continua subindo na cadeia de protótipos (o protótipo do protótipo, e assim por diante) até que a propriedade/método seja encontrada ou até que se chegue ao final da cadeia.

O final da cadeia de protótipos é geralmente o objeto `Object.prototype`, que é o protótipo base para a maioria dos objetos em JavaScript. `Object.prototype` em si tem `null` como seu protótipo, indicando o fim da busca.

Este mecanismo de busca é conhecido como **cadeia de protótipos (prototype chain)**.

### 7.1.2 Acessando o Protótipo de um Objeto

*   **`Object.getPrototypeOf(obj)` (Recomendado):** Este é o método padrão e preferido do ES5 para obter o protótipo de um objeto `obj`.
*   **`obj.__proto__` (Não padrão, mas comum):** Muitos navegadores e ambientes Node.js expõem a propriedade `__proto__` (pronuncia-se "dunder proto") que permite acessar e, em alguns casos, modificar o protótipo de um objeto. No entanto, seu uso direto para atribuição é desencorajado em favor de `Object.setPrototypeOf()` ou `Object.create()`.

```javascript
const meuObjetoSimples = { a: 1 };
const prototipoDoMeuObjeto = Object.getPrototypeOf(meuObjetoSimples);

console.log(prototipoDoMeuObjeto === Object.prototype); // Saída: true
// Objetos literais criados com {} têm Object.prototype como seu protótipo por padrão.

const meuArray = [1, 2, 3];
const prototipoDoArray = Object.getPrototypeOf(meuArray);
console.log(prototipoDoArray === Array.prototype); // Saída: true
// Arrays têm Array.prototype como seu protótipo.

console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // Saída: true
// Array.prototype, por sua vez, tem Object.prototype como seu protótipo.

console.log(Object.getPrototypeOf(Object.prototype)); // Saída: null
// O fim da cadeia.
```

### 7.1.3 Como a Cadeia de Protótipos Funciona na Prática (Herança)

A cadeia de protótipos é o mecanismo fundamental de herança em JavaScript. Quando um objeto "herda" de outro, ele ganha acesso às propriedades e métodos do seu protótipo.

**Exemplo de Herança Simples:**

```javascript
// Objeto protótipo (pai)
const animal = {
    especie: "Desconhecida",
    fazerBarulho: function() {
        console.log("Som genérico de animal");
    },
    dormir: function() {
        console.log("Zzzzz...");
    }
};

// Criando um novo objeto `cachorro` cujo protótipo é `animal`.
// Usamos Object.create() para isso.
const cachorro = Object.create(animal);
cachorro.nome = "Rex"; // Propriedade específica do cachorro
cachorro.raca = "Labrador";

// Sobrescrevendo um método do protótipo (opcional)
cachorro.fazerBarulho = function() {
    console.log("Au au!");
};

console.log(cachorro.nome);    // Saída: Rex (propriedade do próprio objeto cachorro)
console.log(cachorro.especie); // Saída: Desconhecida (herdada de animal via prototype chain)
cachorro.fazerBarulho();       // Saída: Au au! (método do próprio objeto cachorro, sobrescreveu o do protótipo)
cachorro.dormir();             // Saída: Zzzzz... (método herdado de animal)

// Verificando a cadeia de protótipos
console.log(Object.getPrototypeOf(cachorro) === animal); // true
console.log(Object.getPrototypeOf(animal) === Object.prototype); // true

// O que acontece se tentarmos acessar uma propriedade inexistente?
// console.log(cachorro.cor); // undefined (não encontrada em cachorro, nem em animal, nem em Object.prototype)
```

**Fluxo de Busca de Propriedade (para `cachorro.especie`):**
1.  O JavaScript procura a propriedade `especie` diretamente no objeto `cachorro`.
2.  Não encontra `especie` em `cachorro`.
3.  Segue o link `[[Prototype]]` de `cachorro` para o objeto `animal`.
4.  Procura `especie` em `animal`. Encontra! Retorna o valor "Desconhecida".

**Fluxo de Busca de Método (para `cachorro.dormir()`):**
1.  Procura `dormir` em `cachorro`. Não encontra.
2.  Segue para `animal` (protótipo de `cachorro`).
3.  Encontra `dormir` em `animal`. Executa a função `animal.dormir` com `this` referindo-se a `cachorro` (porque `dormir` foi chamado em `cachorro`).

**Shadowing (Sombreamento de Propriedades):**
Se um objeto tem uma propriedade com o mesmo nome de uma propriedade em seu protótipo, a propriedade do próprio objeto "sombreia" (oculta) a propriedade do protótipo. É o caso de `cachorro.fazerBarulho` que sobrescreveu `animal.fazerBarulho`.

### 7.1.4 A Propriedade `prototype` das Funções Construtoras

Todas as funções em JavaScript (exceto arrow functions e algumas funções nativas) têm uma propriedade especial chamada `prototype`. Esta propriedade `prototype` **não é o protótipo da função em si**, mas sim o objeto que se tornará o protótipo para todas as instâncias de objetos criadas usando essa função como uma **função construtora** (com o operador `new`).

```javascript
function Gato(nome) {
    this.nome = nome; // Propriedade da instância
}

// Adicionando um método ao objeto Gato.prototype
// Este método será compartilhado por todas as instâncias de Gato
Gato.prototype.miar = function() {
    console.log(`${this.nome} diz: Miau!`);
};

Gato.prototype.especie = "Felino"; // Propriedade compartilhada

const felix = new Gato("Felix");
const tom = new Gato("Tom");

felix.miar(); // Saída: Felix diz: Miau!
tom.miar();   // Saída: Tom diz: Miau!

console.log(felix.especie); // Saída: Felino (herdado de Gato.prototype)
console.log(tom.especie);   // Saída: Felino

// Verificando os protótipos
console.log(Object.getPrototypeOf(felix) === Gato.prototype); // true
console.log(Object.getPrototypeOf(tom) === Gato.prototype);   // true

// O método `miar` não está diretamente em `felix`, mas em seu protótipo.
console.log(felix.hasOwnProperty("nome")); // true (propriedade da instância)
console.log(felix.hasOwnProperty("miar")); // false (herdado do protótipo)
console.log(Gato.prototype.hasOwnProperty("miar")); // true
```

**O que acontece quando `new Gato("Felix")` é executado?**

1.  Um novo objeto vazio é criado.
2.  O `[[Prototype]]` (ou `__proto__`) desse novo objeto é definido para ser `Gato.prototype`.
3.  A função construtora `Gato` é chamada com `this` referindo-se a esse novo objeto. As propriedades definidas com `this` (como `this.nome = nome;`) são adicionadas diretamente ao novo objeto (são propriedades da instância).
4.  O novo objeto é retornado (implicitamente, a menos que a construtora retorne explicitamente outro objeto).

Este mecanismo é eficiente porque métodos e propriedades definidos em `FuncaoConstrutora.prototype` são compartilhados entre todas as instâncias, em vez de serem duplicados em cada objeto, economizando memória.

### 7.1.5 Benefícios da Herança Prototípica

*   **Reutilização de Código:** Propriedades e métodos comuns podem ser definidos em um protótipo e compartilhados por múltiplos objetos.
*   **Eficiência de Memória:** Métodos compartilhados via protótipo não são duplicados em cada instância de objeto.
*   **Flexibilidade:** Objetos podem herdar de outros objetos diretamente, e a cadeia de protótipos pode ser modificada dinamicamente (embora isso deva ser feito com cautela).

Compreender a cadeia de protótipos é fundamental para entender como JavaScript funciona em seu núcleo, como a herança é implementada, e como otimizar a criação e o uso de objetos. Mesmo com a sintaxe de `class` do ES6, o sistema de protótipos continua sendo o mecanismo subjacente.

---

(Continua com Aula 7.2: Criando Objetos com `Object.create()`, Aula 7.3: Funções Construtoras e a Propriedade `prototype`, etc.)

