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
  const msgLower = mensagem.toLowerCase();

  const intents = [
    {
      keywords: ["olá", "oi", "ola", "bom dia", "boa tarde", "boa noite"],
      response: "Olá! Como posso auxiliá-lo(a) hoje? Estou aqui para fornecer informações sobre processos de RH, políticas de pessoas e gestão de talentos da Bio Mundo.",
    },
    {
      keywords: ["recrutamento", "seleção", "selecao", "vaga", "candidato"],
      response: "No sistema de Recrutamento e Seleção você pode abrir novas requisições, acompanhar os processos em andamento e verificar o status dos candidatos. Você também pode acessar o banco de talentos para buscar perfis específicos e configurar os testes técnicos para cada posição.",
    },
    {
      keywords: ["folha", "pagamento", "salário", "salario", "holerite"],
      response: "O processamento da folha de pagamento é realizado até o dia 25 de cada mês. Você pode acessar o sistema de folha para verificar cálculos, gerar relatórios e emitir holerites. Lembre-se que alterações salariais precisam ser registradas até o dia 20 para serem processadas no mesmo mês.",
    },
    {
      keywords: ["benefício", "beneficio", "vale", "plano de saúde", "plano de saude"],
      response: "A gestão de benefícios é feita pelo sistema de RH integrado. Nele, você pode cadastrar novos colaboradores, alterar planos, emitir 2ª via de carteiras e gerar relatórios de utilização. Lembre-se que inclusões no plano de saúde devem ser feitas até o dia 15 para vigência no mês seguinte.",
    },
    {
      keywords: ["ponto", "frequência", "frequencia", "banco de horas", "hora extra"],
      response: "O sistema de controle de ponto está disponível na plataforma de RH. Como administrador, você consegue aprovar ajustes, gerar relatórios de frequência, acompanhar o banco de horas e configurar compensações. O fechamento ocorre no dia 20 de cada mês, após esta data não é possível fazer alterações no período anterior.",
    },
    {
      keywords: ["treinamento", "desenvolvimento", "capacitação", "capacitacao", "curso"],
      response: "Na plataforma de Treinamento e Desenvolvimento você pode cadastrar treinamentos internos, aprovar inscrições da equipe e acompanhar os indicadores de capacitação. Os treinamentos obrigatórios são atualizados a cada trimestre e comunicados automaticamente via e-mail corporativo.",
    },
    {
      keywords: ["desligamento", "rescisão", "rescisao", "demissão", "demissao"],
      response: "Para iniciar o processo de desligamento, acesse o módulo de 'Desligamento' no sistema de RH. Você poderá preencher os motivos, encaminhar para validação da diretoria e agendar entrevistas de saída. A rescisão será processada em até 10 dias após o último dia trabalhado.",
    },
    {
      keywords: ["avaliação", "avaliacao", "desempenho", "feedback"],
      response: "O ciclo de avaliação de desempenho ocorre duas vezes ao ano. Acesse o portal de RH para revisar as metas, registrar feedbacks contínuos e acompanhar os planos de desenvolvimento. Os gestores devem finalizar as avaliações até o último dia útil do mês de encerramento do ciclo.",
    },
    {
      keywords: ["documento", "declaração", "declaracao", "atestado", "contrato"],
      response: "Todos os documentos, como declarações, contratos e comprovantes de vínculo, podem ser solicitados e emitidos pela área 'Documentos RH' no portal interno. Os documentos são liberados em até 3 dias úteis após a solicitação.",
    },
    {
      keywords: ["ajuda", "suporte", "dúvida", "duvida", "problema"],
      response: "Se você estiver enfrentando dificuldades com os sistemas ou tiver dúvidas sobre os processos de RH, entre em contato pelo e-mail suporte.rh@biomundo.com.br ou ligue para o ramal 2310. O horário de atendimento é das 9h às 18h, de segunda a sexta.",
    }
  ];

  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      if (msgLower.includes(keyword)) {
        return intent.response;
      }
    }
  }

  // Resposta genérica padrão
  return "Obrigada por sua pergunta. Sou a assistente virtual do RH da Bio Mundo. Posso ajudar com dúvidas sobre folha de pagamento, benefícios, recrutamento, avaliações e outros temas de gestão de pessoas. Caso sua dúvida seja específica, envie um e-mail para rh@biomundo.com.br.";
}
