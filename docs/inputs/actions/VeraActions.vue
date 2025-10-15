<template>
  <div class="vera-actions">
    <div class="actions-header">
      <h3>Acciones Rápidas</h3>
    </div>

    <div class="actions-grid">
      <button
        v-for="action in actions"
        :key="action.id"
        class="action-btn"
        :class="{ disabled: action.disabled }"
        :disabled="action.disabled"
        @click="handleAction(action)"
      >
        <span class="action-icon">{{ action.icon }}</span>
        <span class="action-label">{{ action.label }}</span>
        <span v-if="action.badge" class="action-badge">{{ action.badge }}</span>
      </button>
    </div>

    <div class="actions-footer">
      <p class="helper-text">Acciones genéricas para testing de integraciones</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Action {
  id: string
  label: string
  icon: string
  badge?: string
  disabled?: boolean
  handler: () => void | Promise<void>
}

const emit = defineEmits<{
  action: [actionId: string]
}>()

const actions = ref<Action[]>([
  {
    id: 'refresh-data',
    label: 'Refrescar Datos',
    icon: '🔄',
    handler: () => handleRefreshData(),
  },
  {
    id: 'generate-report',
    label: 'Generar Reporte',
    icon: '📄',
    handler: () => handleGenerateReport(),
  },
  {
    id: 'export-csv',
    label: 'Exportar CSV',
    icon: '📊',
    handler: () => handleExportCsv(),
  },
  {
    id: 'sync-erp',
    label: 'Sincronizar ERP',
    icon: '⚡',
    badge: 'Beta',
    handler: () => handleSyncErp(),
  },
  {
    id: 'test-integration',
    label: 'Test Integración',
    icon: '🔧',
    handler: () => handleTestIntegration(),
  },
  {
    id: 'clear-cache',
    label: 'Limpiar Caché',
    icon: '🗑️',
    handler: () => handleClearCache(),
  },
])

function handleAction(action: Action) {
  console.log(`Action triggered: ${action.id}`)
  emit('action', action.id)
  action.handler()
}

// Handlers genéricos para testing
function handleRefreshData() {
  console.log('Refreshing data...')
  // Futuro: trigger ETL refresh
}

function handleGenerateReport() {
  console.log('Generating report...')
  // Futuro: llamar API para generar reporte
}

function handleExportCsv() {
  console.log('Exporting CSV...')
  // Futuro: descargar CSV de métricas
}

function handleSyncErp() {
  console.log('Syncing with ERP...')
  // Futuro: trigger sincronización manual
}

function handleTestIntegration() {
  console.log('Testing integration...')
  // Futuro: test de health check de servicios
}

function handleClearCache() {
  console.log('Clearing cache...')
  localStorage.clear()
  alert('Caché limpiado. Recarga la página.')
}
</script>

<style scoped>
.vera-actions {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}

.actions-header {
  margin-bottom: 16px;
}

.actions-header h3 {
  margin: 0;
  font-size: 16px;
  color: #2c3e50;
  font-weight: 600;
}

.actions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  overflow-y: auto;
  flex: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-size: 14px;
  position: relative;
}

.action-btn:hover:not(:disabled) {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1);
  transform: translateY(-1px);
}

.action-btn:active:not(:disabled) {
  transform: translateY(0);
}

.action-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-icon {
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 6px;
  flex-shrink: 0;
}

.action-label {
  flex: 1;
  color: #2c3e50;
  font-weight: 500;
}

.action-badge {
  background: #3498db;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
}

.actions-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.helper-text {
  font-size: 12px;
  color: #95a5a6;
  margin: 0;
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .vera-actions {
    padding: 12px;
  }

  .actions-header h3 {
    font-size: 14px;
  }

  .action-btn {
    padding: 12px;
  }

  .action-icon {
    font-size: 18px;
    width: 28px;
    height: 28px;
  }

  .action-label {
    font-size: 13px;
  }
}
</style>
