<template>
  <div class="vera-metrics">
    <div class="metrics-header">
      <h3>Métricas</h3>
      <button @click="refresh" :disabled="loading" class="refresh-btn" title="Refrescar">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 3V0L4 4l4 4V5c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4H2c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6z"/>
        </svg>
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando métricas...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>⚠️ Error al cargar métricas</p>
      <button @click="refresh" class="retry-btn">Reintentar</button>
    </div>

    <div v-else class="metrics-grid">
      <MetricCard
        v-for="(metric, index) in metrics"
        :key="index"
        :label="metric.label"
        :value="metric.value"
        :icon="metric.icon"
        :trend="metric.trend"
        :trend-value="metric.trendValue"
        @click="handleMetricClick(metric)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MetricCard from './MetricCard.vue'
import { useMetrics, type MetricData } from '@/composables/useMetrics'

const { metrics, loading, error, refresh } = useMetrics()

function handleMetricClick(metric: MetricData) {
  console.log('Metric clicked:', metric)
  // Futuro: abrir modal con detalles, gráficos, etc.
}
</script>

<style scoped>
.vera-metrics {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}

.metrics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.metrics-header h3 {
  margin: 0;
  font-size: 16px;
  color: #2c3e50;
  font-weight: 600;
}

.refresh-btn {
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

.refresh-btn:hover:not(:disabled) {
  background: #f5f5f5;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-btn:active:not(:disabled) {
  transform: rotate(180deg);
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  color: #666;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f5f5f5;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.retry-btn:hover {
  background: #2980b9;
}

.metrics-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  flex: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .vera-metrics {
    padding: 12px;
  }

  .metrics-header h3 {
    font-size: 14px;
  }

  .metrics-grid {
    gap: 10px;
  }
}
</style>
