// Integração com a IA Gaia - Chat Assistant (Versão Simulada Localmente)

// Caminhos relativos corrigidos para a pasta gestores
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
        <p>Olá, gestor(a)! Eu sou a Gaia, assistente virtual do BioMundo. Como posso auxiliá-lo(a) hoje?</p>
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

// Função que gera respostas simuladas para o chat - versão para gestores
function gerarRespostaSimulada(mensagem) {
  const msgLower = mensagem.toLowerCase();

  const intents = [
    {
      keywords: ["olá", "oi", "ola", "bom dia", "boa tarde", "boa noite"],
      response: "Olá! Como posso auxiliá-lo(a) hoje? Estou aqui para fornecer informações sobre gestão de equipes, indicadores de desempenho e políticas da empresa.",
    },
    {
      keywords: ["relatório", "relatorio", "dashboard", "indicadores"],
      response: "Os relatórios de desempenho e dashboards de indicadores estão disponíveis no Portal do Gestor. Você pode filtrar por departamento, período e tipo de KPI. Para análises personalizadas, utilize a função 'Relatórios Customizados' ou entre em contato com o time de Business Intelligence pelo ramal 2301.",
    },
    {
      keywords: ["avaliação", "avaliacao", "desempenho", "feedback"],
      response: "O ciclo de avaliação de desempenho ocorre trimestralmente. No Portal do Gestor, seção 'Avaliações', você encontra os formulários, cronograma e histórico de feedbacks. Lembre-se que as avaliações devem ser concluídas até o dia 10 do mês seguinte ao término do trimestre.",
    },
    {
      keywords: ["contratação", "contratacao", "recrutar", "vaga"],
      response: "Para iniciar um processo de contratação, preencha o formulário de requisição de pessoal no Portal do Gestor. O RH irá validar o pedido em até 48h úteis. Após aprovação, você poderá acompanhar todo o processo seletivo, incluindo triagem de currículos e agendamento de entrevistas, pela plataforma.",
    },
    {
      keywords: ["orçamento", "orcamento", "budget", "despesa"],
      response: "O sistema de gestão orçamentária está disponível na seção 'Financeiro' do Portal do Gestor. Você pode visualizar o orçamento aprovado para seu departamento, acompanhar a execução mensal e solicitar remanejamentos. Lembre-se que qualquer despesa não prevista precisa de aprovação prévia do diretor da área.",
    },
    {
      keywords: ["treinamento", "capacitação", "capacitacao", "equipe", "desenvolvimento"],
      response: "A Bio Mundo oferece diversos programas de treinamento. Como gestor, você pode inscrever sua equipe nos treinamentos disponíveis ou solicitar capacitações específicas através do módulo 'Desenvolvimento de Pessoas'. A verba para treinamentos externos é aprovada trimestralmente, então planeje com antecedência.",
    },
    {
      keywords: ["reunião", "reuniao", "agenda", "diretoria"],
      response: "As reuniões de alinhamento de gestão ocorrem todas as segundas-feiras, às 9h, na sala virtual 'Estratégia'. A pauta deve ser compartilhada com antecedência mínima de 24h. Para reuniões extraordinárias com a diretoria, utilize o sistema de agendamento no Portal do Gestor com pelo menos 48h de antecedência.",
    },
    {
      keywords: ["resultado", "meta", "objetivo", "performance"],
      response: "O acompanhamento de resultados e metas pode ser feito no dashboard em tempo real disponível no Portal do Gestor. As métricas são atualizadas diariamente e os alertas de desvio são enviados automaticamente quando há variação superior a 10% do planejado. Para ajustar metas durante o período, solicite revisão via formulário específico.",
    },
    {
      keywords: ["folga", "ausência", "ausencia", "férias", "ferias"],
      response: "Como gestor, você deve aprovar as solicitações de folga e férias de sua equipe através do módulo 'Gestão de Pessoas'. Lembre-se de observar o calendário de escalas para garantir cobertura adequada. As solicitações devem ser aprovadas ou rejeitadas em até 48h e as ausências programadas devem ser comunicadas aos demais departamentos envolvidos.",
    },
    {
      keywords: ["produto", "estoque", "lançamento", "lancamento"],
      response: "Informações detalhadas sobre produtos, estoque e lançamentos estão disponíveis no sistema de gestão comercial. Como gestor, você tem acesso ampliado, podendo visualizar margens, previsões de venda e análises de desempenho por categoria. Para novas estratégias de produto, agende uma reunião com o time de Marketing e Produto via Portal.",
    }
  ];

  // Busca por intenção correspondente
  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      if (msgLower.includes(keyword)) {
        return intent.response;
      }
    }
  }

  // Resposta genérica padrão
  return "Desculpe, não entendi bem sua pergunta. Você pode reformular ou perguntar sobre benefícios, férias, salários ou treinamentos?";
}
