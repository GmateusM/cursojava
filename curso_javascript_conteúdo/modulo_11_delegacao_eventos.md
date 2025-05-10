## Aula 11.1: Delegação de Eventos (Event Delegation)

**Objetivo:** Entender o conceito de delegação de eventos, suas vantagens e como implementá-lo em JavaScript.

### O que é Delegação de Eventos?

A delegação de eventos é uma técnica poderosa em JavaScript onde você anexa um único ouvinte de eventos a um elemento pai para gerenciar eventos que ocorrem em seus elementos filhos. Em vez de adicionar um ouvinte de eventos a cada elemento filho individualmente, você aproveita o fato de que os eventos "borbulham" (ou se propagam) na árvore DOM.

Quando um evento ocorre em um elemento filho, ele "borbulha" para seus elementos pais. Se um ouvinte de eventos estiver anexado a um elemento pai, ele pode "capturar" e lidar com o evento originado em qualquer um de seus descendentes.

### Por que usar Delegação de Eventos?

1.  **Eficiência de Memória:** Você anexa apenas um ouvinte de eventos a um elemento pai, em vez de vários ouvintes a vários elementos filhos. Isso é especialmente útil quando você tem muitos elementos filhos ou quando os elementos filhos são adicionados ou removidos dinamicamente.

2.  **Elementos Adicionados Dinamicamente:** Se você adicionar novos elementos filhos ao elemento pai após o ouvinte de eventos ter sido anexado, esses novos elementos também serão cobertos pelo ouvinte de eventos. Você não precisa anexar manualmente os ouvintes aos novos elementos.

3.  **Simplicidade:** Pode simplificar seu código, pois você gerencia menos ouvintes de eventos.

### Como Implementar a Delegação de Eventos

Para implementar a delegação de eventos, você anexa um ouvinte de eventos a um elemento pai. Dentro da função de callback do ouvinte, você verifica a propriedade `event.target` para determinar qual elemento filho realmente disparou o evento.

**Exemplo:**

Suponha que você tenha uma lista não ordenada (`<ul>`) e queira executar uma ação quando qualquer item da lista (`<li>`) for clicado.

```html
<ul id="minhaLista">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
</ul>
<button id="adicionarItem">Adicionar Item</button>
```

```javascript
const lista = document.getElementById("minhaLista");
const botaoAdicionar = document.getElementById("adicionarItem");
let contador = 4;

lista.addEventListener("click", function(event) {
    // Verifica se o elemento clicado é um LI
    if (event.target.tagName === "LI") {
        console.log("Você clicou em: " + event.target.textContent);
        // Você pode adicionar mais lógica aqui, como marcar o item como concluído, etc.
    }
});

// Adiciona um novo item à lista
botaoAdicionar.addEventListener("click", function() {
    const novoItem = document.createElement("li");
    novoItem.textContent = `Item ${contador++}`;
    lista.appendChild(novoItem);
});
```

Neste exemplo, em vez de adicionar um ouvinte de evento a cada `<li>` individualmente, adicionamos um único ouvinte de evento ao elemento pai `<ul>`. Quando um `<li>` dentro do `<ul>` é clicado, o evento "borbulha" até o `<ul>`, e o ouvinte de evento é acionado. A propriedade `event.target` nos permite identificar qual `<li>` foi realmente clicado.

### Vantagens da Delegação de Eventos

*   **Menos Ouvintes de Eventos:** Reduz o número de ouvintes de eventos na página, o que pode melhorar o desempenho, especialmente em páginas com muitos elementos interativos.
*   **Gerenciamento Dinâmico de Elementos:** Lida automaticamente com elementos que são adicionados ou removidos do DOM após a página ter sido carregada. Não há necessidade de anexar ou remover ouvintes de eventos manualmente para esses elementos.
*   **Simplicidade do Código:** Pode levar a um código mais limpo e fácil de manter, pois você não precisa se preocupar em adicionar e remover ouvintes de eventos para cada elemento individualmente.

### Desvantagens da Delegação de Eventos

*   **Verificação do Alvo:** Você precisa verificar se o `event.target` é o elemento que você realmente deseja manipular, pois o ouvinte está no elemento pai.
*   **Nem Todos os Eventos Borbulham:** Alguns eventos, como `focus`, `blur`, e `scroll`, não borbulham da mesma forma que eventos de clique. Para esses eventos, a delegação de eventos pode não ser a melhor abordagem ou pode exigir técnicas mais avançadas.

### Conclusão

A delegação de eventos é uma técnica poderosa e eficiente em JavaScript para gerenciar eventos em uma coleção de elementos, especialmente quando os elementos são adicionados ou removidos dinamicamente. Ao anexar um único ouvinte de eventos a um elemento pai, você pode simplificar seu código, melhorar o desempenho e tornar suas aplicações web mais robustas e fáceis de manter.
