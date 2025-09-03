<template>
  <div class="app-container" data-testid="app-container">
    <el-container>
      <el-header class="header">
        <h1>Vue + TS + Vite + Element Plus + ECharts Demo</h1>
      </el-header>
      
      <el-container>
        <!-- 左侧控制面板 -->
        <el-aside width="400px" class="control-panel">
          <div class="control-section">
            <h3>数据筛选控制</h3>
            
            <!-- 下拉选择器 -->
            <el-form label-width="100px" class="control-form">
              <el-form-item label="数据类型">
                <el-select v-model="selectedDataType" placeholder="请选择数据类型" @change="updateData">
                  <el-option label="销售数据" value="sales" />
                  <el-option label="用户数据" value="users" />
                  <el-option label="产品数据" value="products" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="时间范围">
                <el-select v-model="selectedTimeRange" placeholder="请选择时间范围" @change="updateData">
                  <el-option label="最近7天" value="7days" />
                  <el-option label="最近30天" value="30days" />
                  <el-option label="最近90天" value="90days" />
                  <el-option label="全年" value="year" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="搜索关键词">
                <el-input 
                  v-model="searchKeyword" 
                  placeholder="请输入搜索关键词"
                  @input="updateData"
                  clearable
                />
              </el-form-item>
              
              <el-form-item label="显示选项">
                <el-checkbox-group v-model="displayOptions" @change="updateData">
                  <el-checkbox label="showTable">显示表格</el-checkbox>
                  <el-checkbox label="showChart">显示图表</el-checkbox>
                  <el-checkbox label="showSummary">显示统计</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item label="排序方式">
                <el-select v-model="sortBy" placeholder="请选择排序方式" @change="updateData">
                  <el-option label="按名称排序" value="name" />
                  <el-option label="按数量排序" value="quantity" />
                  <el-option label="按金额排序" value="amount" />
                  <el-option label="按日期排序" value="date" />
                </el-select>
              </el-form-item>
            </el-form>
            
            <!-- 操作按钮 -->
            <div class="button-group">
              <el-button type="primary" @click="refreshData">刷新数据</el-button>
              <el-button @click="exportData">导出数据</el-button>
              <el-button @click="resetFilters">重置筛选</el-button>
            </div>
          </div>
        </el-aside>
        
        <!-- 右侧显示区域 -->
        <el-main class="display-area">
          <!-- 统计摘要 -->
          <div v-if="displayOptions.includes('showSummary')" class="summary-section">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-card class="summary-card">
                  <div class="summary-item">
                    <div class="summary-number">{{ summaryData.total }}</div>
                    <div class="summary-label">总数量</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="summary-card">
                  <div class="summary-item">
                    <div class="summary-number">{{ summaryData.average }}</div>
                    <div class="summary-label">平均值</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="summary-card">
                  <div class="summary-item">
                    <div class="summary-number">{{ summaryData.max }}</div>
                    <div class="summary-label">最大值</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="summary-card">
                  <div class="summary-item">
                    <div class="summary-number">{{ summaryData.min }}</div>
                    <div class="summary-label">最小值</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          
          <!-- 图表区域 -->
          <div v-if="displayOptions.includes('showChart')" class="chart-section">
            <el-card>
              <template #header>
                <span>数据趋势折线图</span>
              </template>
              <div class="chart-container">
                <v-chart :option="chartOption" style="height: 400px;" />
              </div>
            </el-card>
          </div>
          
          <!-- 表格区域 -->
          <div v-if="displayOptions.includes('showTable')" class="table-section">
            <el-card>
              <template #header>
                <span>数据表格</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="exportTable">
                  导出表格
                </el-button>
              </template>
              <el-table :data="tableData" style="width: 100%" border stripe>
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="category" label="分类" />
                <el-table-column prop="quantity" label="数量" width="100" />
                <el-table-column prop="amount" label="金额" width="120">
                  <template #default="scope">
                    ¥{{ scope.row.amount.toFixed(2) }}
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="日期" width="120" />
                <el-table-column prop="status" label="状态" width="100">
                  <template #default="scope">
                    <el-tag :type="getStatusType(scope.row.status)">
                      {{ scope.row.status }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                  <template #default="scope">
                    <el-button size="small" @click="viewDetails(scope.row)">查看</el-button>
                    <el-button size="small" type="primary" @click="editItem(scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
              
              <!-- 分页 -->
              <div class="pagination-container">
                <el-pagination
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :page-sizes="[10, 20, 50, 100]"
                  :total="totalItems"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

// 响应式数据
const selectedDataType = ref('sales')
const selectedTimeRange = ref('30days')
const searchKeyword = ref('')
const displayOptions = ref(['showTable', 'showChart', 'showSummary'])
const sortBy = ref('name')
const currentPage = ref(1)
const pageSize = ref(20)

// 模拟数据
const mockData = reactive({
  sales: [
    { id: 1, name: '产品A', category: '电子产品', quantity: 150, amount: 15000, date: '2024-01-15', status: '已完成' },
    { id: 2, name: '产品B', category: '服装', quantity: 200, amount: 8000, date: '2024-01-16', status: '处理中' },
    { id: 3, name: '产品C', category: '食品', quantity: 300, amount: 6000, date: '2024-01-17', status: '已完成' },
    { id: 4, name: '产品D', category: '电子产品', quantity: 80, amount: 12000, date: '2024-01-18', status: '待处理' },
    { id: 5, name: '产品E', category: '服装', quantity: 120, amount: 4800, date: '2024-01-19', status: '已完成' }
  ],
  users: [
    { id: 1, name: '张三', category: 'VIP用户', quantity: 1, amount: 5000, date: '2024-01-15', status: '活跃' },
    { id: 2, name: '李四', category: '普通用户', quantity: 1, amount: 2000, date: '2024-01-16', status: '活跃' },
    { id: 3, name: '王五', category: 'VIP用户', quantity: 1, amount: 8000, date: '2024-01-17', status: '非活跃' }
  ],
  products: [
    { id: 1, name: 'iPhone 15', category: '手机', quantity: 50, amount: 250000, date: '2024-01-15', status: '在售' },
    { id: 2, name: 'MacBook Pro', category: '笔记本', quantity: 30, amount: 180000, date: '2024-01-16', status: '在售' },
    { id: 3, name: 'AirPods Pro', category: '耳机', quantity: 100, amount: 80000, date: '2024-01-17', status: '缺货' }
  ]
})

// 计算属性
const tableData = computed(() => {
  let data = mockData[selectedDataType.value as keyof typeof mockData] || []
  
  // 搜索过滤
  if (searchKeyword.value) {
    data = data.filter(item => 
      item.name.includes(searchKeyword.value) || 
      item.category.includes(searchKeyword.value)
    )
  }
  
  // 排序
  data.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'quantity':
        return b.quantity - a.quantity
      case 'amount':
        return b.amount - a.amount
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      default:
        return 0
    }
  })
  
  return data
})

const totalItems = computed(() => tableData.value.length)

const summaryData = computed(() => {
  const data = tableData.value
  if (data.length === 0) return { total: 0, average: 0, max: 0, min: 0 }
  
  const amounts = data.map(item => item.amount)
  return {
    total: data.length,
    average: (amounts.reduce((sum, amount) => sum + amount, 0) / data.length).toFixed(2),
    max: Math.max(...amounts),
    min: Math.min(...amounts)
  }
})

const chartOption = computed(() => {
  const data = tableData.value
  const categories = [...new Set(data.map(item => item.category))]
  const amounts = categories.map(category => 
    data.filter(item => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0)
  )
  
  // 为折线图准备数据
  const chartData = categories.map((category, index) => ({
    name: category,
    value: amounts[index]
  }))
  
  return {
    title: {
      text: `${selectedDataType.value === 'sales' ? '销售' : selectedDataType.value === 'users' ? '用户' : '产品'}数据趋势`,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        const data = params[0]
        return `${data.name}<br/>金额: ¥${data.value.toLocaleString()}`
      }
    },
    legend: {
      data: ['金额趋势'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        rotate: 45,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      name: '金额 (¥)',
      axisLabel: {
        formatter: '¥{value}'
      }
    },
    series: [
      {
        name: '金额趋势',
        type: 'line',
        data: chartData.map(item => item.value),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#409eff'
        },
        itemStyle: {
          color: '#409eff',
          borderColor: '#fff',
          borderWidth: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
              { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
            ]
          }
        },
        emphasis: {
          itemStyle: {
            color: '#ff6b6b',
            borderColor: '#fff',
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }
    ]
  }
})

// 方法
const updateData = () => {
  currentPage.value = 1
  ElMessage.success('数据已更新')
}

const refreshData = () => {
  ElMessage.success('数据已刷新')
}

const exportData = () => {
  ElMessage.success('数据导出功能待实现')
}

const resetFilters = () => {
  selectedDataType.value = 'sales'
  selectedTimeRange.value = '30days'
  searchKeyword.value = ''
  displayOptions.value = ['showTable', 'showChart', 'showSummary']
  sortBy.value = 'name'
  currentPage.value = 1
  ElMessage.success('筛选条件已重置')
}

const exportTable = () => {
  ElMessage.success('表格导出功能待实现')
}

const viewDetails = (row: any) => {
  ElMessageBox.alert(`查看详情：${row.name}`, '详情信息', {
    confirmButtonText: '确定'
  })
}

const editItem = (row: any) => {
  ElMessage.success(`编辑项目：${row.name}`)
}

const getStatusType = (status: string) => {
  switch (status) {
    case '已完成':
    case '在售':
    case '活跃':
      return 'success'
    case '处理中':
      return 'warning'
    case '待处理':
    case '缺货':
    case '非活跃':
      return 'danger'
    default:
      return 'info'
  }
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

// 生命周期
onMounted(() => {
  ElMessage.success('页面加载完成！')
})
</script>

<style scoped>
.app-container {
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}

.control-panel {
  background-color: white;
  border-right: 1px solid #e4e7ed;
  padding: 20px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.control-section h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #303133;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

.control-form {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.display-area {
  padding: 20px;
  background-color: #f5f5f5;
}

.summary-section {
  margin-bottom: 20px;
}

.summary-card {
  text-align: center;
}

.summary-item {
  padding: 10px;
}

.summary-number {
  font-size: 28px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 5px;
}

.summary-label {
  font-size: 14px;
  color: #606266;
}

.chart-section {
  margin-bottom: 20px;
}

.chart-container {
  width: 100%;
}

.table-section {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .control-panel {
    width: 100% !important;
    border-right: none;
    border-bottom: 1px solid #e4e7ed;
  }
  
  .button-group {
    justify-content: center;
  }
}
</style>
