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
    link.addEventListener("click", async (event) => {
      event.preventDefault();

      // Fecha o menu após clique (mobile)
      const lista = document.getElementById('modulo-lista');
      const btn   = document.querySelector('.menu-toggle');
      if (lista && btn) {
        lista.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }

      // Oculta boas-vindas e mostra loading
      if (boasVindasSection) boasVindasSection.style.display = "none";
      conteudoModuloDiv.innerHTML = "<p>Carregando conteúdo...</p>";

      const moduleKey = link.getAttribute("href");
      const fileName  = moduloFileNames[moduleKey];

      if (fileName) {
        const filePath = `curso_javascript_conteudo/${fileName}`;
        console.log("Tentando carregar:", filePath);

        try {
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status} ao buscar ${filePath}`);
          }
          const markdownContent = await response.text();
          if (typeof marked !== "undefined") {
            conteudoModuloDiv.innerHTML = marked.parse(markdownContent);
          } else {
            console.error("Marked.js não definida.");
            conteudoModuloDiv.innerHTML = "<p>Erro: biblioteca Markdown não encontrada.</p>";
          }
        } catch (error) {
          console.error("Erro ao carregar módulo:", error);
          conteudoModuloDiv.innerHTML = `<p>Erro ao carregar o conteúdo do módulo: ${error.message}</p>`;
        }
      } else {
        conteudoModuloDiv.innerHTML = `<p>Conteúdo para "${link.textContent.trim()}" não disponível.</p>`;
        console.warn("Link não mapeado:", moduleKey);
      }
    });
  });
});
