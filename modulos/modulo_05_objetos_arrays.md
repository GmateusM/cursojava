# Módulo 05: Objetos e Arrays em JavaScript

**Carga horária estimada:** 12 horas

## Objetivo do Módulo

Este módulo tem como objetivo fornecer um entendimento profundo sobre duas das estruturas de dados mais fundamentais e versáteis em JavaScript: objetos e arrays. Ao final deste módulo, você será capaz de criar, manipular e utilizar objetos para representar entidades complexas e arrays para gerenciar coleções de dados de forma eficiente. Serão exploradas diversas propriedades e métodos associados a essas estruturas, bem como técnicas modernas para trabalhar com elas, incluindo o spread operator e a desestruturação.

---

## Aula 5.1: Introdução a Objetos

**Objetivo de Aprendizado:** Compreender o que são objetos em JavaScript, como eles são usados para agrupar dados e funcionalidades relacionadas, e aprender as formas básicas de criar e acessar suas propriedades.

Em JavaScript, um objeto é uma coleção dinâmica de pares chave-valor, onde as chaves são strings (ou Símbolos) e os valores podem ser de qualquer tipo de dado, incluindo outros objetos ou funções. Objetos são usados para modelar entidades do mundo real (como um usuário, um produto, um carro) ou estruturas de dados mais abstratas. Eles são incrivelmente flexíveis e formam a base da programação orientada a objetos em JavaScript.

### 5.1.1 O que é um Objeto?

Pense em um objeto como um contêiner que armazena propriedades e métodos. As **propriedades** são características ou atributos do objeto (como o nome de uma pessoa, a cor de um carro), enquanto os **métodos** são ações ou comportamentos que o objeto pode realizar (como uma pessoa andando, um carro acelerando). Em JavaScript, métodos são simplesmente propriedades cujos valores são funções.

Os objetos em JavaScript são mutáveis, o que significa que suas propriedades e métodos podem ser adicionados, modificados ou removidos após a criação do objeto.

### 5.1.2 Criando Objetos

Existem várias maneiras de criar objetos em JavaScript. As mais comuns são usando a sintaxe literal de objeto e o construtor `Object()`.

**1. Sintaxe Literal de Objeto (Object Literal):**

Esta é a forma mais comum e concisa de criar objetos. Você define o objeto e suas propriedades entre chaves `{}`.

```javascript
// Um objeto vazio
const objetoVazio = {};
console.log(objetoVazio); // Saída: {}

// Um objeto representando uma pessoa
const pessoa = {
    nome: "Ana Silva", // propriedade 'nome' com valor string
    idade: 30,          // propriedade 'idade' com valor numérico
    profissao: "Engenheira de Software",
    estaEmpregada: true, // propriedade 'estaEmpregada' com valor booleano
    saudar: function() { // propriedade 'saudar' com valor de função (um método)
        console.log("Olá, meu nome é " + this.nome);
    },
    // No ES6+, você pode definir métodos de forma mais concisa:
    despedir() {
        console.log("Até logo!");
    }
};

console.log(pessoa);
// Saída (pode variar a formatação no console):
// { 
//   nome: 'Ana Silva', 
//   idade: 30, 
//   profissao: 'Engenheira de Software', 
//   estaEmpregada: true, 
//   saudar: [Function: saudar],
//   despedir: [Function: despedir]
// }
```

Dentro do literal do objeto, cada propriedade consiste em uma chave (o nome da propriedade) seguida por dois pontos (`:`) e o valor da propriedade. As propriedades são separadas por vírgulas.

Os nomes das chaves (propriedades) podem ser strings ou identificadores válidos. Se o nome da chave for um identificador válido que não seja uma palavra reservada, as aspas ao redor da chave são opcionais. Se a chave contiver espaços, caracteres especiais ou for uma palavra reservada, ela deve ser envolvida em aspas.

```javascript
const configuracoes = {
    "cor-de-fundo": "#FFFFFF", // Chave com hífen, precisa de aspas
    "numero de itens": 10,   // Chave com espaços, precisa de aspas
    default: true,           // 'default' é uma palavra reservada, aspas são boas práticas aqui
    largura: 100             // Chave válida sem aspas
};
console.log(configuracoes["cor-de-fundo"]); // Acesso com colchetes para chaves com caracteres especiais
```

**2. Usando o Construtor `Object()`:**

Você também pode criar objetos usando o construtor `new Object()`.

```javascript
const carro = new Object(); // Cria um objeto vazio, equivalente a {}

// Adicionando propriedades depois da criação
carro.marca = "Toyota";
carro.modelo = "Corolla";
carro.ano = 2023;
carro.ligar = function() {
    console.log(this.modelo + " ligado.");
};

console.log(carro);
// Saída:
// { 
//   marca: 'Toyota', 
//   modelo: 'Corolla', 
//   ano: 2023, 
//   ligar: [Function (anonymous)] 
// }
```
Embora funcional, a sintaxe literal (`{}`) é geralmente preferida por ser mais concisa e legível.

### 5.1.3 Acessando Propriedades de Objetos

Depois que um objeto é criado, você pode acessar os valores de suas propriedades de duas maneiras:

**1. Notação de Ponto (Dot Notation): `objeto.propriedade`**

Esta é a forma mais comum e direta, usada quando o nome da propriedade é um identificador JavaScript válido e você o conhece em tempo de escrita do código.

```javascript
console.log(pessoa.nome);       // Saída: Ana Silva
console.log(pessoa.idade);      // Saída: 30
pessoa.saudar();                // Chama o método saudar. Saída: Olá, meu nome é Ana Silva
```

**2. Notação de Colchetes (Bracket Notation): `objeto["propriedade"]`**

A notação de colchetes é mais flexível. O nome da propriedade dentro dos colchetes é uma string (ou uma expressão que resulta em uma string).

É necessária quando:
*   O nome da propriedade contém espaços ou caracteres especiais.
*   O nome da propriedade é uma palavra reservada.
*   O nome da propriedade é determinado dinamicamente (o valor de uma variável).

```javascript
console.log(pessoa["profissao"]); // Saída: Engenheira de Software
console.log(configuracoes["cor-de-fundo"]); // Saída: #FFFFFF

let chaveDinamica = "idade";
console.log(pessoa[chaveDinamica]); // Saída: 30 (acessa pessoa.idade dinamicamente)

chaveDinamica = "nome";
console.log(pessoa[chaveDinamica]); // Saída: Ana Silva

// Acessando um método com notação de colchetes
configuracoes["mostrar itens"] = function() { console.log(this["numero de itens"]); };
configuracoes["mostrar itens"](); // Saída: 10
```

Se você tentar acessar uma propriedade que não existe no objeto, o JavaScript retornará `undefined` em vez de causar um erro.

```javascript
console.log(pessoa.salario); // Saída: undefined (a propriedade salario não existe em pessoa)
```

### 5.1.4 Modificando Propriedades

Você pode alterar o valor de uma propriedade existente ou adicionar novas propriedades a um objeto a qualquer momento, usando a atribuição (`=`):

```javascript
// Modificando uma propriedade existente
pessoa.idade = 31;
console.log(pessoa.idade); // Saída: 31

pessoa["profissao"] = "Desenvolvedora Full Stack";
console.log(pessoa.profissao); // Saída: Desenvolvedora Full Stack

// Adicionando uma nova propriedade
pessoa.cidade = "São Paulo";
console.log(pessoa.cidade); // Saída: São Paulo

pessoa["hobby"] = "Fotografia";
console.log(pessoa.hobby); // Saída: Fotografia

console.log(pessoa);
// O objeto 'pessoa' agora tem as propriedades 'cidade' e 'hobby' adicionadas
// e 'idade' e 'profissao' modificadas.
```

### 5.1.5 Removendo Propriedades

O operador `delete` pode ser usado para remover uma propriedade de um objeto.

```javascript
console.log(pessoa.estaEmpregada); // Saída: true
delete pessoa.estaEmpregada;
console.log(pessoa.estaEmpregada); // Saída: undefined (a propriedade foi removida)

console.log(pessoa);
// A propriedade 'estaEmpregada' não existe mais no objeto 'pessoa'.
```
O operador `delete` retorna `true` se a remoção for bem-sucedida (ou se a propriedade não existir), e `false` apenas em casos raros (como ao tentar deletar propriedades não configuráveis).

Objetos são a espinha dorsal de muitas estruturas em JavaScript. Compreender como criá-los, acessá-los e manipulá-los é fundamental para progredir no aprendizado da linguagem.

---

(Continua com Aula 5.2: Métodos de Objetos e a Palavra-chave `this` (Aprofundamento), Aula 5.3: Iterando sobre Propriedades de Objetos, Aula 5.4: Introdução a Arrays, etc.)

