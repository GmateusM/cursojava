// script.js

// Função que mostra/oculta a lista de módulos (menu colapsável)
function toggleMenu() {
  const btn   = document.querySelector('.menu-toggle');
  const lista = document.getElementById('modulo-lista');
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  lista.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", () => {
  // --- Menu Colapsável ---
  const menuToggleBtn = document.querySelector('.menu-toggle');
  if (menuToggleBtn) {
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    menuToggleBtn.addEventListener('click', toggleMenu);
  }

  // --- Navegação por Módulos ---
  const navLinks = document.querySelectorAll("nav ul li a");
  const conteudoModuloDiv = document.getElementById("conteudo-modulo");
  const boasVindasSection = document.getElementById("boas-vindas");

  const moduloFileNames = {
    "#modulo1":  "modulo_01_introducao_javascript_ambiente.md",
    "#modulo2":  "modulo_02_sintaxe_tipos_dados.md",
    "#modulo3":  "modulo_03_operadores_estruturas_controle.md",
    "#modulo4":  "modulo_04_funcoes_detalhe.md",
    "#modulo5":  "modulo_05_objetos_arrays.md",
    "#modulo6":  "modulo_06_aprofundando_funcoes.md",
    "#modulo7":  "modulo_07_poo_prototypes.md",
    "#modulo8":  "modulo_08_poo_classes_es6.md",
    "#modulo9":  "modulo_09_assincrono.md",
    "#modulo10": "modulo_10_manipulacao_dom.md",
    "#modulo11": "modulo_11_eventos_dom_aprofundamento.md",
    "#modulo12": "modulo_12_modulos_es6.md",
    "#modulo13": "modulo_13_apis_e_fetch.md",
    "#modulo14": "modulo_14_web_storage.md",
    "#modulo15": "modulo_15_topicos_avancados_padroes_projeto.md",
    "#modulo16": "modulo_16_ferramentas_essenciais_desenvolvedor.md",
    "#modulo17": "modulo_11_frameworks_e_bibliotecas.md",
    "#modulo18": "modulo_18_node_js_e_backend.md",
    "#modulo19": "modulo_12_testes_e_depuracao.md",
    "#modulo20": "modulo_20_boas_praticas_performance_seguranca.md",
    "#modulo21": "modulo_21_projeto_final_e_preparacao_mercado.md"
  };

  navLinks.forEach(link => {
    link.addEventListener("click", async event => {
      event.preventDefault();

      // Fecha o menu (mobile)
      const lista = document.getElementById('modulo-lista');
      const btn   = document.querySelector('.menu-toggle');
      if (lista && btn) {
        lista.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }

      // Loading e oculta boas-vindas
      if (boasVindasSection) boasVindasSection.style.display = "none";
      conteudoModuloDiv.innerHTML = "<p>Carregando conteúdo...</p>";

      const key = link.getAttribute("href");
      const fileName = moduloFileNames[key];

      if (!fileName) {
        conteudoModuloDiv.innerHTML = `<p>Conteúdo para "${link.textContent.trim()}" não disponível.</p>`;
        console.warn("Link não mapeado:", key);
        return;
      }

      // ← Aqui foi alterado de `curso_javascript_conteudo/` para `modulos/`
      const filePath = `modulos/${fileName}`;
      console.log("Tentando carregar:", filePath);

      try {
        const resp = await fetch(filePath);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const md = await resp.text();
        conteudoModuloDiv.innerHTML = marked ? marked.parse(md) : md;
      } catch (err) {
        console.error("Erro ao carregar módulo:", err);
        conteudoModuloDiv.innerHTML = `<p>Erro ao carregar o conteúdo do módulo: ${err.message}</p>`;
      }
    });
  });
});
