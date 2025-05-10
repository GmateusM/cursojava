## Módulo 10: Animações e Transições em JavaScript

Neste módulo, exploraremos como criar animações e transições dinâmicas em suas páginas web usando JavaScript. Abordaremos desde conceitos básicos até técnicas mais avançadas, permitindo que você adicione interatividade e apelo visual às suas aplicações.

### 10.1. Introdução às Animações e Transições

*   **Diferença entre Animações e Transições:** Esclarecer a distinção fundamental entre transições CSS e animações JavaScript.
*   **Quando Usar Cada Abordagem:** Discutir cenários onde cada técnica é mais apropriada.
*   **Performance:** Considerações sobre performance e como otimizar animações para uma experiência fluida.

### 10.2. Animações com CSS Transitions e Animations

*   **Transições CSS:**
    *   Propriedades: `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`.
    *   Eventos: `transitionend`.
    *   Exemplos práticos: Efeitos de hover, menus que deslizam, etc.
*   **Animações CSS com `@keyframes`:**
    *   Definindo keyframes para animações mais complexas.
    *   Propriedades: `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`, `animation-iteration-count`, `animation-direction`, `animation-fill-mode`, `animation-play-state`.
    *   Exemplos práticos: Animações de carregamento, elementos que aparecem e desaparecem, etc.

### 10.3. Manipulando Animações com JavaScript

*   **Controlando Classes CSS:** Adicionar e remover classes CSS dinamicamente para acionar transições e animações definidas no CSS.
*   **JavaScript e `requestAnimationFrame`:**
    *   Criando animações suaves e eficientes com `requestAnimationFrame`.
    *   Exemplos: Mover elementos, alterar opacidade, etc.
*   **Bibliotecas de Animação JavaScript:**
    *   Visão geral de bibliotecas populares como GreenSock (GSAP), Anime.js, etc.
    *   Vantagens e desvantagens de usar bibliotecas.
    *   Exemplos básicos de uso.

### 10.4. Animações com a Web Animations API (WAAPI)

*   **Introdução à WAAPI:** Uma API JavaScript para criar animações complexas e interativas.
    *   Vantagens sobre CSS Transitions/Animations e bibliotecas de terceiros (performance, controle mais fino).
*   **Principais Conceitos:**
    *   `Element.animate()`: O método principal para criar animações.
    *   Keyframes: Definindo os estágios da animação.
    *   Timing Properties: Controlando a duração, atraso, iteração, etc.
    *   Controle de Animação: `play()`, `pause()`, `cancel()`, `finish()`.
    *   Eventos de Animação: `onfinish`, `oncancel`.
*   **Exemplos Práticos:**
    *   Criar animações simples (movimento, rotação, escala).
    *   Animações em sequência e paralelas.
    *   Animações com múltiplos elementos.
    *   Animações interativas (controladas por eventos do usuário).

### 10.5. Considerações de Performance e Boas Práticas

*   **Evitar Layout Thrashing:** Otimizar o acesso e a modificação do DOM para evitar recálculos desnecessários.
*   **Usar `requestAnimationFrame` para Animações Suaves:** Sincronizar animações com o ciclo de atualização do navegador.
*   **Escolher a Ferramenta Certa:** Decidir entre CSS Transitions/Animations, Web Animations API ou bibliotecas de terceiros com base nos requisitos do projeto.
*   **Testar em Diferentes Navegadores e Dispositivos:** Garantir a compatibilidade e o bom desempenho em diversas plataformas.

Este módulo fornecerá uma base sólida para criar animações e transições atraentes e eficientes em suas aplicações web usando JavaScript e as tecnologias relacionadas.
