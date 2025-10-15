<template>
  <div class="metric-card" @click="$emit('click')">
    <div class="metric-icon" v-if="icon">{{ icon }}</div>
    <div class="metric-content">
      <div class="metric-label">{{ label }}</div>
      <div class="metric-value">{{ value }}</div>
      <div class="metric-trend" v-if="trend && trendValue" :class="`trend-${trend}`">
        <span class="trend-icon">{{ trendIcon }}</span>
        <span class="trend-value">{{ trendValue }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  value: string | number
  icon?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

const props = defineProps<Props>()
defineEmits<{ click: [] }>()

const trendIcon = computed(() => {
  if (props.trend === 'up') return '↑'
  if (props.trend === 'down') return '↓'
  return '→'
})
</script>

<style scoped>
.metric-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.metric-card:hover {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1);
  transform: translateY(-2px);
}

.metric-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 8px;
}

.metric-content {
  flex: 1;
  min-width: 0;
}

.metric-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.metric-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  margin-top: 4px;
}

.trend-up {
  color: #27ae60;
}

.trend-down {
  color: #e74c3c;
}

.trend-neutral {
  color: #95a5a6;
}

.trend-icon {
  font-size: 14px;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .metric-card {
    padding: 10px;
    gap: 10px;
  }

  .metric-icon {
    font-size: 20px;
    width: 36px;
    height: 36px;
  }

  .metric-value {
    font-size: 18px;
  }
}
</style>
