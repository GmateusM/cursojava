# Módulo 08: Programação Orientada a Objetos (POO) em JavaScript - Parte 2: Classes (ES6+)

**Carga horária estimada:** 10 horas

## Objetivo do Módulo

Este módulo dá continuidade ao estudo da Programação Orientada a Objetos (POO) em JavaScript, focando na sintaxe de `class` introduzida no ECMAScript 2015 (ES6). Embora a POO em JavaScript seja fundamentalmente baseada em protótipos, a sintaxe de classes oferece uma maneira mais clara, concisa e familiar (para desenvolvedores de outras linguagens orientadas a objetos) de criar objetos e gerenciar herança. Exploraremos como definir classes, construtores, métodos de instância e estáticos, getters e setters, e como implementar herança usando `extends` e `super`. Também discutiremos as vantagens e as nuances de usar classes sobre a manipulação direta de protótipos.

Ao final deste módulo, você será capaz de utilizar a sintaxe de classes do ES6 para construir hierarquias de objetos robustas e bem organizadas, aproveitando os benefícios de uma sintaxe mais moderna para POO em JavaScript.

---

## Aula 8.1: Introdução à Sintaxe de Classes do ES6

**Objetivo de Aprendizado:** Compreender a sintaxe básica para definir classes em JavaScript usando a palavra-chave `class`, como declarar construtores para inicializar objetos, e como adicionar métodos a uma classe.

O ECMAScript 2015 (ES6) introduziu a palavra-chave `class` em JavaScript, fornecendo uma nova sintaxe para criar objetos e lidar com herança. É importante ressaltar que as classes em JavaScript são, em grande parte, "açúcar sintático" sobre o sistema de herança baseado em protótipos existente. Elas não introduzem um novo modelo de herança orientado a objetos, mas sim uma maneira mais limpa e estruturada de trabalhar com protótipos.

### 8.1.1 O que são Classes?

Uma classe é um modelo ou um projeto para criar objetos. Ela encapsula dados (propriedades) e comportamentos (métodos) que os objetos criados a partir dela terão. Pense em uma classe como uma "fábrica de objetos".

Antes do ES6, a criação de objetos com características semelhantes e herança era tipicamente feita usando funções construtoras e manipulação direta da propriedade `prototype`.

```javascript
// Exemplo com Função Construtora (pré-ES6)
function CarroAntigo(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
}

CarroAntigo.prototype.exibirInfo = function() {
    console.log(`Carro: ${this.marca} ${this.modelo}`);
};

const meuCarroAntigo = new CarroAntigo("Ford", "Ka");
meuCarroAntigo.exibirInfo(); // Saída: Carro: Ford Ka
```

A sintaxe de `class` simplifica essa abordagem.

### 8.1.2 Definindo uma Classe

Para definir uma classe, você usa a palavra-chave `class` seguida pelo nome da classe (por convenção, nomes de classes começam com letra maiúscula).

```javascript
class Carro {
    // O corpo da classe vai aqui
}

// Criando uma instância (objeto) da classe Carro
const meuCarroNovo = new Carro();
console.log(meuCarroNovo); // Saída: Carro {}
```

Por padrão, as classes em JavaScript estão em "strict mode" (modo estrito), o que significa que certo código que normalmente seria silenciosamente aceito pode gerar erros, ajudando a escrever um código mais robusto.

### 8.1.3 O Método Construtor (`constructor`)

O método `constructor` é um método especial dentro de uma classe usado para criar e inicializar um objeto quando a classe é instanciada com o operador `new`. Uma classe pode ter no máximo um método `constructor`.

Se você não definir um método `constructor`, o JavaScript adicionará um construtor padrão vazio.

```javascript
class Produto {
    // O construtor é chamado quando usamos 'new Produto(...)'
    constructor(nome, preco) {
        // 'this' se refere à nova instância do objeto que está sendo criada
        this.nome = nome;       // Define a propriedade 'nome' na instância
        this.preco = preco;     // Define a propriedade 'preco' na instância
        this.disponivel = true; // Pode definir propriedades padrão também
    }

    // Outros métodos da classe podem ser definidos aqui
}

// Criando instâncias da classe Produto
const produto1 = new Produto("Notebook Gamer", 4500.00);
const produto2 = new Produto("Mouse Vertical", 150.75);

console.log(produto1.nome);    // Saída: Notebook Gamer
console.log(produto1.preco);   // Saída: 4500
console.log(produto1.disponivel); // Saída: true

console.log(produto2.nome);    // Saída: Mouse Vertical
console.log(produto2.preco);   // Saída: 150.75
```

No exemplo acima, quando `new Produto("Notebook Gamer", 4500.00)` é executado:
1.  Um novo objeto vazio é criado.
2.  O método `constructor` da classe `Produto` é chamado com `this` apontando para esse novo objeto.
3.  As propriedades `nome`, `preco`, e `disponivel` são atribuídas ao novo objeto.
4.  O novo objeto é retornado e atribuído a `produto1`.

### 8.1.4 Adicionando Métodos à Classe

Métodos são funções definidas dentro de uma classe que especificam o comportamento dos objetos criados a partir dela. Eles são definidos diretamente no corpo da classe, fora do `constructor`.

```javascript
class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
        this.ativo = true;
    }

    // Método para saudar
    saudar() {
        console.log(`Olá, meu nome é ${this.nome} e meu email é ${this.email}.`);
    }

    // Método para desativar o usuário
    desativar() {
        this.ativo = false;
        console.log(`Usuário ${this.nome} foi desativado.`);
    }

    // Método para verificar se está ativo
    verificarAtividade() {
        if (this.ativo) {
            console.log(`${this.nome} está ativo.`);
        } else {
            console.log(`${this.nome} está inativo.`);
        }
    }
}

const usuarioA = new Usuario("Beatriz", "bia@example.com");
const usuarioB = new Usuario("Carlos", "carlos@example.com");

usuarioA.saudar(); // Saída: Olá, meu nome é Beatriz e meu email é bia@example.com.
usuarioA.verificarAtividade(); // Saída: Beatriz está ativo.

usuarioB.desativar(); // Saída: Usuário Carlos foi desativado.
usuarioB.verificarAtividade(); // Saída: Carlos está inativo.
```

**Importante sobre Métodos e Protótipos:**

Os métodos definidos no corpo de uma classe (como `saudar`, `desativar`, `verificarAtividade` no exemplo `Usuario`) são, na verdade, adicionados ao `prototype` da classe. Isso significa que eles são compartilhados entre todas as instâncias da classe, em vez de serem duplicados em cada objeto. Isso é o mesmo comportamento que tínhamos ao adicionar métodos ao `prototype` de uma função construtora.

```javascript
console.log(typeof Usuario.prototype.saudar); // Saída: function
console.log(usuarioA.hasOwnProperty("nome"));   // Saída: true (propriedade da instância)
console.log(usuarioA.hasOwnProperty("saudar")); // Saída: false (método do protótipo)
```

### 8.1.5 Expressões de Classe (Class Expressions)

Assim como as funções, as classes também podem ser definidas usando uma expressão de classe. Elas podem ser nomeadas ou anônimas.

```javascript
// Expressão de Classe Anônima
const Retangulo = class {
    constructor(altura, largura) {
        this.altura = altura;
        this.largura = largura;
    }
    calcularArea() {
        return this.altura * this.largura;
    }
};

const r1 = new Retangulo(10, 5);
console.log("Área r1:", r1.calcularArea()); // Saída: Área r1: 50

// Expressão de Classe Nomeada
// O nome da classe (MinhaClasseNomeada) só é visível dentro da própria classe (útil para recursão ou auto-referência)
const Circulo = class MinhaClasseCirculo {
    constructor(raio) {
        this.raio = raio;
    }
    getRaio() {
        // console.log(MinhaClasseCirculo.nomePadrao); // Exemplo de uso do nome interno
        return this.raio;
    }
    static nomePadrao = "Círculo Geométrico"; // Exemplo de propriedade estática (veremos depois)
};

const c1 = new Circulo(7);
console.log("Raio c1:", c1.getRaio()); // Saída: Raio c1: 7
// console.log(MinhaClasseCirculo); // Erro: MinhaClasseCirculo is not defined (fora da classe)
```

Declarações de classe (`class MinhaClasse { ... }`) não são "hoisted" (içadas) da mesma forma que declarações de função. Você deve declarar uma classe antes de poder usá-la. Tentar usar uma classe antes de sua declaração resultará em um `ReferenceError`.

```javascript
// const p = new Ponto(1,2); // Erro: Cannot access 'Ponto' before initialization

class Ponto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
const p = new Ponto(1,2);
console.log(p); // Ponto { x: 1, y: 2 }
```

A sintaxe de `class` do ES6 oferece uma maneira muito mais organizada e legível de definir "plantas" para objetos em JavaScript, alinhando a linguagem com as convenções de POO de outras linguagens populares, enquanto ainda opera sobre o poderoso sistema de protótipos do JavaScript.

---

(Continua com Aula 8.2: Getters e Setters, Aula 8.3: Métodos e Propriedades Estáticas, etc.)

