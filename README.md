# Vue + TypeScript + Vite + Element Plus + ECharts Demo

这是一个使用现代前端技术栈构建的数据展示和管理系统的演示项目。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具
- **Element Plus** - 基于 Vue 3 的组件库
- **ECharts** - 数据可视化图表库

## 功能特性

### 左侧控制面板
- **数据类型选择器** - 支持销售数据、用户数据、产品数据
- **时间范围选择器** - 支持多种时间范围选择
- **搜索关键词输入框** - 实时搜索过滤
- **显示选项复选框组** - 控制表格、图表、统计的显示/隐藏
- **排序方式选择器** - 支持多种排序方式
- **操作按钮** - 刷新、导出、重置等操作

### 右侧显示区域
- **统计摘要卡片** - 显示总数、平均值、最大值、最小值
- **ECharts 图表** - 饼图展示数据分布
- **Element Plus 表格** - 完整的数据表格，支持分页
- **响应式设计** - 适配不同屏幕尺寸

## 项目结构

```
playwrightdemo/
├── index.html                 # HTML 入口文件
├── package.json              # 项目依赖配置
├── vite.config.ts            # Vite 配置文件
├── tsconfig.json             # TypeScript 配置
├── tsconfig.node.json        # Node.js TypeScript 配置
├── src/
│   ├── main.ts               # Vue 应用入口
│   ├── App.vue               # 主应用组件
│   └── vite-env.d.ts         # Vite 环境类型声明
└── README.md                 # 项目说明文档
```

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

### 4. 预览生产版本
```bash
npm run preview
```

## 使用说明

1. **数据筛选**：使用左侧控制面板的各种筛选器来过滤数据
2. **显示控制**：通过复选框控制不同组件的显示/隐藏
3. **数据排序**：选择不同的排序方式来组织数据
4. **交互操作**：点击表格中的按钮进行查看、编辑等操作
5. **响应式布局**：在不同设备上自动调整布局

## 组件说明

### Element Plus 组件
- `el-container` - 布局容器
- `el-form` - 表单组件
- `el-select` - 下拉选择器
- `el-input` - 输入框
- `el-checkbox-group` - 复选框组
- `el-button` - 按钮
- `el-table` - 数据表格
- `el-card` - 卡片容器
- `el-pagination` - 分页组件
- `el-tag` - 标签组件

### ECharts 图表
- 饼图展示数据分类分布
- 支持交互式操作
- 响应式设计

## 开发说明

- 使用 Vue 3 Composition API
- TypeScript 提供完整的类型支持
- 响应式数据管理
- 计算属性优化性能
- 模块化组件设计

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT License
