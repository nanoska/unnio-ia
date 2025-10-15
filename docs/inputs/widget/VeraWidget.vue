<template>
  <div class="vera-widget">
    <!-- Backdrop para modo expandido -->
    <Transition name="fade">
      <div
        v-if="widgetStore.showBackdrop"
        class="widget-backdrop"
        @click="widgetStore.collapse()"
      />
    </Transition>

    <!-- Botón flotante (modo minimizado) -->
    <DraggableButton
      v-if="widgetStore.isMinimized"
      @click="widgetStore.toggleCompact()"
      :show-notification="false"
    />

    <!-- Sidebar (modo compacto) -->
    <Transition name="slide">
      <VeraSidebar
        v-if="widgetStore.isCompact"
        :is-visible="widgetStore.isCompact"
        @minimize="widgetStore.minimize()"
        @expand="widgetStore.expand()"
      />
    </Transition>

    <!-- Modo expandido (pantalla completa) -->
    <Transition name="zoom">
      <div v-if="widgetStore.isExpanded" class="widget-expanded">
        <div class="expanded-header">
          <div class="header-content">
            <h1 class="expanded-title">VERA Assistant</h1>
            <p class="expanded-subtitle">Asistente IA para ERP</p>
          </div>
          <div class="header-actions">
            <button @click="widgetStore.collapse()" class="header-btn" title="Modo compacto">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 0v2H2v4H0V0h6zm14 0v6h-2V2h-4V0h6zM6 20H0v-6h2v4h4v2zm14 0h-6v-2h4v-4h2v6z"/>
              </svg>
            </button>
            <button @click="widgetStore.minimize()" class="header-btn" title="Cerrar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="expanded-content">
          <div class="expanded-sidebar-nav">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="widgetStore.setTab(tab.id)"
              :class="['nav-btn', { active: widgetStore.activeTab === tab.id }]"
              :title="tab.label"
            >
              <span class="nav-icon">{{ tab.icon }}</span>
              <span class="nav-label">{{ tab.label }}</span>
            </button>
          </div>

          <div class="expanded-main">
            <VeraChat
              v-if="widgetStore.activeTab === 'chat'"
              :is-compact="false"
            />
            <VeraMetrics v-else-if="widgetStore.activeTab === 'metrics'" />
            <VeraActions v-else-if="widgetStore.activeTab === 'actions'" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import DraggableButton from './DraggableButton.vue'
import VeraSidebar from './VeraSidebar.vue'
import VeraChat from '../chat/VeraChat.vue'
import VeraMetrics from '../metrics/VeraMetrics.vue'
import VeraActions from '../actions/VeraActions.vue'
import { useWidgetStore, WidgetTab } from '@/stores/widgetStore'

const widgetStore = useWidgetStore()

interface Tab {
  id: WidgetTab
  label: string
  icon: string
}

const tabs: Tab[] = [
  { id: WidgetTab.CHAT, label: 'Chat', icon: '💬' },
  { id: WidgetTab.METRICS, label: 'Métricas', icon: '📊' },
  { id: WidgetTab.ACTIONS, label: 'Acciones', icon: '⚙️' },
]
</script>

<style scoped>
.vera-widget {
  position: relative;
  z-index: 9997;
}

/* Backdrop */
.widget-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9996;
}

/* Expanded mode */
.widget-expanded {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 1200px;
  height: 85vh;
  max-height: 800px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9997;
}

.expanded-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
}

.header-content {
  flex: 1;
}

.expanded-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.expanded-subtitle {
  margin: 4px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.header-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.expanded-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.expanded-sidebar-nav {
  width: 80px;
  background: #f9f9f9;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 8px;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  background: transparent;
  border: none;
  border-left: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
}

.nav-btn:hover {
  background: rgba(52, 152, 219, 0.05);
  color: #3498db;
}

.nav-btn.active {
  color: #3498db;
  border-left-color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}

.nav-icon {
  font-size: 24px;
}

.nav-label {
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
}

.expanded-main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(calc(100% + 40px));
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .widget-expanded {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }

  .expanded-header {
    padding: 16px;
  }

  .expanded-title {
    font-size: 20px;
  }

  .expanded-subtitle {
    font-size: 12px;
  }

  .expanded-sidebar-nav {
    width: 60px;
    padding: 12px 0;
  }

  .nav-btn {
    padding: 10px 6px;
  }

  .nav-icon {
    font-size: 20px;
  }

  .nav-label {
    font-size: 9px;
  }
}

@media (max-width: 480px) {
  .expanded-sidebar-nav {
    width: 50px;
  }

  .nav-label {
    display: none;
  }

  .nav-btn {
    padding: 12px 4px;
  }
}
</style>
