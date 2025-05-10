# Módulo 11: Eventos no DOM (Aprofundamento)

**Carga horária estimada:** 8 horas

## Objetivo do Módulo

Este módulo se aprofunda no sistema de eventos do Document Object Model (DOM) em JavaScript. Com base no conhecimento prévio sobre como adicionar ouvintes de eventos, exploraremos conceitos mais avançados como o fluxo de eventos (capturing e bubbling), a delegação de eventos para otimização de performance e gerenciamento de elementos dinâmicos, e o uso de métodos cruciais do objeto de evento como `preventDefault()` e `stopPropagation()`. Ao final deste módulo, você terá um entendimento robusto de como os eventos se propagam pelo DOM e como manipulá-los de forma eficiente e eficaz para criar interfaces de usuário interativas e responsivas.

---

## Aula 11.1: O Fluxo de Eventos: Capturing e Bubbling

**Objetivo de Aprendizado:** Compreender as duas fases principais do fluxo de eventos no DOM – capturing (captura) e bubbling (borbulhamento) – e como elas afetam a ordem em que os manipuladores de eventos são acionados.

Quando um evento ocorre em um elemento HTML (por exemplo, um clique em um botão), ele não acontece isoladamente nesse elemento. O evento, na verdade, passa por um ciclo de vida que envolve diferentes fases e pode afetar outros elementos na hierarquia do DOM. Esse ciclo é conhecido como o **fluxo de eventos DOM**.

O fluxo de eventos tem três fases principais, conforme definido pelo W3C:

1.  **Fase de Captura (Capturing Phase):** O evento "desce" da `Window` (o objeto mais externo) através dos ancestrais do elemento alvo, até chegar ao elemento onde o evento ocorreu originalmente.
2.  **Fase Alvo (Target Phase):** O evento chega ao elemento alvo (o elemento onde o evento foi disparado).
3.  **Fase de Borbulhamento (Bubbling Phase):** O evento "sobe" ou "borbulha" do elemento alvo de volta através de seus ancestrais, até a `Window`.

Por padrão, a maioria dos navegadores modernos registra e executa os manipuladores de eventos durante a fase de borbulhamento. No entanto, você pode configurar seus ouvintes para serem acionados durante a fase de captura.

### 11.1.1 Fase de Captura (Capturing Phase)

Nesta fase, o evento viaja do nó mais externo (geralmente `document` ou `window`) para baixo na árvore DOM até o elemento que originou o evento. Se houver manipuladores de evento registrados para a fase de captura nos elementos ancestrais, eles serão acionados em ordem, do mais externo para o mais interno.

Para registrar um manipulador de evento para a fase de captura, você passa `true` como o terceiro argumento opcional do método `addEventListener()`.

```javascript
// elemento.addEventListener(tipoEvento, manipulador, useCapture);
// Se useCapture for true, o manipulador é acionado na fase de captura.
// Se useCapture for false ou omitido, o manipulador é acionado na fase de borbulhamento.

const divPai = document.getElementById("divPai");
const divFilho = document.getElementById("divFilho");
const botao = document.getElementById("meuBotao"); // Suponha que o botão está dentro de divFilho

// Manipulador na fase de CAPTURA para divPai
divPai.addEventListener("click", function(event) {
    console.log("Evento CAPTURADO no divPai");
    // event.target refere-se ao botão, o elemento original do evento
    // this (ou event.currentTarget) refere-se a divPai, onde o listener está anexado
    console.log("Target do evento (captura divPai):", event.target.id);
    console.log("CurrentTarget (captura divPai):", this.id);
}, true); // O terceiro argumento true ativa a captura

// Manipulador na fase de CAPTURA para divFilho
divFilho.addEventListener("click", function(event) {
    console.log("Evento CAPTURADO no divFilho");
    console.log("Target do evento (captura divFilho):", event.target.id);
    console.log("CurrentTarget (captura divFilho):", this.id);
}, true);

// Manipulador no elemento alvo (botão) - pode ser captura ou borbulhamento
// Se não especificado, o padrão é borbulhamento.
// Para ser acionado na fase alvo, pode ser registrado para qualquer uma das fases.
botao.addEventListener("click", function(event) {
    console.log("Evento no ALVO (botão)");
    console.log("Target do evento (botão):", event.target.id);
    console.log("CurrentTarget (botão):", this.id);
}); // Padrão é borbulhamento, mas será acionado na fase alvo

// Se você clicar no botão, a ordem de log será:
// 1. Evento CAPTURADO no divPai
// 2. Evento CAPTURADO no divFilho
// 3. Evento no ALVO (botão)
```

A fase de captura é menos comumente usada para manipulação de eventos do que a fase de borbulhamento, mas pode ser útil em cenários específicos, como interceptar eventos antes que cheguem ao elemento alvo.

### 11.1.2 Fase Alvo (Target Phase)

Esta é a fase em que o evento atinge o elemento onde ele foi originalmente disparado (o `event.target`). Os manipuladores de evento anexados diretamente a este elemento são acionados durante esta fase. Se um manipulador foi registrado tanto para captura quanto para borbulhamento no elemento alvo, a ordem exata pode depender da implementação do navegador, mas geralmente os de captura são priorizados se o evento ainda estiver nessa fase ao atingir o alvo.

### 11.1.3 Fase de Borbulhamento (Bubbling Phase)

Após a fase alvo, o evento começa a "borbulhar" para cima na hierarquia do DOM, do elemento alvo através de seus pais, avós, e assim por diante, até atingir o objeto `document` e, finalmente, `window`. Se houver manipuladores de evento registrados para a fase de borbulhamento nos elementos ancestrais, eles serão acionados em ordem, do mais interno (pai do alvo) para o mais externo (`window`).

Este é o comportamento padrão para a maioria dos eventos e para `addEventListener()` quando o terceiro argumento `useCapture` é `false` ou omitido.

```javascript
// Continuando o exemplo anterior, adicionando manipuladores de borbulhamento:

// Manipulador na fase de BORBULHAMENTO para divFilho
divFilho.addEventListener("click", function(event) {
    console.log("Evento BORBULHANDO no divFilho");
    console.log("Target do evento (borbulha divFilho):", event.target.id);
    console.log("CurrentTarget (borbulha divFilho):", this.id);
}, false); // O terceiro argumento false (ou omitido) ativa o borbulhamento

// Manipulador na fase de BORBULHAMENTO para divPai
divPai.addEventListener("click", function(event) {
    console.log("Evento BORBULHANDO no divPai");
    console.log("Target do evento (borbulha divPai):", event.target.id);
    console.log("CurrentTarget (borbulha divPai):", this.id);
}, false);

// Se você clicar no botão, e tiver TODOS os listeners (captura e borbulhamento) ativos:
// A ordem de log seria:
// 1. Evento CAPTURADO no divPai
// 2. Evento CAPTURADO no divFilho
// 3. Evento no ALVO (botão) (o listener do botão, mesmo que padrão borbulhamento, é acionado na fase alvo)
// 4. Evento BORBULHANDO no divFilho
// 5. Evento BORBULHANDO no divPai
```

**Eventos que Borbulham e Eventos que Não Borbulham:**

A maioria dos eventos do DOM borbulha, como `click`, `mousedown`, `mouseup`, `keydown`, `keyup`, `input`, etc. No entanto, alguns eventos não borbulham por padrão, como `focus`, `blur`, `load`, `unload`, `mouseenter`, `mouseleave`. Para esses eventos, os manipuladores só serão acionados se estiverem diretamente no elemento alvo ou durante a fase de captura em um ancestral.

Você pode verificar se um evento borbulha usando a propriedade `event.bubbles` (retorna `true` ou `false`).

### 11.1.4 `event.target` vs `event.currentTarget`

Dentro de um manipulador de eventos, o objeto `event` fornece duas propriedades importantes para identificar elementos:

*   **`event.target`:** Refere-se ao elemento onde o evento ocorreu originalmente (o elemento mais profundo na hierarquia DOM que foi clicado, por exemplo). Este valor não muda conforme o evento captura ou borbulha.
*   **`event.currentTarget` (ou `this` dentro de uma função regular como manipulador):** Refere-se ao elemento ao qual o manipulador de evento está atualmente anexado e sendo executado. Este valor muda conforme o evento se propaga pelas fases de captura e borbulhamento.

No exemplo acima, se você clicar no `botao`:
*   `event.target` será sempre o `botao` em todos os manipuladores (no `divPai`, `divFilho` e `botao`).
*   `event.currentTarget` (ou `this`) será `divPai` no manipulador do `divPai`, `divFilho` no manipulador do `divFilho`, e `botao` no manipulador do `botao`.

Compreender o fluxo de eventos é crucial para técnicas avançadas como a delegação de eventos e para controlar como e quando os eventos são manipulados, o que veremos nas próximas aulas.

---

(Continua com Aula 11.2: Parando a Propagação de Eventos: `stopPropagation()`, Aula 11.3: Prevenindo o Comportamento Padrão: `preventDefault()`, etc.)

