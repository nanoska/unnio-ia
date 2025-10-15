<template>
  <div class="vera-sidebar" :class="{ 'slide-in': isVisible }">
    <div class="sidebar-header">
      <div class="header-content">
        <h2 class="sidebar-title">VERA</h2>
        <span class="sidebar-subtitle">Asistente IA</span>
      </div>
      <div class="header-actions">
        <button @click="$emit('expand')" class="icon-btn" title="Expandir">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 0h6v2H2v4H0V0zm16 0v6h-2V2h-4V0h6zM0 16v-6h2v4h4v2H0zm14 0h-4v-2h4v-4h2v6z"/>
          </svg>
        </button>
        <button @click="$emit('minimize')" class="icon-btn" title="Minimizar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 8h8v2H4z"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="sidebar-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <div class="sidebar-content">
      <VeraChat
        v-if="activeTab === 'chat'"
        :is-compact="true"
        @expand="$emit('expand')"
      />
      <VeraMetrics v-else-if="activeTab === 'metrics'" />
      <VeraActions v-else-if="activeTab === 'actions'" />
    </div>

    <div class="sidebar-footer">
      <p class="footer-text">v0.2.0 | Satori Studio</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VeraChat from '../chat/VeraChat.vue'
import VeraMetrics from '../metrics/VeraMetrics.vue'
import VeraActions from '../actions/VeraActions.vue'

interface Props {
  isVisible?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  minimize: []
  expand: []
}>()

type TabId = 'chat' | 'metrics' | 'actions'

interface Tab {
  id: TabId
  label: string
  icon: string
}

const tabs: Tab[] = [
  { id: 'chat', label: 'Chat', icon: '💬' },
  { id: 'metrics', label: 'Métricas', icon: '📊' },
  { id: 'actions', label: 'Acciones', icon: '⚙️' },
]

const activeTab = ref<TabId>('chat')
</script>

<style scoped>
.vera-sidebar {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 380px;
  max-height: 600px;
  height: 80vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9998;
  transform: translateX(calc(100% + 40px));
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.vera-sidebar.slide-in {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
}

.header-content {
  flex: 1;
}

.sidebar-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.sidebar-subtitle {
  font-size: 12px;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  gap: 6px;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.sidebar-tabs {
  display: flex;
  background: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
}

.tab-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
}

.tab-btn:hover {
  background: rgba(52, 152, 219, 0.05);
  color: #3498db;
}

.tab-btn.active {
  color: #3498db;
  border-bottom-color: #3498db;
  background: white;
}

.tab-icon {
  font-size: 20px;
}

.tab-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sidebar-footer {
  padding: 10px 16px;
  background: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  text-align: center;
}

.footer-text {
  margin: 0;
  font-size: 11px;
  color: #95a5a6;
}

/* Responsive */
@media (max-width: 768px) {
  .vera-sidebar {
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  .sidebar-title {
    font-size: 18px;
  }

  .tab-btn {
    padding: 10px 6px;
  }

  .tab-icon {
    font-size: 18px;
  }

  .tab-label {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .tab-label {
    display: none;
  }

  .tab-btn {
    padding: 12px 8px;
  }
}
</style>
