# Módulo 09: Herança e Polimorfismo

## 9.1 Herança em JavaScript

Herança é um dos pilares da Programação Orientada a Objetos (POO). Ela permite que uma classe (chamada de classe filha ou subclasse) herde propriedades e métodos de outra classe (chamada de classe pai ou superclasse). Isso promove a reutilização de código e a criação de hierarquias de objetos.

Em JavaScript, a herança é tradicionalmente implementada através da cadeia de protótipos. Com a introdução da sintaxe de classes no ES6, a herança se tornou mais fácil de escrever e entender, embora ainda utilize protótipos por baixo dos panos.

### 9.1.1 Herança com Funções Construtoras (Pré-ES6)

Antes do ES6, a herança era alcançada combinando funções construtoras e a propriedade `prototype`.

```javascript
// Classe Pai (Superclasse)
function Animal(nome) {
    this.nome = nome;
}

Animal.prototype.fazerBarulho = function() {
    console.log("Som genérico de animal");
};

// Classe Filha (Subclasse)
function Cachorro(nome, raca) {
    // 1. Chamar o construtor da classe pai
    Animal.call(this, nome);
    this.raca = raca;
}

// 2. Configurar a cadeia de protótipos
// O protótipo de Cachorro se torna uma instância de Animal
Cachorro.prototype = Object.create(Animal.prototype);

// 3. Restaurar o construtor
// É importante para que `instanceof` funcione corretamente
Cachorro.prototype.constructor = Cachorro;

// Adicionando um método específico para Cachorro
Cachorro.prototype.latir = function() {
    console.log("Au au!");
};

const animalGenerico = new Animal("Genérico");
animalGenerico.fazerBarulho(); // Saída: Som genérico de animal

const rex = new Cachorro("Rex", "Labrador");
rex.fazerBarulho(); // Saída: Som genérico de animal (herdado)
rex.latir();        // Saída: Au au! (método próprio)

console.log(rex instanceof Cachorro); // Saída: true
console.log(rex instanceof Animal);   // Saída: true (devido à cadeia de protótipos)
```

**Explicação:**

1.  **`Animal.call(this, nome)`:** Dentro do construtor `Cachorro`, chamamos o construtor `Animal` usando `call`. Isso garante que as propriedades definidas no construtor `Animal` (como `nome`) sejam inicializadas no objeto `Cachorro`.
2.  **`Cachorro.prototype = Object.create(Animal.prototype);`:** Esta é a linha crucial para estabelecer a herança. `Object.create(Animal.prototype)` cria um novo objeto cujo protótipo é `Animal.prototype`. Ao atribuir este novo objeto a `Cachorro.prototype`, garantimos que as instâncias de `Cachorro` herdarão de `Animal.prototype`.
3.  **`Cachorro.prototype.constructor = Cachorro;`:** Após a linha anterior, o construtor de `Cachorro.prototype` apontaria para `Animal`. Esta linha restaura o construtor para `Cachorro`, o que é importante para a consistência e para o operador `instanceof` funcionar corretamente.

### 9.1.2 Herança com Classes (ES6+)

A sintaxe de classes do ES6 simplifica enormemente a implementação da herança com as palavras-chave `extends` e `super`.

```javascript
class Animal {
    constructor(nome) {
        this.nome = nome;
    }

    fazerBarulho() {
        console.log("Som genérico de animal");
    }

    dormir() {
        console.log("Zzzzz...");
    }
}

// Cachorro herda de Animal
class Cachorro extends Animal {
    constructor(nome, raca) {
        // 1. Chama o construtor da classe pai (Animal)
        super(nome); // Equivalente a Animal.call(this, nome)
        this.raca = raca;
    }

    // 2. Sobrescrevendo o método fazerBarulho da classe pai
    fazerBarulho() {
        console.log("Au au!");
    }

    // 3. Adicionando um novo método específico para Cachorro
    buscar() {
        console.log(`${this.nome} está buscando a bolinha!`);
    }
}

const animalGenerico = new Animal("Genérico");
animalGenerico.fazerBarulho(); // Saída: Som genérico de animal

const rex = new Cachorro("Rex", "Labrador");
rex.fazerBarulho(); // Saída: Au au! (método sobrescrito)
rex.dormir();     // Saída: Zzzzz... (método herdado da classe Animal)
rex.buscar();     // Saída: Rex está buscando a bolinha! (método da classe Cachorro)

console.log(rex instanceof Cachorro); // Saída: true
console.log(rex instanceof Animal);   // Saída: true
```

**Pontos Chave:**

*   **`extends`:** A palavra-chave `extends` é usada na declaração da classe para especificar a classe pai (superclasse).
*   **`super(argumentos)`:** Dentro do construtor da classe filha, `super()` deve ser chamado **antes** de usar a palavra-chave `this`. Ele executa o construtor da classe pai, permitindo que a classe pai inicialize sua parte do objeto. Você também pode passar argumentos para o construtor da classe pai através de `super()`.
*   **Sobrescrevendo Métodos:** Se uma classe filha define um método com o mesmo nome de um método na classe pai, o método da classe filha sobrescreve o método da classe pai. No entanto, você ainda pode acessar o método da classe pai usando `super.nomeDoMetodo()`.

### 9.2 Polimorfismo

Polimorfismo, que significa "muitas formas", é um conceito onde objetos de diferentes classes podem ser tratados através de uma interface comum (como uma classe pai ou um tipo de objeto). Em JavaScript, isso geralmente se manifesta através da capacidade de diferentes objetos responderem à mesma chamada de método de maneiras específicas para sua classe.

```javascript
class Passaro extends Animal {
    constructor(nome, podeVoar) {
        super(nome);
        this.podeVoar = podeVoar;
    }

    mover() {
        if (this.podeVoar) {
            console.log(`${this.nome} está voando.`);
        } else {
            console.log(`${this.nome} está andando ou pulando.`);
        }
    }
}

class Peixe extends Animal {
    constructor(nome, tipoDeAgua) {
        super(nome);
        this.tipoDeAgua = tipoDeAgua; // "Doce" ou "Salgada"
    }

    mover() {
        console.log(`${this.nome} está nadando.`);
    }
}

const picaPau = new Passaro("Pica-Pau", true);
const nemo = new Peixe("Nemo", "Salgada");

picaPau.mover(); // Saída: Pica-Pau está voando.
nemo.mover();    // Saída: Nemo está nadando.
```

No exemplo acima, tanto `picaPau` (um `Passaro`) quanto `nemo` (um `Peixe`) são instâncias de classes que herdam de `Animal`. Ambos têm um método `mover()`, mas a implementação é diferente para cada um, refletindo o comportamento específico de cada tipo de animal. Isso é polimorfismo em ação.

### 9.3 Métodos Estáticos

Métodos estáticos são chamados diretamente na classe, não em instâncias da classe. Eles são frequentemente usados como funções utilitárias relacionadas à classe, mas não a uma instância específica dela.

```javascript
class Matematica {
    static PI = 3.1415926535;

    static somar(a, b) {
        return a + b;
    }

    static subtrair(a, b) {
        return a - b;
    }
}

console.log(Matematica.PI);        // Saída: 3.1415926535
console.log(Matematica.somar(5, 3));  // Saída: 8
console.log(Matematica.subtrair(5, 3)); // Saída: 2

// const m = new Matematica(); // Isso geralmente não faz sentido para classes com apenas métodos estáticos.
// m.somar(1, 2); // Erro: m.somar não é uma função (a menos que você também defina métodos de instância)
```

**Observação:** Métodos estáticos não têm acesso à palavra-chave `this` que se refere a uma instância, pois eles não são chamados em uma instância.

### Conclusão da Aula

A herança é um mecanismo poderoso para reutilização de código e para criar hierarquias de objetos que refletem relações do mundo real. A sintaxe de classes do ES6 torna a implementação da herança em JavaScript muito mais clara e concisa. O polimorfismo, frequentemente usado em conjunto com a herança, permite que objetos de diferentes classes respondam à mesma mensagem (chamada de método) de maneiras específicas para sua classe, levando a um código mais flexível e extensível.

Lembre-se de que, mesmo com a sintaxe de `class`, JavaScript permanece uma linguagem baseada em protótipos. As classes são, em grande parte, uma camada de abstração sobre esse sistema de protótipos.
