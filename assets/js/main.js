// Funcionalidades JavaScript para os sites Biomais

document.addEventListener("DOMContentLoaded", function () {
  // Navegação por abas
  const tabLinks = document.querySelectorAll(".nav-tabs a");
  const tabContents = document.querySelectorAll(".tab-pane");

  tabLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove a classe active de todas as abas
      tabLinks.forEach((tab) => tab.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Adiciona a classe active na aba clicada
      this.classList.add("active");

      // Ativa o conteúdo correspondente
      const targetId = this.getAttribute("href").substring(1);
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Ativa a primeira aba por padrão
  if (tabLinks.length > 0 && tabContents.length > 0) {
    tabLinks[0].classList.add("active");
    tabContents[0].classList.add("active");
  }

  // Formulários
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Aqui seria implementada a lógica de envio do formulário
      // Por enquanto, apenas mostra uma mensagem de sucesso
      const formId = this.id;
      showAlert("success", "Formulário enviado com sucesso!");

      // Limpa o formulário
      this.reset();
    });
  });

  // Função para mostrar alertas
  window.showAlert = function (type, message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const mainContent = document.querySelector("main .container");
    mainContent.insertBefore(alertDiv, mainContent.firstChild);

    // Remove o alerta após 5 segundos
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  };

  // Inicialização de gráficos (quando necessário)
  if (typeof Chart !== "undefined") {
    initializeCharts();
  }

  // Adicionar botão menu hamburger nos headers dos portais
  const mainNav = document.querySelector(".main-nav");
  if (mainNav) {
    const menuToggle = document.createElement("button");
    menuToggle.className = "menu-toggle";
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector(".header-container").appendChild(menuToggle);

    // Evento de click para abrir/fechar menu
    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Adicionar classe para tabelas responsivas
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.className = "table-responsive";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);

    // Para tabelas em telas muito pequenas, adiciona classe para empilhar
    if (window.innerWidth <= 480) {
      table.classList.add("table-stack-mobile");

      // Adicionar data-label aos tds baseados no header correspondente
      const headers = Array.from(table.querySelectorAll("th")).map(
        (th) => th.textContent
      );
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        cells.forEach((cell, index) => {
          if (index < headers.length) {
            cell.setAttribute("data-label", headers[index]);
          }
        });
      });
    }
  });
});

// Função para inicializar gráficos
function initializeCharts() {
  // Exemplo de gráfico para pesquisa de clima
  const climaCtx = document.getElementById("climaChart");
  if (climaCtx) {
    new Chart(climaCtx, {
      type: "bar",
      data: {
        labels: [
          "Satisfação",
          "Engajamento",
          "Comunicação",
          "Liderança",
          "Ambiente",
        ],
        datasets: [
          {
            label: "Resultados da Pesquisa de Clima",
            data: [85, 78, 82, 75, 88],
            backgroundColor: [
              "rgba(0, 102, 51, 0.7)",
              "rgba(248, 161, 0, 0.7)",
              "rgba(0, 102, 51, 0.7)",
              "rgba(248, 161, 0, 0.7)",
              "rgba(0, 102, 51, 0.7)",
            ],
            borderColor: [
              "rgba(0, 102, 51, 1)",
              "rgba(248, 161, 0, 1)",
              "rgba(0, 102, 51, 1)",
              "rgba(248, 161, 0, 1)",
              "rgba(0, 102, 51, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
        responsive: true,
      },
    });
  }

  // Exemplo de gráfico para comparação entre franquias
  const franquiasCtx = document.getElementById("franquiasChart");
  if (franquiasCtx) {
    new Chart(franquiasCtx, {
      type: "radar",
      data: {
        labels: [
          "Satisfação",
          "Engajamento",
          "Comunicação",
          "Liderança",
          "Ambiente",
        ],
        datasets: [
          {
            label: "Franquia A",
            data: [85, 78, 82, 75, 88],
            backgroundColor: "rgba(0, 102, 51, 0.2)",
            borderColor: "rgba(0, 102, 51, 1)",
            pointBackgroundColor: "rgba(0, 102, 51, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(0, 102, 51, 1)",
          },
          {
            label: "Franquia B",
            data: [75, 82, 70, 85, 80],
            backgroundColor: "rgba(248, 161, 0, 0.2)",
            borderColor: "rgba(248, 161, 0, 1)",
            pointBackgroundColor: "rgba(248, 161, 0, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(248, 161, 0, 1)",
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
        responsive: true,
      },
    });
  }
}

// Função para alternar entre visualizações
function toggleView(viewId) {
  const views = document.querySelectorAll(".toggle-view");
  views.forEach((view) => {
    view.style.display = "none";
  });

  document.getElementById(viewId).style.display = "block";
}

// Função para carregar dados de usuário (simulação)
function loadUserData() {
  // Simulação de dados do usuário
  const userData = {
    nome: "João Silva",
    cpf: "123.456.789-00",
    email: "joao.silva@exemplo.com",
    dataIngresso: "15/03/2022",
    franquiaAtual: "Biomundo Centro",
    dataIngressoFranquia: "15/03/2022",
    funcao: "Atendente",
  };

  // Preenche os campos do perfil
  const profileFields = document.querySelectorAll(".profile-field span");
  profileFields.forEach((field) => {
    const fieldName = field.getAttribute("data-field");
    if (userData[fieldName]) {
      field.textContent = userData[fieldName];
    }
  });
}

// Função para carregar dados de pesquisa (simulação)
function loadSurveyData() {
  // Implementação futura
}

// Exportar funções para uso global
window.toggleView = toggleView;
window.loadUserData = loadUserData;
window.loadSurveyData = loadSurveyData;

// Ajustar posicionamentos ao redimensionar a página
window.addEventListener("resize", function () {
  // Fechar menu quando a tela for redimensionada
  const mainNav = document.querySelector(".main-nav");
  const menuToggleIcon = document.querySelector(".menu-toggle i");

  if (window.innerWidth > 768) {
    if (mainNav) mainNav.classList.remove("open");
    if (menuToggleIcon && menuToggleIcon.classList.contains("fa-times")) {
      menuToggleIcon.classList.remove("fa-times");
      menuToggleIcon.classList.add("fa-bars");
    }
  }
});


//tabelas rh
  document.addEventListener("DOMContentLoaded", function () {
    const filtro = document.getElementById("filtroCampanha");
    const itens = document.querySelectorAll(".gallery-item");

    function filtrarGaleria(campanha) {
      itens.forEach(item => {
        const pertence = item.getAttribute("data-campanha") === campanha;
        item.style.display = pertence ? "block" : "none";
      });
    }

    // Filtra ao mudar o select
    filtro.addEventListener("change", () => {
      filtrarGaleria(filtro.value);
    });

    // Filtra ao carregar a página com o valor inicial
    filtrarGaleria(filtro.value);
  });
