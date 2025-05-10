## Módulo 10: Manipulação do DOM

**Objetivo:** Aprender a interagir e modificar a estrutura, conteúdo e estilo de documentos HTML usando JavaScript.

### 10.1 Selecionando Elementos do DOM

*   **`document.getElementById('id')`:** Seleciona um elemento pelo seu ID.
*   **`document.getElementsByTagName('tagname')`:** Retorna uma coleção HTML (HTMLCollection) de elementos com a tag especificada.
*   **`document.getElementsByClassName('classname')`:** Retorna uma coleção HTML de elementos que possuem a classe especificada.
*   **`document.querySelector('selector')`:** Retorna o primeiro elemento dentro do documento que corresponde ao seletor CSS especificado.
*   **`document.querySelectorAll('selector')`:** Retorna uma NodeList estática representando uma lista de elementos do documento que correspondem ao grupo de seletores especificado.

### 10.2 Manipulando Elementos do DOM

*   **Acessando e Modificando Conteúdo:**
    *   `element.innerHTML`: Obtém ou define o conteúdo HTML de um elemento.
    *   `element.textContent`: Obtém ou define o conteúdo de texto de um elemento e seus descendentes.
    *   `element.innerText`: Similar ao `textContent`, mas leva em consideração o estilo CSS e não retorna o conteúdo de elementos ocultos.
*   **Modificando Atributos:**
    *   `element.getAttribute('attributeName')`: Obtém o valor de um atributo.
    *   `element.setAttribute('attributeName', 'value')`: Define o valor de um atributo.
    *   `element.removeAttribute('attributeName')`: Remove um atributo.
*   **Modificando Estilos CSS:**
    *   `element.style.property = 'value'`: Define um estilo CSS específico para o elemento (ex: `element.style.color = 'red'`).
    *   `element.classList.add('className')`: Adiciona uma classe ao elemento.
    *   `element.classList.remove('className')`: Remove uma classe do elemento.
    *   `element.classList.toggle('className')`: Alterna uma classe (adiciona se não existir, remove se existir).
    *   `element.classList.contains('className')`: Verifica se um elemento possui uma classe específica.

### 10.3 Criando e Adicionando Elementos

*   **`document.createElement('tagName')`:** Cria um novo elemento HTML com a tag especificada.
*   **`parentNode.appendChild(newNode)`:** Adiciona `newNode` como o último filho de `parentNode`.
*   **`parentNode.insertBefore(newNode, referenceNode)`:** Insere `newNode` antes de `referenceNode` dentro de `parentNode`.
*   **`parentNode.removeChild(childNode)`:** Remove `childNode` de `parentNode`.

### 10.4 Eventos no DOM

*   **Adicionando Event Listeners:**
    *   `element.addEventListener('eventType', eventHandlerFunction)`: Anexa uma função (event handler) a um evento específico em um elemento.
*   **Removendo Event Listeners:**
    *   `element.removeEventListener('eventType', eventHandlerFunction)`: Remove um event listener previamente adicionado.
*   **Objeto de Evento:**
    *   Quando um evento ocorre, um objeto de evento é passado para a função de tratamento. Este objeto contém informações sobre o evento, como o tipo de evento, o elemento alvo, as coordenadas do mouse, etc.

### 10.5 Exemplo Prático: Criando uma Lista de Tarefas Dinâmica

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tarefas Dinâmica</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 20px;
        }
        .tarefa {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .tarefa input[type="checkbox"] {
            margin-right: 10px;
        }
        .tarefa.concluida span {
            text-decoration: line-through;
            color: #888;
        }
    </style>
</head>
<body>
    <h1>Minha Lista de Tarefas</h1>
    <input type="text" id="novaTarefaInput" placeholder="Adicionar nova tarefa">
    <button id="adicionarTarefaBtn">Adicionar</button>
    <ul id="listaTarefas"></ul>

    <script>
        const novaTarefaInput = document.getElementById('novaTarefaInput');
        const adicionarTarefaBtn = document.getElementById('adicionarTarefaBtn');
        const listaTarefas = document.getElementById('listaTarefas');

        adicionarTarefaBtn.addEventListener('click', function() {
            const textoTarefa = novaTarefaInput.value.trim();
            if (textoTarefa !== "") {
                adicionarTarefa(textoTarefa);
                novaTarefaInput.value = ""; // Limpa o campo de entrada
            }
        });

        function adicionarTarefa(texto) {
            const itemLista = document.createElement('li');
            itemLista.className = 'tarefa'; // Adiciona a classe para estilização

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function() {
                itemLista.classList.toggle('concluida', this.checked);
            });

            const spanTexto = document.createElement('span');
            spanTexto.textContent = texto;

            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.addEventListener('click', function() {
                listaTarefas.removeChild(itemLista);
            });

            itemLista.appendChild(checkbox);
            itemLista.appendChild(spanTexto);
            itemLista.appendChild(botaoRemover);
            listaTarefas.appendChild(itemLista);
        }
    </script>
</body>
</html>
```

**Explicação do Exemplo:**

1.  **HTML:** Define a estrutura básica da página, incluindo um campo de entrada (`input`) para novas tarefas, um botão para adicionar tarefas e uma lista não ordenada (`ul`) para exibir as tarefas.
2.  **JavaScript:**
    *   **Seleção de Elementos:** Obtém referências para os elementos HTML relevantes usando `document.getElementById()`.
    *   **Manipulação de Eventos:** Adiciona um ouvinte de evento ao botão "Adicionar". Quando clicado, ele pega o texto do campo de entrada, cria um novo item de lista (`<li>`) e o adiciona à lista de tarefas (`<ul>`).
    *   **Criação de Elementos:** A função `adicionarTarefa` cria dinamicamente os elementos HTML ( `<li>`, `<input type="checkbox">`, `<span>`, `<button>`) que compõem uma tarefa na lista.
    *   **Modificação de Estilo e Classe:** A classe `concluida` é adicionada ou removida do item da lista quando a caixa de seleção é marcada ou desmarcada, alterando visualmente a tarefa (por exemplo, riscando o texto).
    *   **Remoção de Elementos:** O botão "Remover" em cada tarefa, quando clicado, remove o item da lista (`<li>`) do DOM.

Este exemplo demonstra como você pode usar JavaScript para manipular dinamicamente o DOM, criando uma experiência de usuário interativa e responsiva. Experimente adicionar mais funcionalidades, como edição de tarefas ou persistência de dados usando `localStorage`.
