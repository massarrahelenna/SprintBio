// Integração com a IA Gaia - Chat Assistant
// Usando Google Gemini API para respostas inteligentes

let chatContainer = null;
let chatHistory = [];

// Chave de API do Google Gemini
const GEMINI_API_KEY = "AIzaSyAGOslqnZhkJ-TfWm9AXxysXV7eSLk8akI";

// Inicializa o cliente Google GenAI
const genAI = new window.googleGenerativeAI.GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Variável para controle de tentativas
let attemptCount = 0;
const MAX_ATTEMPTS = 2;

// Controle de problemas de acesso à API
let apiAccessError = false;

document.addEventListener("DOMContentLoaded", function () {
  console.log("Inicializando chat da Gaia com Gemini...");

  // Verifica se a API está acessível
  checkApiAccess();

  // Adiciona o botão do chatbot no canto inferior direito da página
  createChatButton();

  // Adiciona o container do chat (inicialmente oculto)
  createChatContainer();

  // Adiciona eventos para abrir/fechar o chat
  setupChatEvents();
});

// Função para verificar acesso à API
async function checkApiAccess() {
  try {
    // Teste simples para verificar acesso à API
    // Fazemos uma requisição mínima para testar
    const result = await model.generateContent("teste");
    console.log("API do Gemini está acessível!");
    apiAccessError = false;
  } catch (error) {
    console.error("Erro ao verificar acesso à API:", error);
    apiAccessError = true;
  }
}

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
        <img src="assets/images/bioMundo.png" alt="Gaia IA" class="chat-avatar" />
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
  document.getElementById("chat-button").addEventListener("click", function () {
    console.log("Botão de chat clicado, abrindo chat...");
    chatContainer.style.display = "flex";
    document.getElementById("chat-input").focus();
  });

  // Fechar chat
  document.getElementById("chat-close").addEventListener("click", function () {
    console.log("Botão de fechar clicado, fechando chat...");
    chatContainer.style.display = "none";
  });

  // Enviar mensagem (ao clicar no botão)
  const sendButton = document.getElementById("chat-send");
  if (sendButton) {
    sendButton.addEventListener("click", function () {
      console.log("Botão de enviar clicado");
      sendMessage();
    });
  } else {
    console.error("Botão de enviar não encontrado!");
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
    console.error("Input de chat não encontrado!");
  }
}

// Enviar mensagem para a IA (usando Gemini API)
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

  // Mostra indicador de digitação
  showTypingIndicator();

  // Reseta o contador de tentativas para cada nova mensagem
  attemptCount = 0;

  try {
    // Envia a mensagem para a API do Gemini
    const resposta = await sendToGemini(message);

    // Remove o indicador de digitação
    removeTypingIndicator();

    // Adiciona a resposta ao chat
    addMessage(resposta, "bot");
  } catch (error) {
    console.error("Erro ao comunicar com o Gemini:", error);
    removeTypingIndicator();

    // Resposta em caso de falha definitiva
    addMessage(
      "Desculpe, estou enfrentando dificuldades técnicas. Por favor, tente novamente mais tarde ou entre em contato com nosso suporte.",
      "bot"
    );
  }
}

// Função que integra com a API do Gemini
async function sendToGemini(message) {
  // Se já detectou problema de API anteriormente, usa diretamente o modo offline
  if (apiAccessError) {
    console.log(
      "Usando modo offline devido a problemas de acesso à API detectados anteriormente"
    );
    return usarRespostaOffline(message);
  }

  try {
    console.log(`Tentativa ${attemptCount + 1} de envio para Gemini API...`);

    // Preparar o contexto para a API
    const contextoPrevio = prepararContextoChat();

    // Preparar o prompt com instruções
    const prompt = `${contextoPrevio}
              
    Você é Gaia, a assistente virtual da Bio Mundo, uma empresa de produtos naturais no Brasil.
    Responda como uma assistente amigável, prestativa e conhecedora dos produtos naturais, suplementos
    e práticas de bem-estar da Bio Mundo. Se perguntado sobre algo que não sabe, seja honesta e
    sugira entrar em contato com um atendente humano. Seja concisa em suas respostas.
    
    Pergunta do usuário: ${message}`;

    // Configuração do chat
    const generationConfig = {
      temperature: 0.7,
      maxOutputTokens: 800,
      topK: 40,
      topP: 0.95,
    };

    // Configuração de segurança
    const safetySettings = [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ];

    // Gerar resposta usando a biblioteca oficial
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    console.log("Resposta da API Gemini:", response);

    if (response && response.text) {
      return response.text;
    } else {
      console.error("Formato de resposta da API inesperado:", response);
      return usarRespostaOffline(message);
    }
  } catch (error) {
    console.error("Erro detalhado na comunicação com o Gemini:", error);

    // Em caso de exceção, tenta novamente ou usa o fallback
    if (attemptCount < MAX_ATTEMPTS) {
      attemptCount++;
      console.log(
        `Tentando novamente após erro (${attemptCount}/${MAX_ATTEMPTS})...`
      );
      return await sendToGemini(message);
    }

    return usarRespostaOffline(message);
  }
}

// Função de respostas offline para fallback
function usarRespostaOffline(message) {
  console.log("Usando resposta offline devido a falha na API");

  const respostas = [
    "Desculpe, não consigo acessar minha base de conhecimento no momento. Para informações sobre produtos naturais da Bio Mundo, visite nossa loja mais próxima.",
    "Estou com problemas técnicos temporários. Nossa equipe está trabalhando para resolver. Enquanto isso, posso sugerir que você entre em contato diretamente com uma de nossas lojas?",
    "Parece que estou com dificuldades para acessar minhas informações. Para melhor atendimento, recomendo falar diretamente com um de nossos consultores.",
    "Desculpe pela inconveniência. Estou temporariamente limitada em minhas respostas. Para informações sobre a Bio Mundo, recomendo visitar nossa loja física mais próxima.",
    "Estou enfrentando algumas limitações técnicas. Para não comprometer sua experiência, sugiro entrar em contato com nossa central de atendimento para informações precisas.",
  ];

  // Seleciona uma resposta aleatória
  const indice = Math.floor(Math.random() * respostas.length);
  return respostas[indice];
}

// Prepara o contexto com base no histórico de conversa
function prepararContextoChat() {
  // Limita o histórico às últimas 6 mensagens para não sobrecarregar a API
  const historicoCurtado = chatHistory.slice(-6);

  if (historicoCurtado.length === 0) {
    return "";
  }

  // Formata o histórico em texto para enviar como contexto
  let contexto = "--- Histórico da conversa ---\n";
  historicoCurtado.forEach((msg) => {
    contexto += `${msg.role === "user" ? "Usuário" : "Gaia"}: ${msg.content}\n`;
  });

  return contexto;
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
