<template>
  <div
    ref="buttonEl"
    class="draggable-button"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @click="onClick"
  >
    <div class="button-icon">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- V -->
        <path d="M8 8 L12 22 L16 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Chat bubble -->
        <rect x="18" y="10" width="10" height="8" rx="2" stroke="white" stroke-width="2"/>
        <path d="M21 18 L23 21 L25 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div v-if="showNotification" class="notification-badge">1</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDraggable } from '@/composables/useDraggable'

interface Props {
  showNotification?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

const buttonEl = ref<HTMLElement | null>(null)
const { position, isDragging, startDrag: startDragging } = useDraggable()

let dragStartTime = 0

function startDrag(event: MouseEvent | TouchEvent) {
  dragStartTime = Date.now()
  startDragging(event)
}

function onClick(event: MouseEvent) {
  const dragDuration = Date.now() - dragStartTime

  // Solo emitir click si no fue un drag (< 200ms)
  if (dragDuration < 200 && !isDragging.value) {
    emit('click')
  }
}

onMounted(() => {
  // Asegurar que el botón esté visible al inicio
  if (position.value.x > window.innerWidth - 80) {
    position.value.x = window.innerWidth - 100
  }
  if (position.value.y > window.innerHeight - 80) {
    position.value.y = window.innerHeight - 100
  }
})
</script>

<style scoped>
.draggable-button {
  position: fixed;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.4);
  cursor: grab;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.draggable-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.5);
}

.draggable-button:active {
  cursor: grabbing;
  transform: scale(0.95);
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #e74c3c;
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .draggable-button {
    width: 56px;
    height: 56px;
  }

  .button-icon svg {
    width: 28px;
    height: 28px;
  }
}
</style>
