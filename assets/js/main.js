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
function inicializarFiltroCampanha() {
  const filtro = document.getElementById("filtroCampanha");
  const itens = document.querySelectorAll(".gallery-item");

  if (!filtro) return;

  function filtrarGaleria(campanha) {
    itens.forEach(item => {
      const pertence = item.getAttribute("data-campanha") === campanha;
      item.style.display = pertence ? "block" : "none";
    });
  }

  filtro.addEventListener("change", () => {
    filtrarGaleria(filtro.value);
  });

  filtrarGaleria(filtro.value);
}

// JS para os graficos da pesquisa de clima
document.addEventListener("DOMContentLoaded", function () {
  const dadosTabela = [
    { item: "Coesão entre Colegas", media: 2.98, favorabilidade: "66,36%" },
    { item: "Carga de Trabalho", media: 2.18, favorabilidade: "60,80%" },
    { item: "Reconhecimento", media: 3.03, favorabilidade: "69,70%" },
    { item: "Comprometimento", media: 2.91, favorabilidade: "62,34%" },
    { item: "Estilo de Gerenciamento", media: 3.12, favorabilidade: "72,73%" },
    { item: "Comunicação", media: 3.02, favorabilidade: "71,59%" },
    { item: "Treinamento e Desenvolvimento", media: 3.12, favorabilidade: "71,21%" },
    { item: "Existe integração entre colegas e funcionários nessa empresa", media: 3.42, favorabilidade: "81,82%" }
  ];

  // Criar tabela
  let html = `
    <table style="width: 100%; border-collapse: collapse; font-family: sans-serif;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid #ccc; padding: 8px;">#</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Dimensão / Item Consolidado</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Nota Média (de 0 a 4)</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Favorabilidade</th>
        </tr>
      </thead>
      <tbody>
  `;

  dadosTabela.forEach((d, i) => {
    html += `
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${i + 1}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${d.item}</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${d.media.toFixed(2)}</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${d.favorabilidade}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;

  // Inserir tabela na div com id="tabelaClima"
  document.getElementById("tabelaClima").innerHTML = html;
});

//tabela de respostas por franquia
document.addEventListener("DOMContentLoaded", function () {
  fetch('/assets/dados/biomundo_respostas_final_formatado.json')
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o JSON.");
      return response.json();
    })
    .then(respostas => {
      const contagem = {};
      respostas.forEach(r => {
        const franquia = r.franquia || "Não especificado";
        contagem[franquia] = (contagem[franquia] || 0) + 1;
      });

      const labels = Object.keys(contagem);
      const valores = Object.values(contagem);

      const ctx = document.getElementById('graficoRespostasPorFranquia')?.getContext('2d');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total de Respostas por Franquia',
            data: valores,
            backgroundColor: '#00512b',      // Verde institucional
            borderColor: '#ee8f2f',          // Laranja Bio Mundo
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'x',
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Quantidade de Respostas por Unidade',
              color: '#333333',
              font: {
                size: 18,
                weight: 'bold'
              }
            },
            tooltip: {
              backgroundColor: '#00512b',
              titleColor: '#ffffff',
              bodyColor: '#ffffff'
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Número de Respostas',
                color: '#333333'
              },
              ticks: {
                color: '#333333'
              },
              grid: {
                color: '#ecddcc' // Bege claro para linhas de fundo
              }
            },
            y: {
              title: {
                display: true,
                text: 'Franquias',
                color: '#333333'
              },
              ticks: {
                color: '#333333'
              },
              grid: {
                color: '#ecddcc'
              }
            }
          }
        }
      });
    })
    .catch(err => {
      console.error("Erro ao gerar o gráfico:", err);
      document.getElementById("respostasPorFranquia").innerHTML =
        "<p style='color:red;'>Erro ao carregar o gráfico de respostas por franquia.</p>";
    });
});


//grafico presente no excel
document.addEventListener("DOMContentLoaded", function () {
  const dados = [
    { item: "Coesão entre Colegas", media: 2.98, favorabilidade: 66.36 },
    { item: "Carga de Trabalho", media: 2.18, favorabilidade: 60.80 },
    { item: "Reconhecimento", media: 3.03, favorabilidade: 69.70 },
    { item: "Comprometimento", media: 2.91, favorabilidade: 62.34 },
    { item: "Estilo de Gerenciamento", media: 3.12, favorabilidade: 72.73 },
    { item: "Comunicação", media: 3.02, favorabilidade: 71.59 },
    { item: "Treinamento e Desenvolvimento", media: 3.12, favorabilidade: 71.21 },
    { item: "Compliance", media: 3.42, favorabilidade: 81.82 }
  ];

  const labels = dados.map(d => d.item);
  const medias = dados.map(d => d.media);
  const favorabilidades = dados.map(d => d.favorabilidade);

  const ctx = document.getElementById("graficoClimaDimensoes").getContext("2d");

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Favorabilidade',
          type: 'line',
          data: favorabilidades,
          yAxisID: 'y1',
          borderColor: '#ee8f2f',
          backgroundColor: '#ee8f2f',
          tension: 0,
          fill: false,
          pointBackgroundColor: '#ee8f2f',
          pointBorderColor: '#ee8f2f',
          pointRadius: 5,
          borderWidth: 3,
          clip: false // ⬅️ ESSENCIAL para sobreposição
        },
        {
          label: 'Média',
          type: 'bar',
          data: medias,
          yAxisID: 'y',
          backgroundColor: '#00512b',
          borderRadius: 4
        }

      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'PESQUISA DE CLIMA ORGANIZACIONAL',
          font: {
            size: 20,
            weight: 'bold'
          },
          color: '#00512b'
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.parsed.y;
              return context.dataset.label === "Favorabilidade"
                ? `${context.dataset.label}: ${value.toFixed(2)}%`
                : `${context.dataset.label}: ${value.toFixed(2)}`;
            }
          }
        },
        legend: {
          labels: {
            color: '#333333'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
          title: {
            display: true,
            text: 'Nota Média',
            color: '#333333'
          },
          ticks: { color: '#333333' },
          grid: { color: '#ecddcc' }
        },
        y1: {
          beginAtZero: true,
          max: 90,
          position: 'right',
          title: {
            display: true,
            text: 'Favorabilidade (%)',
            color: '#333333'
          },
          ticks: {
            callback: val => `${val.toFixed(0)}%`,
            color: '#333333'
          },
          grid: { drawOnChartArea: false }
        },
        x: {
          ticks: { color: '#333333' }
        }
      }
    }
  });
});
// baixar o excel
function baixarExcel() {
  const link = document.createElement("a");
  link.href = "/assets/dados/BIOMUNDO-ANALISES.xlsx";
  link.download = "BIOMUNDO - ANALISES.xlsx"; // Nome do arquivo para o usuário
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// baixar graficos
function exportarGrafico() {
  const canvas = document.getElementById('graficoClimaDimensoes');

  // Cria um novo canvas com fundo branco
  const canvasExport = document.createElement('canvas');
  canvasExport.width = canvas.width;
  canvasExport.height = canvas.height;

  const ctx = canvasExport.getContext('2d');

  // Preenche com branco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasExport.width, canvasExport.height);

  // Desenha o gráfico original em cima
  ctx.drawImage(canvas, 0, 0);

  // Gera o download
  const url = canvasExport.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = 'grafico_clima.png'; // nome fixo correto
  a.click();
}

