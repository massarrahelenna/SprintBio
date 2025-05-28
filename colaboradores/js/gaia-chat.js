// Integração com a IA Gaia - Chat Assistant (Versão Simulada Localmente)

// Caminhos relativos corrigidos para a pasta colaboradores
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
        <p>Olá! Eu sou a Gaia, assistente virtual do BioMundo. Como posso ajudar você hoje?</p>
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
  const chatButton = document.getElementById("chat-button");
  if (chatButton) {
    chatButton.addEventListener("click", function () {
      console.log("Botão de chat clicado, abrindo chat...");
      chatContainer.style.display = "flex";
      const chatInput = document.getElementById("chat-input");
      if (chatInput) {
        chatInput.focus();
      } else {
        console.error("Elemento de input não encontrado!");
      }
    });
  } else {
    console.warn(
      "Botão de chat não encontrado! Verifique se ele foi criado corretamente."
    );
  }

  // Fechar chat
  const closeButton = document.getElementById("chat-close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      console.log("Botão de fechar clicado, fechando chat...");
      chatContainer.style.display = "none";
    });
  } else {
    console.warn("Botão de fechar chat não encontrado!");
  }

  // Enviar mensagem (ao clicar no botão)
  const sendButton = document.getElementById("chat-send");
  if (sendButton) {
    sendButton.addEventListener("click", function () {
      console.log("Botão de enviar clicado");
      sendMessage();
    });
  } else {
    console.warn("Botão de enviar não encontrado!");
  }

  // Enviar mensagem (ao pressionar Enter)
  const chatInput = document.getElementById("chat-input");
  if (chatInput) {
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        console.log("Tecla Enter pressionada");
        sendMessage();
      }
    });
  } else {
    console.warn("Input de chat não encontrado!");
  }
}

// Enviar mensagem para a IA simulada
async function sendMessage() {
  console.log("Função sendMessage iniciada");
  const input = document.getElementById("chat-input");
  if (!input) {
    console.error("Elemento de input não encontrado!");
    return;
  }

  const message = input.value.trim();
  console.log("Mensagem do usuário:", message);

  if (!message) {
    console.log("Mensagem vazia, ignorando");
    return;
  }

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
  console.log(`Adicionando mensagem de ${sender}:`, text);
  const messagesContainer = document.getElementById("chat-messages");
  if (!messagesContainer) {
    console.error("Container de mensagens não encontrado!");
    return;
  }

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
  console.log("Mostrando indicador de digitação");
  const messagesContainer = document.getElementById("chat-messages");
  if (!messagesContainer) {
    console.error("Container de mensagens não encontrado!");
    return;
  }

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
  console.log("Removendo indicador de digitação");
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  } else {
    console.warn("Indicador de digitação não encontrado para remoção");
  }
}

// Função que gera respostas simuladas para o chat
function gerarRespostaSimulada(mensagem) {
  const msgLower = mensagem.toLowerCase();

  const intents = [
    {
      keywords: ["olá", "oi", "ola", "bom dia", "boa tarde", "boa noite"],
      response: "Olá! Em que posso ajudar você hoje? Estou aqui para responder questões sobre sua carreira, benefícios e políticas da empresa.",
    },
    {
      keywords: ["quem é você", "quem e voce", "o que você faz"],
      response: "Eu sou Gaia, a assistente virtual da Bio Mundo. Posso te ajudar com informações sobre a empresa e seus processos internos.",
    },
    {
      keywords: ["benefício", "beneficios", "vantagens"],
      response: "Como colaborador da Bio Mundo, você tem direito a diversos benefícios, incluindo plano de saúde, vale-alimentação, desconto em produtos, programa de participação nos resultados e auxílio educação.",
    },
    {
      keywords: ["férias", "ferias"],
      response: "O processo de solicitação de férias deve ser iniciado com pelo menos 30 dias de antecedência. Converse com seu gestor e formalize pelo portal.",
    },
    {
      keywords: ["reembolso"],
      response: "Os reembolsos devem ser solicitados pelo sistema interno com nota fiscal e justificativa. A aprovação é feita pelo gestor direto.",
    },
    {
      keywords: ["folha de pagamento", "holerite", "contracheque", "contra-cheque"],
      response: "A folha de pagamento é liberada até o 5º dia útil do mês. Você pode acessá-la pelo portal do colaborador.",
    },
    {
      keywords: ["salário", "salario", "pagamento", "aumento"],
      response: "Questões salariais devem ser tratadas com o DP pelo e-mail dp@biomundo.com.br ou ramal 2204.",
    },
    {
      keywords: ["cartão de ponto", "ponto", "bater ponto"],
      response: "O registro de ponto deve ser feito diariamente pelo aplicativo interno ou pelo terminal na loja.",
    },
    {
      keywords: ["advertência", "advertencia", "punição", "suspensão"],
      response: "Advertências são aplicadas conforme a política interna da empresa e registradas no prontuário do colaborador.",
    },
    {
      keywords: ["demissão", "desligamento", "dispensa"],
      response: "O processo de desligamento é conduzido pelo RH com entrevista de saída e acerto de contas conforme CLT.",
    },
    { 
      keywords: ["treinamento", "curso", "capacitação", "capacitacao"],
      response: "Temos diversos programas de desenvolvimento. Consulte a área 'Desenvolvimento' no portal do colaborador.",
    },
    {
      keywords: ["promoção", "crescimento", "carreira", "plano de carreira"],
      response: "Nosso plano de carreira está estruturado por desempenho e metas. Converse com seu gestor sobre seu plano de desenvolvimento individual (PDI).",
    },
    {
      keywords: ["documento", "documentação", "atestado", "comprovante"],
      response: "Documentos como atestados devem ser entregues via sistema interno até 48h após o afastamento.",
    },
    {
      keywords: ["vale-transporte", "vale transporte", "transporte"],
      response: "O vale-transporte é concedido com base no endereço residencial cadastrado. Atualize seus dados se houver mudança.",
    },
    {
      keywords: ["vale-alimentação", "vale alimentação", "refeição", "alimentação"],
      response: "O vale-alimentação é creditado todo dia 1º de cada mês no cartão Alelo.",
    },
    {
      keywords: ["plano de saúde", "saúde", "convenio médico"],
      response: "Nosso plano de saúde é o Bradesco Saúde. Você pode incluir dependentes e consultar a rede pelo app da operadora.",
    },
    {
      keywords: ["psicólogo", "psicologo", "saúde mental", "apoio psicológico"],
      response: "Oferecemos apoio psicológico gratuito com agendamento pelo portal do colaborador, com sessões online ou presenciais.",
    },
    {
      keywords: ["app", "aplicativo", "mobile", "celular"],
      response: "Nosso aplicativo está disponível para Android e iOS. Procure por 'Bio Mundo Colaborador' na loja de apps.",
    },
    {
      keywords: ["ramal", "telefone", "contato", "comunicação"],
      response: "Você pode entrar em contato com o RH no ramal 2204 ou pelo e-mail rh@biomundo.com.br.",
    },
    {
      keywords: ["não entendi", "não sei", "?", "ajuda", "duvida", "dúvida"],
      response: "Sem problemas! Você pode perguntar sobre férias, benefícios, holerite, plano de carreira, treinamentos, etc.",
    }
  ];

  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      if (msgLower.includes(keyword)) {
        return intent.response;
      }
    }
  }

  return "Desculpe, não entendi bem sua pergunta. Você pode reformular ou perguntar sobre benefícios, férias, salários ou treinamentos?";

}
