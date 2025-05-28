// Integração com a IA Gaia - Chat Assistant (Versão Simulada Localmente)

// Caminhos relativos corrigidos para a pasta RH
const BASE_PATH = "..";

let chatContainer = null;
let chatHistory = [];

// Variável para controle do tempo de resposta simulado
let respostaMinTime = 700;
let respostaMaxTime = 2000;

document.addEventListener("DOMContentLoaded", function () {
  console.log("Inicializando chat da Gaia (versão simulada)...");

  // Adiciona o botão do chatbot no canto inferior direito da página
  createChatButton();

  // Adiciona o container do chat (inicialmente oculto)
  createChatContainer();

  // Adiciona eventos para abrir/fechar o chat
  setupChatEvents();
});

// Função para criar o botão de chat
function createChatButton() {
  const chatButton = document.createElement("div");
  chatButton.className = "chat-button";
  chatButton.innerHTML = '<i class="fas fa-comment"></i>';
  chatButton.setAttribute("id", "chat-button");
  chatButton.setAttribute("title", "Converse com a Gaia - Assistente Virtual");
  document.body.appendChild(chatButton);
}

// Função para criar o container do chat
function createChatContainer() {
  chatContainer = document.createElement("div");
  chatContainer.className = "chat-container";
  chatContainer.innerHTML = `
    <div class="chat-header">
      <div class="chat-title">
        <img src="${BASE_PATH}/assets/images/gaia-ai.jpg" alt="Gaia IA" class="chat-avatar" />
        <span>Gaia - Assistente Virtual</span>
      </div>
      <button class="chat-close" id="chat-close"><i class="fas fa-times"></i></button>
    </div>
    <div class="chat-messages" id="chat-messages">
      <div class="message bot-message">
        <p>Olá, profissional de RH! Eu sou a Gaia, assistente virtual do BioMundo. Como posso auxiliá-lo(a) hoje?</p>
      </div>
    </div>
    <div class="chat-input-container">
      <input type="text" id="chat-input" placeholder="Digite sua mensagem..." />
      <button id="chat-send">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  `;
  document.body.appendChild(chatContainer);
  chatContainer.style.display = "none";
}

// Configurar eventos do chat
function setupChatEvents() {
  // Abrir chat ao clicar no botão
  document.getElementById("chat-button").addEventListener("click", function () {
    chatContainer.style.display = "flex";
    document.getElementById("chat-input").focus();
  });

  // Fechar chat
  document.getElementById("chat-close").addEventListener("click", function () {
    chatContainer.style.display = "none";
  });

  // Enviar mensagem (ao clicar no botão)
  document.getElementById("chat-send").addEventListener("click", sendMessage);

  // Enviar mensagem (ao pressionar Enter)
  document
    .getElementById("chat-input")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
}

// Enviar mensagem para a IA simulada
async function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();

  if (!message) return;

  // Limpa o campo de input
  input.value = "";

  // Adiciona a mensagem do usuário à tela
  addMessage(message, "user");

  try {
    // Mostra indicador de digitação
    showTypingIndicator();

    // Simula processamento da IA
    const tempoResposta =
      Math.floor(Math.random() * (respostaMaxTime - respostaMinTime + 1)) +
      respostaMinTime;

    setTimeout(async () => {
      // Remove o indicador de digitação
      removeTypingIndicator();

      // Gera e adiciona a resposta da Gaia simulada
      const resposta = gerarRespostaSimulada(message);
      addMessage(resposta, "bot");
    }, tempoResposta);
  } catch (error) {
    console.error("Erro ao processar mensagem:", error);
    removeTypingIndicator();
    addMessage(
      "Desculpe, estou enfrentando dificuldades técnicas. Por favor, tente novamente mais tarde ou entre em contato com nosso suporte.",
      "bot"
    );
  }
}

// Adicionar mensagem à tela de chat
function addMessage(text, sender) {
  const messagesContainer = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;

  const messagePara = document.createElement("p");
  messagePara.textContent = text;
  messageDiv.appendChild(messagePara);

  messagesContainer.appendChild(messageDiv);

  // Armazena no histórico
  chatHistory.push({
    role: sender === "user" ? "user" : "assistant",
    content: text,
  });

  // Scroll para a mensagem mais recente
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Mostrar indicador de digitação
function showTypingIndicator() {
  const messagesContainer = document.getElementById("chat-messages");
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot-message typing-indicator";
  typingDiv.id = "typing-indicator";

  typingDiv.innerHTML = `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `;

  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remover indicador de digitação
function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Função que gera respostas simuladas para o chat - versão para RH
function gerarRespostaSimulada(mensagem) {
  // Converte a mensagem para minúsculas para facilitar a correspondência
  const msgLower = mensagem.toLowerCase();

  // Base de conhecimento para RH
  if (
    msgLower.includes("olá") ||
    msgLower.includes("oi") ||
    msgLower.includes("ola") ||
    msgLower.includes("bom dia") ||
    msgLower.includes("boa tarde") ||
    msgLower.includes("boa noite")
  ) {
    return "Olá! Como posso auxiliá-lo(a) hoje? Estou aqui para fornecer informações sobre processos de RH, políticas de pessoas e gestão de talentos da Bio Mundo.";
  }

  if (
    msgLower.includes("recrutamento") ||
    msgLower.includes("seleção") ||
    msgLower.includes("selecao") ||
    msgLower.includes("vaga") ||
    msgLower.includes("candidato")
  ) {
    return "No sistema de Recrutamento e Seleção você pode abrir novas requisições, acompanhar os processos em andamento e verificar o status dos candidatos. Você também pode acessar o banco de talentos para buscar perfis específicos e configurar os testes técnicos para cada posição.";
  }

  if (
    msgLower.includes("folha") ||
    msgLower.includes("pagamento") ||
    msgLower.includes("salário") ||
    msgLower.includes("salario") ||
    msgLower.includes("holerite")
  ) {
    return "O processamento da folha de pagamento é realizado até o dia 25 de cada mês. Você pode acessar o sistema de folha para verificar cálculos, gerar relatórios e emitir holerites. Lembre-se que alterações salariais precisam ser registradas até o dia 20 para serem processadas no mesmo mês.";
  }

  if (
    msgLower.includes("benefício") ||
    msgLower.includes("beneficio") ||
    msgLower.includes("vale") ||
    msgLower.includes("plano de saúde") ||
    msgLower.includes("plano de saude")
  ) {
    return "A gestão de benefícios é feita pelo sistema de RH integrado. Nele, você pode cadastrar novos colaboradores, alterar planos, emitir 2ª via de carteiras e gerar relatórios de utilização. Lembre-se que inclusões no plano de saúde devem ser feitas até o dia 15 para vigência no mês seguinte.";
  }

  if (
    msgLower.includes("ponto") ||
    msgLower.includes("frequência") ||
    msgLower.includes("frequencia") ||
    msgLower.includes("banco de horas") ||
    msgLower.includes("hora extra")
  ) {
    return "O sistema de controle de ponto está disponível na plataforma de RH. Como administrador, você consegue aprovar ajustes, gerar relatórios de frequência, acompanhar o banco de horas e configurar compensações. O fechamento ocorre no dia 20 de cada mês, após esta data não é possível fazer alterações no período anterior.";
  }

  if (
    msgLower.includes("treinamento") ||
    msgLower.includes("desenvolvimento") ||
    msgLower.includes("capacitação") ||
    msgLower.includes("capacitacao") ||
    msgLower.includes("curso")
  ) {
    return "Na plataforma de Treinamento e Desenvolvimento você pode cadastrar novos cursos, gerenciar inscrições, acompanhar a evolução de cada colaborador e gerar certificados. O orçamento anual de T&D é distribuído por trimestre e pode ser consultado no dashboard da área.";
  }

  if (
    msgLower.includes("admissão") ||
    msgLower.includes("admissao") ||
    msgLower.includes("contratação") ||
    msgLower.includes("contratacao") ||
    msgLower.includes("onboarding")
  ) {
    return "O processo de admissão é 100% digital. Através do sistema de onboarding, você pode enviar os documentos para assinatura eletrônica, acompanhar o status de cada contratação e configurar o fluxo de integração. Toda admissão deve ser iniciada com pelo menos 5 dias úteis de antecedência para garantir o início sem intercorrências.";
  }

  if (
    msgLower.includes("demissão") ||
    msgLower.includes("demissao") ||
    msgLower.includes("desligamento") ||
    msgLower.includes("rescisão") ||
    msgLower.includes("rescisao")
  ) {
    return "Para iniciar um processo de desligamento, utilize o formulário específico no sistema de RH, preenchendo o motivo e coletando as aprovações necessárias. O workflow automatizado irá notificar todas as áreas envolvidas e gerar a documentação para assinatura. Lembre-se de agendar a entrevista de desligamento e solicitar a devolução de equipamentos.";
  }

  if (
    msgLower.includes("férias") ||
    msgLower.includes("ferias") ||
    msgLower.includes("recesso") ||
    msgLower.includes("afastamento")
  ) {
    return "A programação de férias deve ser registrada no sistema com antecedência mínima de 30 dias. Como administrador de RH, você pode aprovar solicitações, verificar períodos aquisitivos, gerar avisos de férias e controlar o cronograma de ausências por departamento. O módulo também gera automaticamente a projeção da provisão de férias.";
  }

  if (
    msgLower.includes("relatório") ||
    msgLower.includes("relatorio") ||
    msgLower.includes("indicador") ||
    msgLower.includes("dashboard") ||
    msgLower.includes("métrica") ||
    msgLower.includes("metrica")
  ) {
    return "Os relatórios analíticos de RH estão disponíveis no Business Intelligence da plataforma. Você tem acesso a mais de 40 indicadores de gestão de pessoas, incluindo turnover, absenteísmo, custo por contratação e tempo médio de preenchimento de vaga. Os dados são atualizados diariamente e podem ser exportados em diversos formatos.";
  }

  // Resposta genérica para perguntas não reconhecidas
  return "Obrigada por sua pergunta. Como assistente especializada em RH da Bio Mundo, posso fornecer informações sobre processos de gestão de pessoas, políticas internas, legislação trabalhista e melhores práticas. Para questões mais específicas sobre algum colaborador ou caso particular, recomendo consultar diretamente o sistema ou entrar em contato com o gerente de RH pelo ramal 2200.";
}
