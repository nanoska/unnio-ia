<template>
  <div class="vera-chat" :class="{ compact: isCompact }">
    <div class="chat-header">
      <h3>Chat con VERA</h3>
      <button
        v-if="isCompact"
        @click="$emit('expand')"
        class="expand-btn"
        title="Expandir"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 0h6v2H2v4H0V0zm16 0v6h-2V2h-4V0h6zM0 16v-6h2v4h4v2H0zm14 0h-4v-2h4v-4h2v6z"/>
        </svg>
      </button>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.role]"
      >
        <div class="message-content">
          <strong class="message-author">{{ message.role === 'user' ? 'Tú' : 'VERA' }}:</strong>
          <p class="message-text">{{ message.content }}</p>
        </div>
        <div class="message-time">{{ message.time }}</div>
      </div>

      <div v-if="loading" class="message assistant">
        <div class="message-content">
          <strong class="message-author">VERA:</strong>
          <p class="message-text loading-dots">Pensando...</p>
        </div>
      </div>
    </div>

    <div v-if="showSuggestions && messages.length <= 1" class="suggestions">
      <p class="suggestions-title">Prueba preguntar:</p>
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="fillInput(suggestion)"
        class="suggestion-btn"
      >
        {{ suggestion }}
      </button>
    </div>

    <div class="chat-input-container">
      <textarea
        v-model="userInput"
        @keydown.enter.exact.prevent="sendMessage"
        placeholder="Pregúntale algo a VERA..."
        class="chat-input"
        :disabled="loading"
        rows="1"
        ref="textareaRef"
      />
      <button
        @click="sendMessage"
        :disabled="loading || !userInput.trim()"
        class="send-btn"
        title="Enviar"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M0 0l20 10L0 20V12l14-2L0 8z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'

interface Props {
  isCompact?: boolean
  showSuggestions?: boolean
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  time: string
}

const props = withDefaults(defineProps<Props>(), {
  isCompact: false,
  showSuggestions: true,
})

const emit = defineEmits<{
  expand: []
}>()

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: '¡Hola! Soy VERA, tu asistente para consultas del ERP. ¿En qué puedo ayudarte?',
    time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
  },
])

const userInput = ref('')
const loading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const suggestions = [
  '¿Cuál es el total de ventas del mes?',
  'Muéstrame los top 5 clientes',
  'Stock crítico de productos',
]

async function sendMessage() {
  if (!userInput.value.trim() || loading.value) return

  const userQuestion = userInput.value.trim()

  // Agregar mensaje del usuario
  messages.value.push({
    role: 'user',
    content: userQuestion,
    time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
  })

  userInput.value = ''
  loading.value = true

  // Auto-resize textarea
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }

  // Scroll al final
  await nextTick()
  scrollToBottom()

  // Simular respuesta de la IA (TODO: Integrar con backend real)
  setTimeout(() => {
    messages.value.push({
      role: 'assistant',
      content: `Recibí tu pregunta: "${userQuestion}". Por ahora soy un prototipo, pero pronto podré responder consultas reales conectándome al DataMart.`,
      time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    })
    loading.value = false

    // Scroll al final
    nextTick(() => {
      scrollToBottom()
    })
  }, 1500)
}

function fillInput(text: string) {
  userInput.value = text
  textareaRef.value?.focus()
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Auto-resize textarea
watch(userInput, () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
})

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.vera-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f9f9f9;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
  color: #2c3e50;
  font-weight: 600;
}

.expand-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.expand-btn:hover {
  background: #f5f5f5;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 85%;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.message-content {
  padding: 10px 14px;
  border-radius: 12px;
  background: white;
  border: 1px solid #e0e0e0;
}

.message.user .message-content {
  background: #3498db;
  border-color: #3498db;
  color: white;
}

.message-author {
  font-size: 12px;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}

.message.user .message-author {
  color: rgba(255, 255, 255, 0.9);
}

.message.assistant .message-author {
  color: #3498db;
}

.message-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-time {
  font-size: 11px;
  color: #95a5a6;
  margin-top: 4px;
  align-self: flex-end;
}

.loading-dots::after {
  content: '...';
  animation: dots 1.5s infinite;
}

@keyframes dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
}

.suggestions {
  padding: 12px 16px;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.suggestions-title {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  margin: 0 0 8px 0;
}

.suggestion-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  margin-bottom: 6px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #2c3e50;
  transition: all 0.2s ease;
}

.suggestion-btn:hover {
  background: #e3f2fd;
  border-color: #3498db;
  color: #3498db;
}

.suggestion-btn:last-child {
  margin-bottom: 0;
}

.chat-input-container {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.chat-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  min-height: 40px;
  max-height: 120px;
  overflow-y: auto;
  transition: border-color 0.2s ease;
}

.chat-input:focus {
  outline: none;
  border-color: #3498db;
}

.chat-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.send-btn {
  padding: 10px 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: #2980b9;
}

.send-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.send-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Compact mode adjustments */
.vera-chat.compact {
  font-size: 14px;
}

.vera-chat.compact .chat-header {
  padding: 12px 16px;
}

.vera-chat.compact .chat-header h3 {
  font-size: 14px;
}

.vera-chat.compact .chat-messages {
  padding: 12px;
}

.vera-chat.compact .message-content {
  padding: 8px 12px;
}

.vera-chat.compact .message-text {
  font-size: 13px;
}

/* Responsive */
@media (max-width: 768px) {
  .chat-header {
    padding: 12px;
  }

  .chat-header h3 {
    font-size: 14px;
  }

  .chat-messages {
    padding: 12px;
  }

  .message {
    max-width: 90%;
  }

  .message-content {
    padding: 8px 12px;
  }

  .message-text {
    font-size: 13px;
  }

  .chat-input-container {
    padding: 10px 12px;
  }
}
</style>
