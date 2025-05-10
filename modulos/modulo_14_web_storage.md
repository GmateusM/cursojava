# Módulo 14: Web Storage (LocalStorage e SessionStorage)

**Carga horária estimada:** 4 horas

## Objetivo do Módulo

Este módulo explora a Web Storage API, uma forma de permitir que aplicações web armazenem dados localmente no navegador do usuário. Focaremos nos dois principais mecanismos de armazenamento: `localStorage` e `sessionStorage`. Os alunos aprenderão como salvar, ler, remover dados, entender as diferenças entre os dois tipos de armazenamento, suas limitações, casos de uso e considerações de segurança.

---

## Aula 14.1: Introdução ao Web Storage

**Objetivo de Aprendizado:** Compreender o que é Web Storage, por que é útil e as diferenças fundamentais entre `localStorage` e `sessionStorage`.

Antes da Web Storage API, a principal forma de armazenar dados no lado do cliente era através de cookies HTTP. No entanto, cookies têm limitações significativas:

*   **Tamanho Pequeno:** Geralmente limitados a cerca de 4KB de dados.
*   **Enviados em Todas as Requisições HTTP:** Cookies são enviados com cada requisição HTTP para o domínio correspondente, o que pode aumentar o tráfego de rede desnecessariamente e impactar a performance.
*   **Complexidade de Manipulação:** Manipular cookies com JavaScript puro pode ser um pouco verboso.

A Web Storage API foi introduzida como parte do HTML5 para fornecer uma maneira mais robusta e fácil de armazenar dados no navegador, com maior capacidade de armazenamento e sem o overhead de serem enviados com cada requisição HTTP.

### 14.1.1 O que é Web Storage?

A Web Storage API oferece dois mecanismos para armazenar dados no formato chave-valor (strings) no navegador do usuário:

1.  **`localStorage`:** Armazena dados sem data de expiração. Os dados permanecem disponíveis mesmo após o navegador ser fechado e reaberto. Eles só são removidos através de JavaScript ou pela limpeza manual dos dados do navegador pelo usuário.
2.  **`sessionStorage`:** Armazena dados apenas para a duração da sessão da página. Uma sessão de página dura enquanto o navegador estiver aberto e sobrevive a recarregamentos e restaurações de página. Fechar a aba ou o navegador encerrará a sessão e limpará os dados do `sessionStorage`.

Ambos os objetos (`localStorage` e `sessionStorage`) são acessíveis através do objeto global `window` (ou seja, `window.localStorage` e `window.sessionStorage`, ou simplesmente `localStorage` e `sessionStorage`). Eles fornecem os mesmos métodos para interagir com os dados.

### 14.1.2 Principais Diferenças

| Característica      | `localStorage`                                  | `sessionStorage`                                     |
| :------------------ | :---------------------------------------------- | :--------------------------------------------------- |
| **Persistência**    | Persistente (até ser explicitamente removido)   | Temporário (duração da sessão da aba/navegador)      |
| **Escopo**          | Compartilhado entre todas as abas/janelas da mesma origem (protocolo, domínio, porta) | Limitado à aba/janela que o criou. Outras abas, mesmo da mesma origem, têm seu próprio `sessionStorage`. |
| **Disponibilidade** | Disponível mesmo após fechar e reabrir o navegador | Limpo quando a aba/navegador é fechado               |
| **Capacidade**      | Geralmente 5-10MB por origem (varia por navegador) | Geralmente 5-10MB por origem (varia por navegador)    |
| **Casos de Uso**    | Preferências do usuário, temas, dados de aplicação offline (simples) | Estado temporário da UI, dados de formulário não enviados, carrinho de compras em uma única sessão |

### 14.1.3 Vantagens sobre Cookies

*   **Maior Capacidade de Armazenamento:** Significativamente mais espaço do que os 4KB dos cookies.
*   **Não Enviado com Requisições HTTP:** Os dados não são automaticamente transmitidos para o servidor, reduzindo o tráfego de rede e melhorando a performance.
*   **API Mais Simples:** Métodos diretos para salvar, ler e remover dados (`setItem`, `getItem`, `removeItem`).

### 14.1.4 Limitações e Considerações

*   **Apenas Strings:** Web Storage só pode armazenar strings. Para armazenar objetos ou arrays, você precisa serializá-los para JSON (usando `JSON.stringify()`) antes de salvar e desserializá-los (usando `JSON.parse()`) ao ler.
*   **Síncrono:** As operações da Web Storage API são síncronas, o que significa que podem bloquear a thread principal se você estiver armazenando ou recuperando grandes quantidades de dados. Para operações mais complexas ou maiores, IndexedDB (uma API de banco de dados no navegador) pode ser mais apropriada.
*   **Segurança:** Os dados armazenados no Web Storage não são inerentemente seguros. Eles são acessíveis por qualquer script JavaScript rodando na mesma origem. Portanto, **não armazene informações sensíveis** (como senhas, tokens de sessão de longa duração, informações de cartão de crédito) no `localStorage` ou `sessionStorage`.
*   **Limites de Armazenamento:** Embora maior que cookies, o armazenamento é limitado (geralmente 5-10MB). Se o limite for excedido, uma exceção (`QuotaExceededError`) será lançada.

---

## Aula 14.2: Usando `localStorage`

**Objetivo de Aprendizado:** Aprender a usar os métodos da API `localStorage` para salvar, recuperar, remover itens e limpar todo o armazenamento.

O objeto `localStorage` permite que você acesse o armazenamento local específico da origem para o documento atual. Os dados armazenados aqui persistem até serem explicitamente deletados.

### 14.2.1 Salvando Dados com `setItem()`

O método `localStorage.setItem(key, value)` adiciona um item ao armazenamento, ou atualiza o valor de um item existente se a chave já existir. Ambos `key` e `value` devem ser strings.

```javascript
// Salvando uma string simples
localStorage.setItem("nomeUsuario", "Maria Silva");
localStorage.setItem("temaPreferido", "escuro");

// Para salvar um número, ele será convertido para string
localStorage.setItem("idadeUsuario", 30); // Armazenado como "30"

// Para salvar objetos ou arrays, use JSON.stringify()
const preferencias = {
    notificacoes: true,
    idioma: "pt-BR"
};
localStorage.setItem("preferenciasUsuario", JSON.stringify(preferencias));

console.log("Dados salvos no localStorage!");
```

### 14.2.2 Lendo Dados com `getItem()`

O método `localStorage.getItem(key)` recupera o valor associado à chave especificada. Se a chave não existir, ele retorna `null`.

```javascript
const nome = localStorage.getItem("nomeUsuario");
console.log("Nome do Usuário:", nome); // Saída: Maria Silva

const tema = localStorage.getItem("temaPreferido");
console.log("Tema Preferido:", tema); // Saída: escuro

const idadeString = localStorage.getItem("idadeUsuario");
const idade = parseInt(idadeString, 10); // Lembre-se de converter se necessário
console.log("Idade do Usuário:", idade); // Saída: 30 (número)

const preferenciasString = localStorage.getItem("preferenciasUsuario");
if (preferenciasString) {
    const preferenciasObj = JSON.parse(preferenciasString);
    console.log("Preferências do Usuário (Objeto):", preferenciasObj);
    console.log("Notificações ativas?", preferenciasObj.notificacoes); // Saída: true
}

const chaveInexistente = localStorage.getItem("naoExiste");
console.log("Chave Inexistente:", chaveInexistente); // Saída: null
```

### 14.2.3 Removendo Dados com `removeItem()`

O método `localStorage.removeItem(key)` remove o item associado à chave especificada do armazenamento.

```javascript
localStorage.removeItem("temaPreferido");
console.log("Tema preferido após remoção:", localStorage.getItem("temaPreferido")); // Saída: null
```

Se você tentar remover uma chave que não existe, o método não fará nada e não lançará um erro.

### 14.2.4 Limpando Todo o `localStorage` com `clear()`

O método `localStorage.clear()` remove todos os itens do armazenamento para aquela origem.

```javascript
// Antes de limpar
console.log("Nome antes de limpar:", localStorage.getItem("nomeUsuario"));
console.log("Preferências antes de limpar:", localStorage.getItem("preferenciasUsuario"));

localStorage.clear();

console.log("Nome após limpar:", localStorage.getItem("nomeUsuario")); // Saída: null
console.log("Preferências após limpar:", localStorage.getItem("preferenciasUsuario")); // Saída: null
console.log("localStorage foi completamente limpo.");
```

Use `clear()` com cuidado, pois ele apaga todos os dados armazenados pela sua aplicação para aquela origem.

### 14.2.5 Acessando Chaves e o Número de Itens

Você também pode iterar sobre as chaves ou obter o número de itens armazenados:

*   `localStorage.length`: Retorna o número de itens armazenados.
*   `localStorage.key(index)`: Retorna o nome da chave na posição `index`.

```javascript
localStorage.setItem("item1", "valor1");
localStorage.setItem("item2", "valor2");

console.log("Número de itens no localStorage:", localStorage.length); // Saída: 2 (ou mais, dependendo do que já estava lá)

for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    const valor = localStorage.getItem(chave);
    console.log(`Chave: ${chave}, Valor: ${valor}`);
}
```

**Nota:** A ordem das chaves retornadas por `localStorage.key(index)` não é garantida e pode variar entre navegadores ou execuções.

---

## Aula 14.3: Usando `sessionStorage`

**Objetivo de Aprendizado:** Entender como usar `sessionStorage`, seus métodos (que são os mesmos do `localStorage`) e quando ele é mais apropriado.

O objeto `sessionStorage` funciona de maneira muito similar ao `localStorage`. A principal diferença, como discutido anteriormente, é o ciclo de vida dos dados: eles persistem apenas durante a sessão da página (enquanto a aba ou o navegador estiver aberto).

Os métodos para `sessionStorage` são idênticos aos do `localStorage`:

*   `sessionStorage.setItem(key, value)`
*   `sessionStorage.getItem(key)`
*   `sessionStorage.removeItem(key)`
*   `sessionStorage.clear()`
*   `sessionStorage.length`
*   `sessionStorage.key(index)`

**Exemplo de Uso:**

```javascript
// Salvando dados na sessão
sessionStorage.setItem("usuarioLogado", "temporario@email.com");
sessionStorage.setItem("idSessao", "xyz123abc");

// Lendo dados da sessão
const usuarioSessao = sessionStorage.getItem("usuarioLogado");
console.log("Usuário da Sessão:", usuarioSessao);

// Se você fechar esta aba e abrir uma nova (mesmo que para a mesma página),
// o sessionStorage.getItem("usuarioLogado") retornará null na nova aba,
// pois cada aba tem seu próprio sessionStorage.

// Removendo um item da sessão
sessionStorage.removeItem("idSessao");

// Limpando todo o sessionStorage (para esta aba)
// sessionStorage.clear();
```

**Casos de Uso para `sessionStorage`:**

*   **Dados de Formulário Temporários:** Se um usuário está preenchendo um formulário longo, você pode salvar os dados no `sessionStorage` periodicamente. Se a página for recarregada acidentalmente, os dados podem ser restaurados.
*   **Estado da UI Temporário:** Manter o estado de componentes da interface do usuário que não precisam persistir entre sessões (ex: qual aba está ativa em um conjunto de abas, se um menu está expandido).
*   **Informações de Sessão Única:** Dados que são relevantes apenas enquanto o usuário está ativamente usando aquela aba específica.

---

## Aula 14.4: Lidando com o Evento `storage`

**Objetivo de Aprendizado:** Aprender sobre o evento `storage` e como usá-lo para sincronizar dados entre diferentes abas ou janelas da mesma origem quando o `localStorage` é modificado.

Quando os dados no `localStorage` são alterados (adicionados, modificados ou removidos) em uma aba ou janela, um evento `storage` é disparado em **outras** abas ou janelas abertas para a mesma origem. Isso não acontece para alterações no `sessionStorage`, nem na aba que originou a mudança no `localStorage`.

Este evento permite que diferentes partes da sua aplicação, rodando em abas separadas, reajam a mudanças no armazenamento local compartilhado.

O objeto de evento `StorageEvent` passado para o manipulador do evento `storage` tem as seguintes propriedades úteis:

*   `key`: A chave que foi alterada (ou `null` se `clear()` foi chamado).
*   `oldValue`: O valor antigo da chave (ou `null` se o item foi adicionado ou `clear()` foi chamado).
*   `newValue`: O novo valor da chave (ou `null` se o item foi removido ou `clear()` foi chamado).
*   `url` (ou `uri`): A URL da página que causou a mudança no armazenamento.
*   `storageArea`: O objeto de armazenamento (`localStorage` ou `sessionStorage`) onde a mudança ocorreu (será `localStorage` neste caso).

**Exemplo:**

```javascript
// Em script.js (ou em um <script> na sua página)
window.addEventListener("storage", function(event) {
    console.log("Evento de storage detectado!");
    console.log("Chave alterada:", event.key);
    console.log("Valor antigo:", event.oldValue);
    console.log("Novo valor:", event.newValue);
    console.log("URL da página que alterou:", event.url);
    console.log("Área de armazenamento:", event.storageArea);

    if (event.key === "nomeUsuario") {
        // Atualizar a UI em outras abas se o nome do usuário mudou
        // Por exemplo: document.getElementById("displayNomeUsuario").textContent = event.newValue;
        alert(`O nome do usuário foi alterado para: ${event.newValue} em outra aba.`);
    }

    if (event.key === null && event.oldValue === null && event.newValue === null) {
        // Isso geralmente indica que localStorage.clear() foi chamado
        alert("O localStorage foi limpo em outra aba!");
    }
});

// Para testar, abra duas abas da mesma página.
// Em uma aba, execute no console:
// localStorage.setItem("nomeUsuario", "Novo Nome Teste");
// localStorage.setItem("outroItem", "valorQualquer");
// localStorage.removeItem("outroItem");
// localStorage.clear();
// Você deverá ver os logs do evento "storage" na outra aba.
```

O evento `storage` é uma ferramenta poderosa para manter a consistência de dados entre múltiplas instâncias da sua aplicação rodando no mesmo navegador.

## Conclusão do Módulo

A Web Storage API, com `localStorage` e `sessionStorage`, oferece uma maneira conveniente e eficiente de armazenar dados no lado do cliente. Compreender suas funcionalidades, diferenças e limitações é essencial para construir aplicações web modernas que podem reter informações do usuário, preferências ou estado da aplicação de forma eficaz. Lembre-se sempre das considerações de segurança e de usar cada tipo de armazenamento para o propósito mais adequado.
